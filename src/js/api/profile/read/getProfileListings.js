import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

// GET MUTLIPLE PROFILES
const paramsProfileListings = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['tag', null],
  ['_active', null],
  ['_bids', null],
]);

export async function getProfileListings(user, paramsMap = []) {
  const params = new Map([...paramsProfileListings, ...paramsMap]);
  const path = PROFILES_ENDPOINT + user + '/listings';
  const URL = createUrl(path, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
