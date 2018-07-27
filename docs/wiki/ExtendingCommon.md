## Extending Common Models

This package uses the [@openrailuk/common](https://www.npmjs.com/package/@openrailuk/common) package as a dependency. As part of this it makes use of the common mixins to extend the common models with information supplied by the reference data for use elsewhere in an application.

For more information on what can be extended in [@openrailuk/common](https://www.npmjs.com/package/@openrailuk/common) please see [Extending @openrailuk/common models](https://gitlab.com/openrail/uk/common-nodejs/wikis/Extending-Models)

### What models are extended in @openrailuk/common

Four of the models are extended by this repository which are the following:

* [Association](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-association-model)
* [Station](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-station-model)
* [TrainOrder](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-trainorder-model)

#### What is added to the Association model

The Association model has two properties and one function call added. In addition to the standard properties and functions the following can be used:

* [Association](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-association-model)
  * [.mainTrainSchedule](#-maintrainschedule)
  * [.associationTrainSchedule](#-associationtrainschedule)
  * [.getLocation()](#-getlocation--)

##### .mainTrainSchedule

This gets the [Schedule](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Schedule) model from the v8 data relating to the [Association](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Association) models main train from the reference data and returns it. If a schedule is not found then this will return `null`.

##### .associationTrainSchedule

This gets the [Schedule](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Schedule) model from the v8 data relating to the [Association](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Association) models associated train from the reference data and returns it. If a schedule is not found then this will return `null`.

##### .getLocation()

This gets the [Location](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Location) model from the v3 data relating to the `tiploc` stated in the [Association](https://gitlab.com/openrail/uk/common-nodejs/wikis/Models/Association) model.

<!-- #### What is added to the Location model

The association model has one function call added. In addition to the standard properties and functions the following can be used:

* [Location]()
  * [.updateLocation(location)]()

##### .updateLocation(location) 

This function allows the [Location] model to be updated with new information. By default the classes do not allow data to be updated within them, this function provides a setter for multiple internal values for this purpose. The function takes one argument of type `Object` which contains location parameters to be updated. This is used by the referencedata package to update to -->

#### What is added to the Station model

The Station model has one property added. In addition to the standard properties and functions the following can be used:

* [Station](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-station-model)
  * [.name](#-name)

##### .name

This gets the name of the station from the v3 data. If no name is found then `null` is returned

#### What is added to the TrainOrder model

The TrainOrder model has one property added. In addition to the standard properties and functions the following can be used:

* [TrainOrder](https://gitlab.com/openrail/uk/referencedata-nodejs/wikis/what-is-added-to-the-trainorder-model)
  * [.name](#-name)

##### .name

This gets the name of the location at which the trainorder model applies. If no name is found then `null` is returned