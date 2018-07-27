'use strict';

const exportsSuite = require('./exports');
const functionSuite = require('./functions');
const valueSuite = require('./value');

module.exports = function () {
  describe('ScheduleSearch Suite', function() {
    exportsSuite();
    functionSuite();
    valueSuite();
  });
};