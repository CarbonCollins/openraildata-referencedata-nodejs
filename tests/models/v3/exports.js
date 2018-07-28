'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/v3');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['V3', 'symbols']);
    });

    it('Should export V3 Class', function () {
      expect(model.V3).to.exist;
      expect(model.V3).to.be.an('function');

      const unit = new model.V3();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
