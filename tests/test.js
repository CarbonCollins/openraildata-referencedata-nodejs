
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
    const results = refData.v8.runSearch().origin('MARYLBN').departsOriginBetween('16:45', '17:15').stopsAt('AYLSBRY').today()._jurneys;
    console.log(`There are ${results.length} results`);

    console.log(JSON.stringify(results, null, 2));
    for (let i = 0, iLength = results.length; i < iLength; i += 1) {
      console.log(`${refData.v3.getLocation(results[i].OR.tpl).locname} (${results[i].OR.ptd}) - ${refData.v3.getLocation(results[i].DT.tpl).locname} (${results[i].DT.pta}) operated by ${refData.v3.getToc(results[i].toc).tocname}`);
    }
  }).catch((err) => {
    console.error(err);
  });
// });
