import * as path from 'path';
import * as fs from 'fs-extra';
import * as uuidv1 from 'uuid/v1';

const sManifestPath = Symbol('manifest path');
const sAppManifest = Symbol('app manifest');

/**
 * @class
 * @classdesc Controlls and manages a manifest file within a specified directory
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.Manifest
 * @private
 */
export default class Manifest {
  /**
   * @constructor
   * @param {String} dir the path to the dir to store the reference data in
   * @param {Object} manifest an optional set of options to configure the class
   */
  constructor(dir, options = {}) {
    this[sManifestPath] = path.resolve((dir || process.cwd()), 'manifest.json');
    this[sAppManifest] = options.manifest || this.loadManifestSync(false);
  }

  /**
   * @method module:openraildata/referencedata.Manifest~loadManifest
   * @description loads a previously saved manifest from the file system
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Promise} resolves with the manifest or rejects with an error
   * @private
   */
  loadManifest(autoLoad = true) {
    return fs.ensureDir(path.dirname(this.manifestPath))
      .then(() => {
        return fs.ensureFile(this.manifestPath);
      })
      .then(() => {
        return fs.access(this.manifestPath, fs.constants.R_OK | fs.constants.W_OK)
      })
      .then(() => {
        return fs.readJson(this.manifestPath, { throws: false });
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
    fs.ensureDirSync(path.dirname(this.manifestPath));
    fs.ensureFileSync(this.manifestPath);
    fs.accessSync(this.manifestPath, fs.constants.R_OK | fs.constants.W_OK);
    const manifestJson = fs.readJsonSync(this.manifestPath, { throws: false }) || {};
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
   * @method module:openraildata/referencedata.Manifest~updateFromFiles
   * @description updates the manifest file with an array of files
   * @param {Object[]} files an array of objects containing reference data information
   * @returns {Object} the new manifest
   * @public
   */
  updateFromFiles(files) {
    const newManifest = {
      manifestId: uuidv1()
    };

    for (let i = 0, iLength = files.length; i < iLength; i += 1) {
      const type = files[i].name.match(/(\d+).+?(v\d+)\.json/);
      if (Array.isArray(type) && type.length === 3) {
        newManifest[type[2]] = Object.assign(files[i], { timetableId: type[1] });
      }
    }

    return this.updateManifest(newManifest)
      .then(() => this.appManifest);
  }

  /**
   * @member {String} manifestId
   * @memberof module:openraildata/referencedata.Manifest
   * @description the manifestId of the current manifest
   * @instance
   * @public
   */
  get manifestId() {
    return this.appManifest.manifestId || null;
  }

  get allTimetableIds() {
    return Object.keys(this.appManifest || {})
      .filter(key => key !== 'manifestId')
      .reduce((refNames, refName) => Object.assign(refNames, { [refName]: this.getTimetableId(refName) }), {});
  }

  /**
   * @method module:openraildata/referencedata.Manifest~getTimetableId
   * @description gets thew timetable id for a specific ref data type
   * @param {String} type the ref data to obtain the timetableId for
   * @returns {String} the new ref datas timetableId
   * @public
   */
  getTimetableId(type) {
    return (this.appManifest[type])
      ? this.appManifest[type].timetableId || null
      : null;
  }

  /**
   * @method module:openraildata/referencedata.Manifest~getTimetableId
   * @description gets thew timetable id for a specific ref data type
   * @param {String} type the ref data to obtain the timetableId for
   * @returns {String} the new ref datas timetableId
   * @public
   */
  get baseManifest() {
    const baseManifest = Object.assign({}, this.appManifest);
    delete baseManifest.manifestId;
    return (this.appManifest.manifestId && this.appManifest.manifestId !== '') ? baseManifest : null;
  }
}
