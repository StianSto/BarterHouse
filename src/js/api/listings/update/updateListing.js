import createUrl from '../../../functions/createFlagString';
import { LISTINGS_ENDPOINT } from '../../constants';
import headers from '../../headers';

/**
Updates a listing in the Noroff API by sending a PUT request to the server.
@param {string} id - The unique identifier of the listing to be updated.
@param {object} options - An object containing the new data for the listing.
@param {string} options.title - The new title of the listing.
@param {string} [options.description=' '] - The new description of the listing.
@param {array} [options.tags=[]] - An array of new tags for the listing.
@param {array} [options.media=[]] - An array of new media for the listing.
@throws {Error} If the title property is not provided.
@returns {object} The response from the server.
*/
export async function updateListing(
  id,
  { title, description = '', tags = [], media = [] }
) {
  if (!title)
    throw new Error('you can´t remove the title when updating a listing');

  const URL = createUrl(`${LISTINGS_ENDPOINT}/${id}`);

  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ title, description, tags, media }),
    headers: headers('application/json'),
  });

  return response;
}
