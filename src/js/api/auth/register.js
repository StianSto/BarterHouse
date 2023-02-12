import { API_URL } from '../constants';
import headers from '../headers';
const REGISTER_ENDPOINT = 'auction/auth/register';

/**
 * sends a request to the Noroff API
 * @param { object } userData
 * @param { string } userData.name users name
 * @param { string } userData.email valid noroff email
 * @param { string } userData.password users password. min 8
 * @param { string } [ userData.avatar ] users avatar image. is optional
 * @throws { Error } if name, email or password is not submitted
 * @returns { Response } the response from the Noroff API
 */
export async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error('missing necessary data');
  const response = await fetch(`${API_URL}${REGISTER_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: headers('application/json'),
  });

  return response;
}
