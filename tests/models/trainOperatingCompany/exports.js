'use strict';
const { expect } = require('chai');

const model = require('../../../lib/es5/models/trainOperatingCompany');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['TrainOperatingCompany', 'symbols']);
    });

    it('Should export DataController Class', function () {
      expect(model.TrainOperatingCompany).to.exist;
      expect(model.TrainOperatingCompany).to.be.an('function');

      const unit = new model.TrainOperatingCompany();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
