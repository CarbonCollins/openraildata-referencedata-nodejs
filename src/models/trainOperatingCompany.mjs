const sTrainOperatingCompany = Symbol('trainOperatingCompany');
const sTrainOperatingCompanyName = Symbol('trainOperatingCompanyName');
const sURL = Symbol('url');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.TrainOperatingCompany
 * @classdesc A train operating companies information
 */
class TrainOperatingCompany {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[sTrainOperatingCompany] = payload.trainOperatingCompany;
    this[sTrainOperatingCompanyName] = payload.trainOperatingCompanyName;
    this[sURL] = payload.url;
  }

  /**
   * @member {String} code
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company 2 letter code
   * @instance
   * @public
   */
  get code() {
    return this[sTrainOperatingCompany] || null;
  }

  /**
   * @member {String} name
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company human readable name
   * @instance
   * @public
   */
  get name() {
    return this[sTrainOperatingCompanyName] || null;
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
    return this[sURL] || null;
  }
}
