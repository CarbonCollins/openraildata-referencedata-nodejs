'use strict';

const Location = require('./location');

class V3RefData {
  constructor(refData) {
    this._timetableId = '';
    this._locations = [];
    this._trainOperatorCompanies = [];
    this._lateRunningReasons = [];
    this._cancellationReasons = [];
    this._vias = [];
    this._cisSources = [];

    this.parseRefData(refData);
  }

  get timetableId() { return this._timetableId; }
  get locations() { return this._locations; }
  get tocs() { return this._trainOperatorCompanies; }
  get trainOperatorCompanies() { return this._trainOperatorCompanies; }
  get lateRunningReasons() { return this._lateRunningReasons; }
  get cancellationReasons() { return this._cancellationReasons; }
  get vias() { return this._vias; }
  get CISSources() { return this._cisSources; }

  parseRefData(refData) {
    if (refData && refData.PportTimetableRef) {
      this._timetableId = refData.PportTimetableRef.timetableId || '';
      this._locations = refData.PportTimetableRef.LocationRef || [];
      this._trainOperatorCompanies = refData.PportTimetableRef.TocRef || [];
      this._lateRunningReasons = refData.PportTimetableRef.LateRunningReasons.Reason || [];
      this._cancellationReasons = refData.PportTimetableRef.CancellationReasons.Reason || [];
      this._vias = refData.PportTimetableRef.Via || [];
      this._cisSources = refData.PportTimetableRef.CISSource || [];
    }
  }

  // location functions
  getLocation(input) { 
    const location = this._locations.find(o => (o.tpl === input || o.locname === input));
    return (location) ? new Location(location) : null;
  }

  // train operator functions
  getToc(input) { 
    const toc = this._trainOperatorCompanies.find(o => (o.toc === input));
    return toc;
  }

}

module.exports = V3RefData;
