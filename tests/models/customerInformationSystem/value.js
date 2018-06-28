'use strict';
const { expect } = require('chai');

const model = require('../../../lib/es5/models/customerInformationSystem');

const standardConfig = require('../../templates/customerInformationSystem/customerInformationSystem.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.CustomerInformationSystem();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.CustomerInformationSystem);

      expect(unit.code).to.be.equal(null);
      expect(unit.name).to.be.equal(null);
    });

    it('Should have the required properties', function() {
      const unit = new model.CustomerInformationSystem();

      expect(unit).to.be.an.instanceOf(model.CustomerInformationSystem);
      expect(unit).to.have.all.keys(['code', 'name']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.CustomerInformationSystem(standardConfig);

      expect(unit).to.be.an.instanceOf(model.CustomerInformationSystem);

      expect(unit.code).to.be.an('number');
      expect(unit.code).to.be.equal(standardConfig.code);
      expect(unit.name).to.be.an('string');
      expect(unit.name).to.be.equal(standardConfig.name);
    });

    it('symbol export should have correct mapping', function () {

      const ridSymbol = model.symbols.get('code');
      expect(ridSymbol).to.be.an('symbol');
      expect(ridSymbol.toString()).to.be.equal('Symbol(code)');

      const serviceStartingDateSymbol = model.symbols.get('name');
      expect(serviceStartingDateSymbol).to.be.an('symbol');
      expect(serviceStartingDateSymbol.toString()).to.be.equal('Symbol(name)');
    });
  });
};
