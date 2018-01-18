const refData = require('../index');

console.log(refData);

refData
  .on('error', data => console.log(data))
  .on('connected', data => console.log(data))
  .on('disconnected', data => console.log(data))
  .on('reconnecting', data => console.log(data))
  .on('reconnection attempt', data => console.log(data))
  .on('download', data => console.log(data))
  .on('downloadChunk', data => console.log(data))
  .on('downloadError', data => console.error(data))
  .on('downloadEnd', data => console.log(data))
  .on('update', data => { console.log(data); console.log(refData.v3); } );


refData.connect({
  password: 'A!t4398htw4ho4jy'
});
