<a name="module_openraildata/referencedata"></a>

## openraildata/referencedata
the openraildata/referencedata module is used to obtain reference data regarding
train timetables, locations, stations,and other related data to the UK train network. The module
operated through an ftp server located at datafeeds.nationalrail.co.uk.


* [openraildata/referencedata](#module_openraildata/referencedata)
    * _instance_
        * [.v3](#module_openraildata/referencedata+v3) : <code>Object</code>
        * [.v8](#module_openraildata/referencedata+v8) : <code>Object</code>
        * [.v3Loc](#module_openraildata/referencedata+v3Loc) : <code>Object</code>
        * [.v8Loc](#module_openraildata/referencedata+v8Loc) : <code>Object</code>
        * ["ready"](#module_openraildata/referencedata+event_ready)
        * ["remoteDownload"](#module_openraildata/referencedata+event_remoteDownload)
        * ["remoteChunk"](#module_openraildata/referencedata+event_remoteChunk)
        * ["remoteEnd"](#module_openraildata/referencedata+event_remoteEnd)
        * ["remoteError"](#module_openraildata/referencedata+event_remoteError)
    * _inner_
        * [~connect(pass)](#module_openraildata/referencedata..connect)
        * [~disconnect()](#module_openraildata/referencedata..disconnect)
        * [~isFTPConnected()](#module_openraildata/referencedata..isFTPConnected) ⇒ <code>Promise</code>
        * [~getLocalJson()](#module_openraildata/referencedata..getLocalJson) ⇒ <code>Promise</code>
        * [~getRemoteJson(type)](#module_openraildata/referencedata..getRemoteJson) ⇒ <code>Promise</code>
        * [~getRemoteTimetableId(type)](#module_openraildata/referencedata..getRemoteTimetableId) ⇒ <code>Promise</code>
        * [~getCurrent(type)](#module_openraildata/referencedata..getCurrent) ⇒ <code>Proimise</code>


* * *

<a name="module_openraildata/referencedata+v3"></a>

### openraildata/referencedata.v3 : <code>Object</code>
gets the current v3 reference data

**Kind**: instance property of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata+v8"></a>

### openraildata/referencedata.v8 : <code>Object</code>
gets the current v8 reference data

**Kind**: instance property of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata+v3Loc"></a>

### openraildata/referencedata.v3Loc : <code>Object</code>
gets the local v3 reference data path

**Kind**: instance property of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata+v8Loc"></a>

### openraildata/referencedata.v8Loc : <code>Object</code>
gets the local v3 reference data path

**Kind**: instance property of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Read only**: true  

* * *

<a name="module_openraildata/referencedata+event_ready"></a>

### "ready"
fired when the ftp client has connected

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata+event_remoteDownload"></a>

### "remoteDownload"
fired when a remote download is about to commense

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| totalSize | <code>number</code> | total download size |
| path | <code>string</code> | where the data will be saved |


* * *

<a name="module_openraildata/referencedata+event_remoteChunk"></a>

### "remoteChunk"
fired when a chunk of data has been downloaded

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| totalSize | <code>number</code> | total download size |
| path | <code>string</code> | where the data will be saved |
| chunkSize | <code>number</code> | the size of the chunk |


* * *

<a name="module_openraildata/referencedata+event_remoteEnd"></a>

### "remoteEnd"
fired when a download has completed

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | where the data will be saved |


* * *

<a name="module_openraildata/referencedata+event_remoteError"></a>

### "remoteError"
fired when a download error has occured

**Kind**: event emitted by [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata..connect"></a>

### openraildata/referencedata~connect(pass)
requests a connection to the remote FTP server to access the remote Reference data. a 'ready' event will be called when connected

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

| Param | Type | Description |
| --- | --- | --- |
| pass | <code>String</code> | the remote FTP users password |


* * *

<a name="module_openraildata/referencedata..disconnect"></a>

### openraildata/referencedata~disconnect()
disconnects the FTP client

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  

* * *

<a name="module_openraildata/referencedata..isFTPConnected"></a>

### openraildata/referencedata~isFTPConnected() ⇒ <code>Promise</code>
checks to see if the FTP client is connected

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Returns**: <code>Promise</code> - resolves if the FTP client is connect and rejects if it is not connected or if there in an error  

* * *

<a name="module_openraildata/referencedata..getLocalJson"></a>

### openraildata/referencedata~getLocalJson() ⇒ <code>Promise</code>
gets the local copy (if it exists) of the v8 ref data in json format

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Returns**: <code>Promise</code> - resolves with local v8 ref data or rejects with an error  

* * *

<a name="module_openraildata/referencedata..getRemoteJson"></a>

### openraildata/referencedata~getRemoteJson(type) ⇒ <code>Promise</code>
gets a copy of the v8 ref data from the FTP server

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Returns**: <code>Promise</code> - resolves with the remote FTP v8 data or rejects with an error  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |


* * *

<a name="module_openraildata/referencedata..getRemoteTimetableId"></a>

### openraildata/referencedata~getRemoteTimetableId(type) ⇒ <code>Promise</code>
gets the Timetable ID of the remote FTP v8 refData

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Returns**: <code>Promise</code> - resolves with the remote FTP v8 timetableID or rejects with an error  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |


* * *

<a name="module_openraildata/referencedata..getCurrent"></a>

### openraildata/referencedata~getCurrent(type) ⇒ <code>Proimise</code>
gets the most up-to-date copy of the v8 reference data from either local or remote FTP

**Kind**: inner method of [<code>openraildata/referencedata</code>](#module_openraildata/referencedata)  
**Returns**: <code>Proimise</code> - resolves with the most up-to-date copy o the v8 ref data or rejects with an error  
**Emits**: <code>module:openraildata/referencedata#event:vUpdating</code>, <code>module:openraildata/referencedata#event:vUpdated</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |


* * *

