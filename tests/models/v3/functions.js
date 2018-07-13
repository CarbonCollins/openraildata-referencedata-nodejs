'use strict';

const { expect } = require('chai');
const { Location, Via } = require('@openrailuk/common');
const { TrainOperatingCompany } = require('../../../lib/es5/models/trainOperatingCompany');
const { LateRunningReason } = require('../../../lib/es5/models/lateRunningReason');
const { CancellationReason } = require('../../../lib/es5/models/cancellationReason');
const { CustomerInformationSystem } = require('../../../lib/es5/models/customerInformationSystem');

let model = require('../../../lib/es5/models/v3');

const standardConfig = require('../../templates/v3/v3.json');

module.exports = function () {
  describe('Functional suite', function () {
    describe('findLocation()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findLocation).to.be.an('function');
      });

      it('should return one result via tiploc', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLocation('locationTIPLOC');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Location);
        expect(result.tiploc).to.be.an('string');
        expect(result.tiploc).to.be.equal('locationTIPLOC');
      });

      it('should return one result via locationName', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLocation('locationName2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Location);
        expect(result.locationName).to.be.an('string');
        expect(result.locationName).to.be.equal('locationName2');
      });

      it('should return one result via computerReservationSystem', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLocation('computerReservationSystem');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Location);
        expect(result.computerReservationSystem).to.be.an('string');
        expect(result.computerReservationSystem).to.be.equal('computerReservationSystem');
      });

      it('should return null when no input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLocation();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLocation(42);

        expect(result).to.be.equal(null);
      });
    });

    describe('findTrainOperatingCompany()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findTrainOperatingCompany).to.be.an('function');
      });

      it('should return one result via code', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findTrainOperatingCompany('code2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(TrainOperatingCompany);
        expect(result.code).to.be.an('string');
        expect(result.code).to.be.equal('code2');
      });

      it('should return null when no input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findTrainOperatingCompany();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findTrainOperatingCompany(42);

        expect(result).to.be.equal(null);
      });
    });

    describe('findLateRunningReason()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findLateRunningReason).to.be.an('function');
      });

      it('should return one result via code', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLateRunningReason(2);

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(LateRunningReason);
        expect(result.code).to.be.an('number');
        expect(result.code).to.be.equal(2);
      });

      it('should return null when no input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLateRunningReason();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findLateRunningReason({});

        expect(result).to.be.equal(null);
      });
    });

    describe('findCancellationReason()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findCancellationReason).to.be.an('function');
      });

      it('should return one result via code', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCancellationReason('2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(CancellationReason);
        expect(result.code).to.be.an('number');
        expect(result.code).to.be.equal(2);
      });

      it('should return null when no input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCancellationReason();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCancellationReason({});

        expect(result).to.be.equal(null);
      });
    });

    describe('findCustomerInformationSystem()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findCustomerInformationSystem).to.be.an('function');
      });

      it('should return one result via code', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCustomerInformationSystem('cisCode2');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(CustomerInformationSystem);
        expect(result.code).to.be.an('string');
        expect(result.code).to.be.equal('cisCode2');
      });

      it('should return null when no input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCustomerInformationSystem();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findCustomerInformationSystem(42);

        expect(result).to.be.equal(null);
      });
    });

    describe('findVias()', function() {
      it('should be a callable function', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        expect(unit.findVias).to.be.an('function');
      });

      it('should return valid results using computerReservationSystem', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findVias('computerReservationSystem');

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
        expect(result).to.satisfy((vias) => {
          return vias.every((via) => {
            return via instanceof Via;
          });
        });
      });

      it('should return valid results using tiploc', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findVias('locationTIPLOC');

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
        expect(result).to.satisfy((vias) => {
          return vias.every((via) => {
            return via instanceof Via;
          });
        });
      });

      it('should return valid results using locationName', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findVias('locationName');

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
        expect(result).to.satisfy((vias) => {
          return vias.every((via) => {
            return via instanceof Via;
          });
        });
      });

      it('should return no results using invalid input', function() {
        const unit = new model.V3(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V3);

        const result = unit.findVias('not a location');

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(0);
      });
    });
  });
};
