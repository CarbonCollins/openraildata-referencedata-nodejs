'use strict';
const { expect } = require('chai');

const model = require('../../lib/es5/dataController');

module.exports = function () {
  describe('Export suite', function () {
    it('Should export', function() {
      expect(model).to.be.an('object');

      expect(model).to.have.all.keys(['DataController', 'symbols']);
    });

    it('Should export DataController Class', function () {
      expect(model.DataController).to.exist;
      expect(model.DataController).to.be.an('function');

      const unit = new model.DataController();

      expect(unit).to.exist;
      expect(unit).to.be.an('object');
    });

    it('Should export symbols', function () {
      expect(model.symbols).to.exist;
      expect(model.symbols).to.be.an.instanceof(Map);
    });
  });
};
