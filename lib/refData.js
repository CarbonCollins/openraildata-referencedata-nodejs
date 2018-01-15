import { EventEmitter } from 'events';

'use strict';

const path = require('path');
const FTPClient = require('ftp');
const fs = require('fs-extra');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.ReferenceData
 * @event module:openraildata/referencedata.ReferenceData#connected fired when connected to FTP server
 * @event module:openraildata/referencedata.ReferenceData#error fired when there is an error
 */
class ReferenceData extends EventEmitter {
  /**
   * @constructor
   * @param {Object} options optional data to configure the reference data with
   */
  constructor(options = {}) {
    super();
    this.ftpClient = new FTPClient();
    this.ftpConnected = false;

    this.updateInterval;
    this.updateDelay = Number(options.updateDelay) || 900000 // 15 mins

    this.reconnectInterval;
    this.reconnectDelay = 500;
    this.keepAlive = (typeof options.keepAlive === 'boolean') ? options.keepAlive : true;

    this.options = options;
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~ftpClose
   * @description called when the FTP client closes or ends the connection which allows for the
   * class to determine if it should reconnect or close the connection entirely 
   * @private
   */
  ftpClose() {
    this.ftpConnected = false;
    if (this.keepAlive === true) {
      this.reconnectDelay = (this.reconnectInterval === null)
        ? Math.min(this.reconnectDelay * 2, 300000) // double next reconnect time to a max of 5 mins (300,000)
        : this.reconnectDelay;
      this.reconnect();
    } else {
      clearInterval(this.updateInterval);
    }
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~connect
   * @description connects to the openrail data FTP server
   * @fires module:openraildata/referencedata.ReferenceData#connected
   * @fires module:openraildata/referencedata.ReferenceData#error
   * @public
   */
  connect() {
    if (this.ftpConnected === false) {
      if (this.ftpClient.listenerCount('ready') === 0) {
        this.ftpClient
          .on('error', ((err) => {
            this.emit('error', { type: 'FTPClient', error: err });
          }).bind(this))
          .on('ready', (() => {
            this.ftpConnected = true;

            clearTimeout(this.reconnectInterval);
            this.reconnectDelay = 1000;

            this.updateInterval = setInterval((() => {
              console.log('need to write data updater')
            }).bind(this), this.options.interval);

            this.emit('connected', { options: this.options });
          }).bind(this))
          .on('close', this.ftpClose.bind(this))
          .on('end', this.ftpClose.bind(this));
      }

      this.ftpClient.connect(this.options);
    } else {
      this.emit('connected', { options: this.options });
    }
  }

  /**
   * @method module:openraildata/referencedata.ReferenceData~reconnect
   * @description attempts to reconnect to the ftp server
   * @public
   */
  reconnect() {
    if (this.reconnectInterval === undefined) {
      console.log(`reconnecting after ${(this.reconnectDelay / 1000).toFixed(0)} seconds...`)
      this.updateInterval = setTimeout((() => {
        console.log('need to write data updater')
      }).bind(this), this.reconnectDelay);
    } else {
      console.log('Already waiting to reconnect');
    }
  }
}

module.exports = ReferenceData;
