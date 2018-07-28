'use strict';

const { expect } = require('chai');
const { Schedule } = require('@openrailuk/common');
const moment = require('moment');

let model = require('../../../lib/common/models/scheduleSearch');

const standardConfig = require('../../templates/scheduleSearch/scheduleSearch.json');

const todaySchedules = [{
    "serviceStartingDate": moment().format('YYYY-MM-DD'),
  },
  {
    "serviceStartingDate": moment().add(1, 'd').format('YYYY-MM-DD')
  },
  {
    "serviceStartingDate": moment().subtract(1, 'd').format('YYYY-MM-DD')
  }];

module.exports = function () {
  describe('Functional suite', function () {
    describe('filter()', function() {
      it('should be a callable function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.filter).to.be.an('function');
      });

      it('should return all values as they were with true filter function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.filter(() => { return true });

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result).to.deep.equal(unit);
      });

      it('should return all values as default', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.filter();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result).to.deep.equal(unit);
      });
    });

    it('should return filters results for origin OR1', function() {
      const unit = new model.ScheduleSearch(standardConfig.schedules);

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.satisfy((schedules) => {
        return schedules.every((schedule) => {
          return schedule instanceof Schedule;
        });
      });

      const result = unit.filter((schedule) => { return schedule.origin.tiploc === 'OR1' });

      expect(result).to.be.an('object');
      expect(result).to.be.an.instanceOf(model.ScheduleSearch);
      expect(result.schedules).to.be.an('array');
      expect(result.schedules).to.satisfy((schedules) => {
        return schedules.every((schedule) => {
          return schedule instanceof Schedule;
        });
      });
      expect(result.schedules).to.have.a.lengthOf(1);
    });

    describe('origin()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.origin).to.be.an('function');
      });

      it('should get a station from the origin', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.origin('OR2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should get a station from the origin and departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.origin('OR2', '12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.origin();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('departsOriginAfter()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.departsOriginAfter).to.be.an('function');
      });

      it('should get a station from the departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginAfter('11:59');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should get a station from the departure time (inclusive defaults to false)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginAfter('12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (not inclusive)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginAfter('12:00', false);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (inclusive)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginAfter('12:00', true);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.departsOriginAfter();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('departsOriginBefore()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.departsOriginBefore).to.be.an('function');
      });

      it('should get a station from the departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBefore('14:01');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should get a station from the departure time (inclusive should default to false)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBefore('14:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (not inclusive)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBefore('14:00', false);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (inclusive)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBefore('14:00', true);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.departsOriginBefore();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('departsOriginBetween()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.departsOriginBetween).to.be.an('function');
      });

      it('should get a station from the departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('11:59', '14:01');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should get a station from the departure time (inclusive should default to false)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('12:00', '14:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get a station from the departure time (not inclusive)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('12:00', '14:00', false, false);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get a station from the departure time (inclusive from)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('12:00', '14:00', true, false);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (inclusive to)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('12:00', '14:00', false, true);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(2);
      });

      it('should get a station from the departure time (inclusive both)', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.departsOriginBetween('12:00', '14:00', true, true);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.departsOriginBetween();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('destination()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.destination).to.be.an('function');
      });

      it('should get a station from the destination', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.destination('DT2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(3);
      });

      it('should get a station from the destination and departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.destination('DT2', '12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.destination();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('intermediateStop()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.intermediateStop).to.be.an('function');
      });

      it('should get a station from the destination', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.intermediateStop('IP1');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get a station from the destination and departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.intermediateStop('IP2', '12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.intermediateStop();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('passingPoint()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.passingPoint).to.be.an('function');
      });

      it('should get a station from the destination', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.passingPoint('PP1');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get a station from the destination and departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.passingPoint('PP2', '12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.passingPoint();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('stopsAt()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.stopsAt).to.be.an('function');
      });

      it('should get an destination station', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.stopsAt('DT1');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get an intermediate station', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.stopsAt('IP1');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should get a station from the intermediate and departure time', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        const result = unit.stopsAt('IP2', '12:00');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });

      it('should return all current items when no parameters are passed', function() {
        const unit = new model.ScheduleSearch(standardConfig.schedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
        expect(unit.schedules).to.be.an('array');
        expect(unit.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });

        const result = unit.stopsAt();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      });
    });

    describe('today()', function() {
      it('should be a valid function', function() {
        const unit = new model.ScheduleSearch(todaySchedules);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

        expect(unit.today).to.be.an('function');
      });

      it('should get any services starting today station', function() {
        const unit = new model.ScheduleSearch(todaySchedules);

        const result = unit.today();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(model.ScheduleSearch);
        expect(result.schedules).to.be.an('array');
        expect(result.schedules).to.satisfy((schedules) => {
          return schedules.every((schedule) => {
            return schedule instanceof Schedule;
          });
        });
        expect(result.schedules).to.have.a.lengthOf(1);
      });
    });
  });
};
