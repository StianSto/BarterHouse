import { storage } from '../../storage/localStorage';
import { API_URL } from '../constants';
import headers from '../headers';
const LOGIN_ENDPOINT = 'auction/auth/login';

/**
 * sends a login request to the Noroff API with the email and password passed in
 * @param {string}
 * @return {Response} returns a promise from the api.
 *
 */
export async function login(data) {
  const response = await fetch(`${API_URL}${LOGIN_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers('application/json'),
  });

  if (response.ok) {
    const results = await response.json();
    storage.save('token', results.accessToken);
  }

  return response;
}
