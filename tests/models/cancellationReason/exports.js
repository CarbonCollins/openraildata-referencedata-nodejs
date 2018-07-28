'use strict';
const { expect } = require('chai');

const model = require('../../../lib/common/models/cancellationReason');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['CancellationReason', 'symbols']);
    });

    it('Should export DataController Class', function () {
      expect(model.CancellationReason).to.exist;
      expect(model.CancellationReason).to.be.an('function');

      const unit = new model.CancellationReason();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
