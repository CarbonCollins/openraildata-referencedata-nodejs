'use strict';

const moment = require('moment');

/**
 * @class
 * @classdesc A class for filtering and searching through schedule data
 */
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
   * @param {String} [time] an optional depart time in the format HH:MM
   * @returns {JurneySearch}
   */
  origin(tiploc, time) {
    this._jurneys = this._jurneys.filter(o => {
      return ((o.OR || o.OPOR || {}).tpl === tiploc) //if origin matches tiploc
      && (((o.OR || o.OPOR || {}).ptd === time) || !time) //optional leave at time
    });
    return this;
  }

  /**
   * @method JurneySearch~departsOriginAfter
   * @desc applys a filter to find results which depart from origin after a specified time
   * @param {String} time a depart time to filter results to
   * @returns {JurneySearch}
   */
  departsOriginAfter(time) {
    const timeShift = moment(time, 'hh:mm');
    this._jurneys = this._jurneys.filter(o => {
      return moment((o.OR || o.OPOR || {}).ptd, 'hh:mm').isAfter(timeShift);
    });
    return this;
  }

  /**
   * @method JurneySearch~departsOriginBefore
   * @desc applys a filter to find results which depart from origin before a specified time
   * @param {String} time a depart time to filter results to
   * @returns {JurneySearch}
   */
  departsOriginBefore(time) {
    const timeShift = moment(time, 'hh:mm');
    this._jurneys = this._jurneys.filter(o => {
      return moment((o.OR || o.OPOR || {}).ptd, 'hh:mm').isBefore(timeShift);
    });
    return this;
  }

  /**
   * @method JurneySearch~departsOriginBetween
   * @desc applys a filter to find results which depart from origin between two specified times
   * @param {String} timeFrom a from depart time to filter results to
   * @param {String} timeTo a to depart time to filter results to
   * @returns {JurneySearch}
   */
  departsOriginBetween(timeFrom, timeTo) {
    const timeS = moment(timeFrom, 'hh:mm');
    const timeE = moment(timeTo, 'hh:mm');
    this._jurneys = this._jurneys.filter(o => {
      return moment((o.OR || o.OPOR || {}).ptd, 'hh:mm').isBetween(timeS, timeE);
    });
    return this;
  }

  /**
   * @method JurneySearch~destination
   * @desc applys a filter to find results ending at a destination station
   * @param {String} tiploc the destination TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {JurneySearch}
   */
  destination(tiploc, time) {
    this._jurneys = this._jurneys.filter(o => {
      return ((o.DT || o.OPDT || {}).tpl === tiploc)
      && (((o.DT || o.OPDT || {}).pta === time) || !time)
    });
    return this;
  }

  /**
   * @method JurneySearch~intermediateStop
   * @desc applys a filter to find results which stop at a station on its route
   * @param {String} tiploc the intermediate stop TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {JurneySearch}
   */
  intermediateStop(tiploc, time) {
    this._jurneys = this._jurneys.filter(o => {
      return (o.IP instanceof Array)
      ? (o.IP.findIndex(p => {
        return ((p.tpl === tiploc) && ((p.pta === time) || !time));
      }) >= 0)
      : false;
    });
    return this;
  }

  /**
   * @method JurneySearch~passingPoint
   * @desc applys a filter to find results which pass a station on its route
   * @param {String} tiploc the passing points TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {JurneySearch}
   */
  passingPoint(tiploc, time) {
    this._jurneys = this._jurneys.filter(o => {
      return (o.PP instanceof Array)
      ? (o.PP.findIndex(p => {
        return ((p.tpl === tiploc) && ((p.pta === time) || !time));
      }) >= 0)
      : false
    });
    return this;
  }

  /**
   * @method JurneySearch~stopsAt
   * @desc applys a filter to find results which stop at any intermediate points or the destination
   * @param {String} tiploc the intermediate point or destination TIPLOC code
   * @param {String} [time] an optiona time in the format HH:MM 
   * @returns {JurneySearch}
   */
  stopsAt(tiploc, time) {
    this._jurneys = this._jurneys.filter(o => {
      return (o.IP instanceof Array)
      ? (o.IP.findIndex(p => {
        return (((p.tpl === tiploc) && ((p.pta === time) || !time))
         || ((o.DT || o.OPDT || {}).tpl === tiploc) && (((o.DT || o.OPDT || {}).pta === time) || !time));
      }) >= 0)
      : false;
    });
    return this;
  }

  /**
   * @method JurneySearch~today
   * @desc applys a filter to find results which start today only
   * @returns {JurneySearch}
   */
  today() {
    const today = moment().format('YYYY-MM-DD');
    console.log(today);
    this._jurneys = this._jurneys.filter(o => o.ssd === today);
    return this;
  }
}

module.exports = JurneySearch;
