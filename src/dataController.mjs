import * as path from 'path';
import FTPClient from 'ftp';
import EventEmitter from 'events';
import fs from 'fs-extra';
import zlib from 'zlib';
import xml2js from 'xml2js';

import { Manifest } from './manifest';

import { V3 } from './models/v3';
import { V8 } from './models/v8';

const modelConstructors = {
  v3: V3,
  v8: V8,
  default: (data) => {
    return data;
  }
}

const defaultOptions = {
  host: 'datafeeds.nationalrail.co.uk',
  user: 'ftpuser',
  initialReconnectDelay: 500,
  maxReconnectDelay: 300000,
  reconnectMultiplier: 2,
  updateDelay: 900000,
  keepAlive: true
};

const parserOptions = {
  firstCharLowerCase: true,
  stripPrefix: true,
  parseNumbers: true,
  parseBooleans: true
};

const localReferenceDataDir = path.resolve(process.cwd(), 'reference_data');

export const symbols = new Map()
  .set('ftpClient', Symbol('ftp client'))
  .set('ftpConnected', Symbol('ftp connected'))
  .set('updateInterval', Symbol('update interval'))
  .set('updateDelay', Symbol('update delay'))
  .set('keepAlive', Symbol('keep alive'))
  .set('initialReconnectDelay', Symbol('initial reconnect delay'))
  .set('reconnectDelay', Symbol('reconnect delay'))
  .set('reconnectInterval', Symbol('reconnect interval'))
  .set('reconnectMultiplier', Symbol('reconnect multiplier'))
  .set('maxReconnectDelay', Symbol('max reconnect delay'))
  .set('manifest', Symbol('manifest'))
  .set('options', Symbol('options'));

/**
 * @description a functions for converting a callback function into a promise
 * @author Steven Collins <steven@carboncollins.uk>
 * @param {*} context the context in which to run `fn` with
 * @param {Function} fn a function to call within a `context`
 * @param {*[]} args the arguments to be applied to `fn`
 * @returns {Promise} resolves with `fn` result or rejects with an error
 * @private
 */
function promisify(context, fn, ...args) {
  return new Promise((resolve, reject) => {
    fn.call(context, ...args, (err, result) => {
      (err) ? reject(err) : resolve(result);
    });
  })
}

/**
 * @description executes a promise with a list of arguments sequentialy and returns all values in an array
 * @author Steven Collins <steven@carboncollins.uk>
 * @param {*} context
 * @param {function} fn
 * @param {*} argumentsArr
 * @returns 
 */
function sequentialPromise(context, fn, argumentsArr) {
  const resultArr = [];
  return argumentsArr
    .reduce((promiseChain, argumentList) => {
      return promiseChain
        .then(() => {
          return fn.call(context, argumentList);
        })
        .then((result) => {
          resultArr.push(result);
        })
    }, Promise.resolve())
    .then(() => {
      return resultArr;
    })
}

/**
 * @method pickProperties
 * @description selects and returns an object of `props` from `o`
 * @param {Object} o original object
 * @param {...String} props properties to clone
 * @returns {Object} an object containing the specified 'props' from 'o'
 * @private
 */
function pickProperties(o, ...props) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] || undefined })));
}

function generateDownloadInfo(fileInfo) {
  return Object.assign({}, pickProperties(fileInfo, 'size', 'name'), {
    filePath: path.join(localReferenceDataDir, `${path.basename(fileInfo.name, '.xml.gz')}.json`),
    finalName: `${path.basename(fileInfo.name, '.xml.gz')}.json`
  })
}

/**
 * @method getTypeFromKeys
 * @description determines which refdata is which
 * @returns {String} the name of the ref data (v3 or v8) 
 * @private
 */
function getTypeFromKeys(data) {
  if (data.PportTimetableRef) {
    return 'v3';
  } else if (data.PportTimetable) {
    return 'v8';
  }
  return 'default';
}

/**
 * @method removeProperties
 * @description removes the specified `props` from `o`
 * @param {Object} o original object
 * @param {...String} props property names to remove from `o`
 * @returns {Object} an object with the specified 'props' removed from 'o'
 * @private
 */
