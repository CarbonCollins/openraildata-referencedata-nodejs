## Modules

<dl>
<dt><a href="#module_openrailuk/referencedata">openrailuk/referencedata</a></dt>
<dd><p>A package for accessing the the UK National Rails reference data FTP server as well
as some helper functions to process and use the reference data.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ScheduleSearch">ScheduleSearch</a></dt>
<dd><p>A class for filtering and searching through schedule data</p>
</dd>
</dl>

## Mixins

<dl>
<dt><a href="#AssociationMix">AssociationMix</a> ⇐ <code>external:Association</code></dt>
<dd></dd>
<dt><a href="#StationMix">StationMix</a></dt>
<dd></dd>
<dt><a href="#TrainOrderMix">TrainOrderMix</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#mainTrainSchedule">mainTrainSchedule</a> ⇒ <code>Schedule</code> | <code>null</code></dt>
<dd><p>gets the main trains schedule (if ref data is used)</p>
</dd>
<dt><a href="#associationTrainSchedule">associationTrainSchedule</a> ⇒ <code>Schedule</code> | <code>null</code></dt>
<dd><p>gets the association trains schedule</p>
</dd>
<dt><a href="#name">name</a> ⇒ <code>String</code></dt>
<dd><p>gets the stations name from the reference data</p>
</dd>
<dt><a href="#name">name</a> ⇒ <code>String</code></dt>
<dd><p>gets the stations name from the reference data</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_openraildata/common">openraildata/common</a></dt>
<dd><p>openraildata/common module</p>
</dd>
</dl>

<a name="module_openrailuk/referencedata"></a>

## openrailuk/referencedata
A package for accessing the the UK National Rails reference data FTP server as well
as some helper functions to process and use the reference data.


