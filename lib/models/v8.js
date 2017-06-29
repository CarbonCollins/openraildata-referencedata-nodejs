'use strict';

const Schedule = require('./schedule');

class V8RefData {
  constructor(v8) {
    this._timetableId = '';
    this._jurneys = [];

    this.parseRefData(v8);
  }

  get jurneys() {
    return this._jurneys;
  }

  parseRefData(refData) {
    if (refData && refData.PportTimetable) {
      this._timetableId = refData.PportTimetable.timetableID;
      this._jurneys = refData.PportTimetable.Journey;
    }
  }

  getSchedule(input) {
    const schedule = this._jurneys.find(o => (o.rid === input || o.uid === input || o.trainId === input));
    return (schedule) ? new Schedule(schedule) : null;
  }

  getTrainsOriginatingFrom(origin) {
    return this._jurneys.filter(o => (o.OR || o.OPOR || {}).tpl === origin);
  }
}

module.exports = V8RefData;
