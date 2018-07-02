import moment from 'moment';
import { Schedule } from '@openrailuk/common';

export const symbols = new Map()
  .set('schedules', Symbol('schedules'));

/**
 * @class
 * @classdesc A class for filtering and searching through schedule data
 */
export class ScheduleSearch {
  /**
   *Creates an instance of ScheduleSearch.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Station[]} schedules
   * @memberof ScheduleSearch
   */
  constructor(schedules) {
    this[symbols.get('schedules')] = (schedules && Array.isArray(schedules))
      ? schedules
        .map((stat) => {
          return (stat instanceof Schedule)
            ? stat
            : new Schedule(stat);
        })
      : [];
  }

  /**
   * @description gets a full array of schedules that can be searched
   * @readonly
   * @memberof ScheduleSearch
   * @returns {Station[]} an array of schedules
   */
  get schedules() {
    return this[symbols.get('schedules')];
  }

  /**
   * @method ScheduleSearch~filter
   * @desc allows a custom filter function to be applied to the station list.
   * @param {Function} filterFunction 
   * @returns {ScheduleSearch}
   */
  filter(filterFunction = () => true) {
    this[symbols.get('schedules')] = this[symbols.get('schedules')].filter(filterFunction);

    return this;
  }

  /**
   * @method ScheduleSearch~origin
   * @desc applies a filter to find results starting from an origin station
   * @param {String} tiploc the origin TIPLOC code
   * @param {String} [time] an optional depart time in the format HH:MM
   * @returns {ScheduleSearch}
   */
  origin(tiploc, time = undefined) {
    if (tiploc && typeof tiploc === typeof '' && tiploc !== '') {
      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return ((o.origin || {}).tiploc === tiploc) //if origin matches tiploc
            && (((o.origin || {}).plannedTimeOfDeparture === time) || !time) //optional leave at time
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~departsOriginAfter
   * @desc applies a filter to find results which depart from origin after a specified time
   * @param {String} time a depart time to filter results to
   * @param {Boolean} [inclusive=false] is `time` included in the search (greater than or equal)
   * @returns {ScheduleSearch}
   */
  departsOriginAfter(time = undefined, inclusive = false) {
    if (time && typeof time === typeof '' && time !== '') {
      const timeShift = moment(time, 'hh:mm');

      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return (inclusive)
            ? moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm').isSameOrAfter(timeShift)
            : moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm').isAfter(timeShift);
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~departsOriginBefore
   * @desc applies a filter to find results which depart from origin before a specified time
   * @param {String} time a depart time to filter results to
   * @param {Boolean} [inclusive=false] is `time` included in the search (less than or equal)
   * @returns {ScheduleSearch}
   */
  departsOriginBefore(time = undefined, inclusive = false) {
    if (time && typeof time === typeof '' && time !== '') {
      const timeShift = moment(time, 'hh:mm');

      this[symbols.get('schedules')] = this[symbols.get('schedules')].filter(o => {
        return (inclusive)
        ? moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm').isSameOrBefore(timeShift)
        : moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm').isBefore(timeShift);
      });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~departsOriginBetween
   * @desc applies a filter to find results which depart from origin between two specified times
   * @param {String} timeFrom a from depart time to filter results to
   * @param {String} timeTo a to depart time to filter results to
   * @param {Boolean} [timeFromInclusive=false] is `timeFrom` included in the search (greater than or equal)
   * @param {Boolean} [timeToInclusive=false] is `timeTo` included in the search (less than or equal)
   * @returns {ScheduleSearch}
   */
  departsOriginBetween(timeFrom, timeTo, timeFromInclusive = false, timeToInclusive = false) {
    if (timeFrom && typeof timeFrom === typeof '' && timeFrom !== ''
    && timeTo && typeof timeTo === typeof '' && timeTo !== '') {
      const timeS = moment(timeFrom, 'hh:mm');
      const timeE = moment(timeTo, 'hh:mm');

      const timeSI = (timeFromInclusive) ? '[' : '(';
      const timeEI = (timeToInclusive) ? ']' : ')';

      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter((o) => {
          return o.origin && o.origin.plannedTimeOfDeparture;
        })
        .filter(o => {
          return moment((o.origin || {}).plannedTimeOfDeparture, 'hh:mm')
            .isBetween(timeS, timeE, null, `${timeSI}${timeEI}`);
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~destination
   * @desc applies a filter to find results ending at a destination station
   * @param {String} tiploc the destination TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {ScheduleSearch}
   */
  destination(tiploc, time = undefined) {
    if (tiploc && typeof tiploc === typeof '' && tiploc !== '') {
      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return ((o.destination || {}).tiploc === tiploc)
            && (((o.destination || {}).plannedTimeOfArrival === time) || !time)
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~intermediateStop
   * @desc applies a filter to find results which stop at a station on its route
   * @param {String} tiploc the intermediate stop TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {ScheduleSearch}
   */
  intermediateStop(tiploc, time = undefined) {
    if (tiploc && typeof tiploc === typeof '' && tiploc !== '') {
      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return (o.intermediatePoints instanceof Array)
            ? (o.intermediatePoints
              .findIndex(p => {
                return ((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || !time));
              }) >= 0)
            : false;
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~passingPoint
   * @desc applys a filter to find results which pass a station on its route
   * @param {String} tiploc the passing points TIPLOC code
   * @param {String} [time] an optional arrival time in the format HH:MM
   * @returns {ScheduleSearch}
   */
  passingPoint(tiploc, time = undefined) {
    if (tiploc && typeof tiploc === typeof '' && tiploc !== '') {
      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return (o.passingPoints instanceof Array)
            ? (o.passingPoints
              .findIndex(p => {
                return ((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || !time));
              }) >= 0)
            : false;
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~stopsAt
   * @desc applies a filter to find results which stop at any intermediate points or the destination
   * @param {String} tiploc the intermediate point or destination TIPLOC code
   * @param {String} [time] an optional time in the format HH:MM 
   * @returns {ScheduleSearch}
   */
  stopsAt(tiploc, time = undefined) {
    if (tiploc && typeof tiploc === typeof '' && tiploc !== '') {
      this[symbols.get('schedules')] = this[symbols.get('schedules')]
        .filter(o => {
          return (o.intermediatePoints instanceof Array)
            ? (o.intermediatePoints
              .findIndex(p => {
                return (((p.tiploc === tiploc) && ((p.plannedTimeOfArrival === time) || (p.plannedTimeOfDeparture === time) || !time))
                  || ((o.destination || {}).tiploc === tiploc)
                  && (((o.destination || {}).plannedTimeOfArrival === time) || ((o.destination || {}).plannedTimeOfDeparture === time) || !time));
              }) >= 0)
            : false;
        });
    }

    return this;
  }

  /**
   * @method ScheduleSearch~today
   * @desc applies a filter to find results which start today only
   * @returns {ScheduleSearch}
   */
  today() {
    const today = moment().format('YYYY-MM-DD');

    this[symbols.get('schedules')] = this[symbols.get('schedules')]
      .filter(o => o.serviceStartingDate  === today);

    return this;
  }
}
