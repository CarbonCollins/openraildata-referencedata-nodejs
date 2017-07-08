
const refData = require('../lib/refData');

const V3 = require('../lib/models/v3');
const V8 = require('../lib/models/v8');

refData.connect('A!t4398htw4ho4jy');

refData.on('ready', () => {
  console.log('ready');
  refData.getCurrentV3().then((curV3) => {
    //refData._v3 = new V3(curV3);
    console.log('v3 done');
    return refData.getCurrentV8();
  }).then((curV8) => {
    //refData._v8 = new V8(curV8);
    console.log('v8 done');
    const results = refData.v8.runSearch().origin('MARYLBN').departsOriginBetween('16:30', '17:00').stopsAt('AYLSBRY')._jurneys;

    for (let i = 0, iLength = results.length; i < iLength; i += 1) {
      console.log(`${refData.v3.getLocation(results[i].OR.tpl).locname} (${results[i].OR.ptd}) - ${refData.v3.getLocation(results[i].DT.tpl).locname} (${results[i].DT.pta}) operated by ${refData.v3.getToc(results[i].toc).tocname}`);
    }
    console.log(`There are ${results.length} results`);
  }).catch((err) => {
    console.error(err);
  });
});
