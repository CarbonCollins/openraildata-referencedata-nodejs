'use strict';

const path = require('path');
const FTPClient = require('ftp');
const fs = require('fs-extra');
const zlib = require('zlib');
const parser = require('xml2json');
const ProgressBar = require('progress');
const common = require('openraildata-common');
const EventEmitter = require('events');

/**
 * @external V3
 * @see {@link ./models/v3.md|V3 docs}
 */
const V3 = require('./models/v3');

/**
 * @external V8
 * @see {@link ./models/v8.md|V8 docs}
 */
const V8 = require('./models/v8');

common.associationMixer(require('./models/refAssociation'));
common.locationMixer(require('./models/refLocation'));
common.stationMixer(require('./models/refStation'));
common.trainOrderMixer(require('./models/refTrainOrder'));

const manifestPath =  path.join(__dirname, './refData/manifest.json');

/**
 * @method getLocalTimetableIds
 * @desc gets the local manifest file and reads the current stored v3 and v8 reference data versions
 * @returns {Promise} resolves with the manifest v3 and v8 data or rejects with an error
 */
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

/**
 * @method updateLocalTimetableId
 * @desc updates/creates a local copy of the v3 or v8 ref data and updates the manifest file
 * @param {String} type either 'v3' and 'v8'
 * @param {String} timetableId the new timetableID to use in the manifest
 * @returns {Promise} resolves with the ref data and manifest updated or rejects with an error
 */
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

/**
 * @method writeRefFile
 * @desc writes a reference file to the local system
 * @param {String} filePath the file path of where the data will be written to
 * @param {*} file the file data to write
 * @param {Function} resolve a promise resolve callback
 * @param {Function} reject a promise reject callback
 */
function writeRefFile(filePath, file, resolve, reject) {
  fs.ensureFile(filePath).then(() => {
    return fs.writeJson(filePath, file);
  }).then(() => {
    const timetableId = (file.PportTimetableRef) ? file.PportTimetableRef.timetableId || '' : file.PportTimetable.timetableID || '';
    const manifestType = /(v\d)\.json/.exec(filePath)[1] || 'unknown';
    return updateLocalTimetableId(manifestType, timetableId);
  }).then(() => {
    resolve(file);
  }).catch((err) => {
    reject(err);
  });
}

/**
 * @method getRemoteStream
 * @desc gets and downloads a file from the remote FTP server with progress bar
 * @param {String} filePath the filepath of the remote FTP file
 * @param {Stream} stream the stream for the remote file
 * @param {Number} size the size (in bytes) of the remote file
 * @param {Function} resolve a promise resolve callback
 * @param {Function} reject a promise reject callback
 */
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

/**
 * @class
 * @desc a service for obtaining and maintaining a local copy of the National Rail reference data for use on apps and such
 */
