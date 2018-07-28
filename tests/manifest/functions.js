'use strict';
const chai = require('chai');
const chaiUUID = require('chai-uuid');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

let model = require('../../lib/common/manifest');

const standardConfig = require('../templates/manifest/manifest.json');
const altConfig = require('../templates/manifest/manifestAlt.json');

const tmpDir = path.join(__dirname, '../../.tmp/tests');
const tmpPath = path.join(tmpDir, 'manifest.json');

chai.use(chaiUUID);

const { expect } = chai;

module.exports = function () {
  describe('Functional suite', function () {
    describe('loadManifest()', function() {
      beforeEach(function() {
        return fs.ensureDir(tmpDir);
      });

      afterEach(function() {
        return fs.emptyDir(tmpDir);
      });

      it('Should read a manifest file when autoload false', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            expect(unit.manifestId).to.be.equal(null);
            return unit.loadManifest(false);
          })
          .then((manifest) => {
            expect(manifest.manifestId).to.be.equal(standardConfig.manifestId);
            expect(manifest.v3).to.be.an('object');
            expect(manifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
            expect(manifest.v8).to.be.an('object');
            expect(manifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);
            done();
          })
          .catch(done);
      });

      it('Should read a manifest file when autoload true', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });
        let modifiedTime = 0;

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            return fs.stat(tmpPath);
          })
          .then((stats) => {
            modifiedTime = moment(stats.mtime);

            expect(modifiedTime).to.not.be.equal(0);
            expect(unit.manifestId).to.be.equal(null);

            return new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
          })
          .then(() => {
            return unit.loadManifest(true);
          })
          .then((manifest) => {
            expect(manifest).to.be.equal(undefined);

            return fs.stat(tmpPath);
          })
          .then((stats) => {
            const newModifiedTime = moment(stats.mtime);

            expect(newModifiedTime.isSame(modifiedTime), `"${newModifiedTime}" was the same as "${modifiedTime}"`).to.be.equal(false);
            expect(newModifiedTime.isAfter(modifiedTime), `"${newModifiedTime}" was not after "${modifiedTime}"`).to.be.equal(true);
            expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

            done();
          })
          .catch(done);
      });

      it('Should read a manifest file when autoload defults to true', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });
        let modifiedTime = 0;

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            return fs.stat(tmpPath);
          })
          .then((stats) => {
            modifiedTime = moment(stats.mtime);

            expect(modifiedTime).to.not.be.equal(0);
            expect(unit.manifestId).to.be.equal(null);

            return new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
          })
          .then(() => {
            return unit.loadManifest();
          })
          .then((manifest) => {
            expect(manifest).to.be.equal(undefined);

            return fs.stat(tmpPath);
          })
          .then((stats) => {
            const newModifiedTime = moment(stats.mtime);

            expect(newModifiedTime.isSame(modifiedTime), `"${newModifiedTime}" was the same as "${modifiedTime}"`).to.be.equal(false);
            expect(newModifiedTime.isAfter(modifiedTime), `"${newModifiedTime}" was not after "${modifiedTime}"`).to.be.equal(true);
            expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

            done();
          })
          .catch(done);
      });

      it('Should create a manifest file when non present', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        unit.loadManifest(false)
          .then((manifest) => {
            expect(manifest).to.be.an('object');
            expect(manifest.manifestId).to.be.equal(undefined);
            done();
          })
          .catch(done);
      });
    });

    describe('loadManifestSync()', function() {
      beforeEach(function() {
        return fs.ensureDir(tmpDir);
      });

      afterEach(function() {
        return fs.emptyDir(tmpDir);
      });

      it('Should read a manifest file when autoload false', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            expect(unit.manifestId).to.be.equal(null);
            return unit.loadManifestSync(false);
          })
          .then((manifest) => {
            expect(manifest.manifestId).to.be.equal(standardConfig.manifestId);
            expect(manifest.v3).to.be.an('object');
            expect(manifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
            expect(manifest.v8).to.be.an('object');
            expect(manifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);
            done();
          })
          .catch(done);
      });

      it('Should read a manifest file when autoload true', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });
        let modifiedTime = 0;

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            return fs.stat(tmpPath);
          })
          .then((stats) => {
            modifiedTime = moment(stats.mtime);

            expect(modifiedTime).to.not.be.equal(0);
            expect(unit.manifestId).to.be.equal(null);

            return new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
          })
          .then(() => {
            return unit.loadManifestSync(true);
          })
          .then((manifest) => {
            expect(manifest).to.be.equal(undefined);

            return fs.stat(tmpPath);
          })
          .then((stats) => {
            const newModifiedTime = moment(stats.mtime);

            expect(newModifiedTime.isSame(modifiedTime), `"${newModifiedTime}" was the same as "${modifiedTime}"`).to.be.equal(false);
            expect(newModifiedTime.isAfter(modifiedTime), `"${newModifiedTime}" was not after "${modifiedTime}"`).to.be.equal(true);
            expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

            done();
          })
          .catch(done);
      });

      it('Should read a manifest file when autoload defults to true', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });
        let modifiedTime = 0;

        fs.writeJson(tmpPath, standardConfig)
          .then(() => {
            return fs.stat(tmpPath);
          })
          .then((stats) => {
            modifiedTime = moment(stats.mtime);

            expect(modifiedTime).to.not.be.equal(0);
            expect(unit.manifestId).to.be.equal(null);


            return new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
          })
          .then(() => {
            return unit.loadManifestSync();
          })
          .then((manifest) => {
            expect(manifest).to.be.equal(undefined);

            return fs.stat(tmpPath);
          })
          .then((stats) => {
            const newModifiedTime = moment(stats.mtime);

            expect(newModifiedTime.isSame(modifiedTime), `"${newModifiedTime}" was the same as "${modifiedTime}"`).to.be.equal(false);
            expect(newModifiedTime.isAfter(modifiedTime), `"${newModifiedTime}" was not after "${modifiedTime}"`).to.be.equal(true);
            expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

            done();
          })
          .catch(done);
      });

      it('Should create a manifest file when non present', function() {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        fs.writeJsonSync(tmpPath, standardConfig);

        expect(unit.manifestId).to.be.equal(null);

        const manifest = unit.loadManifestSync(false);

        expect(manifest.manifestId).to.be.equal(standardConfig.manifestId);
        expect(manifest.v3).to.be.an('object');
        expect(manifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
        expect(manifest.v8).to.be.an('object');
        expect(manifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);
      });
    });

    describe('saveManifest()', function() {
      beforeEach(function() {
        return fs.ensureDir(tmpDir)
          .then(() => { return fs.emptyDir(tmpDir); });
      });

      afterEach(function() {
        return fs.emptyDir(tmpDir);
      });

      it('should save the current manifest file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: { manifestId: '7' } });

        expect(unit.manifestId).to.be.equal('7');

          unit.saveManifest()
          .then(() => {
            return fs.access(tmpPath, fs.constants.W_OK || fs.constants.R_OK);
          })
          .then(() => {
            return fs.readJson(tmpPath)
          })
          .then((fileManifest) => {
            expect(fileManifest).to.be.an('object');
            expect(fileManifest).to.have.all.keys(['manifestId']);
            expect(fileManifest.manifestId).to.be.equal('7');
            done();
          })
          .catch(done);
      });

      it('should save the current empty manifest file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        expect(unit.manifestId).to.be.equal(null);

          unit.saveManifest()
          .then(() => {
            return fs.access(tmpPath, fs.constants.W_OK || fs.constants.R_OK);
          })
          .then(() => {
            return fs.readJson(tmpPath)
          })
          .then((fileManifest) => {
            expect(fileManifest).to.be.an('object');
            expect(fileManifest).to.not.have.keys(['manifestId']);
            done();
          })
          .catch(done);
      });

      it('should save the current empty manifest file (no manifest)', function(done) {
        const unit = new model.Manifest(tmpDir);

        expect(unit.manifestId).to.be.equal(null);

          unit.saveManifest()
          .then(() => {
            return fs.access(tmpPath, fs.constants.W_OK || fs.constants.R_OK);
          })
          .then(() => {
            return fs.readJson(tmpPath)
          })
          .then((fileManifest) => {
            expect(fileManifest).to.be.an('object');
            expect(fileManifest).to.not.have.keys(['manifestId']);
            done();
          })
          .catch(done);
      });
    });

    describe('saveManifestSync()', function() {
      beforeEach(function() {
        return fs.ensureDir(tmpDir)
          .then(() => { return fs.emptyDir(tmpDir); });
      });

      afterEach(function() {
        return fs.emptyDir(tmpDir);
      });

      it('should save a new manifest file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        unit.saveManifestSync();

        fs.access(tmpPath, fs.constants.R_OK)
          .then(() => {
            return fs.readJson(tmpPath)
          })
          .then((savedManifest) => {
            expect(savedManifest).to.be.an('object');
            expect(savedManifest).to.have.all.keys(['manifestId', 'v3', 'v8']);

            expect(savedManifest.manifestId).to.be.equal(standardConfig.manifestId);
            expect(savedManifest.v3).to.be.an('object');
            expect(savedManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
            expect(savedManifest.v8).to.be.an('object');
            expect(savedManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

            done();
          })
          .catch(done);
      });

      it('should save an empty manifest file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        unit.saveManifestSync();

        fs.access(tmpPath, fs.constants.R_OK)
          .then(() => {
            return fs.readJson(tmpPath)
          })
          .then((savedManifest) => {
            expect(savedManifest).to.be.an('object');
            expect(savedManifest).to.not.have.keys(['manifestId', 'v3', 'v8']);

            done();
          })
          .catch(done);
      });
    });

    describe('updateManifest()', function() {
      it('should load the manifest file (autoload false)', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

        unit.updateManifest(altConfig, false)
          .then((newManifest) => {
            expect(newManifest).to.be.an('object');
            expect(newManifest.manifestId).to.be.an('string');
            expect(newManifest.manifestId).to.be.equal(altConfig.manifestId);
    
            expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

            done();
          })
          .catch(done);
      });

      it('should load an empty manifest file (autoload false)', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        expect(unit.manifestId).to.be.equal(null);

        unit.updateManifest({}, false)
          .then((newManifest) => {
            expect(newManifest).to.be.an('object');
            expect(newManifest).to.not.have.keys('manifestId', 'v3', 'v8');
    
            expect(unit.manifestId).to.be.equal(null);

            done();
          })
          .catch(done);
      });

      it('should load a null manifest file (autoload false)', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        expect(unit.manifestId).to.be.equal(null);

        unit.updateManifest(null, false)
          .then((newManifest) => {
            expect(newManifest).to.be.an('object');
            expect(newManifest).to.not.have.keys('manifestId', 'v3', 'v8');
    
            expect(unit.manifestId).to.be.equal(null);

            done();
          })
          .catch(done);
      });

      it('should load the manifest file (autoload true)', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

        unit.updateManifest(altConfig, true)
          .then((newManifest) => {
            expect(newManifest).to.be.equal(undefined);
            expect(unit.manifestId).to.be.equal(altConfig.manifestId);

            done();
          })
          .catch(done);
      });
    });

    describe('updateManifestSync()', function() {
      it('should load the manifest file (autoload false)', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

        const newManifest = unit.updateManifestSync(altConfig, false);

        expect(newManifest).to.be.an('object');
        expect(newManifest.manifestId).to.be.an('string');
        expect(newManifest.manifestId).to.be.equal(altConfig.manifestId);

        expect(unit.manifestId).to.be.equal(standardConfig.manifestId);
      });

      it('should load an empty manifest file (autoload false)', function() {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        expect(unit.manifestId).to.be.equal(null);

        const newManifest = unit.updateManifestSync({}, false)

        expect(newManifest).to.be.an('object');
        expect(newManifest).to.not.have.keys('manifestId', 'v3', 'v8');

        expect(unit.manifestId).to.be.equal(null);
      });

      it('should load a null manifest file (autoload false)', function() {
        const unit = new model.Manifest(tmpDir, { manifest: {} });

        expect(unit.manifestId).to.be.equal(null);

        const newManifest = unit.updateManifestSync(null, false)
 
        expect(newManifest).to.be.an('object');
        expect(newManifest).to.not.have.keys('manifestId', 'v3', 'v8');

        expect(unit.manifestId).to.be.equal(null);
      });

      it('should load the manifest file (autoload true)', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.be.equal(standardConfig.manifestId);

        const newManifest = unit.updateManifestSync(altConfig, true)

        expect(newManifest).to.be.equal(undefined);
        expect(unit.manifestId).to.be.equal(altConfig.manifestId);
      });
    });

    describe('loadFromFiles()', function() {
      it('should update the manifest file without files', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.not.be.empty;
        expect(unit.manifestId).to.be.an('string');

        const manifestId = unit.manifestId;

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.not.be.equal(undefined);
        expect(unit.baseManifest.v8).to.not.be.equal(undefined);

        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
        expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

        unit.updateFromFiles()
          .then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['manifestId', 'v3', 'v8']);

            expect(result.v3).to.be.an('object');
            expect(result.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
            expect(result.v8).to.be.an('object');
            expect(result.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

            expect(unit.baseManifest).to.be.an('object');
            expect(unit.baseManifest.v3).to.not.be.equal(undefined);
            expect(unit.baseManifest.v8).to.not.be.equal(undefined);
    
            expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
            expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

            expect(result.manifestId).to.be.equal(manifestId);

            done();
          })
          .catch(done);
      });

      it('should update the manifest file with files', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.not.be.empty;
        expect(unit.manifestId).to.be.an('string');

        const manifestId = unit.manifestId;

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.not.be.equal(undefined);
        expect(unit.baseManifest.v8).to.not.be.equal(undefined);

        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
        expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

        unit.updateFromFiles([
          { name: '123456789_ref_v3.json', path: '' },
          { name: '987654321_ref_v8.json', path: '' }
        ])
          .then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['manifestId', 'v3', 'v8']);

            expect(result.v3).to.be.an('object');
            expect(result.v3.timetableId).to.be.equal('123456789');
            expect(result.v8).to.be.an('object');
            expect(result.v8.timetableId).to.be.equal('987654321');

            expect(unit.baseManifest).to.be.an('object');
            expect(unit.baseManifest.v3).to.not.be.equal(undefined);
            expect(unit.baseManifest.v8).to.not.be.equal(undefined);
    
            expect(unit.baseManifest.v3.timetableId).to.be.equal('123456789');
            expect(unit.baseManifest.v8.timetableId).to.be.equal('987654321');

            expect(result.manifestId).to.not.be.equal(manifestId);
            expect(result.manifestId).to.be.a.uuid('v1');

            done();
          })
          .catch(done);
      });

      it('should update the manifest file with just v3 file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.not.be.empty;
        expect(unit.manifestId).to.be.an('string');

        const manifestId = unit.manifestId;

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.not.be.equal(undefined);
        expect(unit.baseManifest.v8).to.not.be.equal(undefined);

        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
        expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

        unit.updateFromFiles([
          { name: '123456789_ref_v3.json', path: '' }
        ])
          .then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['manifestId', 'v3']);

            expect(result.v3).to.be.an('object');
            expect(result.v3.timetableId).to.be.equal('123456789');
            expect(result.v8).to.be.equal(undefined);

            expect(unit.baseManifest).to.be.an('object');
            expect(unit.baseManifest.v3).to.not.be.equal(undefined);
    
            expect(unit.baseManifest.v3.timetableId).to.be.equal('123456789');

            expect(result.manifestId).to.not.be.equal(manifestId);
            expect(result.manifestId).to.be.a.uuid('v1');

            done();
          })
          .catch(done);
      });

      it('should update the manifest file with v8 file', function(done) {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.manifestId).to.not.be.empty;
        expect(unit.manifestId).to.be.an('string');

        const manifestId = unit.manifestId;

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.not.be.equal(undefined);
        expect(unit.baseManifest.v8).to.not.be.equal(undefined);

        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);
        expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

        unit.updateFromFiles([
          { name: '987654321_ref_v8.json', path: '' }
        ])
          .then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.all.keys(['manifestId', 'v8']);

            expect(result.v3).to.be.equal(undefined);
            expect(result.v8).to.be.an('object');
            expect(result.v8.timetableId).to.be.equal('987654321');

            expect(unit.baseManifest).to.be.an('object');
            expect(unit.baseManifest.v8).to.not.be.equal(undefined);
    
            expect(unit.baseManifest.v8.timetableId).to.be.equal('987654321');

            expect(result.manifestId).to.not.be.equal(manifestId);
            expect(result.manifestId).to.be.a.uuid('v1');

            done();
          })
          .catch(done);
      });
    });

    describe('getTimetableId()', function() {
      it('should return the v3 timetableId', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.be.an('object');
        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);

        const timetableId = unit.getTimetableId('v3');

        expect(timetableId).to.be.equal(standardConfig.v3.timetableId);
      });

      it('should return the v8 timetableId', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v8).to.be.an('object');
        expect(unit.baseManifest.v8.timetableId).to.be.equal(standardConfig.v8.timetableId);

        const timetableId = unit.getTimetableId('v8');

        expect(timetableId).to.be.equal(standardConfig.v8.timetableId);
      });

      it('should return null with an invalid input', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.be.an('object');
        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);

        const timetableId = unit.getTimetableId('fakeNews');

        expect(timetableId).to.be.equal(null);
      });

      it('should return null with an undefined input', function() {
        const unit = new model.Manifest(tmpDir, { manifest: standardConfig });

        expect(unit.baseManifest).to.be.an('object');
        expect(unit.baseManifest.v3).to.be.an('object');
        expect(unit.baseManifest.v3.timetableId).to.be.equal(standardConfig.v3.timetableId);

        const timetableId = unit.getTimetableId();

        expect(timetableId).to.be.equal(null);
      });
    });
  });
};