function removeProperties(o, ...props) {
  return Object.assign({}, ...Object.keys(o)
    .filter(prop => (!props.includes(prop)))
    .map(prop => ({ [prop]: o[prop] })));
}

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.DataController
 * @classdesc the main code base which maintains the connection to the ftp server and manages which
 * reference data files to download. it also exposes all of the events and functions.
 * @private
 */
export class DataController extends EventEmitter {
  /**
   * @constructor
   * @param {Object} options optional data to configure the reference data with
   */
  constructor(optionOverrides = {}) {
    super();

    const options = Object.assign({}, defaultOptions, optionOverrides);

    this[symbols.get('ftpClient')] = new FTPClient();
    this[symbols.get('ftpConnected')] = false;

    this[symbols.get('updateInterval')];
    this[symbols.get('updateDelay')] = options.updateDelay;

    this[symbols.get('reconnectInterval')];
    this[symbols.get('initialReconnectDelay')] = options.initialReconnectDelay;
    this[symbols.get('reconnectDelay')] = options.initialReconnectDelay;
    this[symbols.get('maxReconnectDelay')] = options.maxReconnectDelay;
    this[symbols.get('reconnectMultiplier')] = options.reconnectMultiplier;
    this[symbols.get('keepAlive')] = options.keepAlive;
    
    this[symbols.get('manifest')] = new Manifest(localReferenceDataDir);

    this[symbols.get('options')] = removeProperties(options, 'initialReconnectDelay');
  }

  /**
   * @description Lists the available reference data tarballs in the FTP server
   * @author Steven Collins <steven@carboncollins.uk>
   * @returns {Promise} resolves with an array of reference files in the FTP server or rejects with
   * an error
   * @memberof DataController
   * @private
   */
  listFTPReferenceFiles() {
    return promisify(this[symbols.get('ftpClient')], this[symbols.get('ftpClient')].list, '/')
      .then((files) => {
        return files.filter((f) => {
          return f.name.includes('.xml.gz');
        });
      })
      .then((files) => {
        return files.map((f) => {
          return Object.assign(f, { path: `/${f.name}` });
        });
      });
  }

  /**
   * @description gets the file size for a specific file in the ftp server
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Object} fileInfo an object describing a file from the ftp server (the list command)
   * @returns {Promise} resolves with the file size or rejects with an error
   * @memberof DataController
   */
  getFTPFileSize(fileInfo) {
    return promisify(this[symbols.get('ftpClient')], this[symbols.get('ftpClient')].size, fileInfo.path)
      .then((size) => {
        return Object.assign(fileInfo, { size });
      });
  }

  /**
   * @description downloads a reference file from the FTP server
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Object} fileInfo object describing a file on the ftp server
   * @returns {Promise} resolves with the stream for the file or rejects with an error
   * @memberof DataController
   * @fires DataController#event:download
   * @fires DataController#event:downloadChunk
   * @fires DataController#event:downloadEnd
   * @fires DataController#event:downloadError
   * @fires DataController#event:update
   */
  downloadFTPReferenceFile(fileInfo) {
    return promisify(this[symbols.get('ftpClient')], this[symbols.get('ftpClient')].get, fileInfo.path)
      .then((stream) => {
        return new Promise((resolve, reject) => {
          const gz = zlib.createGunzip().setEncoding('utf8');
          const buffer = [];
          const downloadInfo = generateDownloadInfo(fileInfo);

          this.emit('download', downloadInfo);

          gz.on('data', (data) => { buffer.push(data); });
          gz.on('end', () => {
            promisify(this, xml2js.parseString, buffer.join(''), parserOptions)
              .then((result) => {
                return fs.writeJson(downloadInfo.filePath, result);
              })
              .then(() => {
                resolve({ name: downloadInfo.finalName, path: downloadInfo.filePath });
              })
              .catch(reject);

            this.emit('downloadEnd', downloadInfo);
          })
          gz.on('error', (err) => {
            this.emit('downloadError', err);
            reject(err);
          });

          stream.on('data', (data) => { 
            this.emit('downloadChunk', Object.assign(downloadInfo, { chunkSize: data.length }));
          })
          stream.on('error', (err) => {
            this.emit('downloadError', err);
            reject(err);
          })
          stream.pipe(gz);
        });
      });
  }

