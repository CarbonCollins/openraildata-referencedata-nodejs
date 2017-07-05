<a name="JurneySearch"></a>

## JurneySearch
A class for filtering and searching through schedule data

**Kind**: global class  

* [JurneySearch](#JurneySearch)
    * [~filter(filterFunction)](#JurneySearch..filter) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~origin(tiploc, [time])](#JurneySearch..origin) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~departsOriginAfter(time)](#JurneySearch..departsOriginAfter) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~departsOriginBefore(time)](#JurneySearch..departsOriginBefore) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~departsOriginBetween(timeFrom, timeTo)](#JurneySearch..departsOriginBetween) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~destination(tiploc, [time])](#JurneySearch..destination) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~intermediateStop(tiploc, [time])](#JurneySearch..intermediateStop) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~passingPoint(tiploc, [time])](#JurneySearch..passingPoint) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~stopsAt(tiploc, [time])](#JurneySearch..stopsAt) ⇒ <code>[JurneySearch](#JurneySearch)</code>
    * [~today()](#JurneySearch..today) ⇒ <code>[JurneySearch](#JurneySearch)</code>

<a name="JurneySearch..filter"></a>

### JurneySearch~filter(filterFunction) ⇒ <code>[JurneySearch](#JurneySearch)</code>
allows a custom filter function to be applied to the jruney list.

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type |
| --- | --- |
| filterFunction | <code>function</code> | 

<a name="JurneySearch..origin"></a>

### JurneySearch~origin(tiploc, [time]) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results starting from an origin station

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the origin TIPLOC code |
| [time] | <code>String</code> | an optional depart time in the format HH:MM |

<a name="JurneySearch..departsOriginAfter"></a>

### JurneySearch~departsOriginAfter(time) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which depart from origin after a specified time

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>String</code> | a depart time to filter results to |

<a name="JurneySearch..departsOriginBefore"></a>

### JurneySearch~departsOriginBefore(time) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which depart from origin before a specified time

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>String</code> | a depart time to filter results to |

<a name="JurneySearch..departsOriginBetween"></a>

### JurneySearch~departsOriginBetween(timeFrom, timeTo) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which depart from origin between two specified times

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| timeFrom | <code>String</code> | a from depart time to filter results to |
| timeTo | <code>String</code> | a to depart time to filter results to |

<a name="JurneySearch..destination"></a>

### JurneySearch~destination(tiploc, [time]) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results ending at a destination station

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the destination TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |

<a name="JurneySearch..intermediateStop"></a>

### JurneySearch~intermediateStop(tiploc, [time]) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which stop at a station on its route

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate stop TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |

<a name="JurneySearch..passingPoint"></a>

### JurneySearch~passingPoint(tiploc, [time]) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which pass a station on its route

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the passing points TIPLOC code |
| [time] | <code>String</code> | an optional arrival time in the format HH:MM |

<a name="JurneySearch..stopsAt"></a>

### JurneySearch~stopsAt(tiploc, [time]) ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which stop at any intermediate points or the destination

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tiploc | <code>String</code> | the intermediate point or destination TIPLOC code |
| [time] | <code>String</code> | an optiona time in the format HH:MM |

<a name="JurneySearch..today"></a>

### JurneySearch~today() ⇒ <code>[JurneySearch](#JurneySearch)</code>
applys a filter to find results which start today only

**Kind**: inner method of <code>[JurneySearch](#JurneySearch)</code>  
