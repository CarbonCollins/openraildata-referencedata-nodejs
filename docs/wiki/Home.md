![reference-banner.svg](https://gitlab.com/openrail/uk/referencedata-nodejs/uploads/f7c1519da20b9d7f7eb63f17872de68a/reference-banner.svg)
## Description

This wiki contains information regarding the openrailuk/referencedata-nodejs repository and the [@openrailuk/referencedata](https://www.npmjs.com/package/@openrailuk/referencedata) npm package.

## Table of Contents

* [Importing](#importing)
  * [ES6](#es6-import)
  * [ES5](#es5-require)
  * [Object destructuring](#object-destructuring)

## Importing

Here are a few examples on how to import the referencedata-nodejs project into your application:

### ES6 Import
If you want to import all classes and functionality from the package then just use:

```javascript
import * as common from '@openrailuk/referencedata';
```
However, if you only want to make use of one or two classes then the following is also valid:

```javascript
import { Manifest } from '@openrailuk/referencedata';
```

### ES5 Require
This package also has a transpiled version so that it is compatible with older Node.JS versions:
```javascript
const common = require('@openrailuk/referencedata');
```

### Object destructuring

If your on a version of Node.JS that supports ES6 object deconstruction then the classes listed under [Models](#models) can be used.