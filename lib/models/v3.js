'use strict';

const { Location } = require('openraildata-common');

const TrainOperatingCompany = require('./trainOperatingCompany');
const LateRunningReason = require('./lateRunningReason');
const CancellationReason = require('./cancellationReason');
const Via = require('./via');
const CustomerInformationSystem = require('./customerInformationSystem');

const s_timetableID = Symbol('timetableId');
const s_location = Symbol('location');
const s_toc = Symbol('trainOperatingCompanys');
const s_lrr = Symbol('lateRunningReasons');
const s_cr = Symbol('cancelationReasons');
const s_via = Symbol('vias');
const s_ciss = Symbol('customerInformationSystemSources');

/**
 * @method mapArray
 * @description maps an array of JS objects into a class using its `constructor` 
 * @param {Object[]} arr an array of JS objects to be constructed
 * @param {Function} Constructor the constructor to use on the JS object
 * @param {*} refData any extra information that needs to be supplied to the constructor
 * @returns {Object[]} an array of constructed objects
 * @private
 */
function mapArray(arr, Constructor, refData = null) {
  return (Array.isArray(arr) && Constructor)
    ? arr.map(o => new Constructor(o.$ || o || {}, refData))
    : [];
}

/**
 * @method locationIncluded
 * @description checks to see if a search input is included within a locations tiploc, locationName
 * and computerReservationSystem
 * @param {String} input the strig to search with
 * @param {module:openraildata/common#Location} loc a location to search in
 * @returns {Boolean} returns true if the input matches within the location
 * @private
 */
function locationIncluded(input, loc) {
  return (input.includes(loc.tiploc) || input.includes(loc.locationName)
    || input.includes(loc.computerReservationSystem));
}

/**
 * @method locationIncludedInVia
 * @description runs a search in all types of location within a via to see if a search input
 * is matched in any of the 4 location types.
 * @param {String} input the string to search with
 * @param {Via} via a via to search in
 * @returns {Boolean} returns true if the input matches within the location
 * @private
 */
function locationIncludedInVia(input, via) {
  return (locationIncluded(input, via.at) || locationIncluded(input, via.destination)
    || locationIncluded(input, via.location1) || locationIncluded(input, via.location2));
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
    this[s_ciss] = mapArray(payload.CISSource, CustomerInformationSystem);
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

  /**
   * @member {CustomerInformationSystem[]} CustomerInformationSystemSources an array of CISSources
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get CustomerInformationSystemSources() {
    return this[s_ciss];
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLocation
   * @desc finds a location from a search input
   * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
   * @returns {?module:openraildata/common.Location} returns a Location if found or a null if not found
   * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location}
   */
  findLocation(input) { 
    return this[s_location].find(o => (o.tiploc === `${input}` || o.locationName === `${input}` || o.computerReservationSystem === `${input}`));
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findTrainOperatorCompany
   * @desc finds a rain operating company from a search input
   * @param {Stirng} input a string containing a search parameter for the train operating company code
   * @returns {?TrainOperatorCompany} returns a train operating company
   */
  findTrainOperatorCompany(input) {
    return this[s_toc].find(o => (o.code === `${input}`));
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLateRunningReason
   * @desc finds a late running reason from a search input
   * @param {Stirng} input a string containing a search parameter for the late running reason code
   * @returns {?LateRunningReason} returns a late operating reason
   */
  findLateRunningReason(input) {
    return this[s_lrr].find(o => (o.code === `${input}`));
  }

  /**
   * @method module:openraildata/referencedata#V3RefData~findCancellationReason
   * @desc finds a cancelation reason from a search input
   * @param {Stirng} input a string containing a search parameter for the cancellation reason code
   * @returns {?CancellationReason} returns a cancellation reason
   */
  findCancellationReason(input) {
    return this[s_cr].find(o => (o.code === `${input}`));
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findVias
   * @desc finds a via from a search input. you can supply a single input for a list of vias
   * associated with that location, or supply 2-3 inputs to find a specific one
   * @param {...Stirng} input a string containing a search parameter for the via location name,
   * tiploc, or crs
   * @returns {Via[]} returns a cancellation reason
   */
  findVias(...input) {
    return this[s_via]
      .slice(0)
      .filter((v) => {
        return locationIncludedInVia(input, v.at);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findCustomerInformationSystem
   * @desc finds a customer information system
   * @param {Stirng} input a string containing a search parameter for the customer information system code
   * @returns {?CustomerInformationSystem} returns a Customer Information System
   */
  findCustomerInformationSystem(input) {
    return this[s_ciss].find(o => (o.code === `${input}`));
  }
}

module.exports = V3RefData;
