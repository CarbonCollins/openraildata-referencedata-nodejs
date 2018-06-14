import { Location, Via } from '@openraildata/common';

import TrainOperatingCompany from './trainOperatingCompany';
import LateRunningReason from './lateRunningReason';
import CancellationReason from './cancellationReason';
import CustomerInformationSystem from './customerInformationSystem';

const sTimetableId = Symbol('timetableId');
const sLocations = Symbol('location');
const sTrainOperatingCompanies = Symbol('trainOperatingCompanies');
const sLateRunningReasons = Symbol('lateRunningReasons');
const sCancellationReasons = Symbol('cancellationReasons');
const sVias = Symbol('vias');
const sCustomerInformationSystemSources = Symbol('customerInformationSystemSources');

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
    ? arr
      .map((o) => {
        return new Constructor(o.$ || o || {}, refData);
      })
    : [];
}

/**
 * @method locationIncluded
 * @description checks to see if a search input is included within a locations tiploc, locationName
 * and computerReservationSystem
 * @param {String} input the strig to search with
 * @param {external:openraildata/common#Location} loc a location to search in
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
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V3RefData
 * @classdesc a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data
 */
export default class V3RefData {
  /**
   * @constructor
   * @param {Object} refData the raw object contaiting the v3 data
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetableRef)
      ? refData.PportTimetableRef
      : {};

    this[sTimetableId] = (payload.$ && payload.$.timetableId) ? payload.$.timetableId : null;
    this[sLocations] = mapArray(payload.LocationRef, Location);
    this[sTrainOperatingCompanies] = mapArray(payload.TocRef, TrainOperatingCompany);
    this[sLateRunningReasons] = mapArray(payload.LateRunningReasons, LateRunningReason);
    this[sCancellationReasons] = mapArray(payload.CancellationReasons, CancellationReason);
    this[sVias] = mapArray(payload.Via, Via, this[sLocations]);
    this[sCustomerInformationSystemSources] = mapArray(payload.CISSource, CustomerInformationSystem);
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[sTimetableId];
  }

  /**
   * @member {module:openraildata/referencedata.Location[]} locations an array of locations
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get locations() {
    return this[sLocations];
  }

  /**
   * @member {module:openraildata/referencedata.TrainOperatingCompany[]} trainOperatorCompanies an array of train operator companies
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get trainOperatorCompanies() {
    return this[sTrainOperatingCompanies];
  }

  /**
   * @member {module:openraildata/referencedata.LateRunningReason[]} lateRunningReasons an array of train late running reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get lateRunningReasons() {
    return this[sLateRunningReasons];
  }

  /**
   * @member {module:openraildata/referencedata.CancellationReason[]} cancellationReason an array of train cancellation reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get cancellationReasons() {
    return this[sCancellationReasons];
  }

  /**
   * @member {module:openraildata/referencedata.Via[]} vias an array of vias
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get vias() {
    return this[sVias];
  }

  /**
   * @member {module:openraildata/referencedata.CustomerInformationSystem[]} CustomerInformationSystemSources an array of CISSources
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get CustomerInformationSystemSources() {
    return this[sCustomerInformationSystemSources];
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLocation
   * @desc finds a location from a search input
   * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
   * @returns {?module:openraildata/referencedata.Location} returns a Location if found or a null if not found
   * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location}
   */
  findLocation(input) { 
    return this[sLocations]
      .find((o) => {
        return (o.tiploc === `${input}` || o.locationName === `${input}` || o.computerReservationSystem === `${input}`);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findTrainOperatingCompany
   * @desc finds a rain operating company from a search input
   * @param {Stirng} input a string containing a search parameter for the train operating company code
   * @returns {?module:openraildata/referencedata.TrainOperatingCompany} returns a train operating company
   */
  findTrainOperatingCompany(input) {
    return this[sTrainOperatingCompanies]
      .find((o) => {
        return (o.code === `${input}`);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLateRunningReason
   * @desc finds a late running reason from a search input
   * @param {Stirng} input a string containing a search parameter for the late running reason code
   * @returns {?module:openraildata/referencedata.LateRunningReason} returns a late operating reason
   */
  findLateRunningReason(input) {
    return this[sLateRunningReasons]
      .find((o) => {
        return (o.code === `${input}`);
      });
  }

  /**
   * @method module:openraildata/referencedata#V3RefData~findCancellationReason
   * @desc finds a cancellation reason from a search input
   * @param {Stirng} input a string containing a search parameter for the cancellation reason code
   * @returns {?module:openraildata/referencedata.CancellationReason} returns a cancellation reason
   */
  findCancellationReason(input) {
    return this[sCancellationReasons]
      .find((o) => {
        return (o.code === `${input}`);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findVias
   * @desc finds a via from a search input. you can supply a single input for a list of vias
   * associated with that location, or supply 2-3 inputs to find a specific one
   * @param {...Stirng} input a string containing a search parameter for the via location name,
   * tiploc, or crs
   * @returns {module:openraildata/referencedata.Via[]} returns a cancellation reason
   */
  findVias(...input) {
    return this[sVias]
      .slice(0)
      .filter((v) => {
        return locationIncludedInVia(input, v.at);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findCustomerInformationSystem
   * @desc finds a customer information system
   * @param {Stirng} input a string containing a search parameter for the customer information system code
   * @returns {?module:openraildata/referencedata.CustomerInformationSystem} returns a Customer Information System
   */
  findCustomerInformationSystem(input) {
    return this[sCustomerInformationSystemSources]
      .find((o) => {
        return (o.code === `${input}`);
      });
  }
}
