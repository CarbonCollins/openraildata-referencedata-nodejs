## Extending Common Models

This package uses the [@openrailuk/common](https://www.npmjs.com/package/@openrailuk/common) package as a dependency. As part of this it makes use of the common mixins to extend the common models with information supplied by the reference data for use elsewhere in an application.

For more information on what can be extended in [@openrailuk/common](https://www.npmjs.com/package/@openrailuk/common) please see [Extending @openrailuk/common models](https://openrail.gitlab.io/docs/uk/common/Extending_Classes)

### What models are extended in @openrailuk/common

Three of the models are extended by this repository which are the following:

* [Association](https://openrail.gitlab.io/docs/uk/common/Models#Association)
* [Station](https://openrail.gitlab.io/docs/uk/common/Models#Station)
* [TrainOrder](https://openrail.gitlab.io/docs/uk/common/Models#TrainOrder)

#### What is added to the Association model

The Association model has two properties and one function call added. In addition to the standard properties and functions the following can be used:

* [Association](https://openrail.gitlab.io/docs/uk/common/Models#Association)
  * [.mainTrainSchedule](#-maintrainschedule)
  * [.associationTrainSchedule](#-associationtrainschedule)
  * [.getLocation()](#-getlocation--)

##### .mainTrainSchedule

This gets the [Schedule](https://openrail.gitlab.io/docs/uk/common/Models#Schedule) model from the v8 data relating to the [Association](https://openrail.gitlab.io/docs/uk/common/Models#Association) models main train from the reference data and returns it. If a schedule is not found then this will return `null`.

##### .associationTrainSchedule

This gets the [Schedule](https://openrail.gitlab.io/docs/uk/common/Models#Schedule) model from the v8 data relating to the [Association](https://openrail.gitlab.io/docs/uk/common/Models#Association) models associated train from the reference data and returns it. If a schedule is not found then this will return `null`.

##### .getLocation()

This gets the [Location](https://openrail.gitlab.io/docs/uk/common/Models#Location) model from the v3 data relating to the `tiploc` stated in the [Association](https://openrail.gitlab.io/docs/uk/common/Models#Association) model.

#### What is added to the Station model

The Station model has one property added. In addition to the standard properties and functions the following can be used:

* [Station](https://openrail.gitlab.io/docs/uk/common/Models#Station)
  * [.name](#-name)

##### .name

This gets the name of the station from the v3 data. If no name is found then `null` is returned

#### What is added to the TrainOrder model

The TrainOrder model has one property added. In addition to the standard properties and functions the following can be used:

* [TrainOrder](https://openrail.gitlab.io/docs/uk/common/Models#TrainOrder)
  * [.name](#-name)

##### .name

This gets the name of the location at which the [TrainOrder](https://openrail.gitlab.io/docs/uk/common/Models#TrainOrder) model applies. If no name is found then `null` is returned