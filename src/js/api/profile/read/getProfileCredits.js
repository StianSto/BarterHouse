import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

export async function getProfileCredits(user) {
  const path = PROFILES_ENDPOINT + user + '/credits';
  const URL = createUrl(path);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
