'use strict';
const { expect } = require('chai');

const model = require('../../lib/es5/manifest');


module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');
    });

    it('Should export symbols', function() {
      expect(model.symbols).to.not.be.equal(undefined);
      expect(model.symbols).to.be.an.instanceOf(Map);
    });

    it('Should export Manifst class', function() {
      expect(model.Manifest).to.not.be.equal(undefined);
      expect(model.Manifest).to.be.an('function');
    });

    it('should not have any extra exports', function () {
      expect(model).to.have.all.keys(['Manifest', 'symbols']);
    });
  });
};
