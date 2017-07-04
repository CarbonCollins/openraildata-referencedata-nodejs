'use strict';

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

  /**
   * @method JurneySearch~destination
   * @desc applys a filter to find results ending at a destination station
   * @param {String} tiploc the origin TIPLOC code
   * @returns {JurneySearch}
   */
  destination(tiploc) {
    this._jurneys = this._jurneys.filter(o => (o.DT || o.OPDT || {}).tpl === tiploc);
    return this;
  }

intermediateStop(tiploc) {
    this._jurneys = this._jurneys.filter(o => (o.IP instanceof Array) ? o.IP.findIndex(p => p.tpl === tiploc) >= 0 : false);
    return this;
  }

  passingPoint(tiploc) {
    this._jurneys = this._jurneys.filter(o => (o.PP instanceof Array) ? o.PP.findIndex(p => p.tpl === tiploc) >= 0 : false);
    return this;
  }

  departsAt(time) {
    this._jurneys = this._jurneys.filter(o => (o.OR || o.OPOR || {}).ptd === time);
    return this;
  }
}

module.exports = JurneySearch;