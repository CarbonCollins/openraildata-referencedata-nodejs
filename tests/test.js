
const refData = require('../lib/refData');

const V3 = require('../lib/models/v3');
const V8 = require('../lib/models/v8');

// refData.connect('A!t4398htw4ho4jy');

// refData.on('ready', () => {
  console.log('ready');
  refData.getLocalV3Json().then((curV3) => {
    refData._v3 = new V3(curV3);
    console.log('v3 done');
    return refData.getLocalV8Json();
  }).then((curV8) => {
    refData._v8 = new V8(curV8);
    console.log('v8 done');
    console.log(refData.v8.runSearch().origin('EUSTON').departsAt('16.43').intermediateStop('MKNSCEN'));
  }).catch((err) => {
    console.error(err);
  });
// });
