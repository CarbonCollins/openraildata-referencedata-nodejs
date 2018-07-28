'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/refStation');

class TestClass {}

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.to.an('object');

      expect(model).to.have.all.keys(['refStationMixin', 'injectReferenceDataToStation']);

      expect(model.refStationMixin).to.be.an('function');
      expect(model.injectReferenceDataToStation).to.be.an('function');
    });

    it('Should construct a mixed class', function () {
      const Unit = model.refStationMixin(TestClass, new Map());

      expect(Unit).to.be.an('function');

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });
  });
};
