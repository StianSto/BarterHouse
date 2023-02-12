import getAllListings from '../../api/listings/get';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';

export async function home() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const quickAccessContainer = document.querySelector('#quickAccessSlider');
  quickAccessContainer.append(createSlider(listings));

  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}
