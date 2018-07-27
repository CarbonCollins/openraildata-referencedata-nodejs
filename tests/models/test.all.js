const cancellationSuite = require('./cancellationReason/cancellationReason');
const customerInformationSystemSuite = require('./customerInformationSystem/customerInformationSystem');
const lateRunningReasonSuite = require('./lateRunningReason/lateRunningReason');
const trainOperatingCompanySuite = require('./trainOperatingCompany/trainOperatingCompany');
const scheduleSearchSuite = require('./scheduleSearch/scheduleSearch');
const refAssociationSuite = require('./refAssociation/refAssociation');
const refStatonSuite = require('./refStation/refStation');
const refTrainOrderSuite = require('./refTrainOrder/refTrainOrder');
const v3Suite = require('./v3/v3');
const v8Suite = require('./v8/v8');

module.exports = function () {
  describe('Model suite', function () {
    cancellationSuite();
    customerInformationSystemSuite();
    lateRunningReasonSuite();
    trainOperatingCompanySuite();
    scheduleSearchSuite();
    refAssociationSuite();
    refStatonSuite();
    refTrainOrderSuite();
    v3Suite();
    v8Suite();
  });
};
