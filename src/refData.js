import * as path from 'path';
import * as FTPClient from 'ftp';
import * as EventEmitter from 'events';
import * as fs from 'fs-extra';
import * as zlib from 'zlib';
import { parseString } from 'xml2js';
import { associationMixer, locationMixer, stationMixer, trainOrderMixer } from '@openrailuk/common';

import Manifest from './manifest';

import V3 from './models/v3';
import V8 from './models/v8';
import refAssociationMixin from './models/refAssociation';
import refLocationMixin from './models/refLocation';
import refStationMixin from './models/refStation';
import refTrainOrderMixin from './models/refTrainOrder';

associationMixer(refAssociationMixin);
locationMixer(refLocationMixin);
stationMixer(refStationMixin);
trainOrderMixer(refTrainOrderMixin);

const modelConstructors = {
  v3: V3,
  v8: V8,
  default: (data) => data
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

/**
 * @method promisify
 * @description a simple promisifying function to simplify code further in the application
 * @param {*} context the context in which to run `fn` with
 * @param {Function} fn a function to call within a `context`
 * @param {...*} args the arguments to be applied to `fn`
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
 * @method sequentialPromiseFromArray
 * @description runs a promised function on each item of an array (similar to Promise.all()).
 * however, each call is done sequentialy as opposed to being in parralell. All results are
 * returned in an array with the same index
 * @param {*} context the context in which to run `fn` with
 * @param {Function} fn a function to call within a `context`
 * @param {*} elements an array containing elements to call `fn` on
 * @returns {Promise} resolves with all of the promise results in an array or rejects with an error
 * @private
 * @async
 */
async function sequentialPromiseFromArray(context, fn, elements) {
  const resultArr = [];
  for (let i = 0, iLength = elements.length; i < iLength; i += 1) {
    resultArr.push(await fn.call(context, elements[i]));
  }
  return resultArr;
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
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.ReferenceData
 * @classdesc the main code base which maintains the connection to the ftp server and manages which
 * reference data files to download. it also exposes all of the events and functions.
 * @private
 */
class ReferenceData extends EventEmitter {
  /**
   * @constructor
   * @param {Object} options optional data to configure the reference data with
   */
  constructor(optionOverrides = {}) {
    super();
    const options = Object.assign({}, defaultOptions, optionOverrides);

    this.ftpClient = new FTPClient();
    this.ftpConnected = false;

    this.updateInterval;
    this.updateDelay = options.updateDelay;

    this.reconnectInterval;
    this.initialReconnectDelay = options.initialReconnectDelay;
    this.reconnectDelay = options.initialReconnectDelay;
    this.maxReconnectDelay = options.maxReconnectDelay;
    this.reconnectMultiplier = options.reconnectMultiplier;
    this.keepAlive = options.keepAlive;

    this.manifest = new Manifest(localReferenceDataDir);

    this.options = removeProperties(options, 'initialReconnectDelay');

    this.v3 = new V3();
    this.v8 = new V8();

    this.parseReferenceData();
  }

  /**
   * @method module:openraildata/referencedata~listFTPReferenceFiles
   * @description Lists the available reference data tarballs in the FTP server
   * @returns {Promise} resolves with an array of reference files in the FTP server or rejects with
   * an error
   * @private
   */
  listFTPReferenceFiles() {
    return promisify(this.ftpClient, this.ftpClient.list, '/')
      .then(files => files.filter(f => f.name.includes('.xml.gz')))
      .then(files => files.map(f => Object.assign(f, { path: `/${f.name}` })));
  }

  /**
   * @method module:openraildata/referencedata~getFTPReferenceSize
   * @description gets the file size for a specific file in the ftp server
   * @param {Object} fileInfo an object describing a file from the ftp server
   * (result of the list command)
   * @returns {Promise} resolves with the file size or rejects with an error
   * @private
   */
  getFTPReferenceSize(fileInfo) {
    return promisify(this.ftpClient, this.ftpClient.size, fileInfo.path)
      .then(size => Object.assign(fileInfo, { size }));
  }

  /**
   * @method module:openraildata/referencedata~getFTPReferenceFile
   * @description gets a reference files stream from the ftp server
   * @param {Object} fileInfo module:openraildata/referencedata.ReferenceDataan object describing a file from the ftp server
   * (result of the list command)
   * @returns {Promise} resolves with the stream for the file or rejects with an error
   * @fires module:openraildata/referencedata#event:download
   * @fires module:openraildata/referencedata#event:downloadChunk
   * @fires module:openraildata/referencedata#event:downloadEnd
   * @fires module:openraildata/referencedata#event:downloadError
   * @fires module:openraildata/referencedata#event:update
   * @private
   */
  getFTPReferenceFile(fileInfo) {
    return promisify(this.ftpClient, this.ftpClient.get, fileInfo.path)
    .then((stream) => {
      return new Promise((resolve, reject) => {
        const gz = zlib.createGunzip().setEncoding('utf8');
        const buffer = [];
        const downloadInfo = Object.assign({}, pickProperties(fileInfo, 'size', 'name'), {
          filePath: path.join(localReferenceDataDir, `${path.basename(fileInfo.name, '.xml.gz')}.json`),
          finalName: `${path.basename(fileInfo.name, '.xml.gz')}.json`
        });
        this.emit('download', downloadInfo);

        gz.on('data', data => buffer.push(data));
        gz.on('end', () => {
          promisify(this, parseString, buffer.join(''), parserOptions)
            .then(result => fs.writeJson(downloadInfo.filePath, result))
            .then(() => resolve({ name: downloadInfo.finalName, path: downloadInfo.filePath }))
            .catch(reject);
          this.emit('downloadEnd', downloadInfo);
        })
        gz.on('error', err => { this.emit('downloadError', err); reject(err); });

        stream.on('data', data => this.emit('downloadChunk', Object.assign(downloadInfo, { chunkSize: data.length })))
        stream.on('error', err => { this.emit('downloadError', err); reject(err); })
        stream.pipe(gz);
      });
    });
  }

  /**
   * @method module:openraildata/referencedata~ftpClose
   * @description called when the FTP client closes or ends the connection which allows for the
   * class to determine if it should reconnect or close the connection entirely
   * @fires module:openraildata/referencedata#event:disconnected
   * @private
   */
  ftpClose() {
    if (this.ftpConnected === true) {
      this.emit('disconnected', pickProperties(this.options, 'keepAlive'));
    }

    this.ftpConnected = false;
    this.ftpClient = null;

    if (this.keepAlive === true) {
      this.reconnectDelay = (this.reconnectInterval === undefined)
        ? Math.min(this.reconnectDelay * this.reconnectMultiplier, this.maxReconnectDelay) // double next reconnect time untill max value
        : this.reconnectDelay;
      this.reconnect();
    } else {
      clearInterval(this.reconnectInterval);
    }
  }

  /**
   * @method module:openraildata/referencedata~connect
   * @description connects to the openrail data FTP server
   * @fires module:openraildata/referencedata#event:connected
   * @fires module:openraildata/referencedata#event:error
   * @public
   */
  connect(optionOverrides = {}) {
    if (this.ftpConnected === false) {
      this.ftpClient = new FTPClient();

      const timeout = setTimeout((() => {
        this.emit('error', { type: 'FTPClient', error: new Error('Timeout to connect was exceeded') });
        this.ftpClose();
      }).bind(this), 12000);

      if (this.ftpClient.listenerCount('ready') === 0) {
        this.ftpClient
          .on('error', ((err) => {
            clearTimeout(timeout);
            this.emit('error', { type: 'FTPClient', error: err });
          }).bind(this))
          .on('ready', (() => {
            clearTimeout(timeout);
            this.ftpConnected = true;
            this.reconnectDelay = this.initialReconnectDelay;
            this.updateInterval = setInterval(this.checkForReferenceDataUpdate.bind(this), this.updateDelay);
            this.checkForReferenceDataUpdate();
            this.emit('connected', { options: this.options });
          }).bind(this))
          .on('close', this.ftpClose.bind(this))
          .on('end', this.ftpClose.bind(this));
      }

      clearTimeout(this.reconnectInterval);
      this.reconnectInterval = undefined;
      this.options = Object.assign({}, this.options, optionOverrides);
      this.ftpClient.connect(pickProperties(this.options, 'host', 'user', 'password'));
    } else {
      this.emit('connected', { options: this.options });
    }
  }

  /**
   * @method module:openraildata/referencedata~reconnect
   * @description attempts to reconnect to the ftp server
   * @fires module:openraildata/referencedata#event:reconnecting
   * @fires module:openraildata/referencedata#event:reconnectionAttempt
   * @private
   */
  reconnect() {
    if (this.reconnectInterval === undefined) {
      this.emit('reconnecting', Object.assign({}, pickProperties(this.options, 'keepAlive'), { reconnectDelay: this.reconnectDelay }));
      this.reconnectInterval = setTimeout((() => {
        this.emit('reconnectionAttempt');
        this.connect();
      }).bind(this), this.reconnectDelay);
    }
  }

  /**
   * @method module:openraildata/referencedata~checkForReferenceDataUpdate
   * @description checks to see if the local refdata needs to be updated
   * @fires module:openraildata/referencedata#event:error
   * @public
   */
  checkForReferenceDataUpdate() {
    if (this.manifest.manifestId && this.manifest.manifestId !== '') {
      this.listFTPReferenceFiles()
        .then(files => files.map(f => f.name.match(/(\d+).+?(v\d+)\.xml/)))
        .then(files => files.filter(f => Array.isArray(f) && f.length >= 3))
        .then(files => files.reduce((final, curr) => Object.assign(final, { [curr[2]]: curr[1] }), {}))
        .then(refIds => Object.keys(refIds).map(id => refIds[id] !== this.manifest.allTimetableIds[id]))
        .then(refConditions => refConditions.reduce((final, curr) => (final || curr), false))
        .then(refToUpdate => (refToUpdate) ? this.updateLocalReferenceData() : null)
        .catch(err => this.emit('error', err));
    } else {
      return this.updateLocalReferenceData();
    }
  }

  /**
   * @method module:openraildata/referencedata~updateLocalReferenceData
   * @description handles updating the various reference data
   * @fires module:openraildata/referencedata#event:update
   * @private
   */
  updateLocalReferenceData() {
    this.listFTPReferenceFiles()
      .then(files => sequentialPromiseFromArray(this, this.getFTPReferenceSize, files))
      .then(files => sequentialPromiseFromArray(this, this.getFTPReferenceFile, files))
      .then(files => this.manifest.updateFromFiles(files))
      .then(manifest => this.emit('update', { type: 'manifest', manifest }))
      .then(() => this.parseReferenceData())
      .then(() => this.cleanLocalReferenceData());
  }

  /**
   * @method module:openraildata/referencedata~cleanLocalReferenceData
   * @description ensures and cleans the reference_data folder of any previous data
   * @returns {Promise} resolves when complete or rejects with an error
   * @private
   */
  cleanLocalReferenceData() {
    const manifest = this.manifest.baseManifest;
    return fs.ensureDir(localReferenceDataDir)
      .then(() => fs.readdir(localReferenceDataDir))
      .then((files) => {
        const keys = Object.keys(manifest).map(k => manifest[k].name);
        return Promise.all(files
          .filter(f => f !== 'manifest.json')
          .map(f => ({ valid: keys.includes(f), name: f }))
          .filter(f => !f.valid)
          .map(f => fs.remove(path.join(localReferenceDataDir, f.name))));
      });
  }

  /**
   * @method module:openraildata/referencedata~parseReferenceData
   * @description parses the reference data stored into the associated models
   * @returns {Promise} resolves when complete or rejects with an error
   * @fires module:openraildata/referencedata#event:update
   * @private
   */
  parseReferenceData() {
    console.log('tada');
    const manifest = this.manifest.baseManifest || {};
    return Promise.all(Object.keys(manifest).map(key => fs.readJson(manifest[key].path)))
      .then(refDatas => refDatas.map(d => ({ data: d, type: getTypeFromKeys(d) })))
      .then(refDatas => {
        for (let i = 0, iLength = refDatas.length; i < iLength; i += 1) {
          this[refDatas[i].type] = new modelConstructors[refDatas[i].type](refDatas[i].data)
        }
      })
      .then(() => this.emit('update', { type: 'reference' }));
  }
}

export default new ReferenceData();

/**
 * @event module:openraildata/referencedata#connected
 * @description fired when connected to FTP server
 * @type {Object}
 * @property {Object} options the options which were used to connect
 */

/**
 * @event module:openraildata/referencedata#reconnecting
 * @description fired when a recconection request is made
 * @type {Object}
 * @property {Boolean} keepAlive determins if the app should keep the ftp connection alive
 * @property {Number|String} reconnectDelay the amount of time to wait before the next reconnection
 * attempt
 */

/**
 * @event module:openraildata/referencedata#reconnectionAttempt
 * @description fired when recconnection is requested
 */

/**
 * @event module:openraildata/referencedata#disconnected
 * @description fired when ftpClient is disconnected
 * @type {Object}
 * @property {Boolean} keepAlive determins if the app should keep the ftp connection alive
 */

/**
 * @event module:openraildata/referencedata#download
 * @description fired when a new download is started
 * @type {Object}
 * @property {Number} size the size of the download in bytes
 * @property {String} name the ftp name for the download file
 * @property {String} filePath the path to where the file will be downloaded too
 * @property {String} fileName the name of the saved file on the local system as it will be
 * different than the ftp name (conversion from xml to json)
 */

/**
 * @event module:openraildata/referencedata#downloadChunk
 * @description fired when a chunk of data is downloaded (usefull if you want to make a progress
 * bar)
 * @type {Object}
 * @property {Number} size the size of the download in bytes
 * @property {String} name the ftp name for the download file
 * @property {String} filePath the path to where the file will be downloaded too
 * @property {String} fileName the name of the saved file on the local system as it will be
 * different than the ftp name (conversion from xml to json)
 * @property {Number} chunkSize lists the size of the current chunk of data downloaded
 */

/**
 * @event module:openraildata/referencedata#downloadEnd
 * @description fired when a download has completed
 * @type {Object}
 * @property {Number} size the size of the download in bytes
 * @property {String} name the ftp name for the download file
 * @property {String} filePath the path to where the file will be downloaded too
 * @property {String} fileName the name of the saved file on the local system as it will be
 * different than the ftp name (conversion from xml to json)
 */

/**
 * @event module:openraildata/referencedata#downloadError
 * @description fired if there was a download error
 * @type {Error}
 */

/**
 * @event module:openraildata/referencedata#error
 * @description fired when an error occurs
 * @type {Error}
 */

/**
 * @event module:openraildata/referencedata#update
 * @description fired when the manifest changes or when the reference files have been updated
 * @type {Object}
 * @property {String} type the source of the update. Currently can be: `manifest` or `reference`
 */
