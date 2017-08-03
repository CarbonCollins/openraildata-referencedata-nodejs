## Classes

<dl>
<dt><a href="#ReferenceData">ReferenceData</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getLocalTimetableIds">getLocalTimetableIds()</a> ⇒ <code>Promise</code></dt>
<dd><p>gets the local manifest file and reads the current stored v3 and v8 reference data versions</p>
</dd>
<dt><a href="#updateLocalTimetableId">updateLocalTimetableId(type, timetableId)</a> ⇒ <code>Promise</code></dt>
<dd><p>updates/creates a local copy of the v3 or v8 ref data and updates the manifest file</p>
</dd>
<dt><a href="#writeRefFile">writeRefFile(filePath, file, resolve, reject)</a></dt>
<dd><p>writes a reference file to the local system</p>
</dd>
</dl>

<a name="ReferenceData"></a>

## ReferenceData
**Kind**: global class  

* [ReferenceData](#ReferenceData)
    * [new ReferenceData()](#new_ReferenceData_new)
    * _instance_
        * [.v3](#ReferenceData+v3)
        * [.v8](#ReferenceData+v8)
        * [.v3Loc](#ReferenceData+v3Loc)
        * [.v8Loc](#ReferenceData+v8Loc)
        * ["ready"](#ReferenceData+event_ready)
        * ["remoteDownload"](#ReferenceData+event_remoteDownload)
        * ["remoteChunk"](#ReferenceData+event_remoteChunk)
        * ["remoteEnd"](#ReferenceData+event_remoteEnd)
        * ["remoteError"](#ReferenceData+event_remoteError)
    * _inner_
        * [~_getRemoteStream(filePath, stream, size, resolve, reject)](#ReferenceData.._getRemoteStream)
        * [~connect(pass)](#ReferenceData..connect)
        * [~disconnect()](#ReferenceData..disconnect)
        * [~isFTPConnected()](#ReferenceData..isFTPConnected) ⇒ <code>Promise</code>
        * [~_listDirFTP(dir)](#ReferenceData.._listDirFTP) ⇒ <code>Promise</code>
        * [~getLocalJson()](#ReferenceData..getLocalJson) ⇒ <code>Promise</code>
        * [~getRemoteJson(type)](#ReferenceData..getRemoteJson) ⇒ <code>Promise</code>
        * [~getRemoteTimetableId(type)](#ReferenceData..getRemoteTimetableId) ⇒ <code>Promise</code>
        * [~getCurrent(type)](#ReferenceData..getCurrent) ⇒ <code>Proimise</code>

<a name="new_ReferenceData_new"></a>

### new ReferenceData()
a service for obtaining and maintaining a local copy of the National Rail reference data for use on apps and such

<a name="ReferenceData+v3"></a>

### referenceData.v3
gets the current v3 reference data

**Kind**: instance property of <code>[ReferenceData](#ReferenceData)</code>  
**Read only**: true  
**See**: [V3 docs](./models/v3.md)  
<a name="ReferenceData+v8"></a>

### referenceData.v8
gets the current v8 reference data

**Kind**: instance property of <code>[ReferenceData](#ReferenceData)</code>  
**Read only**: true  
**See**: [V8 docs](./models/v8.md)  
<a name="ReferenceData+v3Loc"></a>

### referenceData.v3Loc
gets the local v3 reference data path

**Kind**: instance property of <code>[ReferenceData](#ReferenceData)</code>  
**Read only**: true  
<a name="ReferenceData+v8Loc"></a>

### referenceData.v8Loc
gets the local v3 reference data path

**Kind**: instance property of <code>[ReferenceData](#ReferenceData)</code>  
**Read only**: true  
<a name="ReferenceData+event_ready"></a>

### "ready"
fired when the ftp client has connected

**Kind**: event emitted by <code>[ReferenceData](#ReferenceData)</code>  
<a name="ReferenceData+event_remoteDownload"></a>

### "remoteDownload"
fired when a remote download is about to commense

**Kind**: event emitted by <code>[ReferenceData](#ReferenceData)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| totalSize | <code>number</code> | total download size |
| path | <code>string</code> | where the data will be saved |

<a name="ReferenceData+event_remoteChunk"></a>

### "remoteChunk"
fired when a chunk of data has been downloaded

**Kind**: event emitted by <code>[ReferenceData](#ReferenceData)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| totalSize | <code>number</code> | total download size |
| path | <code>string</code> | where the data will be saved |
| chunkSize | <code>number</code> | the size of the chunk |

<a name="ReferenceData+event_remoteEnd"></a>

### "remoteEnd"
fired when a download has completed

**Kind**: event emitted by <code>[ReferenceData](#ReferenceData)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | where the data will be saved |

<a name="ReferenceData+event_remoteError"></a>

### "remoteError"
fired when a download error has occured

**Kind**: event emitted by <code>[ReferenceData](#ReferenceData)</code>  
<a name="ReferenceData.._getRemoteStream"></a>

### ReferenceData~_getRemoteStream(filePath, stream, size, resolve, reject)
gets and downloads a file from the remote FTP server with progress bar

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Emits**: <code>[remoteDownload](#ReferenceData+event_remoteDownload)</code>, <code>[remoteChunk](#ReferenceData+event_remoteChunk)</code>, <code>[remoteEnd](#ReferenceData+event_remoteEnd)</code>, <code>[remoteError](#ReferenceData+event_remoteError)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>String</code> | the filepath of the remote FTP file |
| stream | <code>Stream</code> | the stream for the remote file |
| size | <code>Number</code> | the size (in bytes) of the remote file |
| resolve | <code>function</code> | a promise resolve callback |
| reject | <code>function</code> | a promise reject callback |

<a name="ReferenceData..connect"></a>

### ReferenceData~connect(pass)
requests a connection to the remote FTP server to access the remote Reference data. a 'ready' event will be called when connected

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pass | <code>String</code> | the remote FTP users password |

<a name="ReferenceData..disconnect"></a>

### ReferenceData~disconnect()
disconnects the FTP client

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
<a name="ReferenceData..isFTPConnected"></a>

### ReferenceData~isFTPConnected() ⇒ <code>Promise</code>
checks to see if the FTP client is connected

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Promise</code> - resolves if the FTP client is connect and rejects if it is not connected or if there in an error  
<a name="ReferenceData.._listDirFTP"></a>

### ReferenceData~_listDirFTP(dir) ⇒ <code>Promise</code>
lists all of the files and directorys within the specified FTP path

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Promise</code> - resolves with an array of files and directories or rejects with an error  
**Access:** protected  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>String</code> | the parent FTP path to list |

<a name="ReferenceData..getLocalJson"></a>

### ReferenceData~getLocalJson() ⇒ <code>Promise</code>
gets the local copy (if it exists) of the v8 ref data in json format

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Promise</code> - resolves with local v8 ref data or rejects with an error  
<a name="ReferenceData..getRemoteJson"></a>

### ReferenceData~getRemoteJson(type) ⇒ <code>Promise</code>
gets a copy of the v8 ref data from the FTP server

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Promise</code> - resolves with the remote FTP v8 data or rejects with an error  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |

<a name="ReferenceData..getRemoteTimetableId"></a>

### ReferenceData~getRemoteTimetableId(type) ⇒ <code>Promise</code>
gets the Timetable ID of the remote FTP v8 refData

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Promise</code> - resolves with the remote FTP v8 timetableID or rejects with an error  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |

<a name="ReferenceData..getCurrent"></a>

### ReferenceData~getCurrent(type) ⇒ <code>Proimise</code>
gets the most up-to-date copy of the v8 reference data from either local or remote FTP

**Kind**: inner method of <code>[ReferenceData](#ReferenceData)</code>  
**Returns**: <code>Proimise</code> - resolves with the most up-to-date copy o the v8 ref data or rejects with an error  
**Emits**: <code>ReferenceData#event:vUpdating</code>, <code>ReferenceData#event:vUpdated</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | either 'v3' or 'v8' |

<a name="getLocalTimetableIds"></a>

## getLocalTimetableIds() ⇒ <code>Promise</code>
gets the local manifest file and reads the current stored v3 and v8 reference data versions

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves with the manifest v3 and v8 data or rejects with an error  
<a name="updateLocalTimetableId"></a>

## updateLocalTimetableId(type, timetableId) ⇒ <code>Promise</code>
updates/creates a local copy of the v3 or v8 ref data and updates the manifest file

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves with the ref data and manifest updated or rejects with an error  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | either 'v3' and 'v8' |
| timetableId | <code>String</code> | the new timetableID to use in the manifest |

<a name="writeRefFile"></a>

## writeRefFile(filePath, file, resolve, reject)
writes a reference file to the local system

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>String</code> | the file path of where the data will be written to |
| file | <code>\*</code> | the file data to write |
| resolve | <code>function</code> | a promise resolve callback |
| reject | <code>function</code> | a promise reject callback |

