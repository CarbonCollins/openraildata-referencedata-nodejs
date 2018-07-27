'use strict';

const exportsSuite = require('./exports');
const functionSuite = require('./functions');

module.exports = function () {
  describe('dataController.js Suite', function() {
    exportsSuite();
    functionSuite();
  });
};