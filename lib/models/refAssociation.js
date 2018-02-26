'use strict';

const refData = require('../refData');

/**
 * @external openraildata/common
 * @description openraildata/common module
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common|openraildata/common Docs}
 */

/**
 * @external Association
 * @description a class within the openraildata/common module
 * @memberof external:openraildata/common
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common|openraildata/common Docs}
 */

module.exports = (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the association model which can only be accessed if the reference data is used
   * @mixin AssociationMix
   * @extends external:Association
   */
   return class AssociationMix extends SuperClass {
    /** 
     * @desc gets the main trains schedule (if ref data is used)
     * @returns {Schedule|null} the main trains Schedule object or a null if ref data is not used
     * @readonly
     */
    get mainTrainSchedule() { 
      return (this[symbols.s_main]) ? refData.v8.getSchedule(this[symbols.s_main].rid) : null;
    }

    /** 
     * @desc gets the assoc trains schedule
     * @returns {Schedule|null} the assoc trains Schedule object or null if ref data is not used
     * @readonly
     */
    get assocTrainSchedule() { 
      return (this[symbols.s_association]) ? refData.v8.getSchedule(this[symbols.s_association].rid) : null;
    }

    /**
     * @method AssociationMix~getLocation
     * @desc gets the location name of the where the association happens
     * @returns {String|null} the location name of the association or null if ref data is not used
     */
    getLocation() { 
      return (this[symbols.s_tiploc]) ? refData.v3.getLocation(this[symbols.s_tiploc]) : null;
    }
  };
}
