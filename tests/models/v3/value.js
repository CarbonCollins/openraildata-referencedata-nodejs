'use strict';
const { expect } = require('chai');
const { Location, Via } = require('@openrailuk/common');
const { TrainOperatingCompany } = require('../../../lib/common/models/trainOperatingCompany');
const { LateRunningReason } = require('../../../lib/common/models/lateRunningReason');
const { CancellationReason } = require('../../../lib/common/models/cancellationReason');
const { CustomerInformationSystem } = require('../../../lib/common/models/customerInformationSystem');

const model = require('../../../lib/common/models/v3');

const standardConfig = require('../../templates/v3/v3.json');


module.exports = function () {
  describe('Value suite', function () {
    it('Should construct with no input', function() {
      const unit = new model.V3();

      expect(unit).to.be.an('object');
      expect(unit).to.be.an.instanceOf(model.V3);
    });

    it('Should have the required properties', function() {
      const unit = new model.V3();

      expect(unit).to.be.an.instanceOf(model.V3);
      expect(unit).to.have.all.keys(['timetableId', 'locations', 'trainOperatingCompanies', 'lateRunningReasons', 'cancellationReasons', 'vias', 'customerInformationSystemSources']
        .map((key) => {
          return model.symbols.get(key)
        }));
    });

    it('Should create a valid instance', function () {
      const unit = new model.V3(standardConfig);

      expect(unit).to.be.an.instanceOf(model.V3);

      expect(unit.timetableId).to.be.an('string');
      expect(unit.timetableId).to.be.equal(standardConfig.PportTimetableRef.$.timetableId);

      expect(unit.locations).to.be.an('array');
      expect(unit.locations).to.have.lengthOf(standardConfig.PportTimetableRef.LocationRef.length);
      expect(unit.locations).to.satisfy((locations) => {
        return locations.every((location) => {
          return location instanceof Location;
        });
      });

      expect(unit.trainOperatingCompanies).to.be.an('array');
      expect(unit.trainOperatingCompanies).to.have.lengthOf(standardConfig.PportTimetableRef.TocRef.length);
      expect(unit.trainOperatingCompanies).to.satisfy((tocs) => {
        return tocs.every((toc) => {
          return toc instanceof TrainOperatingCompany;
        });
      });

      expect(unit.lateRunningReasons).to.be.an('array');
      expect(unit.lateRunningReasons).to.have.lengthOf(standardConfig.PportTimetableRef.LateRunningReasons.length);
      expect(unit.lateRunningReasons).to.satisfy((lrrs) => {
        return lrrs.every((llr) => {
          return llr instanceof LateRunningReason;
        });
      });

      expect(unit.cancellationReasons).to.be.an('array');
      expect(unit.cancellationReasons).to.have.lengthOf(standardConfig.PportTimetableRef.CancellationReasons.length);
      expect(unit.cancellationReasons).to.satisfy((crs) => {
        return crs.every((cr) => {
          return cr instanceof CancellationReason;
        });
      });

      expect(unit.vias).to.be.an('array');
      expect(unit.vias).to.have.lengthOf(standardConfig.PportTimetableRef.Via.length);
      expect(unit.vias).to.satisfy((vias) => {
        return vias.every((via) => {
          return via instanceof Via;
        });
      });

      expect(unit.customerInformationSystemSources).to.be.an('array');
      expect(unit.customerInformationSystemSources).to.have.lengthOf(standardConfig.PportTimetableRef.CISSource.length);
      expect(unit.customerInformationSystemSources).to.satisfy((ciss) => {
        return ciss.every((cis) => {
          return cis instanceof CustomerInformationSystem;
        });
      });
    });

    it('symbol export should have correct mapping', function () {

      const timetableIdSymbol = model.symbols.get('timetableId');
      expect(timetableIdSymbol).to.be.an('symbol');
      expect(timetableIdSymbol.toString()).to.be.equal('Symbol(timetable id)');

      const locationsSymbol = model.symbols.get('locations');
      expect(locationsSymbol).to.be.an('symbol');
      expect(locationsSymbol.toString()).to.be.equal('Symbol(locations)');

      const trainOperatingCompaniesSymbol = model.symbols.get('trainOperatingCompanies');
      expect(trainOperatingCompaniesSymbol).to.be.an('symbol');
      expect(trainOperatingCompaniesSymbol.toString()).to.be.equal('Symbol(train operating companies)');

      const lateRunningReasonsSymbol = model.symbols.get('lateRunningReasons');
      expect(lateRunningReasonsSymbol).to.be.an('symbol');
      expect(lateRunningReasonsSymbol.toString()).to.be.equal('Symbol(late running reasons)');

      const cancellationReasonsSymbol = model.symbols.get('cancellationReasons');
      expect(cancellationReasonsSymbol).to.be.an('symbol');
      expect(cancellationReasonsSymbol.toString()).to.be.equal('Symbol(cancellation reasons)');

      const viasSymbol = model.symbols.get('vias');
      expect(viasSymbol).to.be.an('symbol');
      expect(viasSymbol.toString()).to.be.equal('Symbol(vias)');

      const customerInformationSystemSourcesSymbol = model.symbols.get('customerInformationSystemSources');
      expect(customerInformationSystemSourcesSymbol).to.be.an('symbol');
      expect(customerInformationSystemSourcesSymbol.toString()).to.be.equal('Symbol(customer information system sources)');
    });
  });
};
