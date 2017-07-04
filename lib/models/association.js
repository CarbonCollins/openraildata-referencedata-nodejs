'use strict';

const refData = require('../refData');

class Association {
  constructor(assoc) {
    this._payload = assoc || null;
  }

  get tiploc() { return (this._payload) ? this._payload.tiploc : null; }
  get category() { return (this._payload) ? this._payload.category : null; }

  get mainTrain() { return (this._payload) ? this._payload.main : null; }
  get mainTrainId() { return (this._payload) ? this._payload.main.rid : null; }
  get mainTrainSchedule() { return (this._payload) ? refData.v8.getSchedule(this._payload.main.rid) : null; }

  get assocTrain() { return (this._payload) ? this._payload.assoc : null; }
  get assocTrainId() { return (this._payload) ? this._payload.assoc.rid : null; }
  get assocTrainSchedule() { return (this._payload) ? refData.v8.getSchedule(this._payload.assoc.rid) : null; }


  getLocation(tiploc) { return (this._payload) ? refData.v3.getLocation(tiploc) : null; }
  isJoin() { return (this._payload && this._payload.category === 'JJ'); }
  isSplit() { return (this._payload && this._payload.category === 'VV'); }
  isNextTrain() { return (this._payload && this._payload.category === 'NP'); }
}

module.exports = Association;
