import { getAllListings } from '../../api/listings/read/getListings';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';
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
  const getListings = await getAllListings(params);

  const listings = await getListings.json();

  const quickAccessContainer = document.querySelector('#quickAccessSlider');
  quickAccessContainer.append(createSlider(listings));

  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}
