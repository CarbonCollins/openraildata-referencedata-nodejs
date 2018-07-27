'use strict';

const exportsSuite = require('./exports');
const functionSuite = require('./functions');
const valueSuite = require('./value');

module.exports = function () {
  describe('V3 mixin Suite', function() {
    exportsSuite();
    valueSuite();
    functionSuite();
  });
};