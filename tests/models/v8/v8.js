'use strict';

const exportsSuite = require('./exports');
const functionSuite = require('./functions');
const valueSuite = require('./value');

module.exports = function () {
  describe('V8 class Suite', function() {
    exportsSuite();
    valueSuite();
    functionSuite();
  });
};