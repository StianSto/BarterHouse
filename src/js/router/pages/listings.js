import { storage } from '../../storage/localStorage';
import { Modal } from 'bootstrap';
import { subnavTemplate } from '../../render/templates/subnavTemplate';
import { getSearchParams } from '../../functions/getSearchParams';
import { renderBadges } from '../../render/renderBadges';
import { setMoreListingsListener } from '../../handlers/moreListingsHandler';
import { render } from '../../render/render';

export async function listings() {
  const subnav = document.querySelector('#subnav');
  subnav.append(subnavTemplate());

  const filterForm = document.querySelector('#filterListingsModal');

  // configure params for getting listings
  let params;
  const savedParams = new Map(storage.load('filterSettings'));
  savedParams.size === 0 ? (params = defaultParams) : (params = savedParams);

  const searchParams = getSearchParams();
  const tagParam = searchParams.get('tag');
  const view = searchParams.get('view');
  if (tagParam) params.set('_tag', tagParam);
  let offset = 0;

  addFilterSettings(filterForm, params);
  render(view, params);
  renderBadges(params);

  setFilterFormListener(filterForm, offset, params, view);
}

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

function setFilterFormListener(form, offset, params, view) {
  const options = { backdrop: 'static', keyboard: true };
  const myModal = new Modal(form, options);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    offset = 0;
    let formData = new FormData(form);
    params = new Map(formData);

    const saveFilterSettings = form.querySelector(
      '#filterListingsSaveSettings'
    );
    if (saveFilterSettings.checked) storage.save('filterSettings', [...params]);

    const listingsContainer = document.querySelector('[data-listing-grid]');
    listingsContainer.replaceChildren();

    render(view, params);
    myModal.hide();
    renderBadges(params);
  });

  const moreListingsBtn = document.querySelector('#loadListings');
  setMoreListingsListener(moreListingsBtn, offset, params);
}
