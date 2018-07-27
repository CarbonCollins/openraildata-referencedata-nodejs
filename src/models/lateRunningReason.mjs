export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('reason', Symbol('reason'));

/**
 * @description A data model for a late running reason. This stores a `code` to identify the type of
 * late running as well as a test `reason` for the late running o the service.
 * @memberof module:openrailuk/referencedata
 * @author Steven Collins <steven@carboncollins.uk>
 * @export LateRunningReason
 * @class LateRunningReason
 */
export class LateRunningReason {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   */

  /**
   * Creates an instance of LateRunningReason.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {module:openrailuk/referencedata.LateRunningReason|Object} [payload={}] an object containing the `code` and `reason`.
   */
  constructor(payload = {}) {
    this[symbols.get('code')] = Number(payload.code);
    this[symbols.get('reason')] = payload.reason || null;
  }

  /**
   * @member {Number} code A code number for identifying this late running reason
   * @memberof module:openrailuk/referencedata.LateRunningReason
   * @readonly
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} reason A string description of the late running reason
   * @memberof module:openrailuk/referencedata.LateRunningReason
   * @readonly
   * @instance
   * @public
   */
  get reason() {
    return this[symbols.get('reason')] || null;
  }
}
