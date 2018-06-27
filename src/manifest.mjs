import path from 'path';
import fs from 'fs-extra';
import uuidv1 from 'uuid/v1';

export const symbols = new Map()
  .set('manifestPath', Symbol('manifest path'))
  .set('appManifest', Symbol('app manifest'));

/**
 * @class
 * @classdesc Controlls and manages a manifest file within a specified directory
 * @memberof module:openraildata/referencedata
 * @augments module:openraildata/referencedata.Manifest
 * @private
 */
export class Manifest {
  /**
   * @constructor
   * @param {String} dir the path to the dir to store the reference data in
   * @param {Object} manifest an optional set of options to configure the class
   */
  constructor(dir, options = {}) {
    this[symbols.get('manifestPath')] = path.resolve((dir || process.cwd()), 'manifest.json');
    this[symbols.get('appManifest')] = options.manifest || this.loadManifestSync(false);
  }

  /**
   * @member {String} manifestId
   * @memberof module:openraildata/referencedata.Manifest
   * @description the manifestId of the current manifest
   * @instance
   * @public
   */
  get manifestId() {
    return this[symbols.get('appManifest')].manifestId || null;
  }

  get allTimetableIds() {
    return Object.keys(this[symbols.get('appManifest')] || {})
      .filter((key) => {
        return key !== 'manifestId';
      })
      .reduce((refNames, refName) => {
        return Object.assign(refNames, { [refName]: this.getTimetableId(refName) })
      }, {});
  }

  /**
   * @method module:openraildata/referencedata.Manifest~baseManifest
   * @description gets the manifest without the manifestId
   * @param {String} type the ref data to obtain the timetableId for
   * @returns {String} the new ref datas timetableId
   * @public
   */
  get baseManifest() {
    const baseManifest = Object.assign({}, this[symbols.get('appManifest')]);

    delete baseManifest.manifestId;

    return (this[symbols.get('appManifest')].manifestId && this[symbols.get('appManifest')].manifestId !== '')
      ? baseManifest
      : null;
  }

  /**
   * @method module:openraildata/referencedata.Manifest~loadManifest
   * @description loads a previously saved manifest from the file system
   * @param {Boolean} [autoLoad=true] should the loaded manifest be saved to the class
   * @returns {Promise} resolves with the manifest or rejects with an error
   * @private
   */
  loadManifest(autoLoad = true) {
    return fs.ensureDir(path.dirname(this[symbols.get('manifestPath')]))
      .then(() => {       
        return fs.ensureFile(this[symbols.get('manifestPath')]);
      })
      .then(() => {
        return fs.access(this[symbols.get('manifestPath')], fs.constants.R_OK | fs.constants.W_OK)
      })
      .then(() => {
        return fs.readJson(this[symbols.get('manifestPath')], { throws: false });
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
    fs.ensureDirSync(path.dirname(this[symbols.get('manifestPath')]));
    fs.ensureFileSync(this[symbols.get('manifestPath')]);
    fs.accessSync(this[symbols.get('manifestPath')], fs.constants.R_OK | fs.constants.W_OK);
    const manifestJson = fs.readJsonSync(this[symbols.get('manifestPath')], { throws: false }) || {};
    return this.updateManifestSync(manifestJson, autoLoad);
  }

  /**
   * @method module:openraildata/referencedata.Manifest~saveManifest
   * @description saves the current manifest stored in the class
   * @returns {Promise} resolves once complete or rejects with an error
   * @private
   */
  saveManifest() {
    return fs.ensureFile(this[symbols.get('manifestPath')])
      .then(() => {
        return fs.writeJson(this[symbols.get('manifestPath')], this[symbols.get('appManifest')]);
      });
  }

  /**
   * @method module:openraildata/referencedata.Manifest~saveManifestSync
   * @description saves the current manifest stored in the class synchronously
   * @returns {Object} the manifest file it just saved 
   * @private
   */
  saveManifestSync() {
    fs.ensureFileSync(this[symbols.get('manifestPath')]);
    fs.writeJsonSync(this[symbols.get('manifestPath')], this[symbols.get('appManifest')]);
    // return this[symbols.get('appManifest')];
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
    const newManifest = (manifestJson && manifestJson.manifestId)
      ? manifestJson
      : this[symbols.get('appManifest')] || {};

    if (autoLoad) {
      this[symbols.get('appManifest')] = newManifest;

      return this.saveManifest(newManifest);
    }

    return Promise.resolve(newManifest);
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
      : this[symbols.get('appManifest')] || {};

    if (autoLoad) {
      this[symbols.get('appManifest')] = newManifest;
      return this.saveManifestSync(newManifest);
    }

    return newManifest;
  }

  /**
   * @method module:openraildata/referencedata.Manifest~updateFromFiles
   * @description updates the manifest file with an array of files
   * @param {Object[]} files an array of objects containing reference data information
   * @returns {Promise} the new manifest
   * @public
   */
  updateFromFiles(files = []) {
    if (Array.isArray(files) && files.length > 0) {
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
        .then(() => {
          return this[symbols.get('appManifest')];
        });
    }
    return Promise.resolve(this[symbols.get('appManifest')]);
  }

  /**
   * @method module:openraildata/referencedata.Manifest~getTimetableId
   * @description gets thew timetable id for a specific ref data type
   * @param {String} type the ref data to obtain the timetableId for
   * @returns {String} the new ref datas timetableId
   * @public
   */
  getTimetableId(type) {
    if (!type || typeof type !== typeof '' || type === '') {
      return null;
    }

    return (this[symbols.get('appManifest')][type])
      ? this[symbols.get('appManifest')][type].timetableId || null
      : null;
  }
}
