'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/scheduleSearch');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['ScheduleSearch', 'symbols']);
    });

    it('Should export ScheduleSearch Class', function () {
      expect(model.ScheduleSearch).to.exist;
      expect(model.ScheduleSearch).to.be.an('function');

      const unit = new model.ScheduleSearch();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
