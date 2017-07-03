'use strict';

const Schedule = require('./schedule');
const JurneySearch = require('./jurneySearch');

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

  runSearch(filterFunction) {
    return new JurneySearch((filterFunction) ? this._jurneys.filter(filterFunction) : this._jurneys);
  }
}

module.exports = V8RefData;
