'use strict';

const { expect } = require('chai');
const { Schedule, Location } = require('@openrailuk/common');

let model = require('../../../lib/common/models/refAssociation');

const testModelSymbols = new Map()
  .set('tiploc', 'tiploc');

class TestModel {
  get tiploc() { return 'TestTIPLOC' }
  get testVal() { return true; }
}

class TestReferenceData {
  get v3() {
    return {
      getLocation: (input) => {
        return new Location({ tiploc: 'getLocation', computerReservationSystem: input });
      }
    }
  }
}

module.exports = function () {
  describe('Functional suite', function () {
    describe('getLocation()', function() {
      it('should be a callable function', function() {
        model.injectReferenceDataToAssociation(new TestReferenceData());
        const Unit = model.refAssociationMixin(TestModel, testModelSymbols);
  
        const unit = new Unit();
  
        expect(unit).to.be.an.instanceOf(Unit);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(Unit);

        expect(unit.getLocation).to.be.an('function');
      });

      it('should return a location', function() {
        model.injectReferenceDataToAssociation(new TestReferenceData());
        const Unit = model.refAssociationMixin(TestModel, testModelSymbols);
  
        const unit = new Unit();
  
        expect(unit).to.be.an.instanceOf(Unit);

        const result = unit.getLocation();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Location);
        expect(result.tiploc).to.be.equal('getLocation');
      });

      it('should return a null location with no symbols', function() {
        model.injectReferenceDataToAssociation(new TestReferenceData());
        const Unit = model.refAssociationMixin(TestModel, new Map());
  
        const unit = new Unit();
  
        expect(unit).to.be.an.instanceOf(Unit);

        const result = unit.getLocation();

        expect(result).to.be.equal(null);
      });

      it('should return a null location with no reference data', function() {
        model.injectReferenceDataToAssociation(null);
        const Unit = model.refAssociationMixin(TestModel, testModelSymbols);
  
        const unit = new Unit();
  
        expect(unit).to.be.an.instanceOf(Unit);

        try {
          unit.getLocation();
          throw new Error('Should have thrown an error');
        } catch (err) {
          expect(err).to.not.be.equal(undefined);
          expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToAssociation` first.');
        }
      });
    });
  });
};
