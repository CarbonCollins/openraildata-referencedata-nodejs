'use strict';

const Station = require('./station');

class Schedule {
  constructor(payload) {
    this._payload = JSON.parse(payload);
  }

  get rid() { return this._payload.rid; }
  get ssd() { return this._payload.ssd; }
  get toc() { return this._payload.toc; }
  get trainId() { return this._payload.trainId; }
  get uid() { return this._payload.uid; }
  get OR() { return (this._payload.OR) ? new Station(this._payload.OR) : null; }
  get PP() { 
    let passingPoints = [];
    if (this._payload.PP) {
      for (let i = 0, iLength = this._payload.PP.length; i < iLength; i += 1) {
        passingPoints.push(new Station(this._payload.PP[i]));
      }
    }
    return passingPoints;
  }
  get IP() { 
    let intermediatePoints = [];
    if (this._payload.IP) {
      for (let i = 0, iLength = this._payload.IP.length; i < iLength; i += 1) {
        intermediatePoints.push(new Station(this._payload.IP[i]));
      }
    }
    return intermediatePoints;
  }
  get DT() { return (this._payload.DT) ? new Station(this._payload.DT) : null; }

  get OPIP() { 
    let operationalStops = [];
    if (this._payload.IP) {
      for (let i = 0, iLength = this._payload.OPIP.length; i < iLength; i += 1) {
        operationalStops.push(new Station(this._payload.OPIP[i]));
      }
    }
    return operationalStops;
  }
  get OPOR() { return (this._payload.OPOR) ? new Station(this._payload.OPOR) : null; }
  get OPDT() { return (this._payload.OPDT) ? new Station(this._payload.OPDT) : null; }

  // aliases
  get trainOperatingCompany() { return this.toc; }
  get serviceStartingDate() { return this.ssd; } // probably?

  get origin() { return this.OR || this.OPOR; }
  get passingPoints() { return this.PP; }
  get intermediatePoints() { return this.IP; }
  get operationalStops() { return this.OPIP; }
  get destination() { return this.DT || this.OPDT; }
}

module.exports = Schedule;
