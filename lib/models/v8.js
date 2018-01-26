'use strict';

const { Schedule, Association } = require('openraildata-common');
const JurneySearch = require('./jurneySearch');

const s_timetableId = Symbol('timetableId');
const s_schedules = Symbol('schedules');
const s_previousSchedules = Symbol('previousSchedules');
const s_associations = Symbol('associations');

/**
 * @class
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.V8RefData
 * @classdesc A class for storing V8 reference data and for attaching usefull functions for data
 * manipulation
 */
class V8RefData {
  /**
   * @constructor
   * @param {Object} refData the raw v8 ref data object
   */
  constructor(refData = {}) {
    const payload = (refData.PportTimetable)
      ? refData.PportTimetable
      : {};

    this[s_timetableId] = (payload.$ && payload.$.timetableId) ? payload.$.timetableId : null;
    this[s_schedules] = (payload.Journey) ? payload.Journey.map(journey => new Schedule(journey)) : [];
    this[s_previousSchedules] = [];
    this[s_associations] = (payload.Association) ? payload.Association.map(assoc => new Association(assoc)) : [];
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return this[s_timetableId];
  }

  /**
   * @member {Schedule[]} schedules gets an array of journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get schedules() {
    return this[s_schedules] || [];
  }

  /**
   * @member {Schedule[]} previousSchedules gets an array of previous journey timetables
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get previousSchedules() {
    return this[s_previousSchedules] || [];
  }

  /**
   * @member {Association[]} associations gets an array of associations
   * @memberof module:openraildata/referencedata.V8RefData
   * @instance
   * @readonly
   */
  get associations() {
    return this[s_associations] || [];
  }

  findSchedule(input) {
    return this[s_schedules].find(o => (o.rid === input || o.uid === input || o.trainId === input));
  }

  // /**
  //  * @method V8RefData~getSchedule
  //  * @desc find a schedule that matches a search criteria
  //  * @param {String} input a search parameter to find a schedule which can be a train rid, train uid, or trainID 
  //  * @returns {Schedule} a schedule or returns a null if a schedule was not found
  //  */
  // getSchedule(input) {
  //   return this._jurneys.find(o => (o.rid === input || o.uid === input || o.trainId === input));
  // }

  // /**
  //  * @method V8RefData~updateSchedule
  //  * @desc Adds a new schedule or updates an existing schedule to the stored reference data
  //  * @param {Schedule} schedule a new/updated schedule to be added to the reference data
  //  */
  // updateSchedule(schedule) {
  //   const existingID = this._jurneys.findIndex(o => o.rid === schedule.rid);
  //   if (existingID) {
  //     this._previousJourneys.push(this._jurneys[existingID]);
  //     this._jurneys[existingID] = schedule._payload;
  //   } else {
  //     this._jurneys.push(schedule._payload);
  //   }
  // }

  // /**
  //  * @method V8RefData~getAssociation
  //  * @desc find an association that matches a search criteria
  //  * @param {String} input a search parameter to find a schedule which can be a main/assoc train rid, or tiploc
  //  * @returns {Association} an Association or returns a null if an association was not found
  //  */
  // getAssociation(input) {
  //   return this._associations.find(o => (o.main.rid === input || o.assoc.rid === input || o.tiploc === input));
  // }

  // /**
  //  * @method V8refData~runSearch
  //  * @desc starts a new search query
  //  * @param {Function} [filterFunction] an optional initial search function to run before returning
  //  * @returns {JurneySearch} a new JurneySearch which allows chaining of search filters
  //  */
  // runSearch(filterFunction) {
  //   return new JurneySearch((filterFunction) ? this._jurneys.filter(filterFunction) : this._jurneys);
  // }

  // /**
  //  * @method V8refData~getPreviousJourneys
  //  * @desc searches for previous journeys that contain an input
  //  * @param {stirng} input a search parameter to find a schedule which can be a train rid
  //  * @returns {Jurney[]}
  //  */
  // getPreviousJourneys(input) {
  //   return this._previousJourneys.filter(o => o.rid === schedule.rid);
  // }
}

module.exports = V8RefData;
