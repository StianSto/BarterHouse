import { getAllListings } from '../../api/listings/read/getListings';
import { renderListingSmall } from '../../render/renderListings';
import { storage } from '../../storage/localStorage';

import { Modal } from 'bootstrap';

export async function listings() {
  const filterForm = document.querySelector('#filterListingsModal');
  const options = { backdrop: 'static', keyboard: true };
  const myModal = new Modal(filterForm, options);

  const saveFilterSettings = filterForm.querySelector(
    '#filterListingsSaveSettings'
  );

  const savedParams = new Map(storage.load('filterSettings'));

  let params;
  savedParams.size === 0 ? (params = defaultParams) : (params = savedParams);

  addFilterSettings(filterForm, params);
  render(params);
  renderBadges(params);

  let offset = 0;
  filterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formData = new FormData(filterForm);
    params = new Map(formData);
    offset = 0;
    if (saveFilterSettings.checked) storage.save('filterSettings', [...params]);

    myModal.hide();

    const listingsContainer = document.querySelector(
      '#listingsContainer > [data-listing-grid]'
    );
    listingsContainer.replaceChildren();
    render(params);
    renderBadges(params);
  });

  const moreListingsBtn = document.querySelector('#loadListings');
  moreListingsBtn.addEventListener('click', async () => {
    moreListingsBtn.innerHTML = `
		<div class="spinner-border" role="status">
  		<span class="visually-hidden">Loading...</span>
		</div>
		`;
    let limit = parseFloat(params.get('limit'));
    offset += limit;
    params.set('offset', offset);
    try {
      await render(params);
    } catch (error) {
      const err = document.createElement('p');
      err.innerText = 'an error ocurred: ' + error;
      moreListingsBtn.after(err);
    }
    moreListingsBtn.innerHTML = 'See More Listings';
  });
}

async function render(params) {
  const getListings = await getAllListings(params);
  const listings = await getListings.json();
  const listingsContainer = document.querySelector(
    '#listingsContainer > [data-listing-grid]'
  );
  listingsContainer.append(...listings.map(renderListingSmall));

  const lengthOfListings = listings.length;
  const perPage = params.get('limit');
  const moreListingsBtn = document.querySelector('#loadListings');
  if (lengthOfListings < perPage) moreListingsBtn.remove();
}

function renderBadges(params) {
  const container = document.querySelector('#filtersBadges');
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

  const badges = [sortBy, active, tag, limit].filter((item) =>
    !item || item == 'null' ? false : item
  );

  container.replaceChildren(...badges.map(badge));
}

const badge = (title) => {
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

function addFilterSettings(form, savedParams) {
  const sort = form.querySelector('[name="sort"]');
  const sortOption = sort.querySelector(`[value=${savedParams.get('sort')}]`);
  sortOption.selected = true;

  const sortOrder = form.querySelector('[name="sortOrder"]');
  const sortOrderOption = sortOrder.querySelector(
    `[value=${savedParams.get('sortOrder')}]`
  );
  sortOrderOption.selected = true;

  const active = form.querySelector('[name="active"]');
  const activeOption = active.querySelector(
    `[value=${savedParams.get('active')}]`
  );
  activeOption.selected = true;

  const tag = form.querySelector('[name="_tag"]');
  tag.value = savedParams.get('_tag');

  const limit = form.querySelector('[name="limit"]');
  limit.value = savedParams.get('limit');
}

const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['active', 'null'],
  ['_tag', ''],
  ['limit', '20'],
]);
