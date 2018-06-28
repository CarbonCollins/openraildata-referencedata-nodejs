const cancellationSuite = require('./cancellationReason/cancellationReason');
const customerInformationSystemSuite = require('./customerInformationSystem/customerInformationSystem');
const lateRunningReasonSuite = require('./lateRunningReason/lateRunningReason');
const trainOperatingCompanySuite = require('./trainOperatingCompany/trainOperatingCompany');

module.exports = function () {
  describe('Model suite', function () {
    cancellationSuite();
    customerInformationSystemSuite();
    lateRunningReasonSuite();
    trainOperatingCompanySuite();
  });
};
