'use strict';

const moment = require('moment');

const Schedule = require('./schedule');

class JurneySearch {
  constructor(jurneys) {
    this._jurneys = jurneys;
  }

  get jurneys() { return this._jurneys; }

  /**
   * @method JurneySearch~filter
   * @desc allows a custom filter function to be applied to the jruney list.
   * @param {Function} filterFunction 
   * @returns {JurneySearch}
   */
  filter(filterFunction) {
    this._jurneys = this._jurneys.filter(filterFunction);
    return this;
  }

  /**
   * @method JurneySearch~origin
   * @desc applys a filter to find results starting from an origin station
   * @param {String} tiploc the origin TIPLOC code
   * @returns {JurneySearch}
   */
  origin(tiploc) {
    this._jurneys = this._jurneys.filter(o => (o.OR || o.OPOR || {}).tpl === tiploc);
    return this;
  }

  destination(tiploc) {
    this._jurneys = this._jurneys.filter(o => (o.DT || o.OPDT || {}).tpl === tiploc);
    return this;
  }
}

class V8RefData {
  constructor(v8) {
    this._timetableId = '';
    this._jurneys = [];
    this._associations = [];

    this.parseRefData(v8);
  }

  get timetableId() { return this._timetableId; }
  get jurneys() { return this._jurneys; }
  get associations() { return this._associations; }

  parseRefData(refData) {
    if (refData && refData.PportTimetable) {
      this._timetableId = refData.PportTimetable.timetableID;
      this._jurneys = refData.PportTimetable.Journey;
      this._associations = refData.PportTimetable.Association;
    }
  }

  getSchedule(input) {
    const schedule = this._jurneys.find(o => (o.rid === input || o.uid === input || o.trainId === input));
    return (schedule) ? new Schedule(schedule) : null;
  }

  runSearch() {
    return new JurneySearch(this._jurneys);
  }

  getTrainsOriginatingFrom(origin) {
    return this._jurneys.filter(o => (o.OR || o.OPOR || {}).tpl === origin);
  }
}

module.exports = V8RefData;
