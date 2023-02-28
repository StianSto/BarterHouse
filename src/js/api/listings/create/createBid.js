import createUrl from '../../../functions/createUrl';
import { LISTINGS_ENDPOINT } from '../../constants';
import headers from '../../headers';

const defaultParams = new Map([
  ['_seller', true],
  ['_bids', true],
]);

/**
Creates a new bid on a listing.
@async
@param {string} id - The id of the listing to bid on.
@param {number} amount - The amount to bid.
@param {Map} [params=defaultParams] - The parameters to include in the API call.
@throws {Error} If the id is not provided or if the amount is not a number.
@return {Response} The API response.
@example
const id = '1234-abcd-5678'
const bid = 25
const params = new Map([
  ['_seller', false],
  ['_bids', false],
]);

const response = createBid(id, myBid, params)

*/
export async function createBid(id, amount, params = defaultParams) {
  if (!id) throw new Error('you need to bid on a listing');
  if (!amount || isNaN(amount)) throw new Error('you need to bid a number');

  const URL = createUrl(`${LISTINGS_ENDPOINT}/${id}/bids`, params);

  const response = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ amount }),
    headers: headers('application/json'),
  });

  return response;
}
