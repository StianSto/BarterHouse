import { API_URL } from '../constants';
import headers from '../headers';
const REGISTER_ENDPOINT = 'auction/auth/register';

/**
 *
 * @param { object } postData
 * @param { string } postData.name users name
 * @param { string } postData.email valid noroff email
 * @param { string } postData.password users password. min 8
 * @param { string } [ postData.avatar ] users avatar image. is optional
 * @returns { promise } a promise from noroff API
 */
export async function register({ name, email, password }) {
  const response = await fetch(`${API_URL}${REGISTER_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: headers('application/json'),
  });

  return response;
}
