'use strict';

const path = require('path');
const FTPClient = require('ftp');
const EventEmitter = require('events');
const fs = require('fs-extra');

const Manifest = require('./manifest');

const defaultOptions = {
  host: 'datafeeds.nationalrail.co.uk',
  user: 'ftpuser',
  initialReconnectDelay: 500,
  maxReconnectDelay: 300000,
  reconnectMultiplier: 2,
  updateDelay: 900000,
  keepAlive: true
}

const localReferenceDataDir = path.resolve(process.cwd(), 'reference_data');

/**
 * @method pickProperties
 * @description selects and returns an object of `props` from `o`
 * @param {Object} o original object
 * @param {...String} props properties to clone
 * @returns {Object} an object containing the specified 'props' from 'o'
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
 */
function removeProperties(o, ...props) {
  return Object.assign({}, ...Object.keys(o)
    .filter(prop => (!props.includes(prop)))
    .map(prop => ({
      [prop]: o[prop]
    })));
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
            this.updateInterval = setInterval(this.updateReferenceData.bind(this), this.updateDelay);
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
   * @method module:openraildata/referencedata.ReferenceData~updateLocalReferenceData
   * @description handles updating the various reference data
   * @public
   */
  updateLocalReferenceData() {
    console.log('updating data');
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~cleanLocalReferenceData
   * @description ensures and cleans the reference_data folder of any previous data
   * @returns {Promise} resolves when complete or rejects with an error
   * @public
   */
  cleanLocalReferenceData() {
    return fs.ensureDir(localReferenceDataDir)
      .then(() => {
        return fs.emptyDir(localReferenceDataDir)
      });
  }
}

module.exports = ReferenceData;
