![](https://gitlab.com/openrail/uk/referencedata-nodejs/uploads/f7c1519da20b9d7f7eb63f17872de68a/referencedata-banner.svg)

[![country](https://img.shields.io/badge/country-UK-blue.svg)](https://gitlab.com/groups/openrail/uk)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
[![npm (scoped)](https://img.shields.io/npm/v/@openrailuk/referencedata.svg)](https://www.npmjs.com/package/@openrailuk/referencedata)
[![status](https://img.shields.io/badge/status-WIP-yellow.svg)](https://gitlab.com/openrail/uk/referencedata-nodejs)
[![pipeline](https://gitlab.com/openrail/uk/referencedata-nodejs/badges/master/pipeline.svg)](https://gitlab.com/openrail/uk/referencedata-nodejs/commits/master)
[![coverage](https://gitlab.com/openrail/uk/referencedata-nodejs/badges/master/coverage.svg)](https://gitlab.com/openrail/uk/referencedata-nodejs/commits/master)
[![slack](https://open-rail-slack-invite.herokuapp.com/badge.svg)](https://open-rail-slack-invite.herokuapp.com/)

A package for accessing the the UK National Rails reference data FTP server as well as some helper functions to process and use the reference data

# info
This repository is hosted on [GitLab as reference-nodejs](https://gitlab.com/openrail/uk/reference-nodejs). The [GitHub repository](https://github.com/CarbonCollins/openraildata-reference-nodejs) is a downstream repository where all changes from GitLab are pushed. Please raise any issues or pull requests on the GitLab repository.

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `npm install @openrailuk/referencedata --save`

## table of contents
- [getting started](#getting-started)
- [package docs](#package-docs)
- [dev notes](#dev-notes)

## getting started

this package downloads and parses the xml reference data from the National Rail ftp server and parses into JSON for use on a Node.JS application. The package also provide some helper functions for retrieving the reference data.

the reference data contains information about locations, train operating companies, reason codes, and daily timetables among other information for the UK rail network.

to use `@openrailuk/referencedata` you first need to supply the ftp password for your account found on the `my feeds` section of the [National Rail Data Portal](https://datafeeds.nationalrail.co.uk/darwin/index.html#/filter) 

```javascript
const { referenceData } = require('@openrailuk/referencedata');

referenceData.connect('ftpUserPassword');
```

a simple example of getting the v3 reference data:

```javascript
const { referenceData } = require('@openrailuk/referencedata');

referenceData.connect('ftpUserPassword');
referenceData.on('dataReady', () => {
  referenceData.getCurrentV3()
    .then((v3RefData) => {
      console.log(v3RefData);
    })
    .catch((err) => {
      console.log(err);
    });
});
```

## package docs

<a href="https://openrail.gitlab.io/docs/uk/referencedata">code docs found here</a>

## dev notes

Hi :D

this package is being coded while im experimenting so feel free to use it however it may change at any moment. I'm publishing it as i go so not all features will be there.

I'm generaly only working on this while im sat on the train too and from my day job so this may take a while