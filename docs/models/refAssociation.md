## Mixins

<dl>
<dt><a href="#AssociationMix">AssociationMix</a></dt>
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
</dl>

<a name="AssociationMix"></a>

## AssociationMix
**Kind**: global mixin  
<a name="AssociationMix..getLocation"></a>

### AssociationMix~getLocation() ⇒ <code>String</code> &#124; <code>null</code>
gets the location name of the where the association happens

**Kind**: inner method of <code>[AssociationMix](#AssociationMix)</code>  
**Returns**: <code>String</code> &#124; <code>null</code> - the location name of the association or null if ref data is not used  
<a name="mainTrainSchedule"></a>

## mainTrainSchedule ⇒ <code>Schedule</code> &#124; <code>null</code>
gets the main trains schedule (if ref data is used)

**Kind**: global variable  
**Returns**: <code>Schedule</code> &#124; <code>null</code> - the main trains Schedule object or a null if ref data is not used  
**Read only**: true  
<a name="assocTrainSchedule"></a>

## assocTrainSchedule ⇒ <code>Schedule</code> &#124; <code>null</code>
gets the assoc trains schedule

**Kind**: global variable  
**Returns**: <code>Schedule</code> &#124; <code>null</code> - the assoc trains Schedule object or null if ref data is not used  
**Read only**: true  
