const moduleSuite = require('./module/module');

const manifestSuite = require('./manifest/manifest');
const referenceDataSuite = require('./referenceData/referenceData');
const dataControllerSuite = require('./dataController/dataController');
const modelSuite = require('./models/test.all.js');

// const commonSuite = require('./common/common');

// const associationSuite = require('./association/association');
// const locationSuite = require('./location/location');
// const scheduleSuite = require('./schedule/schedule');
// const stationSuite = require('./station/station');
// const stationMessageSuite = require('./stationMessage/stationMessage');
// const trainOrderSuite = require('./trainOrder/trainOrder');
// const trainStatusSuite = require('./trainStatus/trainStatus');
// const viaSuite = require('./via/via');

describe('@openrailuk/referencedata test suite', function () {
  moduleSuite();
  manifestSuite();
  referenceDataSuite();
  modelSuite();
  dataControllerSuite();
});
