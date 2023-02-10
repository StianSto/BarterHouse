import { API_URL } from '../constants';
import headers from '../headers';
const LOGIN_ENDPOINT = 'auction/auth/login';

/**
 *
 * @param {string} email - a registered users email
 * @param {string} password - users password
 * @returns {object} returns a promise from the api.
 *
 */
export async function login(email, password) {
  const response = await fetch(`${API_URL}${LOGIN_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: headers('application/json'),
  });

  return response;
}
