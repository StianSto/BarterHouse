import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

/**
Retrieves the total credits of a specified user's profile
@param {string} user - The username of the profile to retrieve the credits of
@return {Promise} - Returns a promise that resolves to the response from the API
@example
const user = 'John_Doe'
cosnt response = getProfileCredits(user)
*/
export async function getProfileCredits(user) {
  const path = PROFILES_ENDPOINT + user + '/credits';
  const URL = createUrl(path);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
