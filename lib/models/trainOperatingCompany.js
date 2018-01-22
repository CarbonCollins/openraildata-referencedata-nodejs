'use strict';

const s_toc = Symbol('trainOperatingCompanyCode');
const s_tocname = Symbol('trainOperatingCompanyName');
const s_url = Symbol('url');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.TrainOperatingCompany
 * @classdesc A train operating companys information
 */
class TrainOperatingCompany {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[s_toc] = payload.toc;
    this[s_tocname] = payload.tocname;
    this[s_url] = payload.url;
  }

  /**
   * @member {String} code
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company 2 letter code
   * @instance
   * @public
   */
  get code() {
    return this[s_toc] || null;
  }

  /**
   * @member {String} name
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating company human readable name
   * @instance
   * @public
   */
  get name() {
    return this[s_tocname] || null;
  }

  /**
   * @member {String} url
   * @memberof module:openraildata/referencedata.TrainOperatingCompany
   * @description the train operating companys information page which contains extra information
   * including: phone numbers, fax, addresses, emails, network maps ect (Might make a parser for
   * this in the future... If you want it then raise a feature request for it :)
   * @instance
   * @public
   */
  get url() {
    return this[s_url] || null;
  }
}

module.exports = TrainOperatingCompany;
