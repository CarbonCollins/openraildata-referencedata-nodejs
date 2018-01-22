'use strict';

const ReferenceData = require('./lib/refData');
const Manifest = require('./lib/manifest');

const TrainOperatingCompany = require('./lib/models/trainOperatingCompany');
const LateRunningReason = require('./lib/models/lateRunningReason');
const CancellationReason = require('./lib/models/cancellationReason');

/**
 * @module openraildata/referencedata
 * @description the openraildata/referencedata module is used to obtain reference data regarding
 * train timetables, locations, stations,and other related data to the UK train network. The module
 * operated through an ftp server located at datafeeds.nationalrail.co.uk.
 */

/**
 * @external module:openraildata/common
 * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md}
 */
module.exports = new ReferenceData();

module.exports.ReferenceData = ReferenceData;
module.exports.Manifest = Manifest;

module.exports.TrainOperatingCompany = TrainOperatingCompany;
module.exports.LateRunningReason = LateRunningReason;
module.exports.CancellationReason = CancellationReason;