* [openrailuk/referencedata](#module_openrailuk/referencedata)
    * [.CancellationReason](#module_openrailuk/referencedata.CancellationReason)
        * [new CancellationReason()](#new_module_openrailuk/referencedata.CancellationReason_new)
        * [.code](#module_openrailuk/referencedata.CancellationReason+code) : <code>Number</code>
        * [.reason](#module_openrailuk/referencedata.CancellationReason+reason) : <code>String</code>
    * [.CustomerInformationSystem](#module_openrailuk/referencedata.CustomerInformationSystem)
        * [new CustomerInformationSystem()](#new_module_openrailuk/referencedata.CustomerInformationSystem_new)
        * [.code](#module_openrailuk/referencedata.CustomerInformationSystem+code) : <code>String</code>
        * [.name](#module_openrailuk/referencedata.CustomerInformationSystem+name) : <code>String</code>
    * [.LateRunningReason](#module_openrailuk/referencedata.LateRunningReason)
        * [new LateRunningReason()](#new_module_openrailuk/referencedata.LateRunningReason_new)
        * [.code](#module_openrailuk/referencedata.LateRunningReason+code) : <code>Number</code>
        * [.reason](#module_openrailuk/referencedata.LateRunningReason+reason) : <code>String</code>


* * *

<a name="module_openrailuk/referencedata.CancellationReason"></a>

### openrailuk/referencedata.CancellationReason
**Kind**: static class of [<code>openrailuk/referencedata</code>](#module_openrailuk/referencedata)  
**Export**: CancellationReason  
**Author**: Steven Collins <steven@carboncollins.uk>  

* [.CancellationReason](#module_openrailuk/referencedata.CancellationReason)
    * [new CancellationReason()](#new_module_openrailuk/referencedata.CancellationReason_new)
    * [.code](#module_openrailuk/referencedata.CancellationReason+code) : <code>Number</code>
    * [.reason](#module_openrailuk/referencedata.CancellationReason+reason) : <code>String</code>


* * *

<a name="new_module_openrailuk/referencedata.CancellationReason_new"></a>

#### new CancellationReason()
A data model for a cancellation reason. This stores a `code` to identify the type of
cancellation as well as a test `reason` for the cancellation.


* * *

<a name="module_openrailuk/referencedata.CancellationReason+code"></a>

#### cancellationReason.code : <code>Number</code>
A code number for identifying this cancellation reason

**Kind**: instance property of [<code>CancellationReason</code>](#module_openrailuk/referencedata.CancellationReason)  
**Access**: public  
**Read only**: true  

* * *

<a name="module_openrailuk/referencedata.CancellationReason+reason"></a>

#### cancellationReason.reason : <code>String</code>
A string description of the cancellation reason

**Kind**: instance property of [<code>CancellationReason</code>](#module_openrailuk/referencedata.CancellationReason)  
**Access**: public  
**Read only**: true  

* * *

<a name="module_openrailuk/referencedata.CustomerInformationSystem"></a>

### openrailuk/referencedata.CustomerInformationSystem
**Kind**: static class of [<code>openrailuk/referencedata</code>](#module_openrailuk/referencedata)  
**Export**: CustomerInformationSystem  
**Author**: Steven Collins <steven@carboncollins.uk>  

* [.CustomerInformationSystem](#module_openrailuk/referencedata.CustomerInformationSystem)
    * [new CustomerInformationSystem()](#new_module_openrailuk/referencedata.CustomerInformationSystem_new)
    * [.code](#module_openrailuk/referencedata.CustomerInformationSystem+code) : <code>String</code>
    * [.name](#module_openrailuk/referencedata.CustomerInformationSystem+name) : <code>String</code>


* * *

<a name="new_module_openrailuk/referencedata.CustomerInformationSystem_new"></a>

#### new CustomerInformationSystem()
A data model for a customer information system sources. This stores a `code` used
to identify a cis source and a `name` in human readable format


* * *

<a name="module_openrailuk/referencedata.CustomerInformationSystem+code"></a>

#### customerInformationSystem.code : <code>String</code>
the cis code (normaly 2 letters and 2 numbers)

**Kind**: instance property of [<code>CustomerInformationSystem</code>](#module_openrailuk/referencedata.CustomerInformationSystem)  
**Access**: public  
**Read only**: true  

* * *

<a name="module_openrailuk/referencedata.CustomerInformationSystem+name"></a>

#### customerInformationSystem.name : <code>String</code>
the human readable name of the cis source

**Kind**: instance property of [<code>CustomerInformationSystem</code>](#module_openrailuk/referencedata.CustomerInformationSystem)  
**Access**: public  
**Read only**: true  

* * *

<a name="module_openrailuk/referencedata.LateRunningReason"></a>

### openrailuk/referencedata.LateRunningReason
**Kind**: static class of [<code>openrailuk/referencedata</code>](#module_openrailuk/referencedata)  
**Export**: LateRunningReason  
**Author**: Steven Collins <steven@carboncollins.uk>  

* [.LateRunningReason](#module_openrailuk/referencedata.LateRunningReason)
    * [new LateRunningReason()](#new_module_openrailuk/referencedata.LateRunningReason_new)
    * [.code](#module_openrailuk/referencedata.LateRunningReason+code) : <code>Number</code>
    * [.reason](#module_openrailuk/referencedata.LateRunningReason+reason) : <code>String</code>


* * *

<a name="new_module_openrailuk/referencedata.LateRunningReason_new"></a>

#### new LateRunningReason()
A data model for a late running reason. This stores a `code` to identify the type of
late running as well as a test `reason` for the late running o the service.


* * *

<a name="module_openrailuk/referencedata.LateRunningReason+code"></a>

#### lateRunningReason.code : <code>Number</code>
A code number for identifying this late running reason

**Kind**: instance property of [<code>LateRunningReason</code>](#module_openrailuk/referencedata.LateRunningReason)  
**Access**: public  
**Read only**: true  

* * *

<a name="module_openrailuk/referencedata.LateRunningReason+reason"></a>

#### lateRunningReason.reason : <code>String</code>
A string description of the late running reason

**Kind**: instance property of [<code>LateRunningReason</code>](#module_openrailuk/referencedata.LateRunningReason)  
**Access**: public  
**Read only**: true  

* * *

<a name="ScheduleSearch"></a>

## ScheduleSearch
A class for filtering and searching through schedule data

**Kind**: global class  

* [ScheduleSearch](#ScheduleSearch)
    * [new exports.ScheduleSearch(schedules)](#new_ScheduleSearch_new)
    * _instance_
        * [.schedules](#ScheduleSearch+schedules) ⇒ <code>Array.&lt;Station&gt;</code>
    * _inner_
        * [~filter(filterFunction)](#ScheduleSearch..filter) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~origin(tiploc, [time])](#ScheduleSearch..origin) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~departsOriginAfter(time, [inclusive])](#ScheduleSearch..departsOriginAfter) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~departsOriginBefore(time, [inclusive])](#ScheduleSearch..departsOriginBefore) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~departsOriginBetween(timeFrom, timeTo, [timeFromInclusive], [timeToInclusive])](#ScheduleSearch..departsOriginBetween) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~destination(tiploc, [time])](#ScheduleSearch..destination) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~intermediateStop(tiploc, [time])](#ScheduleSearch..intermediateStop) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~passingPoint(tiploc, [time])](#ScheduleSearch..passingPoint) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~stopsAt(tiploc, [time])](#ScheduleSearch..stopsAt) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
        * [~today()](#ScheduleSearch..today) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)


* * *

<a name="new_ScheduleSearch_new"></a>

### new exports.ScheduleSearch(schedules)
Creates an instance of ScheduleSearch.


| Param | Type |
| --- | --- |
| schedules | <code>Array.&lt;Station&gt;</code> | 


* * *

<a name="ScheduleSearch+schedules"></a>

### scheduleSearch.schedules ⇒ <code>Array.&lt;Station&gt;</code>
gets a full array of schedules that can be searched

**Kind**: instance property of [<code>ScheduleSearch</code>](#ScheduleSearch)  
**Returns**: <code>Array.&lt;Station&gt;</code> - an array of schedules  
**Read only**: true  

* * *

<a name="ScheduleSearch..filter"></a>

### ScheduleSearch~filter(filterFunction) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
allows a custom filter function to be applied to the station list.

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type |
| --- | --- |
| filterFunction | <code>function</code> | 


* * *

<a name="ScheduleSearch..origin"></a>

### ScheduleSearch~origin(tiploc, [time]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results starting from an origin station

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the origin TIPLOC code |
| [time] | <code>String</code> | an optional depart time in the format HH:MM |


* * *

<a name="ScheduleSearch..departsOriginAfter"></a>

### ScheduleSearch~departsOriginAfter(time, [inclusive]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which depart from origin after a specified time

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| time | <code>String</code> |  | a depart time to filter results to |
| [inclusive] | <code>Boolean</code> | <code>false</code> | is `time` included in the search (greater than or equal) |


* * *

<a name="ScheduleSearch..departsOriginBefore"></a>

### ScheduleSearch~departsOriginBefore(time, [inclusive]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which depart from origin before a specified time

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| time | <code>String</code> |  | a depart time to filter results to |
| [inclusive] | <code>Boolean</code> | <code>false</code> | is `time` included in the search (less than or equal) |


* * *

<a name="ScheduleSearch..departsOriginBetween"></a>

### ScheduleSearch~departsOriginBetween(timeFrom, timeTo, [timeFromInclusive], [timeToInclusive]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which depart from origin between two specified times

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| timeFrom | <code>String</code> |  | a from depart time to filter results to |
| timeTo | <code>String</code> |  | a to depart time to filter results to |
| [timeFromInclusive] | <code>Boolean</code> | <code>false</code> | is `timeFrom` included in the search (greater than or equal) |
| [timeToInclusive] | <code>Boolean</code> | <code>false</code> | is `timeTo` included in the search (less than or equal) |


* * *

<a name="ScheduleSearch..destination"></a>

### ScheduleSearch~destination(tiploc, [time]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results ending at a destination station

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the destination TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="ScheduleSearch..intermediateStop"></a>

### ScheduleSearch~intermediateStop(tiploc, [time]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which stop at a station on its route

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate stop TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="ScheduleSearch..passingPoint"></a>

### ScheduleSearch~passingPoint(tiploc, [time]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applys a filter to find results which pass a station on its route

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the passing points TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="ScheduleSearch..stopsAt"></a>

### ScheduleSearch~stopsAt(tiploc, [time]) ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which stop at any intermediate points or the destination

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate point or destination TIPLOC code |
| [time] | <code>String</code> | an optional time in the format HH:MM |


* * *

<a name="ScheduleSearch..today"></a>

### ScheduleSearch~today() ⇒ [<code>ScheduleSearch</code>](#ScheduleSearch)
applies a filter to find results which start today only

**Kind**: inner method of [<code>ScheduleSearch</code>](#ScheduleSearch)  

* * *

<a name="AssociationMix"></a>

## AssociationMix ⇐ <code>external:Association</code>
**Kind**: global mixin  
**Extends**: <code>external:Association</code>  

* * *

<a name="AssociationMix..getLocation"></a>

### AssociationMix~getLocation() ⇒ <code>String</code> \| <code>null</code>
gets the location name of the where the association happens

**Kind**: inner method of [<code>AssociationMix</code>](#AssociationMix)  
**Returns**: <code>String</code> \| <code>null</code> - the location name of the association or null if ref data is not used  

* * *

<a name="StationMix"></a>

## StationMix
**Kind**: global mixin  

* * *

<a name="TrainOrderMix"></a>

## TrainOrderMix
**Kind**: global mixin  

* * *

<a name="mainTrainSchedule"></a>

## mainTrainSchedule ⇒ <code>Schedule</code> \| <code>null</code>
gets the main trains schedule (if ref data is used)

**Kind**: global variable  
**Returns**: <code>Schedule</code> \| <code>null</code> - the main trains Schedule object or a null if ref data is not used  
**Read only**: true  

* * *

<a name="associationTrainSchedule"></a>

## associationTrainSchedule ⇒ <code>Schedule</code> \| <code>null</code>
gets the association trains schedule

**Kind**: global variable  
**Returns**: <code>Schedule</code> \| <code>null</code> - the association trains Schedule object or null if ref data is not used  
**Read only**: true  

* * *

<a name="name"></a>

## name ⇒ <code>String</code>
gets the stations name from the reference data

**Kind**: global variable  
**Returns**: <code>String</code> - the location name  
**Read only**: true  

* * *

<a name="name"></a>

## name ⇒ <code>String</code>
gets the stations name from the reference data

**Kind**: global variable  
**Returns**: <code>String</code> - the location name  
**Read only**: true  

* * *

<a name="external_openraildata/common"></a>

## openraildata/common
openraildata/common module

**Kind**: global external  
**See**: [openraildata/common Docs](https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common)  

* * *

<a name="external_openraildata/common.external_Association"></a>

### openraildata/common.Association
a class within the openrailuk/common module

**Kind**: static external of [<code>openraildata/common</code>](#external_openraildata/common)  
**See**: [openraildata/common Docs](https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common)  

* * *