  /**
   * @description called when the FTP client closes or ends the connection which allows for the
   * class to determine if it should reconnect or close the connection entirely
   * @fires DataController#event:disconnected
   * @author Steven Collins <steven@carboncollins.uk>
   * @memberof DataController
   * @private
   */
  ftpClose() {
    if (this[symbols.get('ftpConnected')] === true) {
      this.emit('disconnected', pickProperties(this[symbols.get('options')], 'keepAlive'));
    }

    this[symbols.get('ftpConnected')] = false;
    this[symbols.get('ftpClient')] = null;

    if (this[symbols.get('keepAlive')] === true) {
      this[symbols.get('reconnectDelay')] = (this[symbols.get('reconnectInterval')] === undefined)
        ? Math.min(this[symbols.get('reconnectDelay')] * this[symbols.get('reconnectMultiplier')], this[symbols.get('maxReconnectDelay')]) // double next reconnect time untill max value
        : this[symbols.get('reconnectDelay')];
      this.reconnect();
    } else {
      clearInterval(this[symbols.get('reconnectInterval')]);
    }
  }

  /**
   * @description connects to the openrail data FTP server
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Object} [optionOverrides={}]
   * @memberof DataController
   * @fires DataController#event:connected
   * @fires DataController#event:error
   * @public
   */
  connect(optionOverrides = {}) {
    if (this[symbols.get('ftpConnected')] === false) {
      this[symbols.get('ftpClient')] = new FTPClient();

      const timeout = setTimeout((() => {
        this.emit('error', { type: 'FTPClient', error: new Error('Timeout to connect was exceeded') });
        this.ftpClose();
      }).bind(this), 12000);

      if (this[symbols.get('ftpClient')].listenerCount('ready') === 0) {
        this[symbols.get('ftpClient')]
          .on('error', ((err) => {
            clearTimeout(timeout);

            this.emit('error', { type: 'FTPClient', error: err });
          }).bind(this))
          .on('ready', (() => {
            clearTimeout(timeout);

            this[symbols.get('ftpConnected')] = true;
            this[symbols.get('reconnectDelay')] = this[symbols.get('initialReconnectDelay')];
            this[symbols.get('updateInterval')] = setInterval(this.checkForReferenceDataUpdate.bind(this), this[symbols.get('updateDelay')]);

            this.checkForReferenceDataUpdate();

            this.emit('connected', { options: this.options });
          }).bind(this))
          .on('close', this.ftpClose.bind(this))
          .on('end', this.ftpClose.bind(this));
      }

      clearTimeout(this.reconnectInterval);

      this[symbols.get('reconnectInterval')] = undefined;
      this[symbols.get('options')] = Object.assign({}, this[symbols.get('options')], optionOverrides);
      this[symbols.get('ftpClient')].connect(pickProperties(this[symbols.get('options')], 'host', 'user', 'password'));
    } else {
      this.emit('connected', { options: this[symbols.get('options')] });
    }
  }

  /**
   * @description attempts to reconnect to the ftp server
   * @author Steven Collins <steven@carboncollins.uk>
   * @memberof DataController
   * @fires DataController#event:reconnecting
   * @fires DataController#event:reconnectionAttempt
   * @private
   */
  reconnect() {
    if (this[symbols.get('reconnectInterval')] === undefined) {
      this.emit('reconnecting', Object.assign({}, pickProperties(this[symbols.get('options')], 'keepAlive'), { reconnectDelay: this[symbols.get('reconnectDelay')] }));

      this.reconnectInterval = setTimeout((() => {
        this.emit('reconnectionAttempt');
        this.connect();
      }).bind(this), this[symbols.get('reconnectDelay')]);
    }
  }

