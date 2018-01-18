'use strict';

const { Location } = require('openraildata-common');

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
  constructor(refData = {}) {
    this.payload = (refData.PportTimetableRef)
      ? refData.PportTimetableRef
      : {};

    this.trainOperatorCompanies = [];
    this.lateRunningReasons = [];
    this._cancellationReasons = [];
    this._vias = [];
    this._cisSources = [];
  }

  /**
   * @member {String} timetableId gets the v3 timetable Id
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get timetableId() {
    return (this.payload.timetableId)
      ? this.payload.timetableId
      : null;
  }

  /**
   * @member {Object[]} locations an array of locations
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get locations() {
    return (this.payload.locations)
      ? this.payload.locations
      : [];
  }

  set locations(arr) {
    this.payload.locations = arr.map(location => new Location(location));
  }

  /**
   * @member {Object[]} trainOperatorCompanies an array of train operating companies
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get trainOperatorCompanies() {
    return (this.payload.trainOperatorCompanies)
      ? this.payload.trainOperatorCompanies
      : [];
  }

  /**
   * @member {Object[]} lateRunningReasons an array of late running reasons
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get lateRunningReasons() {
    return (this.payload.lateRunningReasons)
      ? this.payload.lateRunningReasons
      : [];
  }

  /**
   * @member {Object[]} cancellationReasons gets the cancelation reasons reference data
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get cancellationReasons() {
    return (this.payload.cancellationReasons)
      ? this.payload.cancellationReasons
      : [];
  }

  /**
   * @member {Object[]} vias an array of vias
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get vias() {
    return (this.payload.vias)
      ? this.payload.vias
      : [];
  }

  /**
   * @member {Object[]} CISSources an array of cis data
   * @memberof module:openraildata/referencedata#V3RefData
   * @instance
   * @readonly
   */
  get CISSources() {
    return (this.payload.cisSources)
      ? this.payload.cisSources
      : [];
  }

  /**
   * @method module:openraildata/referencedata#V3RefData~getLocation
   * @desc gets a location from a search input
   * @param {Stirng} input a string containing a search parameter of wither a tiploc code or a location name
   * @returns {module:openraildata/common#Location} returns a Location if found or a null if not found
   * @see {@link https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location}
   */
  getLocation(input) { 
    return this.locations.find(o => (o.tpl === input || o.locname === input || o.crs === input));
  }


  /**
   * @method V3RefData~getToc
   * @desc gets a rain operating company from a search input
   * @param {Stirng} input a string containing a search parameter for the toc code
   * @returns {Object} returns a train operating company
   */
  getToc(input) { 
    const toc = this.trainOperatorCompanies.find(o => (o.toc === input));
    return toc;
  }

}

module.exports = V3RefData;
