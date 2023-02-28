import createUrl from '../../../functions/createUrl';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

export async function updateProfile(user, body) {
  const URL = createUrl(`${PROFILES_ENDPOINT}${user}/media`);
  const response = await fetch(URL, {
    method: 'PUT',
    body,
    headers: headers('application/json'),
  });

  return response;
}
