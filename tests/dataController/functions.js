/* global step */

'use strict';

const { Location, Schedule, Association, Via } = require('@openrailuk/common');
const { expect } = require('chai');
const FtpServer = require('ftp-srv');
const fs = require('fs-extra');
const path = require('path');

const refDataDir = path.join(__dirname, '../../reference_data');

let model = require('../../lib/es5/dataController');
const manifestModel = require('../../lib/es5/manifest');
const { V3 } = require('../../lib/es5/models/v3');
const { V8 } = require('../../lib/es5/models/v8');
const { TrainOperatingCompany } = require('../../lib/es5/models/trainOperatingCompany');
const { LateRunningReason } = require('../../lib/es5/models/lateRunningReason');
const { CancellationReason } = require('../../lib/es5/models/cancellationReason');
const { CustomerInformationSystem } = require('../../lib/es5/models/customerInformationSystem');

const modalV3 = require('../mocks/json/123456789_ref_v3.json');
const modalV8 = require('../mocks/json/123456789_v8.json');
const modalManifest = require('../mocks/json/manifest.json');
const oldManifest = require('../mocks/json/manifest.old.json');

const ftpOptions = {
  host: '127.0.0.1',
  port: '3005',
  tls: null
}

module.exports = function () {
  let ftpServer = null;
  let sharedDataController = null;
  const errorCB = (err) => { throw err; };

  before(function(done) {
    fs.emptyDirSync(refDataDir);

    ftpServer = new FtpServer('ftp://127.0.0.1:9876', {});
    ftpServer.log.level('fatal'); // all the debug logs were annoing me

    sharedDataController = new model.DataController({ keepAlive: false });

    ftpServer.on('login', (data, resolve, reject) => {
      if (data.password && data.password === 'customPass') {
        resolve({
          root: path.join(__dirname, '../mocks/ftp'),
          cwd: '/'
        });
      } else {
        reject(new Error('Incorrect password'));
      }
    });
    
    ftpServer.listen()
      .then(() => { done(); })
      .catch(done);
  });

  after(function(done) {
    fs.emptyDirSync(refDataDir);

    ftpServer.close()
      .then(() => { done(); })
      .catch(done);
  });

  describe('Functional suite', function () {
    describe('connect()', function() {
      step('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);

        expect(sharedDataController.connect).to.be.an('function');
      });

      step('should fail to connect to ftp server (incorrect password)', function(done) {
        expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(false);

        const connectedCB = () => {
          done(new Error('Should not connect with invalid password'));
        }

        sharedDataController.once('connected', connectedCB);

        sharedDataController.once('error', (err) => {
          sharedDataController.removeListener('connected', connectedCB);
          expect(err).to.be.an('object');

          expect(err.type).to.be.an('string');
          expect(err.type).to.be.equal('FTPClient');

          expect(err.error.message).to.be.an('string');
          expect(err.error.message).to.be.equal('Incorrect password');

          expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(false);
          done();
        })

        sharedDataController.connect({ host: '127.0.0.1', port: '9876', noAuto: true, keepAlive: false });
      });

      step('should connect to ftp server', function(done) {
        expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(false);

        sharedDataController.once('connected', () => {
          sharedDataController.removeListener('error', errorCB);
          expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(true);
          done();
        });

        sharedDataController.once('error', errorCB)

        sharedDataController.connect({ host: '127.0.0.1', port: '9876', password: 'customPass', noAuto: true, keepAlive: false });
      });

      step('should fire connect event even when already connected', function(done) {
        expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(true);

        sharedDataController.once('connected', () => {
          sharedDataController.removeListener('error', errorCB);
          expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(true);
          done();
        });

        sharedDataController.once('error', errorCB)

        sharedDataController.connect({ host: '127.0.0.1', port: '9876', noAuto: true, keepAlive: false });
      });
    });

    describe('listFTPReferenceFiles()', function() {
      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);

        expect(sharedDataController.listFTPReferenceFiles).to.be.an('function');
      });

      it('should list ref data files in ftp server', function(done) {
        sharedDataController.listFTPReferenceFiles()
          .then((files) => {
            expect(files).to.have.lengthOf.at.least(2);
            expect(files).to.satisfy((fileArr) => {
              return fileArr.every((file) => {
                return file && file.name && typeof file.name === typeof '' && file.name.includes('.xml.gz');
              });
            });
            expect(files).to.satisfy((fileArr) => {
              return fileArr.every((file) => {
                return file && file.path && typeof file.path === typeof '' && file.path === `/${file.name}`;
              });
            });
            done();
          })
          .catch(done);
      });
    });

    describe('getFTPFileSize()', function() {
      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);

        expect(sharedDataController.getFTPFileSize).to.be.an('function');
      });

      it('should get the file size of a ref data file in the ftp', function(done) {
        const refPath = '/123456789_ref_v3.xml.gz';
        sharedDataController.getFTPFileSize({ path: refPath })
          .then((sizeInfo) => {
            expect(sizeInfo).to.be.an('object');

            expect(sizeInfo.path).to.be.an('string');
            expect(sizeInfo.path).to.be.equal(refPath);
            
            expect(sizeInfo.size).to.be.an('number');
            expect(sizeInfo.size).to.be.equal(1787); // compressed size of test v3 ref file
            done();
          })
          .catch(done);
      });

      it('should not get the file size of an invalid file', function(done) {
        const refPath = '/notafile.gz';
        sharedDataController.getFTPFileSize({ path: refPath })
          .then(() => {
            done(new Error('should not return a size'));
          })
          .catch((err) => {
            expect(err.message).to.be.an('string');
            expect(err.message).to.contain('ENOENT: no such file or directory');

            done();
          });
      }).timeout(15000);
    });

    describe('cleanLocalReferenceData()', function() {
      beforeEach(function() {
        return fs.writeFile(path.join(refDataDir, 'testFile.txt'), 'some stuff', 'utf-8')
          .then(() => {
            return fs.writeFile(path.join(refDataDir, 'testFileKeep.txt'), 'some stuff', 'utf-8');
          });
      });

      it('should remove all files except manifest.json', function() {
        return fs.readdir(refDataDir)
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(3);
            expect(files).to.include.members(['manifest.json', 'testFile.txt', 'testFileKeep.txt']);
            return sharedDataController.cleanLocalReferenceData();
          })
          .then(() => {
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(1);
            expect(files).to.include.members(['manifest.json']);
            expect(files).to.not.include.members(['testFile.txt']);
          });
      });

      it('should remove all files except manifest.json and current manifestFiles', function() {
        return fs.readdir(refDataDir)
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(3);
            expect(files).to.include.members(['manifest.json', 'testFile.txt', 'testFileKeep.txt']);

            sharedDataController[model.symbols.get('manifest')][manifestModel.symbols.get('appManifest')] = {
              manifestId: 'fakeManifest',
              test: { name: 'testFileKeep.txt' }
            }

            return sharedDataController.cleanLocalReferenceData();
          })
          .then(() => {
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(2);
            expect(files).to.include.members(['manifest.json', 'testFileKeep.txt']);
            expect(files).to.not.include.members(['testFile.txt']);
          });
      });
    });

    describe('downloadFTPReferenceFile()', function() {
      it('should download a v3 reference file from the ftp and extract it to json', function() {
        return fs.readdir(refDataDir)
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(1);
            expect(files).to.include.members(['manifest.json']);
            expect(files).to.not.include.members(['123456789_ref_v3.json']);

            return sharedDataController.downloadFTPReferenceFile({ path: '/123456789_ref_v3.xml.gz', name: '123456789_ref_v3.xml.gz' });
          })
          .then((result) => {
            expect(result).to.be.an('object');

            expect(result.name).to.be.an('string');
            expect(result.name).to.be.equal('123456789_ref_v3.json');

            expect(result.path).to.be.an('string');
            expect(path.normalize(result.path)).to.be.equal(path.normalize(path.join(refDataDir, '123456789_ref_v3.json')));

            return fs.readJson(result.path);
          })
          .then((v3Json) => {
            expect(v3Json).to.be.an('object');
            expect(v3Json).to.be.deep.equal(modalV3);
          });
      });

      it('should download a v8 reference file from the ftp and extract it to json', function() {
        return fs.readdir(refDataDir)
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf.at.least(1);
            expect(files).to.include.members(['manifest.json']);
            expect(files).to.not.include.members(['123456789_v8.json']);

            return sharedDataController.downloadFTPReferenceFile({ path: '/123456789_v8.xml.gz', name: '123456789_v8.xml.gz' });
          })
          .then((result) => {
            expect(result).to.be.an('object');

            expect(result.name).to.be.an('string');
            expect(result.name).to.be.equal('123456789_v8.json');

            expect(result.path).to.be.an('string');
            expect(path.normalize(result.path)).to.be.equal(path.normalize(path.join(refDataDir, '123456789_v8.json')));

            return fs.readJson(result.path);
          })
          .then((v8Json) => {
            expect(v8Json).to.be.an('object');
            expect(v8Json).to.be.deep.equal(modalV8);
          });
      });

      it('should fire download events when downloading a reference file', function() {
        const compressedSize = 1787;
        let downloadStartFired = false;
        let downloadChunkFired = false;
        let downloadEndFired = false;

        sharedDataController.once('download', (data) => {
          expect(data).to.be.an('object');

          expect(data.name).to.be.an('string');
          expect(data.name).to.be.equal('123456789_ref_v3.xml.gz');

          expect(data.size).to.be.an('number');
          expect(data.size).to.be.equal(compressedSize);

          expect(data.filePath).to.be.an('string');
          expect(path.normalize(data.filePath)).to.be.equal(path.normalize(path.join(refDataDir, '123456789_ref_v3.json')));

          expect(data.finalName).to.be.an('string');
          expect(data.finalName).to.be.equal('123456789_ref_v3.json');

          expect(downloadStartFired).to.be.equal(false);
          expect(downloadChunkFired).to.be.equal(false);
          expect(downloadEndFired).to.be.equal(false);

          downloadStartFired = true;
        });

        sharedDataController.once('downloadChunk', (data) => {
          expect(data).to.be.an('object');

          expect(data.name).to.be.an('string');
          expect(data.name).to.be.equal('123456789_ref_v3.xml.gz');

          expect(data.size).to.be.an('number');
          expect(data.size).to.be.equal(compressedSize);

          expect(data.filePath).to.be.an('string');
          expect(path.normalize(data.filePath)).to.be.equal(path.normalize(path.join(refDataDir, '123456789_ref_v3.json')));

          expect(data.finalName).to.be.an('string');
          expect(data.finalName).to.be.equal('123456789_ref_v3.json');

          expect(data.chunkSize).to.be.an('number');
          expect(data.chunkSize).to.be.greaterThan(0);
          expect(data.chunkSize).to.be.at.most(compressedSize);

          expect(downloadStartFired).to.be.equal(true);
          expect(downloadEndFired).to.be.equal(false);

          downloadChunkFired = true;
        });

        sharedDataController.once('downloadEnd', (data) => {
          expect(data).to.be.an('object');

          expect(data.name).to.be.an('string');
          expect(data.name).to.be.equal('123456789_ref_v3.xml.gz');

          expect(data.size).to.be.an('number');
          expect(data.size).to.be.equal(compressedSize);

          expect(data.filePath).to.be.an('string');
          expect(path.normalize(data.filePath)).to.be.equal(path.normalize(path.join(refDataDir, '123456789_ref_v3.json')));

          expect(data.finalName).to.be.an('string');
          expect(data.finalName).to.be.equal('123456789_ref_v3.json');

          expect(data.chunkSize).to.be.an('number');
          expect(data.chunkSize).to.be.greaterThan(0);
          expect(data.chunkSize).to.be.at.most(compressedSize);

          expect(downloadStartFired).to.be.equal(true);
          expect(downloadChunkFired).to.be.equal(true);
          expect(downloadEndFired).to.be.equal(false);

          downloadEndFired = true;
        });

        return sharedDataController.downloadFTPReferenceFile({ path: '/123456789_ref_v3.xml.gz', name: '123456789_ref_v3.xml.gz', size: compressedSize })
          .then(() => {
            expect(downloadStartFired).to.be.equal(true);
            expect(downloadChunkFired).to.be.equal(true);
            expect(downloadEndFired).to.be.equal(true);
          });
      });

      it('should fire an error event when downloading an invalid file', function(done) {
        const compressedSize = 1787;
        const ftpName = 'corruptxml.gz';
        const fileName = 'corrupt.json';
        let downloadErrorFired = false;

        sharedDataController.once('downloadError', (data) => {
          expect(data.message).to.be.an('string');
          expect(data.message).to.be.equal('unexpected end of file');

          downloadErrorFired = true;
        });

        sharedDataController.downloadFTPReferenceFile({ path: `/${ftpName}`, name: ftpName, size: compressedSize })
          .then(() => {
            done(new Error('should not resolve with corrupt gz file'));
          })
          .catch((err) => {
            expect(err.message).to.be.an('string');
            expect(err.message).to.be.equal('unexpected end of file');

            expect(downloadErrorFired).to.be.equal(true);

            done();
          });
      });
    });

    describe('parseReferenceData()', function() {
      let updateFired = false;

      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);

        expect(sharedDataController.parseReferenceData).to.be.an('function');
      });

      it('should parse a v3 data file', function() {
        let refDataName = '123456789_ref_v3.json';
        sharedDataController[model.symbols.get('manifest')][manifestModel.symbols.get('appManifest')] = {
          manifestId: 'fakeManifest',
          v3: { name: refDataName, path: path.join(__dirname, '../mocks/json/123456789_ref_v3.json') }
        }

        sharedDataController.once('update', (data) => {
          expect(data.type).to.be.an('string');
          expect(data.type).to.be.equal('reference');

          updateFired = true;
        });

        return sharedDataController.parseReferenceData()
          .then(() => {
            expect(sharedDataController.v3).to.be.an('object');
            expect(sharedDataController.v3).to.be.an.instanceOf(V3);

            expect(sharedDataController.v3.timetableId).to.be.an('string');
            expect(sharedDataController.v3.timetableId).to.be.equal(modalV3.PportTimetableRef.$.timetableId);
            
            expect(sharedDataController.v3.locations).to.be.an('array');
            expect(sharedDataController.v3.locations).to.have.a.lengthOf(modalV3.PportTimetableRef.LocationRef.length);
            expect(sharedDataController.v3.locations).to.satisfy((locations) => {
              return locations.every((location) => {
                return location instanceof Location;
              });
            });

            expect(sharedDataController.v3.trainOperatingCompanies).to.be.an('array');
            expect(sharedDataController.v3.trainOperatingCompanies).to.have.a.lengthOf(modalV3.PportTimetableRef.TocRef.length);
            expect(sharedDataController.v3.trainOperatingCompanies).to.satisfy((tocs) => {
              return tocs.every((toc) => {
                return toc instanceof TrainOperatingCompany;
              });
            });

            expect(sharedDataController.v3.lateRunningReasons).to.be.an('array');
            expect(sharedDataController.v3.lateRunningReasons).to.have.a.lengthOf(modalV3.PportTimetableRef.LateRunningReasons.length);
            expect(sharedDataController.v3.lateRunningReasons).to.satisfy((lrrs) => {
              return lrrs.every((llr) => {
                return llr instanceof LateRunningReason;
              });
            });

            expect(sharedDataController.v3.cancellationReasons).to.be.an('array');
            expect(sharedDataController.v3.cancellationReasons).to.have.a.lengthOf(modalV3.PportTimetableRef.CancellationReasons.length);
            expect(sharedDataController.v3.cancellationReasons).to.satisfy((crs) => {
              return crs.every((cr) => {
                return cr instanceof CancellationReason;
              });
            });

            expect(sharedDataController.v3.vias).to.be.an('array');
            expect(sharedDataController.v3.vias).to.have.a.lengthOf(modalV3.PportTimetableRef.Via.length);
            expect(sharedDataController.v3.vias).to.satisfy((vias) => {
              return vias.every((via) => {
                return via instanceof Via;
              });
            });

            expect(sharedDataController.v3.customerInformationSystemSources).to.be.an('array');
            expect(sharedDataController.v3.customerInformationSystemSources).to.have.a.lengthOf(modalV3.PportTimetableRef.CISSource.length);
            expect(sharedDataController.v3.customerInformationSystemSources).to.satisfy((ciss) => {
              return ciss.every((cis) => {
                return cis instanceof CustomerInformationSystem;
              });
            });

            expect(updateFired).to.be.equal(true);
          });
      });
    });

    it('should parse a v8 data file', function() {
      let updateFired = false;
      let refDataName = '123456789_v8.json';
      sharedDataController[model.symbols.get('manifest')][manifestModel.symbols.get('appManifest')] = {
        manifestId: 'fakeManifest',
        v8: { name: refDataName, path: path.join(__dirname, '../mocks/json/123456789_v8.json') }
      }

      sharedDataController.once('update', (data) => {
        expect(data.type).to.be.an('string');
        expect(data.type).to.be.equal('reference');

        updateFired = true;
      });

      return sharedDataController.parseReferenceData()
        .then(() => {
          expect(sharedDataController.v8).to.be.an('object');
          expect(sharedDataController.v8).to.be.an.instanceOf(V8);

          expect(sharedDataController.v8.timetableId).to.be.an('string');
          expect(sharedDataController.v8.timetableId).to.be.equal(modalV8.PportTimetable.$.timetableID);
          
          expect(sharedDataController.v8.schedules).to.be.an('array');
          expect(sharedDataController.v8.schedules).to.have.a.lengthOf(modalV8.PportTimetable.Journey.length);
          expect(sharedDataController.v8.schedules).to.satisfy((schedules) => {
            return schedules.every((schedule) => {
              return schedule instanceof Schedule;
            });
          });

          expect(sharedDataController.v8.associations).to.be.an('array');
          expect(sharedDataController.v8.associations).to.have.a.lengthOf(modalV8.PportTimetable.Association.length);
          expect(sharedDataController.v8.associations).to.satisfy((associations) => {
            return associations.every((association) => {
              return association instanceof Association;
            });
          });

          expect(updateFired).to.be.equal(true);
        });
    });

    describe('updateLocalReferenceData()', function() {
      let isDownloading = false;

      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);
  
        expect(sharedDataController.updateLocalReferenceData).to.be.an('function');
      });

      it('should download all reference files sequentialy', function() {

        sharedDataController.on('download', () => {
          expect(isDownloading).to.be.equal(false);

          isDownloading = true;
        });

        sharedDataController.on('downloadEnd', (data) => {
          expect(isDownloading).to.be.equal(true);

          isDownloading = false;
        });

        return fs.emptyDir(refDataDir)
          .then(() => {
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(0);
            return sharedDataController.updateLocalReferenceData();
          })
          .then(() => {
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(3);
            expect(files).to.include.members(['manifest.json', '123456789_ref_v3.json', '123456789_v8.json']);
          });
      });
    });

    describe('checkForReferenceDataUpdate()', function() {
      let downloadFired = false;
      let dataReadyFired = false;

      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);
  
        expect(sharedDataController.checkForReferenceDataUpdate).to.be.an('function');
      });

      it('should not download new files as current ones are up to date', function() {
        sharedDataController.once('dataReady', () => {
          dataReadyFired = true;
        });

        sharedDataController.on('download', (data) => {
          downloadFired = true;
        });

        
        return fs.emptyDir(refDataDir)
        .then(() => { return fs.writeJson(path.join(refDataDir, 'manifest.json'), modalManifest); })
        .then(() => { return fs.writeJson(path.join(refDataDir, '123456789_ref_v3.json'), modalV3); })
        .then(() => { return fs.writeJson(path.join(refDataDir, '123456789_v8.json'), modalV8); })
        .then(() => { return sharedDataController[model.symbols.get('manifest')].loadManifest(true); })
        .then(() => { return fs.readdir(refDataDir); })
        .then((files) => {
          expect(files).to.be.an('array');
          expect(files).to.have.a.lengthOf(3);
          expect(files).to.include.members(['manifest.json', '123456789_ref_v3.json', '123456789_v8.json']);
          expect(sharedDataController[model.symbols.get('manifest')].manifestId).to.be.equal(modalManifest.manifestId);

          return sharedDataController.checkForReferenceDataUpdate();
        })
        .then(() => {
          expect(downloadFired).to.be.equal(false);
          expect(dataReadyFired).to.be.equal(true);
        })
      });

      it('should download new files as current ones are out to date', function() {
        sharedDataController.once('dataReady', () => {
          dataReadyFired = true;
        });

        sharedDataController.on('download', (data) => {
          downloadFired = true;
        });

        return fs.emptyDir(refDataDir)
          .then(() => { return fs.writeJson(path.join(refDataDir, 'manifest.json'), oldManifest); })
          .then(() => { return fs.writeJson(path.join(refDataDir, '123456788_ref_v3.json'), modalV3); })
          .then(() => { return fs.writeJson(path.join(refDataDir, '123456788_v8.json'), modalV8); })
          .then(() => { return sharedDataController[model.symbols.get('manifest')].loadManifest(true); })
          .then(() => { return fs.readdir(refDataDir); })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(3);
            expect(files).to.include.members(['manifest.json', '123456788_ref_v3.json', '123456788_v8.json']);
            expect(sharedDataController[model.symbols.get('manifest')].manifestId).to.be.equal(oldManifest.manifestId);

            return sharedDataController.checkForReferenceDataUpdate();
          })
          .then(() => {
            expect(downloadFired).to.be.equal(true);
            expect(dataReadyFired).to.be.equal(true);
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(3);
            expect(files).to.include.members(['manifest.json', '123456789_ref_v3.json', '123456789_v8.json']);
          })
      });

      it('should download new files if no manifest is present', function() {
        sharedDataController.once('dataReady', () => {
          dataReadyFired = true;
        });

        sharedDataController.on('download', (data) => {
          downloadFired = true;
        });

        return fs.emptyDir(refDataDir)
          .then(() => {
            sharedDataController[model.symbols.get('manifest')][manifestModel.symbols.get('appManifest')] = {};
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(0);

            return sharedDataController.checkForReferenceDataUpdate();
          })
          .then(() => {
            expect(downloadFired).to.be.equal(true);
            expect(dataReadyFired).to.be.equal(true);
            return fs.readdir(refDataDir);
          })
          .then((files) => {
            expect(files).to.be.an('array');
            expect(files).to.have.a.lengthOf(3);
            expect(files).to.include.members(['manifest.json', '123456789_ref_v3.json', '123456789_v8.json']);
          })
      });
    });

    describe('ftpClose()', function() {
      it('should be a callable function', function() {
        expect(sharedDataController).to.be.an('object');
        expect(sharedDataController).to.be.an.instanceOf(model.DataController);
  
        expect(sharedDataController.ftpClose).to.be.an('function');
      });

      it('should close the current connection without reconnecting', function(done) {
        let reconnectingFired = false;
        let disconnectFired = false;

        sharedDataController.once('reconnecting', function() {
          reconnectingFired = true;
        });

        sharedDataController.once('disconnected', (options) => {
          expect(options).to.be.an('object');
          expect(options.keepAlive).to.be.an('boolean');
          expect(options.keepAlive).to.be.equal(false);
          disconnectFired = true;
        });

        sharedDataController.once('connected', function() {
          expect(sharedDataController[model.symbols.get('keepAlive')]).to.be.equal(false);
          expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(true);

          sharedDataController.ftpClose()

          expect(reconnectingFired).to.be.equal(false);
          expect(disconnectFired).to.be.equal(true);
          done();
        });

        sharedDataController.connect({ noAuto: true });
      });

      it('should close the current connection and then reconnect', function(done) {
        let reconnectingFired = false;
        let disconnectFired = false;

        sharedDataController.once('reconnecting', (options) => {
          expect(options).to.be.an('object');

          expect(options.keepAlive).to.be.an('boolean');
          expect(options.keepAlive).to.be.equal(true);

          expect(options.reconnectDelay).to.be.an('number');
          expect(options.reconnectDelay).to.be.equal(1000);

          reconnectingFired = true;
        });

        sharedDataController.once('disconnected', (options) => {
          expect(options).to.be.an('object');
          expect(options.keepAlive).to.be.an('boolean');
          expect(options.keepAlive).to.be.equal(true);
          disconnectFired = true;
        });

        sharedDataController.once('connected', function() {
          sharedDataController[model.symbols.get('keepAlive')] = true;

          expect(sharedDataController[model.symbols.get('keepAlive')]).to.be.equal(true);
          expect(sharedDataController[model.symbols.get('ftpConnected')]).to.be.equal(true);

          sharedDataController.once('connected', (options) => {
            expect(options).to.be.an('object');
  
            expect(reconnectingFired).to.be.equal(true);
            expect(disconnectFired).to.be.equal(true);
  
            done()
          }).timeout(5000);

          sharedDataController.ftpClose()
        });

        sharedDataController.connect({ noAuto: true });
      });
    })
  });
};
