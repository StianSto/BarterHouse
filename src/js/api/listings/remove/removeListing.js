import createUrl from '../../../functions/createUrl';
import { LISTINGS_ENDPOINT } from '../../constants';
import headers from '../../headers';

/**
 * Deletes a listing.
 * @param {string} id - The ID of the listing to be deleted.
 * @return {Promise<Response>} The response from the server after the DELETE request has been made.
 * @example
 * const id = '1234-abcd-5678'
 * const response = removeListing(id)
 */
export async function removeListing(id) {
  const URL = createUrl(`${LISTINGS_ENDPOINT}/${id}`);

  const response = await fetch(URL, {
    method: 'DELETE',
    headers: headers('application/json'),
  });

  return response;
}
