'use strict';

const s_code = Symbol('code');
const s_reason = Symbol('reason');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.CancellationReason
 * @classdesc A cancellation reason
 */
class CancellationReason {
  constructor(payload = {}) {
    this[s_code] = Number(payload.code);
    this[s_reason] = payload.reasontext || null;
  }

  /**
   * @member {Number} code
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a numerical indicator for itendifying which cancelation to display
   * @instance
   * @public
   */
  get code() {
    return this[s_code] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.CancellationReason
   * @description a string description of the Cancellation reason
   * @instance
   * @public
   */
  get reason() {
    return this[s_reason] || null;
  }
}

module.exports = CancellationReason;
