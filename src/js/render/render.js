import { getAllListings } from '../api/listings';
import { getProfileListings } from '../api/profile/read/getProfileListings';
import { getSearchParams } from '../functions/getSearchParams';
import { myListings, watchlist } from '../functions/quickAccess';
import { search } from '../functions/searchListings';
import { renderListing } from './renderListings';

const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['_active', 'true'],
  ['_tag', ''],
  ['limit', '20'],
]);

const defaultOptions = new Map([
  ['view', 'newest'],
  ['params', defaultParams],
  ['profile', null],
]);

export async function render(renderOptions = []) {
  let options = new Map([...defaultOptions, ...Object.entries(renderOptions)]);

  let params = new Map([...defaultParams, ...options.get('params')]);
  const listingsContainer = document.querySelector('[data-listing-grid]');
  const moreListingsBtn = document.querySelector('#loadListingsBtn');

  let response;
  let listings;
  let query;

  // get listings based on view query.
  switch (options.get('view')) {
    case 'newest':
      response = await getAllListings(params);
      listings = await response.json();

      break;

    case 'watchlist':
      params.set('limit', 100);
      listings = await watchlist(params);
      break;

    case 'myListings':
      listings = await myListings(params);
      break;

    case 'hottest':
      params.set('limit', 100);

      response = await getAllListings(params);
      listings = await response.json();
      listings.sort((a, b) => b.bids.length - a.bids.length);
      break;

    case 'search':
      query = getSearchParams().get('query');
      params.set('limit', 100);
      params.set('_active', true);
      listings = await search(params, query);
      moreListingsBtn.hide();
      break;

    case 'name':
      response = await getProfileListings(options.get('profile'), params);
      listings = await response.json();
      break;

    case null:
      response = await getAllListings(params);
      listings = await response.json();
      break;
  }

  // remove "more listings button" if all listings have been fetched
  const lengthOfListings = listings.length;
  const perPage = params.get('limit');

  if (lengthOfListings < perPage) moreListingsBtn.hide();

  // stop if there are no listings and return a message to user
  if (listings.length === 0) {
    const noListings = document.createElement('p');
    noListings.innerText = "sorry, we couldn't find any matching listings :(";

    moreListingsBtn.hide();

    return listingsContainer.append(noListings);
  }

  listingsContainer.append(
    ...listings.map((item) => renderListing(item, 'grid'))
  );

  //  remove bids if watchlist is the current view, since it wont retrieve bid information of listing
  if (options['view'] === 'watchlist') {
    const bidContainter = listingsContainer.querySelectorAll('.bid-container');
    bidContainter.forEach((bid) => bid.remove());
  }
}
