'use strict';

const Schedule = require('./schedule');

class V8RefData {
  constructor(v8) {
    this._timetableId = '';
    this._jurneys = [];

    this.parseRefData(v8);
  }

  parseRefData(refData) {
    if (refData && refData.PportTimetableRef) {
      this._timetableId = refData.PportTimetableRef.timetableID;
      this._jurneys = refData.PportTimetableRef.Journey;
    }
  }

  getSchedule(input) {
    const schedule = this._jurneys.find(o => (o.rid === input || o.uid === input || o.trainId === input));
    return (schedule) ? new Schedule(schedule) : null;
  }
}

module.exports = V8RefData;
