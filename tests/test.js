
const refData = require('../lib/refData');

refData.connect('A!t4398htw4ho4jy');

refData.on('ready', () => {
  console.log('ready');
  refData.getCurrentV3().then(() => {
    console.log('v3 done');
    return refData.getCurrentV8();
  }).then(() => {
    console.log('v8 done');
    console.log(JSON.stringify(refData.v8.runSearch().origin('EUSTON').intermediateStop('MKNSCEN'), null, 2));
  }).catch((err) => {
    console.error(err);
  });
});
