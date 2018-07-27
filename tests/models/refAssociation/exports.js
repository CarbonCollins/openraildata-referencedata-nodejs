'use strict';
const { expect } = require('chai');

const model = require('../../../lib/es5/models/refAssociation');

class TestClass {}

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.to.an('object');

      expect(model).to.have.all.keys(['refAssociationMixin', 'injectReferenceDataToAssociation']);

      expect(model.refAssociationMixin).to.be.an('function');
      expect(model.injectReferenceDataToAssociation).to.be.an('function');
    });

    it('Should construct a mixed class', function () {
      const Unit = model.refAssociationMixin(TestClass, new Map());

      expect(Unit).to.be.an('function');

      const unit = new Unit();

      expect(unit).to.be.an.instanceOf(Unit);
    });
  });
};
