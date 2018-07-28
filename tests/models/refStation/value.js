'use strict';
const { expect } = require('chai');
const { Location } = require('@openrailuk/common');

const model = require('../../../lib/common/models/refStation');

const testModelSymbols = new Map()
  .set('tiploc', 'tiploc');

class TestModel {
  get tiploc() { return 'tiploc'; }
  get testVal() { return true; }
}

class TestReferenceData {
  get v3() {
    return {
      getLocation: (input) => {
        return new Location({ tiploc: 'getLocation', computerReservationSystem: input, locationName: 'testLocation' });
      }
    }
  }
}

module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const UnitModel = model.refStationMixin(TestModel, testModelSymbols);

      expect(UnitModel).to.be.an('function');

      const unit = new UnitModel();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(TestModel);

      expect(unit.testVal).to.be.equal(true);
    });

    it('name should throw an error when RefData is not injected', function () {
      model.injectReferenceDataToStation(null); // reset injection
      const Unit = model.refStationMixin(TestModel, new Map());
      expect(Unit).to.be.an('function');

      const unit = new Unit();

      try {
        unit.name;
        throw new Error('Should have thrown an error');
      } catch (err) {
        expect(err).to.not.be.equal(undefined);
        expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToStation` first.');
      }
    });

    it('Should have the required properties', function() {
      model.injectReferenceDataToStation(new TestReferenceData());
      const Unit = model.refStationMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });

    it('Should create a valid instance', function () {
      model.injectReferenceDataToStation(new TestReferenceData());
      const Unit = model.refStationMixin(TestModel, testModelSymbols);

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.name).to.be.an('string');
      expect(unit.name).to.be.equal('testLocation');
    });

    it('Should create an invalid instance', function () {
      model.injectReferenceDataToStation(new TestReferenceData());
      const Unit = model.refStationMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.name).to.be.equal(null);
    });
  });
};
