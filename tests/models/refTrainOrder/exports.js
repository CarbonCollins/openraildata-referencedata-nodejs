'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/refTrainOrder');

class TestClass {}

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.to.an('object');

      expect(model).to.have.all.keys(['refTrainOrderMixin', 'injectReferenceDataToTrainOrder']);

      expect(model.refTrainOrderMixin).to.be.an('function');
      expect(model.injectReferenceDataToTrainOrder).to.be.an('function');
    });

    it('Should construct a mixed class', function () {
      const Unit = model.refTrainOrderMixin(TestClass, new Map());

      expect(Unit).to.be.an('function');

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });
  });
};
