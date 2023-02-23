import { getAllListings } from '../../api/listings/read/getListings';

import { watchlist } from '../pages/profiles';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';
import { storage } from '../../storage/localStorage';
import { quickAccessTemplate } from '../../render/templates/quickAccessTemplate';

const paramsAllListings = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 12],
  ['offset', 0],
  ['_active', true],
  ['_seller', 'John_Doe'],
  ['_bids', true],
]);

export async function home() {
  if (storage.load('token')) {
    const quickAccessSection = quickAccessTemplate();
    const quickAccessContainer =
      quickAccessSection.querySelector('#quickAccessSlider');

    const watchlistListings = await watchlist();
    quickAccessContainer.append(createSlider(watchlistListings));

    const hero = document.querySelector('#hero');
    hero.after(quickAccessSection);
  }
  const getListings = await getAllListings(paramsAllListings);
  const listings = await getListings.json();
  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));

  let offset = 0;
  const moreListingsBtn = document.querySelector('#loadListings');
  moreListingsBtn.addEventListener('click', async () => {
    let limit = parseFloat(paramsAllListings.get('limit'));
    offset += limit;
    paramsAllListings.set('offset', offset);
    render(paramsAllListings);
  });
}

async function render(params) {
  const getListings = await getAllListings(params);
  const listings = await getListings.json();
  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}
