'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/trainOperatingCompany');

const standardConfig = require('../../templates/trainOperatingCompany/trainOperatingCompany.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.TrainOperatingCompany();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.TrainOperatingCompany);

      expect(unit.code).to.be.equal(null);
      expect(unit.name).to.be.equal(null);
      expect(unit.url).to.be.equal(null);
    });

    it('Should have the required properties', function() {
      const unit = new model.TrainOperatingCompany();

      expect(unit).to.be.an.instanceOf(model.TrainOperatingCompany);
      expect(unit).to.have.all.keys(['trainOperatingCompany', 'trainOperatingCompanyName', 'url']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.TrainOperatingCompany(standardConfig);

      expect(unit).to.be.an.instanceOf(model.TrainOperatingCompany);

      expect(unit.code).to.be.an('string');
      expect(unit.code).to.be.equal(standardConfig.trainOperatingCompany);
      expect(unit.name).to.be.an('string');
      expect(unit.name).to.be.equal(standardConfig.trainOperatingCompanyName);
      expect(unit.url).to.be.an('string');
      expect(unit.url).to.be.equal(standardConfig.url);
    });

    it('symbol export should have correct mapping', function () {

      const ridSymbol = model.symbols.get('trainOperatingCompany');
      expect(ridSymbol).to.be.an('symbol');
      expect(ridSymbol.toString()).to.be.equal('Symbol(train operating company)');

      const serviceStartingDateSymbol = model.symbols.get('trainOperatingCompanyName');
      expect(serviceStartingDateSymbol).to.be.an('symbol');
      expect(serviceStartingDateSymbol.toString()).to.be.equal('Symbol(train operating company name)');

      const urlSymbol = model.symbols.get('url');
      expect(urlSymbol).to.be.an('symbol');
      expect(urlSymbol.toString()).to.be.equal('Symbol(url)');
    });
  });
};
