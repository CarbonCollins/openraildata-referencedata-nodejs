'use strict';

const refData = require('../refData');

/**
 * The built in string object.
 * @external Location
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location|Location}
 */

module.exports = (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the location model which can only be accessed if the reference data is used
   * @memberof module:openraildata/referencedata
   * @augments module:openraildata/referencedata.Location
   * @extends external:openraildata/common.Location
   * @mixin LocationMix
   */
  return class LocationMix extends SuperClass {
    /**
     * @method module:openraildata/referencedata.Location~updateLocation
     * @desc Updates the location wiht a new raw data
     * @param {Object} location the raw location object to be parsed
     * @override
     */
    updateLocation(location) {
      if (location) {
        const refLocation = (refData && Object.keys(location).includes('computerReservationSystem')) ? refData.v3.getLocation(location.computerReservationSystem) : null;
        const loc = (refLocation) ? refLocation : location;

        this[symbols.s_tpl] = loc.tiploc;
        this[symbols.s_crs] = loc.computerReservationSystem;
        this[symbols.s_toc] = loc.trainOperatingCompany;
        this[symbols.s_locname] = loc.locationName;
      }
    }
  };
}
