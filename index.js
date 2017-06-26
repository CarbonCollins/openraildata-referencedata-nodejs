'use strict';

const path = require('path');
const FTPClient = require('ftp');
const fs = require('fs-extra');
const zlib = require('zlib');
const parser = require('xml2json');

class ReferenceData {
  constructor() {
    this._ftpClient = new FTPClient();
    this._ftpConnected = false;
    this._intedendClose = false;
    this._ftpFiles = [];

    // do checks on close and end to see if it was an intended close
    this._ftpClient.on('ready', (() => { this._ftpConnected = true; }).bind(this));
    this._ftpClient.on('close', (() => { this._ftpConnected = false; }).bind(this));
    this._ftpClient.on('end', (() => { this._ftpConnected = false; }).bind(this));

    this._v3;
    this._v3Loc = path.join(__dirname, './refData/v3.json');
    this._v8;
    this._v8Loc = path.join(__dirname, './refData/v8.json');
  }

  get v3() { return this._v3; }
  get v8() { return this._v8; }
  get v3Loc() { return this._v3Loc; }
  get v8Loc() { return this._v8Loc; }

  on(message, callback) {
    this._ftpClient.on(message, callback);
  }

  connect(pass) {
    return new Promise((resolve, reject) => {
      this._intendedClose = false;
      this._ftpClient.connect({
        host: 'datafeeds.nationalrail.co.uk',
        user: 'ftpuser',
        password: pass
      });
      this._ftpClient.once('ready', (() => { resolve(); }).bind(this));
      this._ftpClient.once('close', (() => { reject(); }).bind(this));
      this._ftpClient.once('end', (() => { reject(); }).bind(this));
    });
  }
  isFTPConnected() {
    return new Promise((resolve, reject) => {
      (this._ftpConnected) ? resolve() : reject(new Error('FTP Client not connected'));
    })
  }
_listDirFTP(dir) {
    return new Promise((resolve, reject) => {
      this._ftpClient.list(dir, (err, files) => {
        (err) ? reject(err) : resolve(files);
      });
    });
  }

  getLocalV3Json() {
    return new Promise((resolve, reject) => {
      fs.pathExists(this.v3Loc).then((exists) => {
        return (exists) ? fs.readJson(this.v3Loc) : null;
      }).then((v3Json) => {
        resolve(v3Json);
      }).catch((err) => {
        reject(err);
      })
    });
  }

  getRemoteV3Json() {
    return new Promise((resolve, reject) => {
      this.isFTPConnected().then(() => {
        return this._listDirFTP('/');
      }).then((files) => {
        const v3File = files.find(o => o.name.includes('v3.xml.gz'));
        if (v3File) {
          this._ftpClient.get(v3File.name, (err, stream) => {
            if (err) { 
              reject(err);
            } else {
              const buffer = [];
              let finalObj;
              const gz = zlib.createGunzip().setEncoding('utf8');
              gz.on('data', (data) => { buffer.push(data); });
              gz.on('end', () => {
                finalObj = parser.toJson(buffer.join(''), {
                  object: true,
                  coerce: true,
                  reversible: false
                });
                fs.writeFile(this.v3Loc, JSON.stringify(finalObj));
                resolve(finalObj);
              });
              gz.on('error', (err) => {
                reject(err);
              });

              stream.on('error', (err) => { reject(err); })
              .pipe(gz);
            }
          });
        } else {
          reject(new Error('Unable to find v3 reference data in ftp share'));
        }
      }).catch((err) => {
        reject(err);
      })
    });
  }

  getRemoteV3TimetableId() {
    return new Promise((resolve, reject) => {
      this._ftpClient.list('/', (err, files) => {
        if (err) {
          reject(err);
        } else {
          const v3File = files.find(o => o.name.includes('v3.xml.gz'));
          (v3File)
          ? resolve(v3File.name.split('_', 1)[0] || '')
          : reject(new Error('Unable to find v3 reference data in ftp share'));
        }
      });
    });
  }

  getCurrentV3() {
    return new Promise((resolve, reject) => {
      this.getLocalV3Json().then((v3File) => {
        if (v3File && v3File.PportTimetableRef && v3File.PportTimetableRef.timetableId) {
          return `${v3File.PportTimetableRef.timetableId}`;
        } else {
          return 'local not valid'; // used to prevent empty string/null matching
        }
      }).then((localTimetableId) => {
        return this.getRemoteV3TimetableId().then((remoteTimetableId) => {
          return { 
            local: localTimetableId,
            remote: remoteTimetableId,
            isSynced: (`${remoteTimetableId}` === `${localTimetableId}`)
          };
        });
      }).then((timetableIdInfo) => {
        if (timetableIdInfo.isSynced) {
          return this.getLocalV3Json();
        } else {
          return this.getRemoteV3Json();
        }
      }).then((currentV3) => {
        resolve(currentV3);
      }).catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = new ReferenceData();
