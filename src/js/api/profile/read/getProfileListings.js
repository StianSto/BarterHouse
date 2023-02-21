import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

const paramsDefault = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['tag', null],
  ['_active', null],
  ['_bids', true],
]);

/**
This function retrieves the profile listings of a given user. 
@param {string} user - The user's ID.
@param {Map} [paramsMap=[]] - An optional parameter map to add to the default parameters.
@returns {Response} - The fetch response from the API call.
@example
const user = 'John_Doe'
const params = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['tag', null],
  ['_active', null],
  ['_bids', null],
]);

cosnt response = getProfileListings(user, params)
*/
export async function getProfileListings(user, paramsMap = []) {
  const params = new Map([...paramsDefault, ...paramsMap]);
  const path = PROFILES_ENDPOINT + user + '/listings';
  const URL = createUrl(path, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
