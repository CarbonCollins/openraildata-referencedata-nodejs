'use strict';

const { Location } = require('openraildata-common');

const TOC = require('./toc');

const s_payload = Symbol('payload');

const s_timetableID = Symbol('timetableId');
const s_location = Symbol('location');
const s_toc = Symbol('trainOperatingCompanys');


function mapArray(arr, Constructor) {
  return (Array.isArray(arr) && Constructor)
    ? arr.map(o => new Constructor(o.$ || o || {}))
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
    this[s_toc] = mapArray(payload.TocRef, TOC);

    this.lateRunningReasons = [];
    this._cancellationReasons = [];
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
   * @member {Object[]} locations an array of locations
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get locations() {
    return this[s_location];
  }

  /**
   * @member {Object[]} trainOperatorCompanies an array of train operator companies
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get trainOperatorCompanies() {
    return this[s_toc];
  }

  // /**
  //  * @member {Object[]} lateRunningReasons an array of late running reasons
  //  * @memberof module:openraildata/referencedata#V3RefData
  //  * @instance
  //  * @readonly
  //  */
  // get lateRunningReasons() {
  //   return (this[s_payload].lateRunningReasons)
  //     ? this[s_payload].lateRunningReasons
  //     : [];
  // }

  // /**
  //  * @member {Object[]} cancellationReasons gets the cancelation reasons reference data
  //  * @memberof module:openraildata/referencedata#V3RefData
  //  * @instance
  //  * @readonly
  //  */
  // get cancellationReasons() {
  //   return (this[s_payload].cancellationReasons)
  //     ? this[s_payload].cancellationReasons
  //     : [];
  // }

  // /**
  //  * @member {Object[]} vias an array of vias
  //  * @memberof module:openraildata/referencedata#V3RefData
  //  * @instance
  //  * @readonly
  //  */
  // get vias() {
  //   return (this[s_payload].vias)
  //     ? this[s_payload].vias
  //     : [];
  // }

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
