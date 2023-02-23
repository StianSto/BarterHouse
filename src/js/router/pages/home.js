import { getAllListings } from '../../api/listings/read/getListings';

import { watchlist } from '../pages/profiles';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';
import { storage } from '../../storage/localStorage';
const params = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', 0],
  ['_active', true],
  ['_seller', 'John_Doe'],
  ['_bids', true],
]);

export async function home() {
  if (storage.load('token')) {
    const watchlistListings = await watchlist();

    const quickAccessContainer = document.querySelector('#quickAccessSlider');
    quickAccessContainer.append(createSlider(watchlistListings));
  }
  const getListings = await getAllListings(params);
  const listings = await getListings.json();
  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}
