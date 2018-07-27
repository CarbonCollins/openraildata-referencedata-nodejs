'use strict';
const { expect } = require('chai');
const { Location } = require('@openrailuk/common');

const model = require('../../../lib/es5/models/refTrainOrder');

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
      const UnitModel = model.refTrainOrderMixin(TestModel, testModelSymbols);

      expect(UnitModel).to.be.an('function');

      const unit = new UnitModel();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(TestModel);

      expect(unit.testVal).to.be.equal(true);
    });

    it('name should throw an error when RefData is not injected', function () {
      model.injectReferenceDataToTrainOrder(null); // reset injection
      const Unit = model.refTrainOrderMixin(TestModel, new Map());
      expect(Unit).to.be.an('function');

      const unit = new Unit();

      try {
        unit.name;
        throw new Error('Should have thrown an error');
      } catch (err) {
        expect(err).to.not.be.equal(undefined);
        expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToTrainOrder` first.');
      }
    });

    it('Should have the required properties', function() {
      model.injectReferenceDataToTrainOrder(new TestReferenceData());
      const Unit = model.refTrainOrderMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });

    it('Should create a valid instance', function () {
      model.injectReferenceDataToTrainOrder(new TestReferenceData());
      const Unit = model.refTrainOrderMixin(TestModel, testModelSymbols);

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.name).to.be.an('string');
      expect(unit.name).to.be.equal('testLocation');
    });

    it('Should create an invalid instance', function () {
      model.injectReferenceDataToTrainOrder(new TestReferenceData());
      const Unit = model.refTrainOrderMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.name).to.be.equal(null);
    });
  });
};
