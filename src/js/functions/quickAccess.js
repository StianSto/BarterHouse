import { getProfileBids } from '../api/profile/read/getProfileBids';
import { getProfileListings } from '../api/profile/read/getProfileListings';
import { renderSlideritem } from '../render/slider';
import { quickAccessTemplate } from '../render/templates/quickAccessTemplate';
import { sliderTemplate } from '../render/templates/sliderTemplate';
import { storage } from '../storage/localStorage';

const user = storage.load('userDetails')?.name;

const paramsMyListings = new Map([
  ['sort', 'endsAt'],
  ['sortOrder', 'desc'],
  ['limit', null],
  ['offset', null],
  ['tag', null],
  ['_active', null],
  ['_bids', true],
]);

const paramsWatchlist = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', null],
  ['offset', null],
  ['_listings', true],
]);

// create a quick access section and ad eventlisteners that changes the content
export async function quickAccess() {
  const quickAccessSection = renderQuickAccessTemplate();

  const quickAccessForm = quickAccessSection.querySelector('#quickAccessForm');
  renderQuickAccessItems(quickAccessSection, quickAccessForm);
  quickAccessForm.addEventListener('change', async () => {
    renderQuickAccessItems(quickAccessSection, quickAccessForm);
  });

  return quickAccessSection;
}

async function getList(quickAccessSort) {
  switch (quickAccessSort) {
    case 'watchlist':
      return await watchlist();

    case 'myListings':
      return await myListings();

    default:
      return await watchlist();
  }
}

export async function watchlist(params = []) {
  const newParams = new Map([...paramsWatchlist, ...params]);
  const response = await getProfileBids(user, newParams);
  const results = await response.json();

  const now = new Date();
  let listings = new Map();
  results.filter(({ listing }) => {
    const ends = new Date(listing.endsAt);
    if (now > ends) return;

    listings.set(listing.id, listing);
  });

  return [...listings.values()];
}

export async function myListings(params = []) {
  const newParams = new Map([...paramsMyListings, ...params]);
  const response = await getProfileListings(user, newParams);
  return await response.json();
}

function renderQuickAccessTemplate() {
  const quickAccessSection = quickAccessTemplate();
  const quickAccessContainer =
    quickAccessSection.querySelector('#quickAccessSlider');

  const slider = sliderTemplate();
  quickAccessContainer.append(slider);

  return quickAccessSection;
}

async function renderQuickAccessItems(quickAccessSection, form) {
  const slider = quickAccessSection.querySelector('.inner-wrapper');
  slider.classList.add('opacity-50');

  const formData = new FormData(form);
  const settings = Object.fromEntries(formData);
  const { quickAccessSort, quickAccessSize } = settings;
  const listings = await getList(quickAccessSort);

  slider.replaceChildren(
    ...listings.map((item) =>
      renderSlideritem(item, quickAccessSort, quickAccessSize)
    )
  );
  slider.classList.remove('opacity-50');
}
