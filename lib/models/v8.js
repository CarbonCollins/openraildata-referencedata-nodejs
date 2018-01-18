'use strict';

const common = require('openraildata-common');
const JurneySearch = require('./jurneySearch');

/**
 * a class for schedule information and functions
 * @external Schedule
 * @see {@link schedule.md Schedule}
 */
/**
 * a class for association information and functions
 * @external Association
 * @see {@link association.md Association}
 */
/**
 * a class for jurney searches
 * @external JurneySearch
 * @see {@link jurneySearch.md JurneySearch}
 */

/**
 * @class
 * @classdesc A class for storing V8 reference data and for attaching usefull functions for data manipulation
 */
class V8RefData {
  /**
   * @constructor
   * @param {Object} v8 the raw v8 ref data object
   */
  constructor(payload) {
    this._timetableId = '';
    this._jurneys = [];
    this._previousJourneys = [];
    this._associations = [];

    this.parseV8(payload);
  }

  parseV8(payload) {
    if (payload && payload.PportTimetable) {
      this._timetableId = payload.PportTimetable.timetableID;
      this._jurneys = payload.PportTimetable.Journey.map(journey => new common.Schedule(journey));
      this._previousJourneys = [];
      this._associations = payload.PportTimetable.Association.map(assoc => new common.Association(assoc));
    }
  }

  // /**
  //  * @desc gets the v8 timetable Id
  //  * @returns {String} v8 ref timetable ID
  //  * @readonly
  //  */
  // get timetableId() { return this._timetableId; }
  // /**
  //  * @desc gets an array of jurney timetables
  //  * @returns {Object[]} an array of jurney timetables
  //  * @readonly
  //  */
  // get jurneys() { return this._jurneys; }
  // /**
  //  * @desc gets an array of associations
  //  * @returns {Object[]} an array of associations
  //  * @readonly
  //  */
  // get associations() { return this._associations; }

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
