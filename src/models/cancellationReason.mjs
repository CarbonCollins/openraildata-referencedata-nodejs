const sCode = Symbol('code');
const sReason = Symbol('reason');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.CancellationReason
 * @classdesc A cancellation reason
 */
export default class CancellationReason {
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
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a numerical indicator for itendifying which cancelation to display
   * @instance
   * @public
   */
  get code() {
    return this[sCode] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a string description of the Cancellation reason
   * @instance
   * @public
   */
  get reason() {
    return this[sReason] || null;
  }
}
