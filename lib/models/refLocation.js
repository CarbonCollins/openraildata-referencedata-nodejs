'use strict';

const refData = require('../refData');

/**
 * The built in string object.
 * @external Location
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location|Location}
 */

module.exports = (SuperClass) => {
  /**
   * @class
   * @classdesc adds functions to the location model which can only be accessed if the reference data is used
   * @memberof module:openraildata/referencedata
   * @augments module:openraildata/referencedata.Location
   * @extends module:openraildata/common.Location
   * @mixin LocationMix
   */
  return class LocationMix extends SuperClass {
    /**
     * @constructor
     * @param {Object} payload 
     */
    constructor(payload) { super(payload); }

    /**
     * @method module:openraildata/referencedata.Location~updateLocation
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
