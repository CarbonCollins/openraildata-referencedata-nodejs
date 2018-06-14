const sCode = Symbol('code');
const sReason = Symbol('reason');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.LateRunningReason
 * @classdesc A late running reason
 */
export default class LateRunningReason {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[sCode] = Number(payload.code);
    this[sReason] = payload.reason || null;
  }

  /**
   * @member {Number} code
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a numerical indicator for itendifying which error to display
   * @instance
   * @public
   */
  get code() {
    return this[sCode] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a string description of the late running reason
   * @instance
   * @public
   */
  get reason() {
    return this[sReason] || null;
  }
}
