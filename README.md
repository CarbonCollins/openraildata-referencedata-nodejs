# openraildata-referencedata

A package for accessing the the UK National Rails reference data FTP server aswell as some helper functions to process and use the reference data

this is a work in progress so stuff may change without warning

## installation
1. install [npm](https://nodejs.org "npm homepage")
2. `npm install openraildata-referencedata --save`

## table of contents
- [getting started](#getting-started)
- [api functions](#api-functions)

## getting started

this package downloads and parses the xml reference data from the National Rail ftp server and parses into JSON for use on a Node.JS application. The package also provide some helper functions for retreiving the reference data.

the reference data contains information about locations, train operating companies, reason codes, and daily timetables among other information for the UK rail network.

to use `openraildata-referencedata` you first need to supply the ftp password for your account found on the `my feeds` section of the [National Rail Data Portal](https://datafeeds.nationalrail.co.uk/darwin/index.html#/filter) 
```
const refData = require('openraildata-referencedata');

refData.connect('ftpUserPassword');
```

a simple example of getting the v3 reference data:
```
const refData = require('openraildata-referencedata');

refData.connect('ftpUserPassword');
refData.on('ready', () => {
  refData.getCurrentV3().then((v3RefData) => {
    console.log(v3RefData);
  }).catch((err) => {
    console.log(err);
  });
});
```

## api functions

#### connection