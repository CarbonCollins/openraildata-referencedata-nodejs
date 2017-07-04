'use strict';

const refData = require('../refData');

class Station {
  constructor(payload, operational) {
    this._payload = payload;
    this._operational = operational || false;
  }

  get tpl() { return this._payload.tpl; }
  get act() { return this._payload.act; }
  get pta() { return this._payload.pta; }
  get ptd() { return this._payload.ptd; }
  get wta() { return this._payload.wta; }
  get wtd() { return this._payload.wtd; }
  
  get tiploc() { return this.tpl; }
  get action() { return this.act; }
  get plannedTimeOfArrival() { return this.pta; }
  get plannedTimeOfDeparture() { return this.ptd; }
  get workingTimeOfArrival() { return this.wta; }
  get workingTimeOfDeparture() { return this.wtd; }
  get operational() { return this._operational; }

  get name() { return refData.v3.getLocation(this.tiploc).locname; }
}

module.exports = Station;
