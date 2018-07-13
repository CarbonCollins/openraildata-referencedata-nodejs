export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('reason', Symbol('reason'));

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.LateRunningReason
 * @classdesc A late running reason
 */
export class LateRunningReason {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[symbols.get('code')] = Number(payload.code);
    this[symbols.get('reason')] = payload.reason || null;
  }

  /**
   * @member {Number} code
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a numerical indicator for itendifying which error to display
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a string description of the late running reason
   * @instance
   * @public
   */
  get reason() {
    return this[symbols.get('reason')] || null;
  }
}
