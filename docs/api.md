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
        * [.CancellationReason](#module_openraildata/referencedata.CancellationReason) ⇐ [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)
            * [new CancellationReason(payload)](#new_module_openraildata/referencedata.CancellationReason_new)
            * [.code](#module_openraildata/referencedata.CancellationReason+code) : <code>Number</code>
            * [.reason](#module_openraildata/referencedata.CancellationReason+reason) : <code>String</code>
        * [.CustomerInformationSystem](#module_openraildata/referencedata.CustomerInformationSystem) ⇐ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)
            * [new CustomerInformationSystem(payload)](#new_module_openraildata/referencedata.CustomerInformationSystem_new)
            * [.code](#module_openraildata/referencedata.CustomerInformationSystem+code) : <code>String</code>
            * [.name](#module_openraildata/referencedata.CustomerInformationSystem+name) : <code>String</code>
        * [.LateRunningReason](#module_openraildata/referencedata.LateRunningReason) ⇐ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
            * [new LateRunningReason(payload)](#new_module_openraildata/referencedata.LateRunningReason_new)
            * [.code](#module_openraildata/referencedata.LateRunningReason+code) : <code>Number</code>
            * [.reason](#module_openraildata/referencedata.LateRunningReason+reason) : <code>String</code>
        * [.TrainOperatingCompany](#module_openraildata/referencedata.TrainOperatingCompany) ⇐ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
            * [new TrainOperatingCompany(payload)](#new_module_openraildata/referencedata.TrainOperatingCompany_new)
            * [.code](#module_openraildata/referencedata.TrainOperatingCompany+code) : <code>String</code>
            * [.name](#module_openraildata/referencedata.TrainOperatingCompany+name) : <code>String</code>
            * [.url](#module_openraildata/referencedata.TrainOperatingCompany+url) : <code>String</code>
        * [.V3RefData](#module_openraildata/referencedata.V3RefData) ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
            * [new V3RefData(refData)](#new_module_openraildata/referencedata.V3RefData_new)
            * _instance_
                * [.timetableId](#module_openraildata/referencedata.V3RefData+timetableId) : <code>String</code>
                * [.locations](#module_openraildata/referencedata.V3RefData+locations) : <code>Array.&lt;module:openraildata/referencedata.Location&gt;</code>
                * [.trainOperatorCompanies](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies) : [<code>Array.&lt;TrainOperatingCompany&gt;</code>](#module_openraildata/referencedata.TrainOperatingCompany)
                * [.lateRunningReasons](#module_openraildata/referencedata.V3RefData+lateRunningReasons) : [<code>Array.&lt;LateRunningReason&gt;</code>](#module_openraildata/referencedata.LateRunningReason)
                * [.cancellationReason](#module_openraildata/referencedata.V3RefData+cancellationReason) : [<code>Array.&lt;CancellationReason&gt;</code>](#module_openraildata/referencedata.CancellationReason)
                * [.vias](#module_openraildata/referencedata.V3RefData+vias) : [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
                * [.CustomerInformationSystemSources](#module_openraildata/referencedata.V3RefData+CustomerInformationSystemSources) : [<code>Array.&lt;CustomerInformationSystem&gt;</code>](#module_openraildata/referencedata.CustomerInformationSystem)
            * _inner_
                * [~findLocation(input)](#module_openraildata/referencedata.V3RefData..findLocation) ⇒ <code>module:openraildata/referencedata.Location</code>
                * [~findTrainOperatingCompany(input)](#module_openraildata/referencedata.V3RefData..findTrainOperatingCompany) ⇒ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
                * [~findLateRunningReason(input)](#module_openraildata/referencedata.V3RefData..findLateRunningReason) ⇒ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
                * [~findVias(...input)](#module_openraildata/referencedata.V3RefData..findVias) ⇒ [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
                * [~findCustomerInformationSystem(input)](#module_openraildata/referencedata.V3RefData..findCustomerInformationSystem) ⇒ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)
        * [.Via](#module_openraildata/referencedata.Via) ⇐ [<code>Via</code>](#module_openraildata/referencedata.Via)
            * [new Via(payload, locations)](#new_module_openraildata/referencedata.Via_new)
            * [.at](#module_openraildata/referencedata.Via+at) : <code>String</code>
            * [.destination](#module_openraildata/referencedata.Via+destination) : <code>String</code>
            * [.location1](#module_openraildata/referencedata.Via+location1) : <code>String</code>
            * [.location2](#module_openraildata/referencedata.Via+location2) : <code>String</code>
            * [.text](#module_openraildata/referencedata.Via+text) : <code>String</code>
        * [.LocationMix](#module_openraildata/referencedata.LocationMix) ⇐ <code>module:openraildata/referencedata.Location</code>
    * _inner_
        * [~connect()](#module_openraildata/referencedata..connect)
        * [~checkForReferenceDataUpdate()](#module_openraildata/referencedata..checkForReferenceDataUpdate)


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

<a name="module_openraildata/referencedata.CancellationReason"></a>

### openraildata/referencedata.CancellationReason ⇐ [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)
A cancellation reason

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)  

* [.CancellationReason](#module_openraildata/referencedata.CancellationReason) ⇐ [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)
    * [new CancellationReason(payload)](#new_module_openraildata/referencedata.CancellationReason_new)
    * [.code](#module_openraildata/referencedata.CancellationReason+code) : <code>Number</code>
    * [.reason](#module_openraildata/referencedata.CancellationReason+reason) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.CancellationReason_new"></a>

#### new CancellationReason(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |


* * *

<a name="module_openraildata/referencedata.CancellationReason+code"></a>

#### cancellationReason.code : <code>Number</code>
a numerical indicator for itendifying which cancelation to display

**Kind**: instance property of [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)  
**Overrides**: [<code>code</code>](#module_openraildata/referencedata.CancellationReason+code)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.CancellationReason+reason"></a>

#### cancellationReason.reason : <code>String</code>
a string description of the Cancellation reason

**Kind**: instance property of [<code>CancellationReason</code>](#module_openraildata/referencedata.CancellationReason)  
**Overrides**: [<code>reason</code>](#module_openraildata/referencedata.CancellationReason+reason)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.CustomerInformationSystem"></a>

### openraildata/referencedata.CustomerInformationSystem ⇐ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)
A customer information system source (CIS)

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)  

* [.CustomerInformationSystem](#module_openraildata/referencedata.CustomerInformationSystem) ⇐ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)
    * [new CustomerInformationSystem(payload)](#new_module_openraildata/referencedata.CustomerInformationSystem_new)
    * [.code](#module_openraildata/referencedata.CustomerInformationSystem+code) : <code>String</code>
    * [.name](#module_openraildata/referencedata.CustomerInformationSystem+name) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.CustomerInformationSystem_new"></a>

#### new CustomerInformationSystem(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the cis information |


* * *

<a name="module_openraildata/referencedata.CustomerInformationSystem+code"></a>

#### customerInformationSystem.code : <code>String</code>
the cis code (normaly 2 letters and 2 numbers)

**Kind**: instance property of [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)  
**Overrides**: [<code>code</code>](#module_openraildata/referencedata.CustomerInformationSystem+code)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.CustomerInformationSystem+name"></a>

#### customerInformationSystem.name : <code>String</code>
the human readable name of the cis source

**Kind**: instance property of [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)  
**Overrides**: [<code>name</code>](#module_openraildata/referencedata.CustomerInformationSystem+name)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.LateRunningReason"></a>

### openraildata/referencedata.LateRunningReason ⇐ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
A late running reason

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)  

* [.LateRunningReason](#module_openraildata/referencedata.LateRunningReason) ⇐ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
    * [new LateRunningReason(payload)](#new_module_openraildata/referencedata.LateRunningReason_new)
    * [.code](#module_openraildata/referencedata.LateRunningReason+code) : <code>Number</code>
    * [.reason](#module_openraildata/referencedata.LateRunningReason+reason) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.LateRunningReason_new"></a>

#### new LateRunningReason(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |


* * *

<a name="module_openraildata/referencedata.LateRunningReason+code"></a>

#### lateRunningReason.code : <code>Number</code>
a numerical indicator for itendifying which error to display

**Kind**: instance property of [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)  
**Overrides**: [<code>code</code>](#module_openraildata/referencedata.LateRunningReason+code)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.LateRunningReason+reason"></a>

#### lateRunningReason.reason : <code>String</code>
a string description of the late running reason

**Kind**: instance property of [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)  
**Overrides**: [<code>reason</code>](#module_openraildata/referencedata.LateRunningReason+reason)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TrainOperatingCompany"></a>

### openraildata/referencedata.TrainOperatingCompany ⇐ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
A train operating companys information

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)  

* [.TrainOperatingCompany](#module_openraildata/referencedata.TrainOperatingCompany) ⇐ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
    * [new TrainOperatingCompany(payload)](#new_module_openraildata/referencedata.TrainOperatingCompany_new)
    * [.code](#module_openraildata/referencedata.TrainOperatingCompany+code) : <code>String</code>
    * [.name](#module_openraildata/referencedata.TrainOperatingCompany+name) : <code>String</code>
    * [.url](#module_openraildata/referencedata.TrainOperatingCompany+url) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.TrainOperatingCompany_new"></a>

#### new TrainOperatingCompany(payload)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |


* * *

<a name="module_openraildata/referencedata.TrainOperatingCompany+code"></a>

#### trainOperatingCompany.code : <code>String</code>
the train operating company 2 letter code

**Kind**: instance property of [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)  
**Overrides**: [<code>code</code>](#module_openraildata/referencedata.TrainOperatingCompany+code)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TrainOperatingCompany+name"></a>

#### trainOperatingCompany.name : <code>String</code>
the train operating company human readable name

**Kind**: instance property of [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)  
**Overrides**: [<code>name</code>](#module_openraildata/referencedata.TrainOperatingCompany+name)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.TrainOperatingCompany+url"></a>

#### trainOperatingCompany.url : <code>String</code>
the train operating companys information page which contains extra information
including: phone numbers, fax, addresses, emails, network maps ect (Might make a parser for
this in the future... If you want it then raise a feature request for it :)

**Kind**: instance property of [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)  
**Overrides**: [<code>url</code>](#module_openraildata/referencedata.TrainOperatingCompany+url)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.V3RefData"></a>

### openraildata/referencedata.V3RefData ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
a class to hold all of the v3 reference data aswell as functions for accessing and manipulating the data

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  

* [.V3RefData](#module_openraildata/referencedata.V3RefData) ⇐ [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)
    * [new V3RefData(refData)](#new_module_openraildata/referencedata.V3RefData_new)
    * _instance_
        * [.timetableId](#module_openraildata/referencedata.V3RefData+timetableId) : <code>String</code>
        * [.locations](#module_openraildata/referencedata.V3RefData+locations) : <code>Array.&lt;module:openraildata/referencedata.Location&gt;</code>
        * [.trainOperatorCompanies](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies) : [<code>Array.&lt;TrainOperatingCompany&gt;</code>](#module_openraildata/referencedata.TrainOperatingCompany)
        * [.lateRunningReasons](#module_openraildata/referencedata.V3RefData+lateRunningReasons) : [<code>Array.&lt;LateRunningReason&gt;</code>](#module_openraildata/referencedata.LateRunningReason)
        * [.cancellationReason](#module_openraildata/referencedata.V3RefData+cancellationReason) : [<code>Array.&lt;CancellationReason&gt;</code>](#module_openraildata/referencedata.CancellationReason)
        * [.vias](#module_openraildata/referencedata.V3RefData+vias) : [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
        * [.CustomerInformationSystemSources](#module_openraildata/referencedata.V3RefData+CustomerInformationSystemSources) : [<code>Array.&lt;CustomerInformationSystem&gt;</code>](#module_openraildata/referencedata.CustomerInformationSystem)
    * _inner_
        * [~findLocation(input)](#module_openraildata/referencedata.V3RefData..findLocation) ⇒ <code>module:openraildata/referencedata.Location</code>
        * [~findTrainOperatingCompany(input)](#module_openraildata/referencedata.V3RefData..findTrainOperatingCompany) ⇒ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
        * [~findLateRunningReason(input)](#module_openraildata/referencedata.V3RefData..findLateRunningReason) ⇒ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
        * [~findVias(...input)](#module_openraildata/referencedata.V3RefData..findVias) ⇒ [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
        * [~findCustomerInformationSystem(input)](#module_openraildata/referencedata.V3RefData..findCustomerInformationSystem) ⇒ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)


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

#### v3RefData.locations : <code>Array.&lt;module:openraildata/referencedata.Location&gt;</code>
an array of locations

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>locations</code>](#module_openraildata/referencedata.V3RefData+locations)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata.V3RefData+trainOperatorCompanies"></a>

#### v3RefData.trainOperatorCompanies : [<code>Array.&lt;TrainOperatingCompany&gt;</code>](#module_openraildata/referencedata.TrainOperatingCompany)
an array of train operator companies

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>trainOperatorCompanies</code>](#module_openraildata/referencedata.V3RefData+trainOperatorCompanies)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata.V3RefData+lateRunningReasons"></a>

#### v3RefData.lateRunningReasons : [<code>Array.&lt;LateRunningReason&gt;</code>](#module_openraildata/referencedata.LateRunningReason)
an array of train late running reasons

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>lateRunningReasons</code>](#module_openraildata/referencedata.V3RefData+lateRunningReasons)  

* * *

<a name="module_openraildata/referencedata.V3RefData+cancellationReason"></a>

#### v3RefData.cancellationReason : [<code>Array.&lt;CancellationReason&gt;</code>](#module_openraildata/referencedata.CancellationReason)
an array of train cancellation reasons

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>cancellationReason</code>](#module_openraildata/referencedata.V3RefData+cancellationReason)  

* * *

<a name="module_openraildata/referencedata.V3RefData+vias"></a>

#### v3RefData.vias : [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
an array of vias

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>vias</code>](#module_openraildata/referencedata.V3RefData+vias)  

* * *

<a name="module_openraildata/referencedata.V3RefData+CustomerInformationSystemSources"></a>

#### v3RefData.CustomerInformationSystemSources : [<code>Array.&lt;CustomerInformationSystem&gt;</code>](#module_openraildata/referencedata.CustomerInformationSystem)
an array of CISSources

**Kind**: instance property of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Overrides**: [<code>CustomerInformationSystemSources</code>](#module_openraildata/referencedata.V3RefData+CustomerInformationSystemSources)  

* * *

<a name="module_openraildata/referencedata.V3RefData..findLocation"></a>

#### V3RefData~findLocation(input) ⇒ <code>module:openraildata/referencedata.Location</code>
finds a location from a search input

**Kind**: inner method of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Returns**: <code>module:openraildata/referencedata.Location</code> - returns a Location if found or a null if not found  
**See**: [https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location](https://github.com/CarbonCollins/openraildata-common-nodejs/blob/master/docs/api.md#module_openraildata/common+Location)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Stirng</code> | a string containing a search parameter of wither a tiploc code or a location name |


* * *

<a name="module_openraildata/referencedata.V3RefData..findTrainOperatingCompany"></a>

#### V3RefData~findTrainOperatingCompany(input) ⇒ [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany)
finds a rain operating company from a search input

**Kind**: inner method of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Returns**: [<code>TrainOperatingCompany</code>](#module_openraildata/referencedata.TrainOperatingCompany) - returns a train operating company  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Stirng</code> | a string containing a search parameter for the train operating company code |


* * *

<a name="module_openraildata/referencedata.V3RefData..findLateRunningReason"></a>

#### V3RefData~findLateRunningReason(input) ⇒ [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason)
finds a late running reason from a search input

**Kind**: inner method of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Returns**: [<code>LateRunningReason</code>](#module_openraildata/referencedata.LateRunningReason) - returns a late operating reason  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Stirng</code> | a string containing a search parameter for the late running reason code |


* * *

<a name="module_openraildata/referencedata.V3RefData..findVias"></a>

#### V3RefData~findVias(...input) ⇒ [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via)
finds a via from a search input. you can supply a single input for a list of viasassociated with that location, or supply 2-3 inputs to find a specific one

**Kind**: inner method of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Returns**: [<code>Array.&lt;Via&gt;</code>](#module_openraildata/referencedata.Via) - returns a cancellation reason  

| Param | Type | Description |
| --- | --- | --- |
| ...input | <code>Stirng</code> | a string containing a search parameter for the via location name, tiploc, or crs |


* * *

<a name="module_openraildata/referencedata.V3RefData..findCustomerInformationSystem"></a>

#### V3RefData~findCustomerInformationSystem(input) ⇒ [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem)
finds a customer information system

**Kind**: inner method of [<code>V3RefData</code>](#module_openraildata/referencedata.V3RefData)  
**Returns**: [<code>CustomerInformationSystem</code>](#module_openraildata/referencedata.CustomerInformationSystem) - returns a Customer Information System  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Stirng</code> | a string containing a search parameter for the customer information system code |


* * *

<a name="module_openraildata/referencedata.Via"></a>

### openraildata/referencedata.Via ⇐ [<code>Via</code>](#module_openraildata/referencedata.Via)
A cancellation reason

**Kind**: static class of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: [<code>Via</code>](#module_openraildata/referencedata.Via)  

* [.Via](#module_openraildata/referencedata.Via) ⇐ [<code>Via</code>](#module_openraildata/referencedata.Via)
    * [new Via(payload, locations)](#new_module_openraildata/referencedata.Via_new)
    * [.at](#module_openraildata/referencedata.Via+at) : <code>String</code>
    * [.destination](#module_openraildata/referencedata.Via+destination) : <code>String</code>
    * [.location1](#module_openraildata/referencedata.Via+location1) : <code>String</code>
    * [.location2](#module_openraildata/referencedata.Via+location2) : <code>String</code>
    * [.text](#module_openraildata/referencedata.Via+text) : <code>String</code>


* * *

<a name="new_module_openraildata/referencedata.Via_new"></a>

#### new Via(payload, locations)

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | the raw json object from the ftp containing the toc information |
| locations | <code>Array.&lt;Object&gt;</code> | an array of locations in which to map into the via class |


* * *

<a name="module_openraildata/referencedata.Via+at"></a>

#### via.at : <code>String</code>
at which point this via is in effect

**Kind**: instance property of [<code>Via</code>](#module_openraildata/referencedata.Via)  
**Overrides**: [<code>at</code>](#module_openraildata/referencedata.Via+at)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.Via+destination"></a>

#### via.destination : <code>String</code>
at which point this via is no longer in effect

**Kind**: instance property of [<code>Via</code>](#module_openraildata/referencedata.Via)  
**Overrides**: [<code>destination</code>](#module_openraildata/referencedata.Via+destination)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.Via+location1"></a>

#### via.location1 : <code>String</code>
the location for the via text

**Kind**: instance property of [<code>Via</code>](#module_openraildata/referencedata.Via)  
**Overrides**: [<code>location1</code>](#module_openraildata/referencedata.Via+location1)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.Via+location2"></a>

#### via.location2 : <code>String</code>
a secondary location for the via text

**Kind**: instance property of [<code>Via</code>](#module_openraildata/referencedata.Via)  
**Overrides**: [<code>location2</code>](#module_openraildata/referencedata.Via+location2)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.Via+text"></a>

#### via.text : <code>String</code>
a human readable via text to be displayed

**Kind**: instance property of [<code>Via</code>](#module_openraildata/referencedata.Via)  
**Overrides**: [<code>text</code>](#module_openraildata/referencedata.Via+text)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata.LocationMix"></a>

### openraildata/referencedata.LocationMix ⇐ <code>module:openraildata/referencedata.Location</code>
**Kind**: static mixin of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Extends**: <code>module:openraildata/referencedata.Location</code>, <code>module:openraildata/common.Location</code>  

* * *

<a name="module_openraildata/referencedata..connect"></a>

### openraildata/referencedata~connect()
connects to the openrail data FTP server

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Emits**: [<code>connected</code>](#module_openraildata/referencedata+event_connected), [<code>error</code>](#module_openraildata/referencedata+event_error)  
**Access**: public  

* * *

<a name="module_openraildata/referencedata..checkForReferenceDataUpdate"></a>

### openraildata/referencedata~checkForReferenceDataUpdate()
checks to see if the local refdata needs to be updated

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Emits**: [<code>error</code>](#module_openraildata/referencedata+event_error)  
**Access**: public  

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

