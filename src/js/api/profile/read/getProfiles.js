import createUrl from '../../../functions/createFlagString';
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

const flagsProfileDefault = new Map([['_listings', true]]);

export async function getProfile(user, flags = flagsProfileDefault) {
  const URL = createUrl(PROFILES_ENDPOINT + user, flags);
  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
