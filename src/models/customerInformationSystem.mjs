export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('name', Symbol('name'));

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.CustomerInformationSystem
 * @classdesc A customer information system source (CIS)
 */
export class CustomerInformationSystem {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the cis information
   */
  constructor(payload = {}) {
    this[symbols.get('code')] = payload.code;
    this[symbols.get('name')] = payload.name;
  }

  /**
   * @member {String} code
   * @memberof module:openraildata/referencedata.CustomerInformationSystem
   * @description the cis code (normaly 2 letters and 2 numbers)
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} name
   * @memberof module:openraildata/referencedata.CustomerInformationSystem
   * @description the human readable name of the cis source
   * @instance
   * @public
   */
  get name() {
    return this[symbols.get('name')] || null;
  }
}
