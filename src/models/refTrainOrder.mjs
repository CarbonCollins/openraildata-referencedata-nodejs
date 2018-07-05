
let referenceData = null; // placeholder

export function injectReferenceDataToTrainOrder(refData) {
  referenceData = refData;
}

function checkInjection(refData) {
  if (!refData || typeof refData !== 'object') {
    throw new Error('ReferenceData has not been injected, please run `injectReferenceDataToTrainOrder` first.');
  }
  return true;
}

export function refTrainOrderMixin(SuperClass, symbols) {
  /**
   * @class
   * @classdesc adds functions to the TrainOrder model which can only be accessed if the reference data is used
   * @mixin TrainOrderMix
   */
  return class TrainOrder extends SuperClass {
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
