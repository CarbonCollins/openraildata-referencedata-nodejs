'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/lateRunningReason');

const standardConfig = require('../../templates/lateRunningReason/lateRunningReason.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.LateRunningReason();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.LateRunningReason);

      expect(unit.code).to.be.equal(null);
      expect(unit.reason).to.be.equal(null);
    });

    it('Should have the required properties', function() {
      const unit = new model.LateRunningReason();

      expect(unit).to.be.an.instanceOf(model.LateRunningReason);
      expect(unit).to.have.all.keys(['code', 'reason']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.LateRunningReason(standardConfig);

      expect(unit).to.be.an.instanceOf(model.LateRunningReason);

      expect(unit.code).to.be.an('number');
      expect(unit.code).to.be.equal(standardConfig.code);
      expect(unit.reason).to.be.an('string');
      expect(unit.reason).to.be.equal(standardConfig.reason);
    });

    it('symbol export should have correct mapping', function () {

      const ridSymbol = model.symbols.get('code');
      expect(ridSymbol).to.be.an('symbol');
      expect(ridSymbol.toString()).to.be.equal('Symbol(code)');

      const serviceStartingDateSymbol = model.symbols.get('reason');
      expect(serviceStartingDateSymbol).to.be.an('symbol');
      expect(serviceStartingDateSymbol.toString()).to.be.equal('Symbol(reason)');
    });
  });
};
