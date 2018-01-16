'use strict';

const path = require('path');
const fs = require('fs-extra');

/**
 * @class
 * @classdesc Controlls and manages a manifest file within a specified directory
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.Manifest
 * @private
 */
class Manifest {
  /**
   * @constructor
   * @param {String} dir the path to the dir to store the reference data in
   * @param {Object} manifest an optional set of options to configure the class
   */
  constructor(dir, options = {}) {
    this.manifestPath = path.resolve((dir || process.cwd()), 'manifest.json');
    this.appManifest = options.manifest || this.loadManifestSync(false);
  }

  /**
   * @method module:openraildata/referencedata.Manifest~loadManifest
   * @description loads a previously saved manifest from the file system
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Promise} resolves with the manifest or rejects with an error
   * @private
   */
  loadManifest(autoLoad = true) {
    return fs.access(this.manifestPath, fs.constants.R_OK | fs.constants.W_OK)
      .then(() => {
        return fs.readJson(this.manifestPath);
      })
      .then((manifestJson = {}) => {
        return this.updateManifest(manifestJson, autoLoad);
      });
  }

  /**
   * @method module:openraildata/referencedata.Manifest~loadManifestSync
   * @description loads a previously saved manifest from the file system synchronously
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Object} returns the loaded manifest
   * @private
   */
  loadManifestSync(autoLoad = true) {
    fs.accessSync(this.manifestPath, fs.constants.R_OK | fs.constants.W_OK);
    const manifestJson = fs.readJsonSync(this.manifestPath);
    return this.updateManifestSync(manifestJson, autoLoad);
  }

  /**
   * @method module:openraildata/referencedata.Manifest~saveManifest
   * @description saves the current manifest stored in the class
   * @returns {Promise} resolves once complete or rejects with an error
   * @private
   */
  saveManifest() {
    return fs.ensureFile(this.manifestPath)
      .then(() => {
        return fs.writeJson(this.manifestPath, this.appManifest);
      });
  }

  /**
   * @method module:openraildata/referencedata.Manifest~saveManifestSync
   * @description saves the current manifest stored in the class synchronously
   * @returns {Object} the manifest file it just saved 
   * @private
   */
  saveManifestSync() {
    fs.ensureFileSync(this.manifestPath);
    fs.writeJsonSync(this.manifestPath, this.appManifest);
    return this.appManifest;
  }

  /**
   * @method module:openraildata/referencedata.Manifest~updateManifest
   * @description updates the class manifest
   * @param {Object} manifestJson the new manifest to update the class with
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Object} the new manifest
   * @public
   */
  updateManifest(manifestJson = {}, autoLoad = true) {
    const newManifest = (manifestJson.manifestId)
      ? manifestJson
      : this.appManifest || {};

    if (autoLoad) {
      this.appManifest = newManifest;

      return this.saveManifest(newManifest);
    }

    return newManifest;
  }

  /**
   * @method module:openraildata/referencedata.Manifest~updateManifestSync
   * @description updates the class manifest synchronously
   * @param {Object} manifestJson the new manifest to update the class with
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Object} the new manifest
   * @public
   */
  updateManifestSync(manifestJson = {}, autoLoad = true) {
    const newManifest = (manifestJson.manifestId)
      ? manifestJson
      : this.appManifest || {};

    if (autoLoad) {
      this.appManifest = newManifest;
      this.saveManifestSync(newManifest);
    }

    return newManifest;
  }

  /**
   * @member {String} timetableId
   * @memberof module:openraildata/referencedata.Manifest
   * @description the timetableId of the current manifest
   * @instance
   * @public
   */
  get timetableId() {
    return this.appManifest.timetableId || null;
  }
}

module.exports = Manifest;
