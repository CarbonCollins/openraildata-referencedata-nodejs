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
<dt><a href="#JurneySearch">JurneySearch</a></dt>
<dd><p>A class for filtering and searching through schedule data</p>
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
    * _instance_
        * ["connected"](#module_openraildata/referencedata+event_connected)
        * ["reconnecting"](#module_openraildata/referencedata+event_reconnecting)
        * ["reconnectionAttempt"](#module_openraildata/referencedata+event_reconnectionAttempt)
        * ["disconnected"](#module_openraildata/referencedata+event_disconnected)
        * ["download"](#module_openraildata/referencedata+event_download)
        * ["downloadChunk"](#module_openraildata/referencedata+event_downloadChunk)
        * ["downloadEnd"](#module_openraildata/referencedata+event_downloadEnd)
        * ["downloadError"](#module_openraildata/referencedata+event_downloadError)
        * ["error"](#module_openraildata/referencedata+event_error)
        * ["update"](#module_openraildata/referencedata+event_update)
    * _static_
        * [.ReferenceData](#module_openraildata/referencedata.ReferenceData) ⇐ [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)
            * [new ReferenceData(options)](#new_module_openraildata/referencedata.ReferenceData_new)
            * [~connect()](#module_openraildata/referencedata.ReferenceData..connect)
            * [~checkForReferenceDataUpdate()](#module_openraildata/referencedata.ReferenceData..checkForReferenceDataUpdate)
        * [.TOC](#module_openraildata/referencedata.TOC) ⇐ [<code>TOC</code>](#module_openraildata/referencedata.TOC)
            * [new TOC(payload)](#new_module_openraildata/referencedata.TOC_new)
            * [.code](#module_openraildata/referencedata.TOC+code) : <code>String</code>
            * [.name](#module_openraildata/referencedata.TOC+name) : <code>String</code>
            * [.url](#module_openraildata/referencedata.TOC+url) : <code>String</code>
        * [.V3RefData](#module_openraildata/referencedata.V3RefData) ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
            * [new V3RefData(refData)](#new_module_openraildata/referencedata.V3RefData_new)
            * [.timetableId](#module_openraildata/referencedata.V3RefData+timetableId) : <code>String</code>
            * [.locations](#module_openraildata/referencedata.V3RefData+locations) : <code>Array.&lt;Object&gt;</code>
            * [.trainOperatorCompanies](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies) : <code>Array.&lt;Object&gt;</code>


* * *

<a name="module_openraildata/referencedata+event_connected"></a>

### "connected"
fired when connected to FTP server

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | the options which were used to connect |


* * *

<a name="module_openraildata/referencedata+event_reconnecting"></a>

### "reconnecting"
fired when a recconection request is made

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keepAlive | <code>Boolean</code> | determins if the app should keep the ftp connection alive |
| reconnectDelay | <code>Number</code> \| <code>String</code> | the amount of time to wait before the next reconnection attempt |


* * *

<a name="module_openraildata/referencedata+event_reconnectionAttempt"></a>

### "reconnectionAttempt"
fired when recconnection is requested

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata+event_disconnected"></a>

### "disconnected"
fired when ftpClient is disconnected

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keepAlive | <code>Boolean</code> | determins if the app should keep the ftp connection alive |


* * *

<a name="module_openraildata/referencedata+event_download"></a>

### "download"
fired when a new download is started

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the size of the download in bytes |
| name | <code>String</code> | the ftp name for the download file |
| filePath | <code>String</code> | the path to where the file will be downloaded too |
| fileName | <code>String</code> | the name of the saved file on the local system as it will be different than the ftp name (conversion from xml to json) |


* * *

<a name="module_openraildata/referencedata+event_downloadChunk"></a>

### "downloadChunk"
fired when a chunk of data is downloaded (usefull if you want to make a progress
bar)

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the size of the download in bytes |
| name | <code>String</code> | the ftp name for the download file |
| filePath | <code>String</code> | the path to where the file will be downloaded too |
| fileName | <code>String</code> | the name of the saved file on the local system as it will be different than the ftp name (conversion from xml to json) |
| chunkSize | <code>Number</code> | lists the size of the current chunk of data downloaded |


* * *

<a name="module_openraildata/referencedata+event_downloadEnd"></a>

### "downloadEnd"
fired when a download has completed

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| size | <code>Number</code> | the size of the download in bytes |
| name | <code>String</code> | the ftp name for the download file |
| filePath | <code>String</code> | the path to where the file will be downloaded too |
| fileName | <code>String</code> | the name of the saved file on the local system as it will be different than the ftp name (conversion from xml to json) |


* * *

<a name="module_openraildata/referencedata+event_downloadError"></a>

### "downloadError"
fired if there was a download error

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata+event_error"></a>

### "error"
fired when an error occurs

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata+event_update"></a>

### "update"
fired when the manifest changes or when the reference files have been updated

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | the source of the update. Currently can be: `manifest` or `reference` |


* * *

<a name="module_openraildata/referencedata.ReferenceData"></a>

### openraildata/referencedata.ReferenceData ⇐ [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)
the main code base which maintains the connection to the ftp server and manages which
reference data files to download. it also exposes all of the events and functions.

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)  

* [.ReferenceData](#module_openraildata/referencedata.ReferenceData) ⇐ [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)
    * [new ReferenceData(options)](#new_module_openraildata/referencedata.ReferenceData_new)
    * [~connect()](#module_openraildata/referencedata.ReferenceData..connect)
    * [~checkForReferenceDataUpdate()](#module_openraildata/referencedata.ReferenceData..checkForReferenceDataUpdate)


* * *

<a name="new_module_openraildata/referencedata.ReferenceData_new"></a>

#### new ReferenceData(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | optional data to configure the reference data with |


* * *

<a name="module_openraildata/referencedata.ReferenceData..connect"></a>

#### ReferenceData~connect()
connects to the openrail data FTP server

**Kind**: inner method of [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)  
**Emits**: [<code>connected</code>](#module_openraildata/referencedata+event_connected), [<code>error</code>](#module_openraildata/referencedata+event_error)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.ReferenceData..checkForReferenceDataUpdate"></a>

#### ReferenceData~checkForReferenceDataUpdate()
checks to see if the local refdata needs to be updated

**Kind**: inner method of [<code>ReferenceData</code>](#module_openraildata/referencedata.ReferenceData)  
**Emits**: [<code>error</code>](#module_openraildata/referencedata+event_error)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TOC"></a>

### openraildata/referencedata.TOC ⇐ [<code>TOC</code>](#module_openraildata/referencedata.TOC)
A train operating companys information

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>TOC</code>](#module_openraildata/referencedata.TOC)  

* [.TOC](#module_openraildata/referencedata.TOC) ⇐ [<code>TOC</code>](#module_openraildata/referencedata.TOC)
    * [new TOC(payload)](#new_module_openraildata/referencedata.TOC_new)
    * [.code](#module_openraildata/referencedata.TOC+code) : <code>String</code>
    * [.name](#module_openraildata/referencedata.TOC+name) : <code>String</code>
    * [.url](#module_openraildata/referencedata.TOC+url) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.TOC_new"></a>

#### new TOC(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |


* * *

<a name="module_openraildata/referencedata.TOC+code"></a>

#### toC.code : <code>String</code>
the train operating company 2 letter code

**Kind**: instance property of [<code>TOC</code>](#module_openraildata/referencedata.TOC)  
**Overrides**: [<code>code</code>](#module_openraildata/referencedata.TOC+code)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TOC+name"></a>

#### toC.name : <code>String</code>
the train operating company human readable name

**Kind**: instance property of [<code>TOC</code>](#module_openraildata/referencedata.TOC)  
**Overrides**: [<code>name</code>](#module_openraildata/referencedata.TOC+name)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TOC+url"></a>

#### toC.url : <code>String</code>
the train operating companys information page which contains extra information
including: phone numbers, fax, addresses, emails, network maps ect (Might make a parser for
this in the future... If you want it then raise a feature request for it :)

**Kind**: instance property of [<code>TOC</code>](#module_openraildata/referencedata.TOC)  
**Overrides**: [<code>url</code>](#module_openraildata/referencedata.TOC+url)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.V3RefData"></a>

### openraildata/referencedata.V3RefData ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  

* [.V3RefData](#module_openraildata/referencedata.V3RefData) ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
    * [new V3RefData(refData)](#new_module_openraildata/referencedata.V3RefData_new)
    * [.timetableId](#module_openraildata/referencedata.V3RefData+timetableId) : <code>String</code>
    * [.locations](#module_openraildata/referencedata.V3RefData+locations) : <code>Array.&lt;Object&gt;</code>
    * [.trainOperatorCompanies](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies) : <code>Array.&lt;Object&gt;</code>


* * *

<a name="new_module_openraildata/referencedata.V3RefData_new"></a>

#### new V3RefData(refData)

| Param | Type | Description |
| --- | --- | --- |
| refData | <code>Object</code> | the raw object contaiting the v3 data |


* * *

<a name="module_openraildata/referencedata.V3RefData+timetableId"></a>

#### v3RefData.timetableId : <code>String</code>
gets the v3 timetable Id

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>timetableId</code>](#module_openraildata/referencedata.V3RefData+timetableId)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata.V3RefData+locations"></a>

#### v3RefData.locations : <code>Array.&lt;Object&gt;</code>
an array of locations

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>locations</code>](#module_openraildata/referencedata.V3RefData+locations)  

* * *

<a name="module_openraildata/referencedata.V3RefData+trainOperatorCompanies"></a>

#### v3RefData.trainOperatorCompanies : <code>Array.&lt;Object&gt;</code>
an array of train operator companies

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>trainOperatorCompanies</code>](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies)  

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

