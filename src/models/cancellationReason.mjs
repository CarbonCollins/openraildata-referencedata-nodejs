export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('reason', Symbol('reason'));

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.CancellationReason
 * @classdesc A cancellation reason
 */
export class CancellationReason {
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
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a numerical indicator for itendifying which cancelation to display
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a string description of the Cancellation reason
   * @instance
   * @public
   */
  get reason() {
    return this[symbols.get('reason')] || null;
  }
}
