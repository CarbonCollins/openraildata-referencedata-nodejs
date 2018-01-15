'use strict';

const path = require('path');
const FTPClient = require('ftp');
const fs = require('fs-extra');
const zlib = require('zlib');
const parser = require('xml2json');
const ProgressBar = require('progress');
const common = require('openraildata-common');
const EventEmitter = require('events');

const V3 = require('./models/v3');
const V8 = require('./models/v8');

common.associationMixer(require('./models/refAssociation'));
common.locationMixer(require('./models/refLocation'));
common.stationMixer(require('./models/refStation'));
common.trainOrderMixer(require('./models/refTrainOrder'));

const manifestPath =  path.join(__dirname, './refData/manifest.json');

/**
 * @method getLocalTimetableIds
 * @description gets the local manifest file and reads the current stored v3 and v8 reference data versions
 * @returns {Promise} resolves with the manifest v3 and v8 data or rejects with an error
 * @private
 */
function getLocalTimetableIds() {
  return fs.pathExists(manifestPath)
    .then((exists) => {
      return (exists)
        ? fs.readJson(manifestPath)
        : null;
    });
}

/**
 * @method updateLocalTimetableId
 * @description updates/creates a local copy of the v3 or v8 ref data and updates the manifest file
 * @param {String} type either 'v3' and 'v8'
 * @param {String} timetableId the new timetableID to use in the manifest
 * @returns {Promise} resolves with the ref data and manifest updated or rejects with an error
 * @private
 */
function updateLocalTimetableId(type, timetableId) {
  return fs.pathExists(manifestPath)
    .then((exists) => {
      return (exists)
        ? fs.readJson(manifestPath)
        : fs.ensureFile(manifestPath);
    })
    .then((existingManifest) => {
      const manifest = (existingManifest)
        ? existingManifest
        : {};
      manifest[type] = timetableId;
      return fs.writeJson(manifestPath, manifest);
    });
}

/**
 * @method writeRefFile
 * @description writes a reference file to the local system
 * @param {String} filePath the file path of where the data will be written to
 * @param {*} file the file data to write
 * @param {Function} resolve a promise resolve callback
 * @param {Function} reject a promise reject callback
 * @private
 */
function writeRefFile(filePath, file = {}, resolve, reject) {
  fs.ensureFile(filePath)
    .then(() => {
      return fs.writeJson(filePath, file);
    })
    .then(() => {
      const timetableId = (file.PportTimetableRef)
        ? file.PportTimetableRef.timetableId || ''
        : file.PportTimetable.timetableID || '';
      const manifestType = /(v\d)\.json/.exec(filePath)[1] || 'unknown';
      return updateLocalTimetableId(manifestType, timetableId);
    })
    .then(() => {
      resolve(file);
    })
    .catch((err) => {
      reject(err);
    });
}

/**
 * @method matchCheck
 * @description checks to see if an input value matches either `v3` or `v8`
 * @param {String} type template type to check for a match on
 * @returns {Promise} resolves if there is a match or rejects with an error
 * @private
 */
function matchCheck(type) {
  return new Promise((resolve, reject) => {
    (type.match(/v3|v8/)) 
      ? resolve()
      : reject(reject(new Error('Type is incorrect, valid options are "v3" and "v8"')));
  });
}

/**
 * @method containsFile
 * @description checks to se eif a xml.gz file exists for a specific reference data type
 * @param {String} type the type of timetable to match
 * @param {String[]} files an array of file names to attampt to match
 * @returns {Promise} resolves if file is found or rejects with an error
 */
function containsFile(type, files) {
  return new Promise((resolve, reject) => {
    const vFile = files.find(o => o.name.includes(`${type}.xml.gz`));
    (vFile)
      ? resolve(vFile)
      : reject(new Error('Unable to find reference data in ftp share'));
  });
}

/**
 * @class
 * @classdesc a service for obtaining and maintaining a local copy of the National Rail reference data for use on apps and such
 * @private
 */
class ReferenceData extends EventEmitter {
  /**
   * @constructor
   * @fires module:openraildata/referencedata#event:ready
   */
  constructor(options = {}) {
    super();
    this.ftpClient = new FTPClient();
    this.ftpConnected = false;
    this.interval;

    // do checks on close and end to see if it was an intended close
    this.ftpClient
      .on('ready', (() => {
        /**
         * @event module:openraildata/referencedata#ready
         * @description fired when the ftp client has connected
         */
        this.emit('ready');
        this.ftpConnected = true; 
        this.interval = setInterval((() => {
          this.getCurrent('v3');
          this.getCurrent('v8');
        }).bind(this), options.interval || 900000); // 15 mins
      })
      .bind(this));

    this.ftpClient
      .on('close', (() => {
        this.ftpConnected = false;
        clearInterval(this.interval);
      })
      .bind(this));

    this.ftpClient
      .on('end', (() => {
        this.ftpConnected = false;
        clearInterval(this.interval);
      })
      .bind(this));

    this._v3;
    this._v3Loc = path.join(__dirname, './refData/v3.json');
    this._v8;
    this._v8Loc = path.join(__dirname, './refData/v8.json');
  }

