import { getAllListings } from '../api/listings';
import { myListings, watchlist } from '../functions/quickAccess';
import { renderListing } from './renderListings';

export async function render(view = null, params = defaultParams) {
  let getListings;
  let listings;

  // get listings based on view query.
  switch (view) {
    case 'newest':
      getListings = await getAllListings(params);
      listings = await getListings.json();
      break;

    case 'watchlist':
      params.set('limit', 100);
      listings = await watchlist(params);
      break;

    case 'myListings':
      listings = await myListings();
      break;

    case 'hottest':
      params.set('limit', 100);
      getListings = await getAllListings(params);
      listings = await getListings.json();
      listings.sort((a, b) => b.bids.length - a.bids.length);
      break;

    case null:
      getListings = await getAllListings(params);
      listings = await getListings.json();
      break;

    default:
      listings = view; // makes it possible to enter your own array of listings
  }

  const listingsContainer = document.querySelector('[data-listing-grid]');
  const moreListingsBtn = document.querySelector('#loadListings');

  // stop if there are no listings and return a message to user
  if (listings.length === 0) {
    const noListings = document.createElement('p');
    noListings.innerText = "sorry, we couldn't find any matching listings :(";
    moreListingsBtn.remove();
    return listingsContainer.append(noListings);
  }

  listingsContainer.append(
    ...listings.map((item) => renderListing(item, 'grid'))
  );

  //  remove bids if watchlist is the current view, since it wont retrieve bid information of listing
  if (view === 'watchlist') {
    const bidContainter = listingsContainer.querySelectorAll('.bid-container');
    bidContainter.forEach((bid) => bid.remove());
  }

  // remove "more listings button" if all listings have been fetched
  const lengthOfListings = listings.length;
  const perPage = params.get('limit');
  if (lengthOfListings < perPage) moreListingsBtn?.remove();
}

const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['active', 'null'],
  ['_tag', ''],
  ['limit', '20'],
]);
