'use strict';

const s_code = Symbol('code');
const s_reason = Symbol('reason');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.LateRunningReason
 * @classdesc A late running reason
 */
class LateRunningReason {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */
  constructor(payload = {}) {
    this[s_code] = Number(payload.code);
    this[s_reason] = payload.reasontext || null;
  }

  /**
   * @member {Number} code
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a numerical indicator for itendifying which error to display
   * @instance
   * @public
   */
  get code() {
    return this[s_code] || null;
  }

  /**
   * @member {String} reason
   * @memberof module:openraildata/referencedata.LateRunningReason
   * @description a string description of the late running reason
   * @instance
   * @public
   */
  get reason() {
    return this[s_reason] || null;
  }
}

module.exports = LateRunningReason;
