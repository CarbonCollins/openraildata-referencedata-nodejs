# Events

Ths package emits various events which can be subscribed to in your own code.

---

## connection events

### `connected`  
Fired when the instance of referencedata connects to the FTP server and passes authentication. From this point the connection is ready for browsing and downloading files stored on the FTP. This does not mean that the data is available and ready to see (as this is handled by another event detailed below)  

### `reconnecting`  
Fired when the instance of referenceData is going to attempt to reconnect to the FTP server at a future time. A payload is able emitted with this event hat contains two properties, the first `reconnectDelay` details how many ms until the next reconnection attempt is performed. `keepAlive` is a boolean that determines if the instance of referenceData is configured to auto reconnect on failure`  

**payload properties**: `reconnectDelay`, `keepAlive`  

### `reconnectionAttempt`  
Fired when the instance of referenceData is attempting to reconnect to the FTP server.  

### `disconnected`  
Fired when the instance of referenceData has disconnected from the ftp server. A payload is able emitted with this event which contains `keepAlive` which is a boolean that determines if the instance of referenceData is configured to auto reconnect`  

**payload properties**: `keepAlive`  

---

## data events

### `dataReady`  
Fired when all new data has been loaded and parsed. This signals when all the reference data is ready to use.  

### `update`  
Fired when a piece of reference data is updated e.g. this can be triggered on both the v3 or v8 data being updated.

---

## download events

### `download`  
Fired when a file is about to start being downloaded from the ftp server. A payload consisting of an object with two properties is also sent where the `filePath` is where the reference data will be saved and `fileName` is the name of the reference data file. Size being the size of the file to download and name being the name of the reference data.  

**payload properties**: `filePath`, `fileName`, `size`, `name`  

### `downloadChunk`  
Fired when a chunk is downloaded from a file from the ftp server. This will be fired many times during a download as each chunk triggers it. A payload is also included with this event which matches the same items as the `download` event but with the addition of `chunkSize` which as named shows the size of the chunk that was just downloaded. Once a whole file has been downloaded the summation of all the `chunkSize` values should equal the `size` value. This allows a progress bar to be displayed that updates as the chunks are downloaded.  

**payload properties**: `chunkSize`, `filePath`, `fileName`, `size`, `name`  


### `downloadEnd`  
Fired when a file has finished downloading from the ftp server. It also returns a payload which consists of the `filePath` which is where the reference data will be saved and `fileName` is the name of the reference data file. Size being the size of the file downloaded and name being the name of the reference data.  

**payload properties**: `filePath`, `fileName`, `size`, `name` 

### `downloadError`
**description**: Fired when there was an error downloading the reference data from the FTP server. The payload contains an error object.  

**payload**: Error

---

## other events

### `error`  
fired when an error occurs anywhere in the referencedata code.  

**payload**: Error  
