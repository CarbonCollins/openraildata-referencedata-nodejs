export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('name', Symbol('name'));

/**
 * @description A data model for a customer information system sources. This stores a `code` used
 * to identify a cis source and a `name` in human readable format
 * @memberof module:openrailuk/referencedata
 * @author Steven Collins <steven@carboncollins.uk>
 * @export CustomerInformationSystem
 * @class CustomerInformationSystem
 */
export class CustomerInformationSystem {
  /**
   * Creates an instance of CustomerInformationSystem.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {module:openrailuk/referencedata.CustomerInformationSystem|Object} [payload={}] an object contianing the code and name.
   */
  constructor(payload = {}) {
    this[symbols.get('code')] = payload.code;
    this[symbols.get('name')] = payload.name;
  }

  /**
   * @member {String} code the cis code (normaly 2 letters and 2 numbers)
   * @memberof module:openrailuk/referencedata.CustomerInformationSystem
   * @readonly
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} name the human readable name of the cis source
   * @memberof module:openrailuk/referencedata.CustomerInformationSystem
   * @readonly
   * @instance
   * @public
   */
  get name() {
    return this[symbols.get('name')] || null;
  }
}