  /**
   * @method module:openraildata/referencedata~checkForReferenceDataUpdate
   * @description checks to see if the local refdata needs to be updated
   * @fires module:openraildata/referencedata#event:error
   * @public
   */

  /**
   * @description checks to see if the local refdata needs to be updated
   * @author Steven Collins <steven@carboncollins.uk>
   * @memberof DataController
   * @fires mDataController#event:error
   * @public
   */
  checkForReferenceDataUpdate() {
    if (this[symbols.get('manifest')].manifestId && this[symbols.get('manifest')].manifestId !== '') {
      this.listFTPReferenceFiles()
        .then((files) => {
          return files
            .map((f) => { return f.name.match(/(\d+).+?(v\d+)\.xml/); })
            .filter((f) => { return Array.isArray(f) && f.length >= 3; })
            .reduce((final, curr) => { return Object.assign(final, { [curr[2]]: curr[1] }); }, {})
        })
        .then((refIds) => {
          return Object.keys(refIds).map(id => refIds[id] !== this[symbols.get('manifest')].allTimetableIds[id]);
        })
        .then((refConditions) => {
          return refConditions.reduce((final, curr) => {
            return (final || curr); }, false);
          })
        .then((refToUpdate) => {
          return (refToUpdate)
            ? this.updateLocalReferenceData()
            : null;
        })
        .then(() => {
          return this.emit('dataReady');
        })
        .catch((err) => {
          return this.emit('error', err);
        });
    } else {
      return this.updateLocalReferenceData()
        .then(() => {
          return this.emit('dataReady');
        })
    }
  }

  /**
   * @description handles updating the various reference data
   * @author Steven Collins <steven@carboncollins.uk>
   * @memberof DataController
   * @fires #event:update
   */
  updateLocalReferenceData() {
    return this.listFTPReferenceFiles()
      .then((files) => { return sequentialPromise(this, this.getFTPFileSize, files); })
      .then((files) => { return sequentialPromise(this, this.downloadFTPReferenceFile, files); })
      .then((files) => { return this[symbols.get('manifest')].updateFromFiles(files); })
      .then((manifest) => { return this.emit('update', { type: 'manifest', manifest }); })
      .then(() => { return this.parseReferenceData() })
      .then(() => { return this.cleanLocalReferenceData() })
      // .then(() => { return this.emit('dataReady'); });
  }

  /**
   * @description ensures and cleans the reference_data folder of any previous data
   * @author Steven Collins <steven@carboncollins.uk>
   * @returns {Promise} resolves when complete or rejects with an error
   * @memberof DataController
   * @private
   */
  cleanLocalReferenceData() {
    const manifest = this[symbols.get('manifest')].baseManifest;

    return fs.ensureDir(localReferenceDataDir)
      .then(() => { return fs.readdir(localReferenceDataDir); })
      .then((files) => {
        const keys = Object.keys(manifest).map((k) => { return manifest[k].name; });

        return Promise.all(files
          .filter((f) => { return f !== 'manifest.json'; })
          .map((f) => { return { valid: keys.includes(f), name: f }; })
          .filter((f) => { return !f.valid; })
          .map((f) => { return fs.remove(path.join(localReferenceDataDir, f.name)); }));
      });
  }

  /**
   * @description parses the reference data stored into the associated models
   * @author Steven Collins <steven@carboncollins.uk>
   * @returns {Promise} resolves when complete or rejects with an error
   * @memberof DataController
   * @private
   */
  parseReferenceData() {
    const manifest = this[symbols.get('manifest')].baseManifest || {};

    return Promise.all(Object.keys(manifest)
      .map((key) => {
        return fs.readJson(manifest[key].path);
      }))
      .then((refDatas) => {
        return refDatas.map((d) => {
          return { data: d, type: getTypeFromKeys(d) };
        });
      })
      .then((refDatas) => {
        for (let i = 0, iLength = refDatas.length; i < iLength; i += 1) {
          this[refDatas[i].type] = new modelConstructors[refDatas[i].type](refDatas[i].data)
        }
      })
      .then(() => { return this.emit('update', { type: 'reference' }); });
  }
}
