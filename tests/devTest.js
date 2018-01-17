const refData = require('../index');

console.log(refData);

refData
  .on('error', (err) => {
    console.error(err);
  })
  .on('connected', (data) => {
    console.info(data);
  })
  .on('disconnected', (data) => {
    console.error(data)
  })
  .on('reconnecting', (data) => {
    console.info(data)
  })
  .on('reconnection attempt', (data) => {
    console.info(data)
  })
  .on('download', data => console.log(data))
  .on('downloadChunk', data => console.log(data))
  .on('downloadError', data => console.error(data))
  .on('downloadEnd', data => console.log(data))
  .on('referenceDataUpdate', data => { console.log('update'); console.log(data) });


refData.connect({
  password: 'A!t4398htw4ho4jy'
});
