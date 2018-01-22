'use strict';

const s_at = Symbol('at');
const s_dest = Symbol('destination');
const s_loc1 = Symbol('location1');
const s_loc2 = Symbol('location2');
const s_text = Symbol('text');

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
class Via {
  constructor(payload = {}, locations = []) {
    this[s_at] = findLocation(payload.at, locations) || payload.at;
    this[s_dest] = findLocation(payload.dest, locations) || payload.dest;
    this[s_loc1] = findLocation(payload.loc1, locations) || payload.loc1;
    this[s_loc2] = findLocation(payload.loc2, locations) || payload.loc2;
    this[s_text] = payload.viatext;
  }

  /**
   * @member {String} at
   * @memberof module:openraildata/referencedata.Via
   * @description at which point this via is in effect
   * @instance
   * @public
   */
  get at() {
    return this[s_at] || null;
  }

  /**
   * @member {String} destination
   * @memberof module:openraildata/referencedata.Via
   * @description at which point this via is no longer in effect
   * @instance
   * @public
   */
  get destination() {
    return this[s_dest] || null;
  }

  /**
   * @member {String} location1
   * @memberof module:openraildata/referencedata.Via
   * @description the location for the via text
   * @instance
   * @public
   */
  get location1() {
    return this[s_loc1] || null;
  }

  /**
   * @member {String} location2
   * @memberof module:openraildata/referencedata.Via
   * @description a secondary location for the via text
   * @instance
   * @public
   */
  get location2() {
    return this[s_loc2] || null;
  }

  /**
   * @member {String} text
   * @memberof module:openraildata/referencedata.Via
   * @description a human readable via text to be displayed 
   * @instance
   * @public
   */
  get text() {
    return this[s_text] || null;
  }
}

module.exports = Via;
