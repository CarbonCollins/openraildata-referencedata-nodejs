'use strict';

const ReferenceData = require('./lib/refData');
const Manifest = require('./lib/manifest');

const TOC = require('./lib/models/toc');

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

module.exports.TOC = TOC;