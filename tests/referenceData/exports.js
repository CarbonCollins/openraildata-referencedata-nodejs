'use strict';
const { expect } = require('chai');

const model = require('../../lib/es5/referenceData');

const { DataController } = require('../../lib/es5/dataController');
const { Manifest } = require('../../lib/es5/manifest');

const { TrainOperatingCompany } = require('../../lib/es5/models/trainOperatingCompany');
const { CustomerInformationSystem } = require('../../lib/es5/models/customerInformationSystem');
const { LateRunningReason } = require('../../lib/es5/models/lateRunningReason');
const { CancellationReason } = require('../../lib/es5/models/cancellationReason');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['referenceData', 'DataController', 'TrainOperatingCompany', 'CustomerInformationSystem', 'LateRunningReason', 'CancellationReason', 'Manifest']);
    });

    it('Should export DataController Class', function () {
      expect(model.DataController).to.exist;
      expect(model.DataController).to.be.an('function');

      const unit = new model.DataController();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(DataController);
    });

    it('Should export Manifest Class', function () {
      expect(model.Manifest).to.exist;
      expect(model.Manifest).to.be.an('function');

      const unit = new model.Manifest();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(Manifest);
    });

    it('Should export TrainOperatingCompany Class', function () {
      expect(model.TrainOperatingCompany).to.exist;
      expect(model.TrainOperatingCompany).to.be.an('function');

      const unit = new model.TrainOperatingCompany();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(TrainOperatingCompany);
    });

    it('Should export CustomerInformationSystem Class', function () {
      expect(model.CustomerInformationSystem).to.exist;
      expect(model.CustomerInformationSystem).to.be.an('function');

      const unit = new model.CustomerInformationSystem();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(CustomerInformationSystem);
    });

    it('Should export LateRunningReason Class', function () {
      expect(model.LateRunningReason).to.exist;
      expect(model.LateRunningReason).to.be.an('function');

      const unit = new model.LateRunningReason();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(LateRunningReason);
    });

    it('Should export CancellationReason Class', function () {
      expect(model.CancellationReason).to.exist;
      expect(model.CancellationReason).to.be.an('function');

      const unit = new model.CancellationReason();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceof(CancellationReason);
    });
  });
};
