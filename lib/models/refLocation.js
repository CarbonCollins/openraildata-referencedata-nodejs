'use strict';

const refData = require('../refData');

module.exports = (SuperClass) => {
  /**
   * @class
   * @classdesc adds functions to the location model which can only be accessed if the reference data is used
   * @mixin LocationMix
   */
  return class LocationMix extends SuperClass {
    /**
     * @constructor
     * @param {Object} payload 
     */
    constructor(payload) { super(payload); }

    /**
     * @method LocationMix~updateLocation
     * @desc Updates the location wiht a new raw data
     * @param {Object} location the raw location object to be parsed
     * @override
     */
    updateLocation(location) {
      if (location) {
        const refLocation = (refData && Object.keys(location) === ['crs']) ? refData.v3.getLocation(location.crs) : null;
        const loc = (refLocation) ? refLocation : location;

        this._tpl = loc.tpl;
        this._crs = loc.crs;
        this._toc = loc.toc;
        this._locname = loc.locname;
      }
    }

  };
}
