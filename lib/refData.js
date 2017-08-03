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
 * @class
 * @desc a service for obtaining and maintaining a local copy of the National Rail reference data for use on apps and such
 */
class ReferenceData extends EventEmitter {
  /**
   * @constructor
   * @fires ReferenceData#ready
   */
  constructor() {
    super();
    this._ftpClient = new FTPClient();
    this._ftpConnected = false;
    this._interval;

    // do checks on close and end to see if it was an intended close
    this._ftpClient.on('ready', (() => {
      /**
       * @event ReferenceData#ready
       * @desc fired when the ftp client has connected
       */
      this.emit('ready');
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
   * @method ReferenceData~_getRemoteStream
   * @desc gets and downloads a file from the remote FTP server with progress bar
   * @param {String} filePath the filepath of the remote FTP file
   * @param {Stream} stream the stream for the remote file
   * @param {Number} size the size (in bytes) of the remote file
   * @param {Function} resolve a promise resolve callback
   * @param {Function} reject a promise reject callback
   * @fires ReferenceData#remoteDownload
   * @fires ReferenceData#remoteChunk
   * @fires ReferenceData#remoteEnd
   * @fires ReferenceData#remoteError
   */
_getRemoteStream(filePath, stream, size, resolve, reject) {
    const buffer = [];
    let finalObj;
    const gz = zlib.createGunzip().setEncoding('utf8');

    /**
     * @event ReferenceData#remoteDownload
     * @desc fired when a remote download is about to commense
     * @type {object}
     * @property {number} totalSize total download size
     * @property {string} path where the data will be saved
     */
    this.emit(`remoteDownload`, { totalSize: size, path: filePath });

    const bar = new ProgressBar(`downloading ${filePath.split(/\/|\\/).pop()} [:bar] :rate/bps :percent :etas`, {
      complete: '=',
      incomplete: ' ',
      width: 50,
      total: size
    });

    stream.on('data', (data) => {
      /**
       * @event ReferenceData#remoteChunk
       * @desc fired when a chunk of data has been downloaded
       * @type {object}
       * @property {number} totalSize total download size
       * @property {string} path where the data will be saved
       * @property {number} chunkSize the size of the chunk
       */
      this.emit(`remoteChunk`, { totalSize: size, path: filePath, chunkSize: data.length });

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
      /**
       * @event ReferenceData#remoteEnd
       * @desc fired when a download has completed
       * @type {object}
       * @property {string} path where the data will be saved
       */
      this.emit(`remoteEnd`, { path: filePath });
    });

    gz.on('error', (err) => {
      /**
       * @event ReferenceData#remoteError
       * @desc fired when a download error has occured
       * @type {Error}
       */
      this.emit(`remoteError`, err);
      reject(err);
    });

    stream
    .on('error', (err) => { this.emit(`remoteError`, err); reject(err); })
    .pipe(gz);
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
   * @method ReferenceData~getLocalJson
   * @desc gets the local copy (if it exists) of the v8 ref data in json format
   * @returns {Promise} resolves with local v8 ref data or rejects with an error
   */
  getLocalJson(type) {
    return new Promise((resolve, reject) => {
      if (type.match(/v3|v8/)) {
        fs.pathExists(this[`${type}Loc`]).then((exists) => {
          return (exists) ? fs.readJson(this[`${type}Loc`]) : null;
        }).then((vJson) => {
          resolve(vJson);
        }).catch((err) => {
          reject(err);
        });
      } else {
        reject(new Error('Type is incorrect, valid options are "v3" and "v8"'));
      }
    });
  }

  /**
   * @method ReferenceData~getRemoteJson
   * @desc gets a copy of the v8 ref data from the FTP server
   * @param {string} type either 'v3' or 'v8'
   * @returns {Promise} resolves with the remote FTP v8 data or rejects with an error
   */
  getRemoteJson(type) {
    return new Promise((resolve, reject) => {
      if (type.match(/v3|v8/)) {
        this.isFTPConnected().then(() => {
          return this._listDirFTP('/');
        }).then((files) => {
          const vFile = files.find(o => o.name.includes(`${type}.xml.gz`));
          if (vFile) {
            this._ftpClient.size(vFile.name, (err, size) => {
              if (err) {
                reject(err);
              } else {
                this._ftpClient.get(vFile.name, (err, stream) => {
                  (err) ? reject(err) : this._getRemoteStream(((type === 'v3') ? this.v3Loc : this.v8Loc), stream, size, resolve, reject);
                });
              }
            });
          } else {
            reject(new Error('Unable to find reference data in ftp share'));
          }
        }).catch((err) => {
          reject(err);
        });
      } else {
        reject(new Error('Type is incorrect, valid options are "v3" and "v8"'));
      }
    });
  }

  /**
   * @method ReferenceData~getRemoteTimetableId
   * @desc gets the Timetable ID of the remote FTP v8 refData
   * @param {string} type either 'v3' or 'v8'
   * @returns {Promise} resolves with the remote FTP v8 timetableID or rejects with an error
   */
  getRemoteTimetableId(type) {
    return new Promise((resolve, reject) => {
      if (type.match(/v3|v8/)) {
        this._ftpClient.list('/', (err, files) => {
          if (err) {
            reject(err);
          } else {
            const vFile = files.find(o => o.name.includes(`${type}.xml.gz`));
            (vFile)
            ? resolve(vFile.name.split('_', 1)[0] || '')
            : reject(new Error('Unable to find reference data in ftp share'));
          }
        });
      } else {
        reject(new Error('Type is incorrect, valid options are "v3" and "v8"'));
      }
    });
  }

  /**
   * @method ReferenceData~getCurrent
   * @desc gets the most up-to-date copy of the v8 reference data from either local or remote FTP
   * @param {string} type either 'v3' or 'v8'
   * @returns {Proimise} resolves with the most up-to-date copy o the v8 ref data or rejects with an error
   * @fires ReferenceData#vUpdating
   * @fires ReferenceData#vUpdated
   */
  getCurrent(type) {
    return new Promise((resolve, reject) => {
      if (type.match(/v3|v8/)) {
        getLocalTimetableIds().then((manifest) => {
          return (manifest && manifest[type])
          ? `${manifest[type]}`
          : 'local not valid'; // used to prevent empty string/null matching
        }).then((localTimetableId) => {
          return this.getRemoteTimetableId(type).then((remoteTimetableId) => {
            return { 
              local: localTimetableId,
              remote: remoteTimetableId,
              isSynced: (`${remoteTimetableId}` === `${localTimetableId}`)
            };
          });
        }).then((timetableIdInfo) => {
          if (timetableIdInfo.isSynced) { this.emit('vUpdating', { type: type, timetableId: timetableIdInfo.remote }); }
          return (timetableIdInfo.isSynced) ? this.getLocalJson(type) : this.getRemoteJson(type);
        }).then((currentV) => {
          (type === 'v3') ? this._v3 = new V3(currentV) : this._v8 = new V8(currentV);
          this.emit('vUpdated', { type: type, timetableId: this[`_${type}`].timetableId });
          resolve(this[`_${type}`]);
        }).catch((err) => {
          reject(err);
        });
      } else {
        reject(new Error('Type is incorrect, valid options are "v3" and "v8"'));
      }
    });
  }
  
}

module.exports = new ReferenceData();
