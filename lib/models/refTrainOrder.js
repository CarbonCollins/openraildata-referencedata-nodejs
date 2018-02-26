'use strict';

const refData = require('../refData');

module.exports = (SuperClass, symbols) => {
  /**
   * @class
   * @classdesc adds functions to the TrainOrder model which can only be accessed if the reference data is used
   * @mixin TrainOrderMix
   */
  return class TrainOrderMix extends SuperClass {
    /**
     * @desc gets the stations name from the reference data
     * @returns {String} the location name
     * @readonly
     */
    get name() { 
      return refData.v3.getLocation(this[symbols.s_tpl]).locationName;
    }

  };
}
