import { referenceData } from '../referenceData';

export default (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the station model which can only be accessed if the reference data is used
   * @mixin StationMix
   */
  return class Station extends SuperClass {
    /**
     * @desc gets the stations name from the reference data
     * @returns {String} the location name
     * @readonly
     */
    get name() {
      return referenceData.v3.getLocation(this[symbols.get('tiploc')]).locationName;
    }
  };
}
