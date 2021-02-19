// Libraries
import * as json2csv from 'json2csv';
import path from 'path';
import fs from 'fs';

// Dependencies
import { parseLastPassData } from './parsers';

//
// PARAMETERS
//

const INPUT_LAST_PASS = path.resolve(__dirname, '..', 'tmp', 'lastpass_export.csv');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'tmp');
const OUTPUT_FILENAME = 'bitwarden_export';
const OUTPUT_FORMAT: 'csv' | 'json' = 'csv';

//
// IMPLEMENTATION
//

(async () => {
  console.info(`Parsing data found in: [${INPUT_LAST_PASS}]...`);

  const parsedLastPassData = await parseLastPassData(INPUT_LAST_PASS);
  
  console.info(`INFO: Parsed ${parsedLastPassData.length} data sets.`);
  
  const outputLocation = path.resolve(OUTPUT_DIR, `${OUTPUT_FILENAME}.${OUTPUT_FORMAT}`);
  
  console.info(`INFO: Writing data sets in: [${outputLocation}]...`);
  
  // Writing file:
  switch (OUTPUT_FORMAT as 'csv' | 'json') {
    case 'json': {
      fs.writeFileSync(
        outputLocation,
        JSON.stringify(parsedLastPassData, null, 2),
      );
      break;
    }
    case 'csv': {
      const csv = json2csv.parse(parsedLastPassData);
      fs.writeFileSync(
        outputLocation,
        csv,
      );
      break;
    }
  }
  
  console.info(`INFO: Successfuly wrote output file.`);
})();
