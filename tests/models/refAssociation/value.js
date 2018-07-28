'use strict';
const { expect } = require('chai');
const { Schedule } = require('@openrailuk/common');

const model = require('../../../lib/common/models/refAssociation');

const testModelSymbols = new Map()
  .set('main', 'main')
  .set('association', 'association');

class TestModel {
  get main() { return new Schedule({ rid: 'main' }); }
  get association() { return new Schedule({ rid: 'association' })}
  get testVal() { return true; }
}

class TestReferenceData {
  get v8() {
    return {
      getSchedule: (input) => {
        return new Schedule({ rid: 'getSchedule', trainOperatingCompany: input });
      }
    };
  }
}

module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const UnitModel = model.refAssociationMixin(TestModel, testModelSymbols);

      expect(UnitModel).to.be.an('function');

      const unit = new UnitModel();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(TestModel);

      expect(unit.testVal).to.be.equal(true);
    });

    it('mainTrainSchedule should throw an error when RefData is not injected', function () {
      model.injectReferenceDataToAssociation(null); // reset injection
      const Unit = model.refAssociationMixin(TestModel, new Map());
      expect(Unit).to.be.an('function');

      const unit = new Unit();

      try {
        unit.mainTrainSchedule();
        throw new Error('Should have thrown an error');
      } catch (err) {
        expect(err).to.not.be.equal(undefined);
        expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToAssociation` first.');
      }
    });

    it('associationTrainSchedule should throw an error when RefData is not injected', function () {
      model.injectReferenceDataToAssociation(null); // reset injection
      const Unit = model.refAssociationMixin(TestModel, new Map());
      expect(Unit).to.be.an('function');

      const unit = new Unit();

      try {
        unit.associationTrainSchedule();
        throw new Error('Should have thrown an error');
      } catch (err) {
        expect(err).to.not.be.equal(undefined);
        expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToAssociation` first.');
      }
    });

    it('Should throw an error when an invalid RefData is injected', function () {
      model.injectReferenceDataToAssociation('just a fantasy'); // reset injection
      const Unit = model.refAssociationMixin(TestModel, new Map());
      expect(Unit).to.be.an('function');

      const unit = new Unit();

      try {
        unit.mainTrainSchedule();
        throw new Error('Should have thrown an error');
      } catch (err) {
        expect(err).to.not.be.equal(undefined);
        expect(err.message).to.be.equal('ReferenceData has not been injected, please run `injectReferenceDataToAssociation` first.');
      }
    });

    it('Should have the required properties', function() {
      model.injectReferenceDataToAssociation(new TestReferenceData());
      const Unit = model.refAssociationMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });

    it('Should create a valid instance', function () {
      model.injectReferenceDataToAssociation(new TestReferenceData());
      const Unit = model.refAssociationMixin(TestModel, testModelSymbols);

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.mainTrainSchedule).to.be.an('object');
      expect(unit.mainTrainSchedule).to.be.an.instanceOf(Schedule);
      expect(unit.mainTrainSchedule.rid).to.be.equal('getSchedule');

      expect(unit.associationTrainSchedule).to.be.an('object');
      expect(unit.associationTrainSchedule).to.be.an.instanceOf(Schedule);
      expect(unit.associationTrainSchedule.rid).to.be.equal('getSchedule');
    });

    it('Should create an invalid instance', function () {
      model.injectReferenceDataToAssociation(new TestReferenceData());
      const Unit = model.refAssociationMixin(TestModel, new Map());

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);

      expect(unit.mainTrainSchedule).to.be.equal(null);
      expect(unit.associationTrainSchedule).to.be.equal(null);
    });
  });
};
