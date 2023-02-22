import { getAllListings } from '../../api/listings/read/getListings';
import { renderListingSmall } from '../../render/renderListings';
import { storage } from '../../storage/localStorage';

export async function listings() {
  const filterForm = document.querySelector('#filterListingsModal');
  const filterFormBtn = filterForm.querySelector('#filterBtn');

  const saveFilterSettings = filterForm.querySelector(
    '#filterListingsSaveSettings'
  );

  let params;
  let savedParams = new Map(storage.load('filterSettings'));

  let formData = new FormData(filterForm);

  savedParams.size === 0
    ? (params = new Map(formData))
    : (params = savedParams);

  render(params);
  renderBadges(params);

  let offset = 0;
  filterFormBtn.addEventListener('click', async () => {
    formData = new FormData(filterForm);
    params = new Map(formData);
    offset = 0;
    if (saveFilterSettings.checked) storage.save('filterSettings', [...params]);

    const listingsContainer = document.querySelector(
      '#listingsContainer > .row'
    );
    listingsContainer.replaceChildren();
    render(params);
    renderBadges(params);
  });

  const moreListingsBtn = document.querySelector('#loadListings');
  moreListingsBtn.addEventListener('click', async () => {
    offset += parseFloat(params.get('limit'));
    params.set('offset', offset);
    render(params);
  });
}

async function render(params) {
  const getListings = await getAllListings(params);
  const listings = await getListings.json();

  const listingsContainer = document.querySelector('#listingsContainer > .row');
  console.log(listings);

  listingsContainer.append(...listings.map(renderListingSmall));
}

function renderBadges(params) {
  const container = document.querySelector('#filtersBadges');
  container.replaceChildren();
  const sort = params.get('sort');
  const sortOrder = params.get('sortOrder');

  let sortBy;
  let active = params.get('active');
  let tag = params.get('_tag');
  let limit = params.get('limit');

  switch (sort) {
    case 'created':
      sortBy = sortOrder === 'desc' ? 'Newest' : 'Oldest';
      break;
    case 'title':
      sortBy = sortOrder === 'desc' ? 'Z - A ' : 'A - Z';
      break;
    default:
      false;
  }

  switch (active) {
    case 'true':
      active = 'Active auctions only';
      break;
    case 'false':
      active = 'Inactive auctions only';
      break;
    default:
      active = 'Active and inactive';
      break;
  }

  if (limit) limit += ' per page';

  const badges = [sortBy, active, tag, limit].filter((item) => {
    if (!item || item == 'null') return;
    return item;
  });

  container.append(...badges.map(badge));
}

const badge = (title) => {
  if (!title) {
    console.log(title);
  }
  const el = new DOMParser().parseFromString(
    `
		<div class="col-auto">
			<span class="px-4 py-1 rounded-pill text-bg-light small fs-md-6"
				></span
			>
		</div>
		`,
    'text/html'
  );

  const badge = el.querySelector('body > *');
  badge.querySelector('span').innerText = title;

  return badge;
};
