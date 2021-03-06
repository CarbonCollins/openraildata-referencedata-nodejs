import { Location, Via } from '@openrailuk/common';

import { TrainOperatingCompany } from './trainOperatingCompany';
import { LateRunningReason } from './lateRunningReason';
import { CancellationReason } from './cancellationReason';
import { CustomerInformationSystem } from './customerInformationSystem';

export const symbols = new Map()
  .set('timetableId', Symbol('timetable id'))
  .set('locations', Symbol('locations'))
  .set('trainOperatingCompanies', Symbol('train operating companies'))
  .set('lateRunningReasons', Symbol('late running reasons'))
  .set('cancellationReasons', Symbol('cancellation reasons'))
  .set('vias', Symbol('vias'))
  .set('customerInformationSystemSources', Symbol('customer information system sources'));

const rawV3Map = new Map()
  .set('tiploc', 'tpl')
  .set('locationName', 'locname')
  .set('computerReservationSystem', 'crs')
  .set('reason', 'reasontext')
  .set('destination', 'dest')
  .set('location1', 'loc1')
  .set('location2', 'loc2')
  .set('text', 'viatext')
  .set('trainOperatingCompany', 'toc')
  .set('trainOperatingCompanyName', 'tocname');

const rawV3Handler = {
  get: (obj, prop) => {
    return (rawV3Map.has(prop))
      ? obj[rawV3Map.get(prop)] || obj[prop]
      : obj[prop];
  }
}

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
        return new Constructor(new Proxy(o.$ || o || {}, rawV3Handler), refData);
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
function locationIncluded(input, loc = {}) {
  return ((loc.tiploc && input === loc.tiploc)
    || (loc.locationName && input === loc.locationName)
    || (loc.computerReservationSystem && input === loc.computerReservationSystem));
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
function locationIncludedInVia(input, via = {}) {
  return ((via.at && locationIncluded(input, via.at))
    || (via.destination && locationIncluded(input, via.destination))
    || (via.location1 && locationIncluded(input, via.location1))
    || (via.location2 && locationIncluded(input, via.location2)));
}

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V3RefData
 * @classdesc a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data
 */
export class V3 {
  /**
   * @constructor
   * @param {Object} refData the raw object contaiting the v3 data
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetableRef)
      ? refData.PportTimetableRef
      : {};

    this[symbols.get('timetableId')] = (payload.$ && payload.$.timetableId) ? payload.$.timetableId : null;
    this[symbols.get('locations')] = mapArray(payload.LocationRef, Location);
    this[symbols.get('trainOperatingCompanies')] = mapArray(payload.TocRef, TrainOperatingCompany);
    this[symbols.get('lateRunningReasons')] = mapArray(payload.LateRunningReasons, LateRunningReason);
    this[symbols.get('cancellationReasons')] = mapArray(payload.CancellationReasons, CancellationReason);
    this[symbols.get('vias')] = mapArray(payload.Via, Via, this[symbols.get('locations')]);
    this[symbols.get('customerInformationSystemSources')] = mapArray(payload.CISSource, CustomerInformationSystem);
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[symbols.get('timetableId')];
  }

  /**
   * @member {module:openraildata/referencedata.Location[]} locations an array of locations
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get locations() {
    return this[symbols.get('locations')];
  }

  /**
   * @member {module:openraildata/referencedata.trainOperatingCompanies[]} trainOperatingCompanies an array of train operator companies
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   * @readonly
   */
  get trainOperatingCompanies() {
    return this[symbols.get('trainOperatingCompanies')];
  }

  /**
   * @member {module:openraildata/referencedata.LateRunningReason[]} lateRunningReasons an array of train late running reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get lateRunningReasons() {
    return this[symbols.get('lateRunningReasons')];
  }

  /**
   * @member {module:openraildata/referencedata.CancellationReason[]} cancellationReason an array of train cancellation reasons
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get cancellationReasons() {
    return this[symbols.get('cancellationReasons')];
  }

  /**
   * @member {module:openraildata/referencedata.Via[]} vias an array of vias
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get vias() {
    return this[symbols.get('vias')];
  }

  /**
   * @member {module:openraildata/referencedata.customerInformationSystem[]} CustomerInformationSystemSources an array of CISSources
   * @memberof module:openraildata/referencedata.V3RefData
   * @instance
   */
  get customerInformationSystemSources() {
    return this[symbols.get('customerInformationSystemSources')];
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLocation
   * @desc finds a location from a search input
   * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
   * @returns {?module:openraildata/referencedata.Location} returns a Location if found or a null if not found
   * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location}
   */
  findLocation(input) {
    return (input && typeof input === typeof '' && input !== '')
      ? this[symbols.get('locations')]
        .find((o) => {
          return (o.tiploc === `${input}` || o.locationName === `${input}` || o.computerReservationSystem === `${input}`);
        })
      : null;
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findTrainOperatingCompany
   * @desc finds a rain operating company from a search input
   * @param {Stirng} input a string containing a search parameter for the train operating company code
   * @returns {?module:openraildata/referencedata.TrainOperatingCompany} returns a train operating company
   */
  findTrainOperatingCompany(input) {
    return (input && typeof input === typeof '' && input !== '')
      ? this[symbols.get('trainOperatingCompanies')]
        .find((o) => {
          return (o.code === `${input}`);
        })
      : null;
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findLateRunningReason
   * @desc finds a late running reason from a search input
   * @param {Stirng} input a string containing a search parameter for the late running reason code
   * @returns {?module:openraildata/referencedata.LateRunningReason} returns a late operating reason
   */
  findLateRunningReason(input) {
    return (input && (typeof input === typeof '' || typeof input === typeof 0) && input !== '')
      ? this[symbols.get('lateRunningReasons')]
        .find((o) => {
          return (o.code=== Number(input));
        })
      : null;
  }

  /**
   * @method module:openraildata/referencedata#V3RefData~findCancellationReason
   * @desc finds a cancellation reason from a search input
   * @param {Stirng} input a string containing a search parameter for the cancellation reason code
   * @returns {?module:openraildata/referencedata.CancellationReason} returns a cancellation reason
   */
  findCancellationReason(input) {
    return (input && (typeof input === typeof '' || typeof input === typeof 0) && input !== '')
      ? this[symbols.get('cancellationReasons')]
        .find((o) => {
          return (o.code === Number(input));
        })
      : null;
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findVias
   * @desc finds a via from a search input. you can supply a single input for a list of vias
   * associated with that location, or supply 2-3 inputs to find a specific one
   * @param {...Stirng} inputs a string containing a search parameter for the via location name,
   * tiploc, or crs
   * @returns {module:openraildata/referencedata.Via[]} returns a cancellation reason
   */
  findVias(...inputs) {
    return this[symbols.get('vias')]
      .slice(0)
      .filter((v) => {
        return inputs
          .map((input) => {
            return locationIncludedInVia(input, v);
          })
          .reduce((finalMatch, currMatch) => {
            finalMatch = finalMatch || currMatch;
            return finalMatch;
          }, false);
      });
  }

  /**
   * @method module:openraildata/referencedata.V3RefData~findCustomerInformationSystem
   * @desc finds a customer information system
   * @param {Stirng} input a string containing a search parameter for the customer information system code
   * @returns {?module:openraildata/referencedata.CustomerInformationSystem} returns a Customer Information System
   */
  findCustomerInformationSystem(input) {
    return (input && typeof input === typeof '' && input !== '')
      ? this[symbols.get('customerInformationSystemSources')]
        .find((o) => {
          return (o.code === `${input}`);
        })
      : null
  }
}
