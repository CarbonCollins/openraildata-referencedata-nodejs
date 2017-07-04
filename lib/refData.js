'use strict';

const path = require('path');
const FTPClient = require('ftp');
const fs = require('fs-extra');
const zlib = require('zlib');
const parser = require('xml2json');
const ProgressBar = require('progress');

const V3 = require('./models/v3');
const V8 = require('./models/v8');

const manifestPath =  path.join(__dirname, './refData/manifest.json');

function getLocalTimetableIds() {
  return new Promise((resolve, reject) => {
    fs.pathExists(manifestPath).then((exists) => {
      return (exists) ? fs.readJson(manifestPath) : null;
    }).then((manifest) => {
      resolve(manifest);
    }).catch((err) => {
      reject(err);
    });
  });
}

function updateLocalTimetableId(type, timetableId) {
  return new Promise((resolve, reject) => {
    fs.pathExists(manifestPath).then((exists) => {
      return (exists) ? fs.readJson(manifestPath) : fs.ensureFile(manifestPath);
    }).then((existingManifest) => {
      const manifest = (existingManifest) ? existingManifest : {};
      manifest[type] = timetableId;
      return fs.writeJson(manifestPath, manifest);
    }).then(() => {
      resolve();
    }).catch((err) => {
      reject(err);
    })
  });
}
function writeRefFile(filePath, file, resolve, reject) {
  fs.ensureFile(filePath).then(() => {
    return fs.writeJson(filePath, file);
  }).then(() => {
    const timetableId = file.PportTimetable.timetableId || file.PportTimetableRef.timetableID || '';
    const manifestType = /(v\d)\.json/.exec(filePath)[1] || 'unknown';
    return updateLocalTimetableId(manifestType, timetableId);
  }).then(() => {
    resolve(file);
  }).catch((err) => {
    reject(err);
  });
}

function getRemoteStream(filePath, stream, size, resolve, reject) {
  const buffer = [];
  let finalObj;
  const gz = zlib.createGunzip().setEncoding('utf8');

  const bar = new ProgressBar(`downloading ${filePath.split(/\/|\\/).pop()} [:bar] :rate/bps :percent :etas`, {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: size
  });

  stream.on('data', (data) => {
    bar.tick(data.length);
  });

  gz.on('data', (data) => {
    buffer.push(data);
  });

  gz.on('end', () => {
    finalObj = parser.toJson(buffer.join(''), {
      object: true,
      coerce: true,
      reversible: false
    });
    writeRefFile(filePath, finalObj, resolve, reject);
  });

  gz.on('error', (err) => {
    reject(err);
  });

  stream
  .on('error', (err) => { reject(err); })
  .pipe(gz);
}


class ReferenceData {
  constructor() {
    this._ftpClient = new FTPClient();
    this._ftpConnected = false;
    this._intedendClose = false;
    this._ftpFiles = [];

    this._interval;

    // do checks on close and end to see if it was an intended close
    this._ftpClient.on('ready', (() => {
      this._ftpConnected = true; 
      this._interval = setInterval((() => {
        this.getCurrentV3();
        this.getCurrentV8();
      }).bind(this), 900000); // 15 mins
    }).bind(this));
    this._ftpClient.on('close', (() => { this._ftpConnected = false; clearInterval(this._interval); }).bind(this));
    this._ftpClient.on('end', (() => { this._ftpConnected = false; clearInterval(this._interval); }).bind(this));

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
    this._intendedClose = false;
    this._ftpClient.connect({
      host: 'datafeeds.nationalrail.co.uk',
      user: 'ftpuser',
      password: pass
    });
  }

  disconnect() {
    this._ftpClient.disconnect();
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

  getLocalV8Json() {
    return new Promise((resolve, reject) => {
      fs.pathExists(this.v8Loc).then((exists) => {
        return (exists) ? fs.readJson(this.v8Loc) : null;
      }).then((v8Json) => {
        resolve(v8Json);
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
          this._ftpClient.size(v3File.name, (err, size) => {
            if (err) {
              reject(err);
            } else {
              this._ftpClient.get(v3File.name, (err, stream) => {
                (err) ? reject(err) : getRemoteStream(this.v3Loc, stream, size, resolve, reject);
              });
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

  getRemoteV8Json() {
    return new Promise((resolve, reject) => {
      this.isFTPConnected().then(() => {
        return this._listDirFTP('/');
      }).then((files) => {
        const v8File = files.find(o => o.name.includes('v8.xml.gz'));
        if (v8File) {
          this._ftpClient.size(v8File.name, (err, size) => {
            if (err) {
              reject(err);
            } else {
              this._ftpClient.get(v8File.name, (err, stream) => {
                (err) ? reject(err) : getRemoteStream(this.v8Loc, stream, size, resolve, reject);
              });
            }
          });
        } else {
          reject(new Error('Unable to find v8 reference data in ftp share'));
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

  getRemoteV8TimetableId() {
    return new Promise((resolve, reject) => {
      this._ftpClient.list('/', (err, files) => {
        if (err) {
          reject(err);
        } else {
          const v8File = files.find(o => o.name.includes('v8.xml.gz'));
          (v8File)
          ? resolve(v8File.name.split('_', 1)[0] || '')
          : reject(new Error('Unable to find v8 reference data in ftp share'));
        }
      });
    });
  }

  getCurrentV3() {
    return new Promise((resolve, reject) => {
      getLocalTimetableIds().then((manifest) => {
        return (manifest && manifest.v3)
        ? `${manifest.v3}`
        : 'local not valid'; // used to prevent empty string/null matching
      }).then((localTimetableId) => {
        return this.getRemoteV3TimetableId().then((remoteTimetableId) => {
          return { 
            local: localTimetableId,
            remote: remoteTimetableId,
            isSynced: (`${remoteTimetableId}` === `${localTimetableId}`)
          };
        });
      }).then((timetableIdInfo) => {
        return (timetableIdInfo.isSynced) ? this.getLocalV3Json() : this.getRemoteV3Json();
      }).then((currentV3) => {
        this._v3 = new V3(currentV3);
        resolve(this._v3);
      }).catch((err) => {
        reject(err);
      })
    });
  }

  getCurrentV8() {
    return new Promise((resolve, reject) => {
      getLocalTimetableIds().then((manifest) => {
        return (manifest && manifest.v8)
        ? `${manifest.v8}`
        : 'local not valid'; // used to prevent empty string/null matching
      }).then((localTimetableId) => {
        return this.getRemoteV8TimetableId().then((remoteTimetableId) => {
          return { 
            local: localTimetableId,
            remote: remoteTimetableId,
            isSynced: (`${remoteTimetableId}` === `${localTimetableId}`)
          };
        });
      }).then((timetableIdInfo) => {
        return (timetableIdInfo.isSynced) ? this.getLocalV8Json() : this.getRemoteV8Json();
      }).then((currentV8) => {
        this._v8 = new V8(currentV8);
        resolve(this._v8);
      }).catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = new ReferenceData();
