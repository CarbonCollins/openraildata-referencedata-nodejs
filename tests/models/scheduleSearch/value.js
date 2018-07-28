'use strict';
const { expect } = require('chai');

const { Schedule } = require('@openrailuk/common');

const model = require('../../../lib/common/models/scheduleSearch');

const standardConfig = require('../../templates/scheduleSearch/scheduleSearch.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.ScheduleSearch();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.a.lengthOf(0);
    });

    it('Should have the required properties', function() {
      const unit = new model.ScheduleSearch();

      expect(unit).to.be.an.instanceOf(model.ScheduleSearch);
      expect(unit).to.have.all.keys(['schedules']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.ScheduleSearch(standardConfig.schedules);

      expect(unit).to.be.an.instanceOf(model.ScheduleSearch);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.a.lengthOf(standardConfig.schedules.length);
      expect(unit.schedules).to.satisfy((schedules) => {
        return schedules.every((schedule) => {
          return schedule instanceof Schedule;
        });
      });
    });

    it('symbol export should have correct mapping', function () {

      const ridSymbol = model.symbols.get('schedules');
      expect(ridSymbol).to.be.an('symbol');
      expect(ridSymbol.toString()).to.be.equal('Symbol(schedules)');
    });
  });
};
