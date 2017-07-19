'use strict';

const refData = require('../refData');

module.exports = (SuperClass) => {
  /**
   * @class
   * @classdesc adds functions to the association model which can only be accessed if the reference data is used
   * @mixin AssociationMix
   */
  return class AssociationMix extends SuperClass {
    /**
     * @constructor
     * @param {Object} payload 
     */
    constructor(payload) { super(payload); }

    /** 
     * @desc gets the main trains schedule (if ref data is used)
     * @returns {Schedule|null} the main trains Schedule object or a null if ref data is not used
     * @readonly
     */
    get mainTrainSchedule() { 
      return (this._payload) ? refData.v8.getSchedule(this._payload.main.rid) : null;
    }

    /** 
     * @desc gets the assoc trains schedule
     * @returns {Schedule|null} the assoc trains Schedule object or null if ref data is not used
     * @readonly
     */
    get assocTrainSchedule() { 
      return (this._payload) ? refData.v8.getSchedule(this._payload.assoc.rid) : null;
    }

    /**
     * @method AssociationMix~getLocation
     * @desc gets the location name of the where the association happens
     * @returns {String|null} the location name of the association or null if ref data is not used
     */
    getLocation() { 
      return (this._payload) ? refData.v3.getLocation(this.tiploc) : null;
    }
  };
}
