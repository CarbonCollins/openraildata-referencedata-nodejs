'use strict';

const exportsSuite = require('./exports');
// const functionSuite = require('./functions');
const valueSuite = require('./value');

module.exports = function () {
  describe('refTrainOrder mixin Suite', function() {
    exportsSuite();
    // functionSuite();
    valueSuite();
  });
};