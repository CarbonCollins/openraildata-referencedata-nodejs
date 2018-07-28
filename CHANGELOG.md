# Change Log for common-nodejs

## [v2.0.3](https://gitlab.com/openrail/uk/referencedata-nodejs/tags/v2.0.3)
* fixed findVias test failure by updating @openrailuk/common dependency (was not injecting Location data objct into Via class)

## [v2.0.2](https://gitlab.com/openrail/uk/referencedata-nodejs/tags/v2.0.2)
* fixed homepage link issue
* fixed readme docs link issue

## v2.0.1
* missing tag because i messed up :D

## [v2.0.0](https://gitlab.com/openrail/uk/referencedata-nodejs/tags/v2.0.0)
* Changed package structure to fully use ES6 modules
* Added a babel build to export an ES5 transpiled version of library, his will be discontinues once Node.JS supports ES6 modules without a flag
* Updated tests to be pre defined instead of generated during runtime
* Moved repository to GitLab so various structure changes for that
