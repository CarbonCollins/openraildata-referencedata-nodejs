import { Schedule, Association } from '@openrailuk/common';
import StationSearch from './stationSearch';

const sTimetableId = Symbol('timetableId');
const sSchedules = Symbol('schedules');
const sPreviousSchedules = Symbol('previousSchedules');
const sAssociations = Symbol('associations');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V8RefData
 * @classdesc A class for storing V8 reference data and for attaching usefull functions for data
 * manipulation
 */
export default class V8RefData {
  /**
   * @constructor
   * @param {Object} refData the raw v8 ref data object
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetable)
      ? refData.PportTimetable
      : {};

    this[sTimetableId] = (payload.$ && payload.$.timetableId)
      ? payload.$.timetableId : null;
    this[sSchedules] = (payload.Journey) ? payload.Journey.map(journey => new Schedule(journey)) : [];
    this[sPreviousSchedules] = [];
    this[sAssociations] = (payload.Association) ? payload.Association.map(assoc => new Association(assoc)) : [];
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[sTimetableId];
  }

  /**
   * @member {Schedule[]} schedules gets an array of journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get schedules() {
    return this[sSchedules] || [];
  }

  /**
   * @member {Schedule[]} previousSchedules gets an array of previous journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get previousSchedules() {
    return this[sPreviousSchedules] || [];
  }

  /**
   * @member {Association[]} associations gets an array of associations
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get associations() {
    return this[sAssociations] || [];
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findSchedule
   * @description finds a specific schedule for a given rid, uniqueId or trainId
   * @param {Stirng} input a string containing a search parameter
   * @returns {external:openraildata/common.Schedule[]} returns a cancellation reason
   */
  findSchedule(input) {
    return this[sSchedules]
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
    const existingID = this[sSchedules].findIndex(o => o.rid === schedule.rid);

    if (existingID) {
      this[sPreviousSchedules].push(this[sSchedules][existingID]);
      this[sSchedules][existingID] = new Schedule(schedule);
    } else {
      this[sSchedules].push(new Schedule(schedule));
    }
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findAssociation
   * @description find an association that matches a search criteria
   * @param {String} input a search parameter to find a schedule which can be a main/assoc train rid, or tiploc
   * @returns {external:openraildata/common.Association} an Association or returns a null if an association was not found
   */
  findAssociation(input) {
    return this[sAssociations]
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
    return new StationSearch((filterFunction)
      ? this[sSchedules].filter(filterFunction)
      : this[sSchedules]);
  }

  /**
   * @method module:openraildata/referencedata.V8RefData~findPreviousJourneys
   * @description searches for previous journeys that contain an input
   * @param {String} input a search parameter to find a schedule which can be a train rid
   * @returns {external:openraildata/common.Schedule[]}
   */
  findPreviousSchedules(input) {
    return this[sPreviousSchedules]
      .filter((o) => {
        return o.rid === input
      });
  }
}
