import { Schedule, Association, Station } from '@openrailuk/common';
import ScheduleSearch from './scheduleSearch';

export const symbols = new Map()
  .set('timetableId', Symbol('timetableId'))
  .set('schedules', Symbol('schedules'))
  .set('previousSchedules', Symbol('previous schedules'))
  .set('associations', Symbol('associations'));

const rawV8Map = new Map()
  .set('uniqueId', 'uid')
  .set('serviceStartingDate', 'ssd')
  .set('trainOperatingCompany', 'toc')
  .set('origin', 'OR')
  .set('operationalOrigin', 'OPOR')
  .set('destination', 'DT')
  .set('operationalDestination', 'OPDT')
  .set('passingPoints', 'PP')
  .set('intermediatePoints', 'IP')
  .set('operationalIntermediatePoints', 'OPIP')
  .set('category', 'trainCat')
  .set('qTrain', 'qtrain')
  .set('passengerService', 'isPassengerSvc');

const rawLocationMap = new Map()
  .set('tiploc', 'tpl')
  .set('action', 'act')
  .set('platform', 'plat')
  .set('workingTimeOfArrival', 'wta')
  .set('workingTimeOfADestination', 'wtd')
  .set('plannedTimeOfArrival', 'pta')
  .set('plannedTimeOfADestination', 'ptd')
  .set('platform', 'plat');

const rawV8Handler = {
  get: (obj, prop) => {
    if (rawV8Map.has(prop)) {
      if (Array.isArray(obj[rawV8Map.get(prop)])) {
        if (['origin', 'destination', 'operationalOrigin', 'operationalDestination'].includes(prop)) {
          return new Station(new Proxy(obj[rawV8Map.get(prop)][0].$ || obj[rawV8Map.get(prop)][0], rawLocHandler));
        } else if (['passingPoints', 'intermediatePoints', 'operationalIntermediatePoints'].includes(prop)) {
          return obj[rawV8Map.get(prop)]
            .map((item) => {
              // return item.$ || item;
              return new Station(new Proxy(item.$ || item, rawLocHandler));
            });
        }
        return obj[rawV8Map.get(prop)][0].$ || obj[rawV8Map.get(prop)][0];
      }
      return obj[rawV8Map.get(prop)]
    }
    return obj[prop]
  }
}

const rawLocHandler = {
  get: (obj, prop) => {
    if (rawLocationMap.has(prop)) {
      return obj[rawLocationMap.get(prop)]
    }
    return obj[prop]
  }
}

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V8RefData
 * @classdesc A class for storing V8 reference data and for attaching usefull functions for data
 * manipulation
 */
export class V8 {
  /**
   * @constructor
   * @param {Object} refData the raw v8 ref data object
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetable)
      ? refData.PportTimetable
      : {};

    this[symbols.get('timetableId')] = (payload.$ && payload.$.timetableId)
      ? payload.$.timetableId : null;
    this[symbols.get('schedules')] = (payload.Journey)
      ? payload.Journey
        .map((journey) => {
          return new Schedule(new Proxy(journey, rawV8Handler));
        })
      : [];
    this[symbols.get('previousSchedules')] = [];
    this[symbols.get('associations')] = (payload.Association)
      ? payload.Association
        .map((assoc) => {
          return new Association(new Proxy(assoc, rawV8Handler));
        })
      : [];
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[symbols.get('timetableId')];
  }

  /**
   * @member {Schedule[]} schedules gets an array of journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get schedules() {
    return this[symbols.get('schedules')] || [];
  }

  /**
   * @member {Schedule[]} previousSchedules gets an array of previous journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get previousSchedules() {
    return this[symbols.get('previousSchedules')] || [];
  }

  /**
   * @member {Association[]} associations gets an array of associations
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get associations() {
    return this[symbols.get('associations')] || [];
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findSchedule
   * @description finds a specific schedule for a given rid, uniqueId or trainId
   * @param {Stirng} input a string containing a search parameter
   * @returns {external:openraildata/common.Schedule[]} returns a cancellation reason
   */
  findSchedule(input) {
    return this[symbols.get('schedules')]
      .find((o) => {
        return (o.rid === input || o.uniqueId === input || o.trainId === input);
      });
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~updateSchedule
   * @description Adds a new schedule or updates an existing schedule to the stored reference data
   * @param {external:openraildata/common.Schedule} schedule a new/updated schedule to be added to the reference data
   */
  updateSchedule(schedule) {
    const existingID = this[symbols.get('schedules')].findIndex(o => o.rid === schedule.rid);

    if (existingID) {
      this[symbols.get('previousSchedules')].push(this[symbols.get('schedules')][existingID]);
      this[symbols.get('schedules')][existingID] = new Schedule(schedule);
    } else {
      this[symbols.get('schedules')].push(new Schedule(schedule));
    }
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findAssociation
   * @description find an association that matches a search criteria
   * @param {String} input a search parameter to find a schedule which can be a main/assoc train rid, or tiploc
   * @returns {external:openraildata/common.Association} an Association or returns a null if an association was not found
   */
  findAssociation(input) {
    return this[symbols.get('associations')]
      .find((o) => {
        return (o.mainTrainId === input || o.associatedTrainId === input || o.tiploc === input);
      });
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~runSearch
   * @description starts a new search query
   * @param {Function} [filterFunction] an optional initial search function to run before returning
   * @returns {module:openraildata/referencedata.StationSearch} a new JurneySearch which allows chaining of search filters
   */
  runSearch(filterFunction) {
    return new ScheduleSearch((filterFunction)
      ? this[symbols.get('schedules')].filter(filterFunction)
      : this[symbols.get('schedules')]);
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findPreviousJourneys
   * @description searches for previous journeys that contain an input
   * @param {String} input a search parameter to find a schedule which can be a train rid
   * @returns {external:openraildata/common.Schedule[]}
   */
  findPreviousSchedules(input) {
    return this[symbols.get('previousSchedules')]
      .filter((o) => {
        return o.rid === input
      });
  }
}
