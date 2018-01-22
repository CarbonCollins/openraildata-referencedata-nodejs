'use strict';

const { Location } = require('openraildata-common');

const TrainOperatingCompany = require('./trainOperatingCompany');
const LateRunningReason = require('./lateRunningReason');
const CancellationReason = require('./cancellationReason');
const Via = require('./via');

const s_timetableID = Symbol('timetableId');
const s_location = Symbol('location');
const s_toc = Symbol('trainOperatingCompanys');
const s_lrr = Symbol('lateRunningReasons');
const s_cr = Symbol('cancelationReasons');
const s_via = Symbol('vias');

function mapArray(arr, Constructor, refData = null) {
  return (Array.isArray(arr) && Constructor)
    ? arr.map(o => new Constructor(o.$ || o || {}, refData))
    : [];
}
/**
 * a class for location information and functions
 * @external Location
 * @see {@link location.md Location}
 */

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V3RefData
 * @classdesc a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data
 */
class V3RefData {
  /**
   * @constructor
   * @param {Object} refData the raw object contaiting the v3 data
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetableRef)
      ? refData.PportTimetableRef
      : {};

    this[s_timetableID] = (payload.$ && payload.$.timetableId) ? payload.$.timetableId : null;
    this[s_location] = mapArray(payload.LocationRef, Location);
    this[s_toc] = mapArray(payload.TocRef, TrainOperatingCompany);
    this[s_lrr] = mapArray(payload.LateRunningReasons, LateRunningReason);
    this[s_cr] = mapArray(payload.CancellationReasons, CancellationReason);
    this[s_via] = mapArray(payload.Via, Via, this[s_location]);

    this._vias = [];
    this._cisSources = [];
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[s_timetableID];
  }

  /**
   * @member {Location[]} locations an array of locations
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get locations() {
    return this[s_location];
  }

  /**
   * @member {TrainOperatingCompany[]} trainOperatorCompanies an array of train operator companies
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get trainOperatorCompanies() {
    return this[s_toc];
  }

  /**
   * @member {LateRunningReason[]} lateRunningReasons an array of train late running reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get lateRunningReasons() {
    return this[s_lrr];
  }

  /**
   * @member {CancellationReason[]} cancellationReason an array of train cancellation reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get cancellationReasons() {
    return this[s_cr];
  }

  /**
   * @member {Via[]} vias an array of vias
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get vias() {
    return this[s_via];
  }


  // /**
  //  * @member {Object[]} CISSources an array of cis data
  //  * @memberof module:openraildata/referencedata#V3RefData
  //  * @instance
  //  * @readonly
  //  */
  // get CISSources() {
  //   return (this[s_payload].cisSources)
  //     ? this[s_payload].cisSources
  //     : [];
  // }

  // /**
  //  * @method module:openraildata/referencedata#V3RefData~getLocation
  //  * @desc gets a location from a search input
  //  * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
  //  * @returns {module:openraildata/common#Location} returns a Location if found or a null if not found
  //  * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location}
  //  */
  // getLocation(input) { 
  //   return this.locations.find(o => (o.tpl === input || o.locname === input || o.crs === input));
  // }


  // /**
  //  * @method V3RefData~getToc
  //  * @desc gets a rain operating company from a search input
  //  * @param {Stirng} input a string containing a search parameter for the toc code
  //  * @returns {Object} returns a train operating company
  //  */
  // getToc(input) { 
  //   const toc = this.trainOperatorCompanies.find(o => (o.toc === input));
  //   return toc;
  // }

}

module.exports = V3RefData;
