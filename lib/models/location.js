'use strict';

class Location {
  constructor(loc) {
    this._tpl;
    this._crs;
    this._toc;
    this._locname;

    this.updateLocation(loc);
  }

  updateLocation(location) {
    if (location) {
      this._tpl = location.tpl;
      this._crs = location.crs;
      this._toc = location.toc;
      this._locname = location.locname;
    }
  }

  get locname() { return this._locname; }
  get tpl() { return this._tpl; }
  get toc() { return this._toc; }
  get crs() { return this._src; }

  get locationName() { return this._locname; }
  get tiploc() { return this._tpl; }
  get trainOperatingCompany() { return this._toc; }
  get computerReservationSystem() { return this._crs; }
}

module.exports = Location;
