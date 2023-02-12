import createUrl from '../../../functions/createFlagString';
import { LISTINGS_ENDPOINT } from '../../constants';
import headers from '../../headers';

/**
creates a new listing 
@param {Object} listingData - The listing data for creating a new listing.
@param {string} listingData.title - The title of the new listing.
@param {string} [listingData.description=''] - The description of the new listing.
@param {Date} listingData.endsAt - The end date of the new listing.
@param {Array} [listingData.tags=[]] - The tags associated with the new listing.
@param {Array} [listingData.media=[]] - The media (images, videos) associated with the new listing.
@throws {Error} If the title or end date is not provided.
@returns {Promise<Response>} The response from the API after creating a new listing.
@example
const listingData = {
	title: 'mylisting',
  description: "this is a listing",
  endsAt: '1975-08-19T23:15:30.000Z',
  tags: ['tag1', 'tag2'],
  media: ['img-url.com', 'img-url-2.com'],
}
const response = createListing(listingsData)
*/
export async function createListing({
  title,
  description = '',
  endsAt,
  tags = [],
  media = [],
}) {
  if (!title) throw new Error('you need a title to create a new listing');
  if (!endsAt) throw new Error('you need an end date to create a new listing');

  const URL = createUrl(`${LISTINGS_ENDPOINT}`);

  const response = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ title, description, endsAt, tags, media }),
    headers: headers('application/json'),
  });

  return response;
}
