import referenceData from '../refData';

export default (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the station model which can only be accessed if the reference data is used
   * @mixin StationMix
   */
  return class StationMix extends SuperClass {
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
