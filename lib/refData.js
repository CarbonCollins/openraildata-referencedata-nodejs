'use strict';

const path = require('path');
const FTPClient = require('ftp');
const EventEmitter = require('events');
const fs = require('fs-extra');
const zlib = require('zlib');
const { parseString } = require('xml2js');

const Manifest = require('./manifest');

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
 * @param {*[]} elements an array containing elements to call `fn` on
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
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.ReferenceData
 * @event module:openraildata/referencedata.ReferenceData#connected fired when connected to FTP server
 * @event module:openraildata/referencedata.ReferenceData#error fired when there is an error
 * @event module:openraildata/referencedata.ReferenceData#reconnecting fired when a recconection request is made
 * @event module:openraildata/referencedata.ReferenceData#reconnectionAttempt fired when recconnection is requested
 * @event module:openraildata/referencedata.ReferenceData#disconnected fired when ftpClient is disconnected
 * @event module:openraildata/referencedata.ReferenceData#download fired when a new download is started
 * @event module:openraildata/referencedata.ReferenceData#downloadChunk fired when a chunk of data is downloaded
 * @event module:openraildata/referencedata.ReferenceData#downloadEnd fired when a download has completed
 * @event module:openraildata/referencedata.ReferenceData#downloadError fired if there was a download error
 * @event module:openraildata/referencedata.ReferenceData#referenceDataUpdate fired when reference data has been unpacked and is ready to use
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
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~listFTPReferenceFiles
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
   * @method module:openraildata/referencedata.ReferenceData~getFTPReferenceSize
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
   * @method module:openraildata/referencedata.ReferenceData~getFTPReferenceFile
   * @description gets a reference files stream from the ftp server
   * @param {Object} fileInfo an object describing a file from the ftp server
   * (result of the list command)
   * @returns {Promise} resolves with the stream for the file or rejects with an error
   * @fires module:openraildata/referencedata.ReferenceData#download
   * @fires module:openraildata/referencedata.ReferenceData#downloadChunk
   * @fires module:openraildata/referencedata.ReferenceData#downloadEnd
   * @fires module:openraildata/referencedata.ReferenceData#downloadError
   * @fires module:openraildata/referencedata.ReferenceData#referenceDataUpdate
   * @private
   */
  getFTPReferenceFile(fileInfo) {
    return promisify(this.ftpClient, this.ftpClient.get, fileInfo.path)
    .then((stream) => {
      return new Promise((resolve, reject) => {
        const gz = zlib.createGunzip().setEncoding('utf8');
        const buffer = [];
        const downloadInfo = Object.assign({}, pickProperties(fileInfo, 'size', 'name'), {
          filePath: path.join(localReferenceDataDir, path.basename(fileInfo.name, '.gz')),
          finalName: path.basename(fileInfo.name, '.gz')
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
   * @method module:openraildata/referencedata.ReferenceData~ftpClose
   * @description called when the FTP client closes or ends the connection which allows for the
   * class to determine if it should reconnect or close the connection entirely
   * @fires module:openraildata/referencedata.ReferenceData#disconnected
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
   * @method module:openraildata/referencedata.ReferenceData~connect
   * @description connects to the openrail data FTP server
   * @fires module:openraildata/referencedata.ReferenceData#connected
   * @fires module:openraildata/referencedata.ReferenceData#error
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
   * @method module:openraildata/referencedata.ReferenceData~reconnect
   * @description attempts to reconnect to the ftp server
   * @fires module:openraildata/referencedata.ReferenceData#reconnecting
   * @fires module:openraildata/referencedata.ReferenceData#reconnectionAttempt
   * @public
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
   * @method module:openraildata/referencedata.ReferenceData~checkForReferenceDataUpdate
   * @description checks to see if the local refdata needs to be updated
   * @fires module:openraildata/referencedata.ReferenceData#error
   * @public
   */
  checkForReferenceDataUpdate() {
    if (this.manifest.manifestId && this.manifest.manifestId !== '') {
      this.listFTPReferenceFiles()
        .then(files => files.map(f => f.name.match(/(\d+).+?(v\d+)\.xml/)))
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
   * @method module:openraildata/referencedata.ReferenceData~updateLocalReferenceData
   * @description handles updating the various reference data
   * @public
   */
  updateLocalReferenceData() {
    this.listFTPReferenceFiles()
      .then(files => sequentialPromiseFromArray(this, this.getFTPReferenceSize, files))
      .then(files => sequentialPromiseFromArray(this, this.getFTPReferenceFile, files))
      .then(files => this.manifest.updateFromFiles(files))
      .then(manifest => this.emit('manifestUpdate', manifest))
      // .then(console.log)
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~cleanLocalReferenceData
   * @description ensures and cleans the reference_data folder of any previous data
   * @returns {Promise} resolves when complete or rejects with an error
   * @public
   */
  cleanLocalReferenceData() {
    return fs.ensureDir(localReferenceDataDir)
      .then(() => fs.emptyDir(localReferenceDataDir));
  }
}

module.exports = ReferenceData;
