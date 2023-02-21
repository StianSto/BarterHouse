import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

// GET MUTLIPLE PROFILES
const paramsProfileBids = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', null],
  ['offset', null],
  ['_listings', true],
]);

/**
This function sends a GET request to the API endpoint for the specified user's bids on listings. If no additional query parameters are provided, it will use the default: ´sort: "created"´, `sortOrder: "desc"`, `limit: 10`, `offset: null`, `_listings: null`. function returns the response from the API 
@function getProfileBids
@param {string} user - The user's ID.
@param {Array} [paramsMap=[]] - An array of additional parameters to include in the URL.
@return {Promise} - Returns a Promise
*/
export async function getProfileBids(user, paramsMap = []) {
  const params = new Map([...paramsProfileBids, ...paramsMap]);
  const path = PROFILES_ENDPOINT + user + '/bids';
  const URL = createUrl(path, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
