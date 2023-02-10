import headers from '../../headers';
import createUrl from '../../../functions/createFlagString';

const LISTINGS_ENDPOINT = 'auction/listings';

const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['_active', null],
  ['_seller', null],
  ['_bids', null],
]);

export async function getAllListings(params = defaultParams) {
  const URL = createUrl(LISTINGS_ENDPOINT, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
export async function getlListing(params = defaultParams) {
  const URL = createUrl(LISTINGS_ENDPOINT, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
