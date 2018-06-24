'use strict';

const exportsSuite = require('./exports');
const valueSuite = require('./values');
// const functionsSuite = require('./functions');


module.exports = function () {
  describe('manifest Suite', function() {
    exportsSuite();
    valueSuite();
    // functionsSuite();
  });
};