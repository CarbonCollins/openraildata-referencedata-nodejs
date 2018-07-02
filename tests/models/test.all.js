const cancellationSuite = require('./cancellationReason/cancellationReason');
const customerInformationSystemSuite = require('./customerInformationSystem/customerInformationSystem');
const lateRunningReasonSuite = require('./lateRunningReason/lateRunningReason');
const trainOperatingCompanySuite = require('./trainOperatingCompany/trainOperatingCompany');
const scheduleSearchSuite = require('./scheduleSearch/scheduleSearch');
const refAssociationSuite = require('./refAssociation/refAssociation');

module.exports = function () {
  describe('Model suite', function () {
    cancellationSuite();
    customerInformationSystemSuite();
    lateRunningReasonSuite();
    trainOperatingCompanySuite();
    scheduleSearchSuite();
    refAssociationSuite();
  });
};
