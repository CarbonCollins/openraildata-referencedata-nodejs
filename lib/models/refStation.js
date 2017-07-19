'use strict';

const refData = require('../refData');

module.exports = (SuperClass) => {
  return class StationMix extends SuperClass {
    constructor(payload) { super(payload); this._tester = ''; }
    /**
     * @desc gets the stations name from the reference data
     * @returns {String} the location name
     * @readonly
     */
    get name() {
      return refData.v3.getLocation(this._tiploc).locname;
    }
  };
}
