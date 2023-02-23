import headers from '../../headers';
import createUrl from '../../../functions/createUrl';
import { LISTINGS_ENDPOINT } from '../../constants';

// GET ALL LISTINGS
const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', 0],
  ['_active', true],
  ['_seller', null],
  ['_bids', true],
]);

/**
Makes a GET request to the listings endpoint, with the given params as query parameters in the URL.
The default query parameters are:
`sort: 'created'`, `sortOrder: 'desc'`, `limit: 10`, `offset: null`, `_active: null`, `_seller: null`, `_bids: null`
@param {Map} [params=defaultParams] - The params to pass as query parameters in the URL
@returns {Promise} - The HTTP response from the fetch call
@example
const params = new Map([
  ['sort', 'title'],
  ['sortOrder', 'asc'],
  ['limit', 10],
  ['offset', null],
  ['_active', true],
  ['_seller', null,
  ['_bids', true],
]);
const response = await getAllListings(params)
*/

export async function getAllListings(params = defaultParams) {
  let response;
  let mergedParams = new Map([...defaultParams, ...params]);

  const URL = createUrl(LISTINGS_ENDPOINT, mergedParams);

  response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  if (response.status === 429) {
    alert(
      'oops, it seems the server is overloaded with requests at the moment. please wait a minute before trying again :)'
    );
  }

  return response;
}

// GET SINGLE LISTING

const defaultParamsSingleListing = new Map([
  ['_seller', null],
  ['_bids', true],
]);

/**
makes a GET request to get a single listing by id and specified parameters. the default query parameters are: `_seller: null`, `_bids: true`
@param {string} id - The unique identifier of the listing.
@param {Map} [params=defaultParamsSingleListing] - The parameters to be added to the request URL.
@return {Promise} - The response of the GET request to the listings endpoint.
@example
const params = new Map([
	['_seller', "John_Doe"],
  ['_bids', true],
])
const response = await getListing(123, params)
*/
export async function getListing(id, params = defaultParamsSingleListing) {
  const URL = createUrl(`${LISTINGS_ENDPOINT}/${id}`, params);

  const response = await fetch(URL, {
    method: 'GET',
    headers: headers('application/json'),
  });

  return response;
}
