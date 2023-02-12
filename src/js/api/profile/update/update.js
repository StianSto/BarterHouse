import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

export async function updateProfile(user, avatar) {
  const URL = createUrl(`${PROFILES_ENDPOINT}${user}/media`);
  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ avatar }),
    headers: headers('application/json'),
  });

  return response;
}
