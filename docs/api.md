## Modules

<dl>
<dt><a href="#module_openraildata/referencedata">openraildata/referencedata</a></dt>
<dd><p>the openraildata/referencedata module is used to obtain reference data regarding
train timetables, locations, stations,and other related data to the UK train network. The module
operated through an ftp server located at datafeeds.nationalrail.co.uk.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#ReferenceData">ReferenceData</a></dt>
<dd></dd>
<dt><a href="#JurneySearch">JurneySearch</a></dt>
<dd><p>A class for filtering and searching through schedule data</p>
</dd>
<dt><a href="#V3RefData">V3RefData</a></dt>
<dd><p>a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data</p>
</dd>
<dt><a href="#V8RefData">V8RefData</a></dt>
<dd><p>A class for storing V8 reference data and for attaching usefull functions for data manipulation</p>
</dd>
</dl>

## Mixins

<dl>
<dt><a href="#AssociationMix">AssociationMix</a></dt>
<dd></dd>
<dt><a href="#LocationMix">LocationMix</a></dt>
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
<dt><a href="#assocTrainSchedule">assocTrainSchedule</a> ⇒ <code>Schedule</code> | <code>null</code></dt>
<dd><p>gets the assoc trains schedule</p>
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
<dt><a href="#external_Location">Location</a></dt>
<dd><p>a class for location information and functions</p>
</dd>
<dt><a href="#external_Schedule">Schedule</a></dt>
<dd><p>a class for schedule information and functions</p>
</dd>
<dt><a href="#external_Association">Association</a></dt>
<dd><p>a class for association information and functions</p>
</dd>
<dt><a href="#external_JurneySearch">JurneySearch</a></dt>
<dd><p>a class for jurney searches</p>
</dd>
</dl>

<a name="module_openraildata/referencedata"></a>

## openraildata/referencedata
the openraildata/referencedata module is used to obtain reference data regarding
train timetables, locations, stations,and other related data to the UK train network. The module
operated through an ftp server located at datafeeds.nationalrail.co.uk.


