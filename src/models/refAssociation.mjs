// import { referenceData } from '../referenceData';

let referenceData = null; // placeholder

export function injectReferenceDataToAssociation(refData) {
  referenceData = refData;
}

function checkInjection(refData) {
  if (!refData || typeof refData !== 'object') {
    throw new Error('ReferenceData has not been injected, please run `injectReferenceDataToAssociation` first.');
  }
  return true;
}

/**
 * @external openraildata/common
 * @description openraildata/common module
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common|openraildata/common Docs}
 */

/**
 * @external Association
 * @description a class within the openrailuk/common module
 * @memberof external:openraildata/common
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common|openraildata/common Docs}
 */

export function refAssociationMixin(SuperClass, symbols) {
  /**
   * @class
   * @classdesc adds functions to the association model which can only be accessed if the reference data is used
   * @mixin AssociationMix
   * @extends external:Association
   */
  return class Association extends SuperClass {
    /** 
     * @desc gets the main trains schedule (if ref data is used)
     * @returns {Schedule|null} the main trains Schedule object or a null if ref data is not used
     * @readonly
     */
    get mainTrainSchedule() {
      return (checkInjection(referenceData) && this[symbols.get('main')])
        ? referenceData.v8.getSchedule(this[symbols.get('main')].rid)
        : null;
    }

    /** 
     * @desc gets the association trains schedule
     * @returns {Schedule|null} the association trains Schedule object or null if ref data is not used
     * @readonly
     */
    get associationTrainSchedule() { 
      return (checkInjection(referenceData) && this[symbols.get('association')])
        ? referenceData.v8.getSchedule(this[symbols.get('association')].rid)
        : null;
    }

    /**
     * @method AssociationMix~getLocation
     * @desc gets the location name of the where the association happens
     * @returns {String|null} the location name of the association or null if ref data is not used
     */
    getLocation() { 
      return (checkInjection(referenceData) && this[symbols.get('tiploc')])
        ? referenceData.v3.getLocation(this[symbols.get('tiploc')])
        : null;
    }
  };
}