  /**
   * @method module:openraildata/referencedata~_getRemoteStream
   * @description gets and downloads a file from the remote FTP server with progress bar
   * @param {String} filePath the filepath of the remote FTP file
   * @param {Stream} stream the stream for the remote file
   * @param {Number} size the size (in bytes) of the remote file
   * @param {Function} resolve a promise resolve callback
   * @param {Function} reject a promise reject callback
   * @fires module:openraildata/referencedata#event:remoteDownload
   * @fires module:openraildata/referencedata#event:remoteChunk
   * @fires module:openraildata/referencedata#event:remoteEnd
   * @fires module:openraildata/referencedata#event:remoteError
   * @private
   */
getRemoteStream(filePath, stream, size, resolve, reject) {
    const buffer = [];
    let finalObj;
    const gz = zlib.createGunzip().setEncoding('utf8');

    /**
     * @event module:openraildata/referencedata#remoteDownload
     * @description fired when a remote download is about to commense
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
       * @event module:openraildata/referencedata#remoteChunk
       * @description fired when a chunk of data has been downloaded
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
       * @event module:openraildata/referencedata#remoteEnd
       * @description fired when a download has completed
       * @type {object}
       * @property {string} path where the data will be saved
       */
      this.emit(`remoteEnd`, { path: filePath });
    });

    gz.on('error', (err) => {
      /**
       * @event module:openraildata/referencedata#remoteError
       * @description fired when a download error has occured
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
   * @member {Object} v3
   * @memberof module:openraildata/referencedata
   * @description gets the current v3 reference data
   * @instance
   * @readonly
   */
  get v3() {
    return this._v3;
  }

  /**
   * @member {Object} v8
   * @memberof module:openraildata/referencedata
   * @description gets the current v8 reference data
   * @instance
   * @readonly
   */
  get v8() {
    return this._v8;
  }

  /**
   * @member {Object} v3Loc
   * @memberof module:openraildata/referencedata
   * @description gets the local v3 reference data path
   * @instance
   * @readonly
   */
  get v3Loc() {
    return this._v3Loc;
  }

  /**
   * @member {Object} v8Loc
   * @memberof module:openraildata/referencedata
   * @description gets the local v3 reference data path
   * @instance
   * @readonly
   */
  get v8Loc() {
    return this._v8Loc;
  }

  /**
   * @method module:openraildata/referencedata~connect
   * @description requests a connection to the remote FTP server to access the remote Reference data. a 'ready' event will be called when connected
   * @param {String} pass the remote FTP users password 
   */
  connect(pass) {
    this._intendedClose = false;
    this.ftpClient.connect({
      host: 'datafeeds.nationalrail.co.uk',
      user: 'ftpuser',
      password: pass
    });
  }

  /**
   * @method module:openraildata/referencedata~disconnect
   * @description disconnects the FTP client
   */
  disconnect() {
    this.ftpClient.disconnect();
  }

  /**
   * @method module:openraildata/referencedata~isFTPConnected
   * @description checks to see if the FTP client is connected
   * @returns {Promise} resolves if the FTP client is connect and rejects if it is not connected or if there in an error
   */
  isFTPConnected() {
    return new Promise((resolve, reject) => {
      (this.ftpConnected)
        ? resolve()
        : reject(new Error('FTP Client not connected'));
    })
  }

  /**
   * @method module:openraildata/referencedata~listDirFTP
   * @description lists all of the files and directorys within the specified FTP path
   * @param {String} dir the parent FTP path to list
   * @returns {Promise} resolves with an array of files and directories or rejects with an error
   * @private
   */
  listDirFTP(dir = '/') {
    return new Promise((resolve, reject) => {
      this.ftpClient.list(dir, (err, files) => {
        (err) ? reject(err) : resolve(files);
      });
    });
  }

  /**
   * @method module:openraildata/referencedata~getLocalJson
   * @description gets the local copy (if it exists) of the v8 ref data in json format
   * @returns {Promise} resolves with local v8 ref data or rejects with an error
   */
  getLocalJson(type = '') {
    return matchCheck(type)
      .then(() => {
        return fs.pathExists(this[`${type}Loc`]);
      })
      .then((exists) => {
        return (exists) ? fs.readJson(this[`${type}Loc`]) : null;
      });
  }

  /**
   * @method module:openraildata/referencedata~getRemoteJson
   * @description gets a copy of the v8 ref data from the FTP server
   * @param {string} type either 'v3' or 'v8'
   * @returns {Promise} resolves with the remote FTP v8 data or rejects with an error
   */
  getRemoteJson(type = '') {
    return new Promise((resolve, reject) => {
      matchCheck(type)
      .then(this.isFTPConnected)
      .then(() => {
        return this.listDirFTP('/');
      })
      .then((files) => {
        return containsFile(type, files);
      })
      .then((vFile) => {
        this.ftpClient.size(vFile.name, (err, size) => {
          if (err) {
            reject(err);
          } else {
            this.ftpClient.get(vFile.name, (err, stream) => {
              if (err) {
                reject(err);
              } else {
                this.getRemoteStream(this[`${type}Loc`], stream, size, resolve, reject);
              }
            });
          }
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * @method module:openraildata/referencedata~getRemoteTimetableId
   * @description gets the Timetable ID of the remote FTP v8 refData
   * @param {string} type either 'v3' or 'v8'
   * @returns {Promise} resolves with the remote FTP v8 timetableID or rejects with an error
   */
  getRemoteTimetableId(type) {
    return matchCheck(type)
      .then(() => {
        this.ftpClient.list('/', (err, files) => {
          if (err) {
            return Promise.reject(err);
          } else {
            const vFile = files.find(o => o.name.includes(`${type}.xml.gz`));
            return (vFile)
              ? Promise.resolve(vFile.name.split('_', 1)[0] || '')
              : Promise.reject(new Error('Unable to find reference data in ftp share'));
          }
        });
      });
  }

  /**
   * @method module:openraildata/referencedata~getCurrent
   * @description gets the most up-to-date copy of the v8 reference data from either local or remote FTP
   * @param {string} type either 'v3' or 'v8'
   * @returns {Proimise} resolves with the most up-to-date copy o the v8 ref data or rejects with an error
   * @fires module:openraildata/referencedata#event:vUpdating
   * @fires module:openraildata/referencedata#event:vUpdated
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

module.exports = ReferenceData;
