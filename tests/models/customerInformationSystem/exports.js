'use strict';
const { expect } = require('chai');

const model = require('../../../lib/es5/models/customerInformationSystem');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['CustomerInformationSystem', 'symbols']);
    });

    it('Should export DataController Class', function () {
      expect(model.CustomerInformationSystem).to.exist;
      expect(model.CustomerInformationSystem).to.be.an('function');

      const unit = new model.CustomerInformationSystem();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