* [openraildata/referencedata](#module_openraildata/referencedata)
    * [.TOC](#module_openraildata/referencedata.TOC) ⇐ [<code>TOC</code>](#module_openraildata/referencedata.TOC)
        * [new TOC(payload)](#new_module_openraildata/referencedata.TOC_new)


* * *

<a name="module_openraildata/referencedata.TOC"></a>

### openraildata/referencedata.TOC ⇐ [<code>TOC</code>](#module_openraildata/referencedata.TOC)
A train operating companys information

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>TOC</code>](#module_openraildata/referencedata.TOC)  

* * *

<a name="new_module_openraildata/referencedata.TOC_new"></a>

#### new TOC(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |


* * *

<a name="ReferenceData"></a>

## ReferenceData
**Kind**: global class  

* * *

<a name="new_ReferenceData_new"></a>

### new ReferenceData(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | optional data to configure the reference data with |


* * *

<a name="JurneySearch"></a>

## JurneySearch
A class for filtering and searching through schedule data

**Kind**: global class  

* [JurneySearch](#JurneySearch)
    * [~filter(filterFunction)](#JurneySearch..filter) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~origin(tiploc, [time])](#JurneySearch..origin) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~departsOriginAfter(time)](#JurneySearch..departsOriginAfter) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~departsOriginBefore(time)](#JurneySearch..departsOriginBefore) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~departsOriginBetween(timeFrom, timeTo)](#JurneySearch..departsOriginBetween) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~destination(tiploc, [time])](#JurneySearch..destination) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~intermediateStop(tiploc, [time])](#JurneySearch..intermediateStop) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~passingPoint(tiploc, [time])](#JurneySearch..passingPoint) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~stopsAt(tiploc, [time])](#JurneySearch..stopsAt) ⇒ [<code>JurneySearch</code>](#JurneySearch)
    * [~today()](#JurneySearch..today) ⇒ [<code>JurneySearch</code>](#JurneySearch)


* * *

<a name="JurneySearch..filter"></a>

### JurneySearch~filter(filterFunction) ⇒ [<code>JurneySearch</code>](#JurneySearch)
allows a custom filter function to be applied to the jruney list.

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type |
| --- | --- |
| filterFunction | <code>function</code> | 


* * *

<a name="JurneySearch..origin"></a>

### JurneySearch~origin(tiploc, [time]) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results starting from an origin station

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the origin TIPLOC code |
| [time] | <code>String</code> | an optional depart time in the format HH:MM |


* * *

<a name="JurneySearch..departsOriginAfter"></a>

### JurneySearch~departsOriginAfter(time) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which depart from origin after a specified time

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>String</code> | a depart time to filter results to |


* * *

<a name="JurneySearch..departsOriginBefore"></a>

### JurneySearch~departsOriginBefore(time) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which depart from origin before a specified time

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>String</code> | a depart time to filter results to |


* * *

<a name="JurneySearch..departsOriginBetween"></a>

### JurneySearch~departsOriginBetween(timeFrom, timeTo) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which depart from origin between two specified times

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| timeFrom | <code>String</code> | a from depart time to filter results to |
| timeTo | <code>String</code> | a to depart time to filter results to |


* * *

<a name="JurneySearch..destination"></a>

### JurneySearch~destination(tiploc, [time]) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results ending at a destination station

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the destination TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="JurneySearch..intermediateStop"></a>

### JurneySearch~intermediateStop(tiploc, [time]) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which stop at a station on its route

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate stop TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="JurneySearch..passingPoint"></a>

### JurneySearch~passingPoint(tiploc, [time]) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which pass a station on its route

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the passing points TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |


* * *

<a name="JurneySearch..stopsAt"></a>

### JurneySearch~stopsAt(tiploc, [time]) ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which stop at any intermediate points or the destination

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate point or destination TIPLOC code |
| [time] | <code>String</code> | an optiona time in the format HH:MM |


* * *

<a name="JurneySearch..today"></a>

### JurneySearch~today() ⇒ [<code>JurneySearch</code>](#JurneySearch)
applys a filter to find results which start today only

**Kind**: inner method of [<code>JurneySearch</code>](#JurneySearch)  

* * *

<a name="V3RefData"></a>

## V3RefData
a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data

**Kind**: global class  

* * *

<a name="new_V3RefData_new"></a>

### new V3RefData(refData)

| Param | Type | Description |
| --- | --- | --- |
| refData | <code>Object</code> | the raw object contaiting the v3 data |


* * *

<a name="V8RefData"></a>

## V8RefData
A class for storing V8 reference data and for attaching usefull functions for data manipulation

**Kind**: global class  

* * *

<a name="new_V8RefData_new"></a>

### new V8RefData(v8)

| Param | Type | Description |
| --- | --- | --- |
| v8 | <code>Object</code> | the raw v8 ref data object |


* * *

<a name="AssociationMix"></a>

## AssociationMix
**Kind**: global mixin  

* * *

<a name="AssociationMix..getLocation"></a>

### AssociationMix~getLocation() ⇒ <code>String</code> \| <code>null</code>
gets the location name of the where the association happens

**Kind**: inner method of [<code>AssociationMix</code>](#AssociationMix)  
**Returns**: <code>String</code> \| <code>null</code> - the location name of the association or null if ref data is not used  

* * *

<a name="LocationMix"></a>

## LocationMix
**Kind**: global mixin  

* * *

<a name="LocationMix..updateLocation"></a>

### LocationMix~updateLocation(location)
Updates the location wiht a new raw data

**Kind**: inner method of [<code>LocationMix</code>](#LocationMix)  

| Param | Type | Description |
| --- | --- | --- |
| location | <code>Object</code> | the raw location object to be parsed |


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

<a name="assocTrainSchedule"></a>

## assocTrainSchedule ⇒ <code>Schedule</code> \| <code>null</code>
gets the assoc trains schedule

**Kind**: global variable  
**Returns**: <code>Schedule</code> \| <code>null</code> - the assoc trains Schedule object or null if ref data is not used  
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

<a name="external_Location"></a>

## Location
a class for location information and functions

**Kind**: global external  
**See**: [Location](location.md)  

* * *

<a name="external_Schedule"></a>

## Schedule
a class for schedule information and functions

**Kind**: global external  
**See**: [Schedule](schedule.md)  

* * *

<a name="external_Association"></a>

## Association
a class for association information and functions

**Kind**: global external  
**See**: [Association](association.md)  

* * *

<a name="external_JurneySearch"></a>

## JurneySearch
a class for jurney searches

**Kind**: global external  
**See**: [JurneySearch](jurneySearch.md)  

* * *

