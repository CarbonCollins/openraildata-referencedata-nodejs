import { referenceData } from '../referenceData';

/**
 * The built in string object.
 * @external Location
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location|Location}
 */

export default (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the location model which can only be accessed if the reference data is used
   * @memberof module:openraildata/referencedata
   * @augments module:openraildata/referencedata.Location
   * @extends external:openraildata/common.Location
   * @mixin LocationMix
   */
  return class Location extends SuperClass {
    /**
     * @method module:openraildata/referencedata.Location~updateLocation
     * @desc Updates the location with a new raw data
     * @param {Object} location the raw location object to be parsed
     * @override
     */
    updateLocation(location) {
      if (location) {
        const refLocation = (referenceData && Object.keys(location).includes('computerReservationSystem'))
          ? referenceData.v3.getLocation(location.computerReservationSystem)
          : null;

        const loc = (refLocation) ? refLocation : location;

        this[symbols.get('tiploc')] = loc.tiploc;
        this[symbols.get('computerReservationSystem')] = loc.computerReservationSystem;
        this[symbols.get('trainOperatingCompany')] = loc.trainOperatingCompany;
        this[symbols.get('locationName')] = loc.locationName;
      }
    }
  };
}
