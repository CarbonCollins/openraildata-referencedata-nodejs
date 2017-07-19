'use strict';

const common = require('openraildata-common');

/**
 * a class for location information and functions
 * @external Location
 * @see {@link location.md Location}
 */

/**
 * @class
 * @classdesc a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data
 */
class V3RefData {
  /**
   * @constructor
   * @param {Object} refData the raw object contaiting the v3 data
   */
  constructor(refData) {
    this._timetableId = '';
    this._locations = [];
    this._trainOperatorCompanies = [];
    this._lateRunningReasons = [];
    this._cancellationReasons = [];
    this._vias = [];
    this._cisSources = [];

    this.parseRefData(refData);
  }

  /**
   * @desc gets the v3 timetable Id
   * @returns {String} the v3 timetable Id
   * @readonly
   */
  get timetableId() { return this._timetableId; }
  /**
   * @desc gets the location reference data
   * @returns {Object[]} an array of locations
   * @readonly
   */
  get locations() { return this._locations; }
  /**
   * @desc gets the train operating companies reference data
   * @returns {Object[]} an array of train operating companies
   * @readonly
   */
  get tocs() { return this._trainOperatorCompanies; }
  /**
   * @desc alias of tocs
   * @returns {Object[]} an array of train operating companies
   * @see tocs
   * @readonly
   */
  get trainOperatorCompanies() { return this._trainOperatorCompanies; }
  /**
   * @desc gets the late running reason reference data
   * @returns {Object[]} an array of late running reasons
   * @readonly
   */
  get lateRunningReasons() { return this._lateRunningReasons; }
  /**
   * @desc gets the cancelation reasons reference data
   * @returns {Object[]} an array of cancelation reasons
   * @readonly
   */
  get cancellationReasons() { return this._cancellationReasons; }
  /**
   * @desc gets the via reference data
   * @returns {Object[]} an array of vias
   * @readonly
   */
  get vias() { return this._vias; }
  /**
   * @desc gets the cis source data
   * @returns {Object[]} an array of cis data
   * @readonly
   */
  get CISSources() { return this._cisSources; }

  set locations(arr) {
    this._locations = arr.map(location => new common.Location(location));
  }

  /**
   * @method V3RefData~parseRefData
   * @desc parses the raw V3 data into the class
   * @param {Object} refData the raw V3 data in Josn format
   */
  parseRefData(refData) {
    if (refData && refData.PportTimetableRef) {
      this._timetableId = refData.PportTimetableRef.timetableId || '';
      this.locations = refData.PportTimetableRef.LocationRef || [];
      this._trainOperatorCompanies = refData.PportTimetableRef.TocRef || [];
      this._lateRunningReasons = refData.PportTimetableRef.LateRunningReasons.Reason || [];
      this._cancellationReasons = refData.PportTimetableRef.CancellationReasons.Reason || [];
      this._vias = refData.PportTimetableRef.Via || [];
      this._cisSources = refData.PportTimetableRef.CISSource || [];
    }
  }

  /**
   * @method V3RefData~getLocation
   * @desc gets a location from a search input
   * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
   * @returns {Location|null} returns a Location if found or a null if not found
   */
  getLocation(input) { 
    return this._locations.find(o => (o.tpl === input || o.locname === input || o.crs === input));
  }


  /**
   * @method V3RefData~getToc
   * @desc gets a rain operating company from a search input
   * @param {Stirng} input a string containing a search parameter for the toc code
   * @returns {Object} returns a train operating company
   */
  getToc(input) { 
    const toc = this._trainOperatorCompanies.find(o => (o.toc === input));
    return toc;
  }

}

module.exports = V3RefData;