class ReferenceData extends EventEmitter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this._ftpClient = new FTPClient();
    this._ftpConnected = false;
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

  /**
   * @desc gets the current v3 reference data
   * @see {@link ./models/v3.md|V3 docs}
   * @readonly
   */
  get v3() { return this._v3; }
  /**
   * @desc gets the current v8 reference data
   * @see {@link ./models/v8.md|V8 docs}
   * @readonly
   */
  get v8() { return this._v8; }
  /**
   * @desc gets the local v3 reference data path 
   * @readonly
   */
  get v3Loc() { return this._v3Loc; }
  /**
   * @desc gets the local v3 reference data path 
   * @readonly
   */
  get v8Loc() { return this._v8Loc; }

  /**
   * @method ReferenceData~on
   * @desc attaches an event to the FTP client
   * @param {String} message an event name to trigger on
   * @param {Function} callback a callback to be called when the event is triggered
   */
  on(message, callback) {
    this._ftpClient.on(message, callback);
  }

  /**
   * @method ReferenceData~connect
   * @desc requests a connection to the remote FTP server to access the remote Reference data. a 'ready' event will be called when connected
   * @param {String} pass the remote FTP users password 
   */
  connect(pass) {
    this._intendedClose = false;
    this._ftpClient.connect({
      host: 'datafeeds.nationalrail.co.uk',
      user: 'ftpuser',
      password: pass
    });
  }

  /**
   * @method ReferenceData~disconnect
   * @desc disconnects the FTP client
   */
  disconnect() {
    this._ftpClient.disconnect();
  }

  /**
   * @method ReferenceData~isFTPConnected
   * @desc checks to see if the FTP client is connected
   * @returns {Promise} resolves if the FTP client is connect and rejects if it is not connected or if there in an error
   */
  isFTPConnected() {
    return new Promise((resolve, reject) => {
      (this._ftpConnected) ? resolve() : reject(new Error('FTP Client not connected'));
    })
  }

  /**
   * @method ReferenceData~_listDirFTP
   * @desc lists all of the files and directorys within the specified FTP path
   * @protected
   * @param {String} dir the parent FTP path to list
   * @returns {Promise} resolves with an array of files and directories or rejects with an error
   */
  _listDirFTP(dir) {
    return new Promise((resolve, reject) => {
      this._ftpClient.list(dir, (err, files) => {
        (err) ? reject(err) : resolve(files);
      });
    });
  }

  /**
   * @method ReferenceData~getLocalV3Json
   * @desc gets the local copy (if it exists) of the v3 ref data in json format
   * @returns {Promise} resolves with local v3 ref data or rejects with an error
   */
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

  /**
   * @method ReferenceData~getLocalV8Json
   * @desc gets the local copy (if it exists) of the v8 ref data in json format
   * @returns {Promise} resolves with local v8 ref data or rejects with an error
   */
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

  /**
   * @method ReferenceData~getRemoteV3Json
   * @desc gets a copy of the v3 ref data from the FTP server
   * @returns {Promise} resolves with the remote FTP v3 data or rejects with an error
   */
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

  /**
   * @method ReferenceData~getRemoteV8Json
   * @desc gets a copy of the v8 ref data from the FTP server
   * @returns {Promise} resolves with the remote FTP v8 data or rejects with an error
   */
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

  /**
   * @method ReferenceData~getRemoteV3TimetableId
   * @desc gets the Timetable ID of the remote FTP v3 refData
   * @returns {Promise} resolves with the remote FTP v3 timetableID or rejects with an error
   */
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

  /**
   * @method ReferenceData~getRemoteV8TimetableId
   * @desc gets the Timetable ID of the remote FTP v8 refData
   * @returns {Promise} resolves with the remote FTP v8 timetableID or rejects with an error
   */
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

  /**
   * @method ReferenceData~getCurrentV3
   * @desc gets the most up-to-date copy of the v3 reference data from either local or remote FTP
   * @returns {Proimise} resolves with the most up-to-date copy o the v3 ref data or rejects with an error
   * @fires ReferenceData#v3Updating
   * @fires ReferenceData#v3Updated
   */
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
        if (timetableIdInfo.isSynced) { this.emit('v3Updating', { timetableId: timetableIdInfo.remote }); }
        return (timetableIdInfo.isSynced) ? this.getLocalV3Json() : this.getRemoteV3Json();
      }).then((currentV3) => {
        this._v3 = new V3(currentV3);
        this.emit('v3Updated', { timetableId: this._v3.timetableId });
        resolve(this._v3);
      }).catch((err) => {
        reject(err);
      })
    });
  }


  /**
   * @method ReferenceData~getCurrentV8
   * @desc gets the most up-to-date copy of the v8 reference data from either local or remote FTP
   * @returns {Proimise} resolves with the most up-to-date copy o the v8 ref data or rejects with an error
   * @fires ReferenceData#v8Updating
   * @fires ReferenceData#v8Updated
   */
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
        if (timetableIdInfo.isSynced) { this.emit('v8Updating', { timetableId: timetableIdInfo.remote }); }
        return (timetableIdInfo.isSynced) ? this.getLocalV8Json() : this.getRemoteV8Json();
      }).then((currentV8) => {
        this._v8 = new V8(currentV8);
        this.emit('v8Updated', { timetableId: this._v8.timetableId });
        resolve(this._v8);
      }).catch((err) => {
        reject(err);
      })
    });
  }
}

module.exports = new ReferenceData();
