export const symbols = new Map()
  .set('code', Symbol('code'))
  .set('reason', Symbol('reason'));

/**
 * @description A data model for a cancellation reason. This stores a `code` to identify the type of
 * cancellation as well as a test `reason` for the cancellation.
 * @memberof module:openrailuk/referencedata
 * @author Steven Collins <steven@carboncollins.uk>
 * @export CancellationReason
 * @class CancellationReason
 */
export class CancellationReason {
  /**
   * Creates an instance of CancellationReason.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {module:openrailuk/referencedata.CancellationReason|Object} [payload={}] an object containing the `code` and `reason`.
   */
  constructor(payload = {}) {
    this[symbols.get('code')] = Number(payload.code);
    this[symbols.get('reason')] = payload.reason || null;
  }

  /**
   * @member {Number} code A code number for identifying this cancellation reason
   * @memberof module:openrailuk/referencedata.CancellationReason
   * @readonly
   * @instance
   * @public
   */
  get code() {
    return this[symbols.get('code')] || null;
  }

  /**
   * @member {String} reason A string description of the cancellation reason
   * @memberof module:openrailuk/referencedata.CancellationReason
   * @readonly
   * @instance
   * @public
   */
  get reason() {
    return this[symbols.get('reason')] || null;
  }
}
