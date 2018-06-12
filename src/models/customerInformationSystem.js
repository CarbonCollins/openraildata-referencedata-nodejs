'use strict';

const s_code = Symbol('code');
const s_name = Symbol('name');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.CustomerInformationSystem
 * @classdesc A customer information system source (CIS)
 */
class CustomerInformationSystem {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the cis information
   */
  constructor(payload = {}) {
    this[s_code] = payload.code;
    this[s_name] = payload.name;
  }

  /**
   * @member {String} code
   * @memberof module:openraildata/referencedata.CustomerInformationSystem
   * @description the cis code (normaly 2 letters and 2 numbers)
   * @instance
   * @public
   */
  get code() {
    return this[s_code] || null;
  }

  /**
   * @member {String} name
   * @memberof module:openraildata/referencedata.CustomerInformationSystem
   * @description the human readable name of the cis source
   * @instance
   * @public
   */
  get name() {
    return this[s_name] || null;
  }
}

module.exports = CustomerInformationSystem;
