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

    this._ftpClient.on('ready', (() => { this._ftpConnected = true; }).bind(this));
    this._ftpClient.on('close', (() => { this._ftpConnected = false; }).bind(this));
    this._ftpClient.on('end', (() => { this._ftpConnected = false; }).bind(this));

    this._v3;
  }

  get v3() { return this._v3; }
  get timetableId() { return (this.v3) ? this._v3.PportTimetableRef.timetableId : null; }
  get cancellationReasons() { return (this._v3) ? this._v3.PportTimetableRef.CancellationReasons.Reason : null; }
  get SIDSources() { return (this._v3) ? this._v3.PportTimetableRef.CISSource : null; }
  get lateRunningReasons() { return (this._v3) ? this._v3.PportTimetableRef.LateRunningReasons.Reason : null; }
  get locationRefs() { return (this._v3) ? this._v3.PportTimetableRef.LocationRef : null; }
  get TocRefs() { return (this._v3) ? this._v3.PportTimetableRef.TocRef : null; }
  get Vias() { return (this._v3) ? this._v3.PportTimetableRef.Via : null; }

  tiplocToName(tpl) {
    const location = this.locationRefs.find(o => o.tpl === tpl);
    return (location && location.locname) ? location.locname : null; 
  }

  on(message, callback) {
    this._ftpClient.on(message, callback);
  }

  connect(pass) {
    this._ftpClient.connect({
      host: 'datafeeds.nationalrail.co.uk',
      user: 'ftpuser',
      password: pass
    });
    this.v3Loc = path.join(__dirname, './refData/v3.json');
    this.waitHours = 6;
  }

  disconnect() {
    this._ftpClient.end();
  }

  getDecompressSave(ftpFile, destFile) {
    return new Promise((resolve, reject) => {
      if (this._ftpConnected) {
        this._ftpClient.get(ftpFile, (err, stream) => {
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
            fs.writeFile('refData/v3.json', JSON.stringify(finalObj));
            resolve(finalObj);
          });
          gz.on('error', (err) => {
            reject(err);
          });

          stream.once('close', () => { console.log('file writing done'); })
          .once('error', (err) => { console.error('file writing error') })
          .pipe(gz)
          .pipe(fs.createWriteStream(destFile));
        });
      } else {
        reject(new Error('FTP client not connected'));
      }
    });
  }

  getV3(_forced) {
    const forced = _forced || false;
    return new Promise((resolve, reject) => {
      fs.access(this.v3Loc, 'rw').then(() => {
        return fs.stat('refData/v3.json');
      }).then((fileStat) => {
        if ((new Date() - fileStat.mtime) < (this.waitHours * 60 * 60 * 1000) && !forced) { // less than this.waitHours hours old
          // use local v3 file
          console.log('less than 6 hours');
          return fs.readJson(this.v3Loc);
        } else {
          //update local v3 file with remote one
          console.log('older than 6 hours');
          return this.getDecompressSave('20170622020836_ref_v3.xml.gz', this.v3Loc);
        }
      }).then((v3Obj) => {
        this._v3 = v3Obj;
        console.log(this.v3);
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = new ReferenceData();
