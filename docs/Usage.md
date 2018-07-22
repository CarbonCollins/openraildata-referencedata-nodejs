# Usage

To use this package you need to have [Node.JS](https://nodejs.com) installed and this project added as a dependency to your project using a package manager. This package uses [Yarn](https://yarn.org) as its package manager and is recommended for you to use too, however NPM (which comes bundles with the Node.JS installation) will also work. If you are going to use NPM just replace `add` in any yarn commands with `install`.

## Adding as a dependency

To add `@openrailuk/referencedata` as a dependency to your project, simply run:

```shell
yarn add @openrailuk/referencedata --save
```

This will add this package as a dependency and install any dependencies that are required by it.

## Using the classes in your code

This package provides access to the open rail data reference FTP drive in order to obtain a copy and parse for use within other @openrailuk packages

In order to initially connect to the FTP server you will need to import this package and connect to it:

```javascript
import { referenceData } from '@openrailuk/referencedata';

referenceData.on('connected', () => {
  console.log('connected to ftp');
});

referenceData.connect(options);
```

For more information on the events that reference data emits please see the [Event Docs](https://openrail.gitlab.io/docs/uk/referencedata/Events)

## Extending common classes

This package mixes some extra functionality into the [@openrailuk/common](https://www.npmjs.com/package/@openrailuk/common) package. For information on what functions are added please see [Common Extensions](https://openrail.gitlab.io/docs/uk/referencedata/Common_Extensions)
