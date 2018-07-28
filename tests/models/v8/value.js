'use strict';
const { expect } = require('chai');
const { Schedule, Association, Station } = require('@openrailuk/common');
const { refStationMixin } = require('../../../lib/common/models/refStation');
const { TrainOperatingCompany } = require('../../../lib/common/models/trainOperatingCompany');
const { LateRunningReason } = require('../../../lib/common/models/lateRunningReason');
const { CancellationReason } = require('../../../lib/common/models/cancellationReason');
const { CustomerInformationSystem } = require('../../../lib/common/models/customerInformationSystem');

const model = require('../../../lib/common/models/v8');

const MixedStation = refStationMixin(Station, new Map());

const standardConfig = require('../../templates/v8/v8.json');
const standardConfigProxy = require('../../templates/v8/v8Proxy.json');
const standardConfigProxyOP = require('../../templates/v8/v8ProxyOP.json');
const standardConfigProxyFull = require('../../templates/v8/v8ProxyFull.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.V8();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.V8);
    });

    it('Should have the required properties', function() {
      const unit = new model.V8();

      expect(unit).to.be.an.instanceOf(model.V8);
      expect(unit).to.have.all.keys(['timetableId', 'schedules', 'previousSchedules', 'associations']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.V8(standardConfig);

      expect(unit).to.be.an.instanceOf(model.V8);

      expect(unit.timetableId).to.be.an('string');
      expect(unit.timetableId).to.be.equal(standardConfig.PportTimetable.$.timetableID);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.lengthOf(standardConfig.PportTimetable.Journey.length);
      expect(unit.schedules).to.satisfy((schedules) => {
        return schedules.every((schedule) => {
          return schedule instanceof Schedule;
        });
      });

      expect(unit.previousSchedules).to.be.an('array');
      expect(unit.previousSchedules).to.have.lengthOf(0);

      expect(unit.associations).to.be.an('array');
      expect(unit.associations).to.have.lengthOf(standardConfig.PportTimetable.Association.length);
      expect(unit.associations).to.satisfy((associations) => {
        return associations.every((association) => {
          return association instanceof Association;
        });
      });
    });

    it('symbol export should have correct mapping', function () {

      const timetableIdSymbol = model.symbols.get('timetableId');
      expect(timetableIdSymbol).to.be.an('symbol');
      expect(timetableIdSymbol.toString()).to.be.equal('Symbol(timetable id)');

      const schedulesSymbol = model.symbols.get('schedules');
      expect(schedulesSymbol).to.be.an('symbol');
      expect(schedulesSymbol.toString()).to.be.equal('Symbol(schedules)');

      const previousSchedulesSymbol = model.symbols.get('previousSchedules');
      expect(previousSchedulesSymbol).to.be.an('symbol');
      expect(previousSchedulesSymbol.toString()).to.be.equal('Symbol(previous schedules)');

      const associationsSymbol = model.symbols.get('associations');
      expect(associationsSymbol).to.be.an('symbol');
      expect(associationsSymbol.toString()).to.be.equal('Symbol(associations)');
    });

    it('should convert using proxy class correctly', function() {
      const unit = new model.V8(standardConfigProxy);

      expect(unit).to.be.an.instanceOf(model.V8);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.a.lengthOf(1);

      const scheduleIndex0 = unit.schedules[0];
      const refSchedule = standardConfigProxy.PportTimetable.Journey[0];

      expect(scheduleIndex0.rid).to.be.an('string');
      expect(scheduleIndex0.rid).to.be.equal(refSchedule.rid);

      expect(scheduleIndex0.serviceStartingDate).to.be.an('string');
      expect(scheduleIndex0.serviceStartingDate).to.be.equal(refSchedule.ssd);

      expect(scheduleIndex0.trainOperatingCompany).to.be.an('string');
      expect(scheduleIndex0.trainOperatingCompany).to.be.equal(refSchedule.toc);

      expect(scheduleIndex0.trainId).to.be.an('string');
      expect(scheduleIndex0.trainId).to.be.equal(refSchedule.trainId);

      expect(scheduleIndex0.uniqueId).to.be.an('string');
      expect(scheduleIndex0.uniqueId).to.be.equal(refSchedule.uid);

      expect(scheduleIndex0.origin).to.be.an('object');
      expect(scheduleIndex0.origin.tiploc).to.be.equal(refSchedule.OR.tiploc);

      expect(scheduleIndex0.destination).to.be.an('object');
      expect(scheduleIndex0.destination.tiploc).to.be.equal(refSchedule.DT.tiploc);

      expect(scheduleIndex0.passingPoints).to.be.an('array');
      expect(scheduleIndex0.passingPoints).to.have.a.lengthOf(refSchedule.PP.length);
      expect(scheduleIndex0.passingPoints[0]).to.be.an('object');
      expect(scheduleIndex0.passingPoints[0].tiploc).to.be.equal(refSchedule.PP[0].tiploc);

      expect(scheduleIndex0.intermediatePoints).to.be.an('array');
      expect(scheduleIndex0.intermediatePoints).to.have.a.lengthOf(refSchedule.IP.length);
      expect(scheduleIndex0.intermediatePoints[0]).to.be.an('object');
      expect(scheduleIndex0.intermediatePoints[0].tiploc).to.be.equal(refSchedule.IP[0].tiploc);

      expect(scheduleIndex0.qTrain).to.be.an('boolean');
      expect(scheduleIndex0.qTrain).to.be.equal(refSchedule.qtrain);

      expect(scheduleIndex0.category).to.be.an('string');
      expect(scheduleIndex0.category).to.be.equal(refSchedule.trainCat);
    });

    it('should convert using proxy class correctly (Operational)', function() {
      const unit = new model.V8(standardConfigProxyOP);

      expect(unit).to.be.an.instanceOf(model.V8);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.a.lengthOf(1);

      const scheduleIndex0 = unit.schedules[0];
      const refSchedule = standardConfigProxyOP.PportTimetable.Journey[0];

      expect(scheduleIndex0.rid).to.be.an('string');
      expect(scheduleIndex0.rid).to.be.equal(refSchedule.rid);

      expect(scheduleIndex0.serviceStartingDate).to.be.an('string');
      expect(scheduleIndex0.serviceStartingDate).to.be.equal(refSchedule.ssd);

      expect(scheduleIndex0.trainOperatingCompany).to.be.an('string');
      expect(scheduleIndex0.trainOperatingCompany).to.be.equal(refSchedule.toc);

      expect(scheduleIndex0.trainId).to.be.an('string');
      expect(scheduleIndex0.trainId).to.be.equal(refSchedule.trainId);

      expect(scheduleIndex0.uniqueId).to.be.an('string');
      expect(scheduleIndex0.uniqueId).to.be.equal(refSchedule.uid);

      expect(scheduleIndex0.origin).to.be.an('object');
      expect(scheduleIndex0.origin.tiploc).to.be.equal(refSchedule.OPOR.tiploc);

      expect(scheduleIndex0.destination).to.be.an('object');
      expect(scheduleIndex0.destination.tiploc).to.be.equal(refSchedule.OPDT.tiploc);

      expect(scheduleIndex0.passingPoints).to.be.an('array');
      expect(scheduleIndex0.passingPoints).to.have.a.lengthOf(refSchedule.PP.length);
      expect(scheduleIndex0.passingPoints[0]).to.be.an('object');
      expect(scheduleIndex0.passingPoints[0].tiploc).to.be.equal(refSchedule.PP[0].tiploc);

      expect(scheduleIndex0.operationalStops).to.be.an('array');
      expect(scheduleIndex0.operationalStops).to.have.a.lengthOf(refSchedule.OPIP.length);
      expect(scheduleIndex0.operationalStops[0]).to.be.an('object');
      expect(scheduleIndex0.operationalStops[0].tiploc).to.be.equal(refSchedule.OPIP[0].tiploc);

      expect(scheduleIndex0.qTrain).to.be.an('boolean');
      expect(scheduleIndex0.qTrain).to.be.equal(refSchedule.qtrain);

      expect(scheduleIndex0.category).to.be.an('string');
      expect(scheduleIndex0.category).to.be.equal(refSchedule.trainCat);
    });

    it('should convert using proxy class correctly (using post proxy value names)', function() {
      const unit = new model.V8(standardConfigProxyFull);

      expect(unit).to.be.an.instanceOf(model.V8);

      expect(unit.schedules).to.be.an('array');
      expect(unit.schedules).to.have.a.lengthOf(1);

      const scheduleIndex0 = unit.schedules[0];
      const refSchedule = standardConfigProxyFull.PportTimetable.Journey[0];

      expect(scheduleIndex0.rid).to.be.an('string');
      expect(scheduleIndex0.rid).to.be.equal(refSchedule.rid);

      expect(scheduleIndex0.serviceStartingDate).to.be.an('string');
      expect(scheduleIndex0.serviceStartingDate).to.be.equal(refSchedule.serviceStartingDate);

      expect(scheduleIndex0.trainOperatingCompany).to.be.an('string');
      expect(scheduleIndex0.trainOperatingCompany).to.be.equal(refSchedule.trainOperatingCompany);

      expect(scheduleIndex0.trainId).to.be.an('string');
      expect(scheduleIndex0.trainId).to.be.equal(refSchedule.trainId);

      expect(scheduleIndex0.uniqueId).to.be.an('string');
      expect(scheduleIndex0.uniqueId).to.be.equal(refSchedule.uniqueId);

      expect(scheduleIndex0.origin).to.be.an('object');
      expect(scheduleIndex0.origin.tiploc).to.be.equal(refSchedule.origin.tiploc);

      expect(scheduleIndex0.destination).to.be.an('object');
      expect(scheduleIndex0.destination.tiploc).to.be.equal(refSchedule.destination.tiploc);

      expect(scheduleIndex0.passingPoints).to.be.an('array');
      expect(scheduleIndex0.passingPoints).to.have.a.lengthOf(refSchedule.passingPoints.length);
      expect(scheduleIndex0.passingPoints[0]).to.be.an('object');
      expect(scheduleIndex0.passingPoints[0].tiploc).to.be.equal(refSchedule.passingPoints[0].tiploc);

      expect(scheduleIndex0.intermediatePoints).to.be.an('array');
      expect(scheduleIndex0.intermediatePoints).to.have.a.lengthOf(refSchedule.intermediatePoints.length);
      expect(scheduleIndex0.intermediatePoints[0]).to.be.an('object');
      expect(scheduleIndex0.intermediatePoints[0].tiploc).to.be.equal(refSchedule.intermediatePoints[0].tiploc);

      expect(scheduleIndex0.qTrain).to.be.an('boolean');
      expect(scheduleIndex0.qTrain).to.be.equal(refSchedule.qTrain);

      expect(scheduleIndex0.category).to.be.an('string');
      expect(scheduleIndex0.category).to.be.equal(refSchedule.category);
    });
  });
};
