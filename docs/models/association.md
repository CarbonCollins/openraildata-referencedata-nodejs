## Classes

<dl>
<dt><a href="#Association">Association</a></dt>
<dd></dd>
</dl>

## External

<dl>
<dt><a href="#external_refData">refData</a></dt>
<dd><p>a service for obtaining and managing the reference data</p>
</dd>
</dl>

<a name="Association"></a>

## Association
**Kind**: global class  

* [Association](#Association)
    * [new Association()](#new_Association_new)
    * _instance_
        * [.tiploc](#Association+tiploc) ⇒ <code>String</code> &#124; <code>null</code>
        * [.category](#Association+category) ⇒ <code>String</code> &#124; <code>null</code>
        * [.mainTrain](#Association+mainTrain) ⇒ <code>Object</code> &#124; <code>null</code>
        * [.mainTrainId](#Association+mainTrainId) ⇒ <code>String</code> &#124; <code>null</code>
        * [.mainTrainSchedule](#Association+mainTrainSchedule) ⇒ <code>Schedule</code> &#124; <code>null</code>
        * [.assocTrain](#Association+assocTrain) ⇒ <code>Object</code> &#124; <code>null</code>
        * [.assocTrainId](#Association+assocTrainId) ⇒ <code>String</code> &#124; <code>null</code>
        * [.assocTrainSchedule](#Association+assocTrainSchedule) ⇒ <code>Schedule</code> &#124; <code>null</code>
    * _inner_
        * [~getLocation()](#Association..getLocation) ⇒ <code>String</code>
        * [~isJoin()](#Association..isJoin) ⇒ <code>Boolean</code>
        * [~isSplit()](#Association..isSplit) ⇒ <code>Boolean</code>
        * [~isNextTrain()](#Association..isNextTrain) ⇒ <code>Boolean</code>

<a name="new_Association_new"></a>

### new Association()
A class for association data and helpful functions

<a name="Association+tiploc"></a>

### association.tiploc ⇒ <code>String</code> &#124; <code>null</code>
gets the association tiploc code

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - the tiploc code or null  
**Read only**: true  
<a name="Association+category"></a>

### association.category ⇒ <code>String</code> &#124; <code>null</code>
gets the association category

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - the category or null  
**Read only**: true  
<a name="Association+mainTrain"></a>

### association.mainTrain ⇒ <code>Object</code> &#124; <code>null</code>
gets the main train information

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>Object</code> &#124; <code>null</code> - an object containing all of the main trains information or null  
**Read only**: true  
<a name="Association+mainTrainId"></a>

### association.mainTrainId ⇒ <code>String</code> &#124; <code>null</code>
gets the main train rid

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - the main trains rid  
**Read only**: true  
<a name="Association+mainTrainSchedule"></a>

### association.mainTrainSchedule ⇒ <code>Schedule</code> &#124; <code>null</code>
gets the main trains schedule

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>Schedule</code> &#124; <code>null</code> - the main trains Schedule object  
**Read only**: true  
<a name="Association+assocTrain"></a>

### association.assocTrain ⇒ <code>Object</code> &#124; <code>null</code>
gets the assoc train information

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>Object</code> &#124; <code>null</code> - an object containing all of the assoc trains information or null  
**Read only**: true  
<a name="Association+assocTrainId"></a>

### association.assocTrainId ⇒ <code>String</code> &#124; <code>null</code>
gets the assoc train rid

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - the assoc trains rid  
**Read only**: true  
<a name="Association+assocTrainSchedule"></a>

### association.assocTrainSchedule ⇒ <code>Schedule</code> &#124; <code>null</code>
gets the assoc trains schedule

**Kind**: instance property of <code>[Association](#Association)</code>  
**Returns**: <code>Schedule</code> &#124; <code>null</code> - the assoc trains Schedule object  
**Read only**: true  
<a name="Association..getLocation"></a>

### Association~getLocation() ⇒ <code>String</code>
gets the location name of the where the association happens

**Kind**: inner method of <code>[Association](#Association)</code>  
**Returns**: <code>String</code> - the location name of the association  
<a name="Association..isJoin"></a>

### Association~isJoin() ⇒ <code>Boolean</code>
checks to see if the association is a train join type

**Kind**: inner method of <code>[Association](#Association)</code>  
<a name="Association..isSplit"></a>

### Association~isSplit() ⇒ <code>Boolean</code>
checks to see if the association is a train split type

**Kind**: inner method of <code>[Association](#Association)</code>  
<a name="Association..isNextTrain"></a>

### Association~isNextTrain() ⇒ <code>Boolean</code>
checks to see if the association is a next train type

**Kind**: inner method of <code>[Association](#Association)</code>  
<a name="external_refData"></a>

## refData
a service for obtaining and managing the reference data

**Kind**: global external  
**See**: [refData](../refData.md)  
