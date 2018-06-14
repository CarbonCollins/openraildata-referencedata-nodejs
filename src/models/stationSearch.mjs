import * as moment from 'moment';
import { Station } from '@openrailuk/common';

const sStations = Symbol('stations'); 

/**
 * @class
 * @classdesc A class for filtering and searching through schedule data
 */
export default class StationSearch {
  /**
   *Creates an instance of StationSearch.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Station[]} stations
   * @memberof StationSearch
   */
  constructor(stations) {
    this[sStations] = (stations && Array.isArray(stations))
      ? stations
        .map((stat) => {
          return (stat instanceof Station)
            ? stat
            : new Station(stat);
        })
      : [];
  }

  /**
   * @description gets a full array of stations that can be searched
   * @readonly
   * @memberof StationSearch
   * @returns {Station[]} an array of stations
   */
  get stations() {
    return this[sStations];
  }

  /**
   * @method StationSearch~filter
   * @desc allows a custom filter function to be applied to the station list.
   * @param {Function} filterFunction 
   * @returns {StationSearch}
   */
  filter(filterFunction) {
    this[sStations] = this[sStations].filter(filterFunction);

    return this;
  }

  /**
   * @method StationSearch~origin
   * @desc applies a filter to find results starting from an origin station
   * @param {String} tiploc the origin TIPLOC code
   * @param {String} [time] an optional depart time in the format HH:MM
   * @returns {StationSearch}
   */
  origin(tiploc, time) {
    this[sStations] = this[sStations]
      .filter(o => {
        return ((o.origin || {}).tiploc === tiploc) //if origin matches tiploc
          && (((o.origin || {}).plannedTimeOfDeparture === time) || !time) //optional leave at time
      });

    return this;
  }

  /**
   * @method StationSearch~departsOriginAfter
   * @desc applies a filter to find results which depart from origin after a specified time
   * @param {String} time a depart time to filter results to
   * @returns {StationSearch}
   */
  departsOriginAfter(time) {
    const timeShift = moment(time, 'hh:mm');

    this[sStations] = this[sStations]
      .filter(o => {
        return moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm')
          .isAfter(timeShift);
      });

    return this;
  }

  /**
   * @method StationSearch~departsOriginBefore
   * @desc applies a filter to find results which depart from origin before a specified time
   * @param {String} time a depart time to filter results to
   * @returns {StationSearch}
   */
  departsOriginBefore(time) {
    const timeShift = moment(time, 'hh:mm');

    this[sStations] = this[sStations].filter(o => {
      return moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm')
        .isBefore(timeShift);
    });

    return this;
  }

  /**
   * @method StationSearch~departsOriginBetween
   * @desc applies a filter to find results which depart from origin between two specified times
   * @param {String} timeFrom a from depart time to filter results to
   * @param {String} timeTo a to depart time to filter results to
   * @returns {StationSearch}
   */
  departsOriginBetween(timeFrom, timeTo) {
    const timeS = moment(timeFrom, 'hh:mm');
    const timeE = moment(timeTo, 'hh:mm');

    this[sStations] = this[sStations]
      .filter(o => {
        return moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm')
          .isBetween(timeS, timeE);
      });

    return this;
  }

  /**
   * @method StationSearch~destination
   * @desc applies a filter to find results ending at a destination station
   * @param {String} tiploc the destination TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {StationSearch}
   */
  destination(tiploc, time) {
    this[sStations] = this[sStations]
      .filter(o => {
        return ((o.destination || {}).tiploc === tiploc)
          && (((o.destination || {}).plannedTimeOfDeparture === time) || !time)
      });

    return this;
  }

  /**
   * @method StationSearch~intermediateStop
   * @desc applies a filter to find results which stop at a station on its route
   * @param {String} tiploc the intermediate stop TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {StationSearch}
   */
  intermediateStop(tiploc, time) {
    this[sStations] = this[sStations]
      .filter(o => {
        return (o.intermediatePoints instanceof Array)
          ? (o.intermediatePoints
            .findIndex(p => {
              return ((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || !time));
            }) >= 0)
          : false;
      });

    return this;
  }

  /**
   * @method StationSearch~passingPoint
   * @desc applys a filter to find results which pass a station on its route
   * @param {String} tiploc the passing points TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {StationSearch}
   */
  passingPoint(tiploc, time) {
    this[sStations] = this[sStations]
      .filter(o => {
        return (o.passingPoints instanceof Array)
          ? (o.passingPoints
            .findIndex(p => {
              return ((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || !time));
            }) >= 0)
          : false;
      });

    return this;
  }

  /**
   * @method StationSearch~stopsAt
   * @desc applies a filter to find results which stop at any intermediate points or the destination
   * @param {String} tiploc the intermediate point or destination TIPLOC code
   * @param {String} [time] an optional time in the format HH:MM 
   * @returns {StationSearch}
   */
  stopsAt(tiploc, time) {
    this[sStations] = this[sStations]
      .filter(o => {
        return (o.intermediatePoints instanceof Array)
          ? (o.intermediatePoints
            .findIndex(p => {
              return (((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || !time))
                || ((o.destination || {}).tiploc === tiploc) && (((o.destination || {}).plannedTimeOfArrival === time) || !time));
            }) >= 0)
          : false;
      });

    return this;
  }

  /**
   * @method StationSearch~today
   * @desc applies a filter to find results which start today only
   * @returns {StationSearch}
   */
  today() {
    const today = moment().format('YYYY-MM-DD');

    this[sStations] = this[sStations]
      .filter(o => o.serviceStartingDate  === today);

    return this;
  }
}
