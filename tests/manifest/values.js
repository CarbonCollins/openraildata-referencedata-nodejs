'use strict';
const { expect } = require('chai');
const path = require('path');

const model = require('../../lib/common/manifest');

const standardConfig = require('../templates/manifest/manifest.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.Manifest();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.Manifest);
    });

    it('Should have the required properties', function() {
      const unit = new model.Manifest();

      expect(unit).to.be.an.instanceOf(model.Manifest);
      expect(unit).to.have.all.keys(['manifestPath', 'appManifest']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid populated instance', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, { manifest: standardConfig });

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit[model.symbols.get('manifestPath')]).to.be.an('string');
      expect(unit[model.symbols.get('manifestPath')]).to.be.equal(path.join(testPath, 'manifest.json'));

      expect(unit[model.symbols.get('appManifest')]).to.be.an('object');
      expect(unit[model.symbols.get('appManifest')]).to.be.equal(standardConfig);
    });

    it('Should get the manifest Id', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, { manifest: standardConfig });

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.manifestId).to.be.an('string');
      expect(unit.manifestId).to.be.equal(standardConfig.manifestId);
    });

    it('Should get a null manifest Id', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, {});

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.manifestId).to.be.equal(null);
    });

    it('Should get the manifest timetableIds', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, { manifest: standardConfig });

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.allTimetableIds).to.be.an('object');
      expect(unit.allTimetableIds).to.have.all.keys(['v3', 'v8']);
      expect(unit.allTimetableIds.v3).to.be.an('string');
      expect(unit.allTimetableIds.v3).to.be.equal(standardConfig.v3.timetableId);
      expect(unit.allTimetableIds.v8).to.be.an('string');
      expect(unit.allTimetableIds.v8).to.be.equal(standardConfig.v8.timetableId);
    });

    it('Should get an empty manifest timetableId list', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, {});

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.allTimetableIds).to.be.an('object');
      expect(unit.allTimetableIds).to.not.have.keys(['v3', 'v8']);
    });

    it('Should get the base manifest', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, { manifest: standardConfig });

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.baseManifest).to.be.an('object');
      expect(unit.baseManifest).to.have.all.keys(['v3', 'v8']);
      expect(unit.baseManifest).to.not.have.keys(['timetableId']);
      expect(unit.baseManifest.v3).to.be.an('object');
      expect(unit.baseManifest.v3).to.be.equal(standardConfig.v3);
      expect(unit.baseManifest.v8).to.be.an('object');
      expect(unit.baseManifest.v8).to.be.equal(standardConfig.v8);
    });

    it('Should get a null base manifest', function () {
      const testPath = path.join(__dirname, '../../.tmp');
      const unit = new model.Manifest(testPath, {});

      expect(unit).to.be.an.instanceOf(model.Manifest);

      expect(unit.baseManifest).to.be.equal(null);
    });
  });
};
