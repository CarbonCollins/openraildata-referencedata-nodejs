
let referenceData = null; // placeholder

export function injectReferenceDataToStation(refData) {
  referenceData = refData;
}

function checkInjection(refData) {
  if (!refData || typeof refData !== 'object') {
    throw new Error('ReferenceData has not been injected, please run `injectReferenceDataToStation` first.');
  }
  return true;
}

export function refStationMixin(SuperClass, symbols) {
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
      return (checkInjection(referenceData) && this[symbols.get('tiploc')])
        ? referenceData.v3.getLocation(this[symbols.get('tiploc')]).locationName
        : null;
    }
  };
}
