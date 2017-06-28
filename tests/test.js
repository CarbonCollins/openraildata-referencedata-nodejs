
const refData = require('../lib/refData');

refData.connect('A!t4398htw4ho4jy');

refData.on('ready', () => {
  console.log('ready');
  refData.getCurrentV3().then((file) => {
    console.log('v3 done');
    return refData.getCurrentV8();
  }).then((v8) => {
    console.log('v8 done');
    refData.v8.getSchedule('201706278021032')
  }).catch((err) => {
    console.error(err);
  });
});
