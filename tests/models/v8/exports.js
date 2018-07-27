'use strict';
const { expect } = require('chai');

const model = require('../../../lib/es5/models/v8');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['V8', 'symbols']);
    });

    it('Should export V* Class', function () {
      expect(model.V8).to.exist;
      expect(model.V8).to.be.an('function');

      const unit = new model.V8();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
