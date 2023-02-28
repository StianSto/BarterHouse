import createUrl from '../../../functions/createUrl';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

// GET MUTLIPLE PROFILES
const flagsProfilesDefault = new Map([
  ['sort', 'credits'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['_listings', null],
]);

export async function getAllProfiles(flags = flagsProfilesDefault) {
  const URL = createUrl(PROFILES_ENDPOINT, flags);
  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}

// GET SINGLE PROFILE

const paramsDefault = new Map([['_listings', true]]);

/**

@function
@async
@param {string} user - The user id of the profile to retrieve.
@param {Map} queryParams - The query parameters to specify the data to retrieve.
@returns {Promise} - The API response of the requested profile.
@description
This function retrieves a single profile from the API by sending a GET request to the API endpoint with the specified user id.
*/
export async function getProfile(user, queryParams = []) {
  const params = new Map([...paramsDefault, ...queryParams]);
  const URL = createUrl(PROFILES_ENDPOINT + user, params);
  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
