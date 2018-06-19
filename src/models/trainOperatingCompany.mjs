export const symbols = new Map()
  .set('trainOperatingCompany', Symbol('train operating company'))
  .set('trainOperatingCompanyName', Symbol('train operating company name'))
  .set('url', Symbol('url'));

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.TrainOperatingCompany
 * @classdesc A train operating companies information
 */
export class TrainOperatingCompany {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[symbols.get('trainOperatingCompany')] = payload.trainOperatingCompany;
    this[symbols.get('trainOperatingCompanyName')] = payload.trainOperatingCompanyName;
    this[symbols.get('url')] = payload.url;
  }

  /**
   * @member {String} code
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company 2 letter code
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('trainOperatingCompany')] || null;
  }

  /**
   * @member {String} name
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company human readable name
   * @instance
   * @public
   */
  get name() {
    return this[symbols.get('trainOperatingCompanyName')] || null;
  }

  /**
   * @member {String} url
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating companies information page which contains extra information
   * including: phone numbers, fax, addresses, emails, network maps ect (Might make a parser for
   * this in the future... If you want it then raise a feature request for it :)
   * @instance
   * @public
   */
  get url() {
    return this[symbols.get('url')] || null;
  }
}
