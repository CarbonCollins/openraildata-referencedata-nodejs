'use strict';

const { expect } = require('chai');
const { Schedule, Association } = require('@openrailuk/common');
const { ScheduleSearch } = require('../../../lib/common/models/scheduleSearch');

let model = require('../../../lib/common/models/v8');

const standardConfig = require('../../templates/v8/v8.json');

module.exports = function () {
  describe('Functional suite', function () {
    describe('findSchedule()', function() {
      it('should be a callable function', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        expect(unit.findSchedule).to.be.an('function');
      });

      it('should return one result via rid', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule('scheduleRid');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Schedule);
        expect(result.rid).to.be.an('string');
        expect(result.rid).to.be.equal('scheduleRid');
      });

      it('should return one result via uniqueId', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule('scheduleUniqueId');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Schedule);
        expect(result.uniqueId).to.be.an('string');
        expect(result.uniqueId).to.be.equal('scheduleUniqueId');
      });

      it('should return one result via trainId', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule('scheduleTrainId');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Schedule);
        expect(result.trainId).to.be.an('string');
        expect(result.trainId).to.be.equal('scheduleTrainId');
      });

      it('should return null when no input', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule(42);

        expect(result).to.be.equal(null);
      });

      it('should return null when input is empty string', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findSchedule('');

        expect(result).to.be.equal(null);
      });
    });

    describe('updateSchedule()', function() {
      it('should be a callable function', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        expect(unit.updateSchedule).to.be.an('function');
      });

      it('should update an existing schedule', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const existingSchedule = unit.findSchedule('scheduleRidUpdate');

        expect(existingSchedule).to.be.an('object');
        expect(existingSchedule).to.be.an.instanceOf(Schedule);
        
        unit.updateSchedule(new Schedule({
          rid: 'scheduleRidUpdate',
          trainId: "newTrainId",
          PP: [{}]
        }));

        const newSchedule = unit.findSchedule('scheduleRidUpdate');

        expect(newSchedule).to.be.an('object');
        expect(newSchedule).to.be.an.instanceOf(Schedule);
        expect(newSchedule.trainId).to.be.an('string');
        expect(newSchedule.trainId).to.be.equal('newTrainId');

        expect(unit.previousSchedules).to.be.an('array');
        expect(unit.previousSchedules).to.have.a.lengthOf(1);
      });

      it('should add a new schedule', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const existingSchedule = unit.findSchedule('anonexistant');

        expect(existingSchedule).to.be.equal(null);
        
        unit.updateSchedule(new Schedule({
          rid: 'anonexistant',
          trainId: "newTrainId",
        }));

        const newSchedule = unit.findSchedule('anonexistant');

        expect(newSchedule).to.be.an('object');
        expect(newSchedule).to.be.an.instanceOf(Schedule);
        expect(newSchedule.trainId).to.be.an('string');
        expect(newSchedule.trainId).to.be.equal('newTrainId');
      });

      it('should do nothing with invalid input', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        unit.updateSchedule();
      });
    });

    describe('findAssociation()', function() {
      it('should be a callable function', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        expect(unit.findAssociation).to.be.an('function');
      });

      it('should return one result via mainTrainId', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation('mainTrain');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Association);
        expect(result.mainTrainId).to.be.an('string');
        expect(result.mainTrainId).to.be.equal('mainTrain');
      });

      it('should return one result via associatedTrainId', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation('assocTrain');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Association);
        expect(result.associatedTrainId).to.be.an('string');
        expect(result.associatedTrainId).to.be.equal('assocTrain');
      });

      it('should return one result via tiploc', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation('tiploc');

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(Association);
        expect(result.tiploc).to.be.an('string');
        expect(result.tiploc).to.be.equal('tiploc');
      });

      it('should return null when no input', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation();

        expect(result).to.be.equal(null);
      });

      it('should return null when invalid input', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation(42);

        expect(result).to.be.equal(null);
      });

      it('should return null when input is empty string', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.findAssociation('');

        expect(result).to.be.equal(null);
      });
    });

    describe('runSearch()', function() {
      it('should be a callable function', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        expect(unit.runSearch).to.be.an('function');
      });

      it('should return a ScheduleSearch object with all schedules', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.runSearch();

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(ScheduleSearch);

        expect(result.schedules.length).to.be.equal(standardConfig.PportTimetable.Journey.length);
      });

      it('should return a filtered ScheduleSearch object', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const result = unit.runSearch((o) => { return o.rid === 'scheduleRidUpdate'; });

        expect(result).to.be.an('object');
        expect(result).to.be.an.instanceOf(ScheduleSearch);

        expect(result.schedules.length).to.be.equal(1);
        expect(result.schedules[0].rid).to.be.equal('scheduleRidUpdate');
      });
    });

    describe('findPreviousSchedules()', function() {
      it('should be a callable function', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        expect(unit.findPreviousSchedules).to.be.an('function');
      });

      it('should return one result after updating', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const existingSchedule = unit.findSchedule('scheduleRidUpdate');

        expect(existingSchedule).to.be.an('object');
        expect(existingSchedule).to.be.an.instanceOf(Schedule);

        unit.updateSchedule(new Schedule({
          rid: 'scheduleRidUpdate',
          trainId: "newTrainId",
          PP: [{}]
        }));

        const result = unit.findPreviousSchedules('scheduleRidUpdate');

        expect(result).to.be.an('array');
        expect(result).to.have.a.lengthOf(1);

        expect(result[0]).to.be.an('object');
        expect(result[0]).to.be.an.instanceOf(Schedule);
        expect(result[0].rid).to.be.an('string');
        expect(result[0].rid).to.be.equal('scheduleRidUpdate');
      });

      it('should return no results when no update is done', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const existingSchedule = unit.findSchedule('scheduleRidUpdate');

        expect(existingSchedule).to.be.an('object');
        expect(existingSchedule).to.be.an.instanceOf(Schedule);

        const result = unit.findPreviousSchedules('scheduleRidUpdate');

        expect(result).to.be.an('array');
        expect(result).to.have.a.lengthOf(0);
      });

      it('should return nul when no input is used', function() {
        const unit = new model.V8(standardConfig);

        expect(unit).to.be.an('object');
        expect(unit).to.be.an.instanceOf(model.V8);

        const existingSchedule = unit.findSchedule('scheduleRidUpdate');

        expect(existingSchedule).to.be.an('object');
        expect(existingSchedule).to.be.an.instanceOf(Schedule);

        const result = unit.findPreviousSchedules();

        expect(result).to.be.equal(null);
      });
    });
  });
};
