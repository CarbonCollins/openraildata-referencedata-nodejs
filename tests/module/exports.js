const { expect } = require('chai');

const Module = require('../../index.js');

const { DataController } = require('../../lib/common/dataController');
const { Manifest } = require('../../lib/common/manifest');

const { TrainOperatingCompany } = require('../../lib/common/models/trainOperatingCompany');
const { CustomerInformationSystem } = require('../../lib/common/models/customerInformationSystem');
const { LateRunningReason } = require('../../lib/common/models/lateRunningReason');
const { CancellationReason } = require('../../lib/common/models/cancellationReason');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export the module', function() {
      expect(Module).to.be.an('object');
    });

    it('Should export TrainOperatingCompany class', function() {
      expect(Module.TrainOperatingCompany).to.be.an('function');
      expect(new Module.TrainOperatingCompany()).to.be.an('object');
      expect(Module.TrainOperatingCompany).to.be.equal(TrainOperatingCompany);
    });

    it('Should export CustomerInformationSystem class', function() {
      expect(Module.CustomerInformationSystem).to.be.an('function');
      expect(new Module.CustomerInformationSystem()).to.be.an('object');
      expect(Module.CustomerInformationSystem).to.be.equal(CustomerInformationSystem);
    });

    it('Should export LateRunningReason class', function() {
      expect(Module.LateRunningReason).to.be.an('function');
      expect(new Module.LateRunningReason()).to.be.an('object');
      expect(Module.LateRunningReason).to.be.equal(LateRunningReason);
    });

    it('Should export CancellationReason class', function() {
      expect(Module.CancellationReason).to.be.an('function');
      expect(new Module.CancellationReason()).to.be.an('object');
      expect(Module.CancellationReason).to.be.equal(CancellationReason);
    });

    it('Should export Manifest class', function() {
      expect(Module.Manifest).to.be.an('function');
      expect(new Module.Manifest()).to.be.an('object');
      expect(Module.Manifest).to.be.equal(Manifest);
    });

    it('Should export DataController class', function() {
      expect(Module.DataController).to.be.an('function');
      expect(new Module.DataController()).to.be.an('object');
      expect(Module.DataController).to.be.equal(DataController);
    });
  });
};
