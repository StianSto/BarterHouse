import { getAllListings } from '../../api/listings/read/getListings';

import { renderListingSmall } from '../../render/renderListings';

export async function listings() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}
