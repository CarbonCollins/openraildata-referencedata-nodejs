export const symbols = new Map()
  .set('at', Symbol('at'))
  .set('destination', Symbol('destination'))
  .set('location1', Symbol('location1'))
  .set('location2', Symbol('location2'))
  .set('text', Symbol('text'));

/**
 * @method findLocation
 * @description find a specific location and returns its Location object from an array of locations
 * @param {String} name the search term to find
 * @param {Location[]} locationArr the array of locations to search in
 * @returns {?Location} returns with the location object
 * @private
 */
function findLocation(name, locationArr) {
  return locationArr.find(l => {
    return l.computerReservationSystem === name || l.locationName === name || l.tiploc === name
  });
}

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.Via
 * @classdesc A cancellation reason
 */
export class Via {
  /**
   * @constructor
   * @param {Object} payload the raw json object from the ftp containing the toc information
   * @param {Object[]} locations an array of locations in which to map into the via class
   */
  constructor(payload = {}, locations = []) {
    this[symbols.get('at')] = findLocation(payload.at, locations) || payload.at;
    this[symbols.get('destination')] = findLocation(payload.destination, locations) || payload.destination;
    this[symbols.get('location1')] = findLocation(payload.location1, locations) || payload.location1;
    this[symbols.get('location2')] = findLocation(payload.location2, locations) || payload.location2;
    this[symbols.get('text')] = payload.viatext;
  }

  /**
   * @member {String} at
   * @memberof module:openraildata/referencedata.Via
   * @description at which point this via is in effect
   * @instance
   * @public
   */
  get at() {
    return this[symbols.get('at')] || null;
  }

  /**
   * @member {String} destination
   * @memberof module:openraildata/referencedata.Via
   * @description at which point this via is no longer in effect
   * @instance
   * @public
   */
  get destination() {
    return this[symbols.get('destination')] || null;
  }

  /**
   * @member {String} location1
   * @memberof module:openraildata/referencedata.Via
   * @description the location for the via text
   * @instance
   * @public
   */
  get location1() {
    return this[symbols.get('location1')] || null;
  }

  /**
   * @member {String} location2
   * @memberof module:openraildata/referencedata.Via
   * @description a secondary location for the via text
   * @instance
   * @public
   */
  get location2() {
    return this[symbols.get('location2')] || null;
  }

  /**
   * @member {String} text
   * @memberof module:openraildata/referencedata.Via
   * @description a human readable via text to be displayed 
   * @instance
   * @public
   */
  get text() {
    return this[symbols.get('text')] || null;
  }
}
