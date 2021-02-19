// Libraries
import csvtojson from 'csvtojson';

// Types
import { LastPassData, BitWardenData } from '../types';

/**
 * > TODO: Description.
 * @param inputFileLocation
 */
export async function parseLastPassData(inputFileLocation: string): Promise<BitWardenData[]> {
  const lastPassData: LastPassData[] = await csvtojson().fromFile(inputFileLocation);

  const bitWardenData: BitWardenData[] = lastPassData.map(d => ({
    folder: d.grouping,
    favorite: d.fav,
    type: 'login',
    name: d.name,
    notes: d.extra,
    fields: '',
    login_uri: d.url,
    login_username: d.username,
    login_password: d.password,
    login_totp: '',
  }));

  return bitWardenData;
}
