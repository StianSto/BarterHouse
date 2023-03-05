import { storage } from '../../storage/localStorage';
import { Modal } from 'bootstrap';
import { subnavTemplate } from '../../render/templates/subnavTemplate';
import { getSearchParams } from '../../functions/getSearchParams';
import { renderBadges } from '../../render/renderBadges';
import { setRenderGridListener } from '../../handlers/moreListingsHandler';
import { render } from '../../render/render';

export async function listings() {
  const subnav = document.querySelector('#subnav');
  subnav.append(subnavTemplate());

  const filterForm = document.querySelector('#filterListingsModal form');

  // configure params for getting listings
  let params;
  const savedParams = new Map(storage.load('filterSettings'));
  savedParams.size === 0 ? (params = defaultParams) : (params = savedParams);

  const searchParams = getSearchParams();
  const tagParam = searchParams.get('tag');
  const view = searchParams.get('view');
  if (tagParam) params.set('_tag', tagParam);

  const renderOptions = {
    view,
    params,
  };
  addFilterSettings(filterForm, params);
  setFilterFormListener(filterForm, renderOptions);
  setRenderGridListener(render, renderOptions);
  renderBadges(params);
}

function addFilterSettings(form, params = defaultParams) {
  const sort = form.querySelector('[name="sort"]');
  const sortOption = sort.querySelector(`[value=${params.get('sort')}]`);
  sortOption.selected = true;

  const sortOrder = form.querySelector('[name="sortOrder"]');
  const sortOrderOption = sortOrder.querySelector(
    `[value=${params.get('sortOrder')}]`
  );
  sortOrderOption.selected = true;

  const active = form.querySelector('[name="_active"]');
  const activeOption = active.querySelector(`[value=${params.get('_active')}]`);
  activeOption.selected = true;

  const tag = form.querySelector('[name="_tag"]');
  tag.value = params.get('_tag');

  const limit = form.querySelector('[name="limit"]');
  limit.value = params.get('limit');
}

const defaultParams = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['_active', 'null'],
  ['_tag', ''],
  ['limit', '20'],
  ['offset', '0'],
]);

function setFilterFormListener(form, options) {
  const myModal = new Modal(document.querySelector('#filterListingsModal'));

  form.addEventListener('submit', async (event) => {
    console.log(1);
    console.log(form);
    event.preventDefault();

    let formData = new FormData(form);
    let params = new Map(formData);
    options['params'] = params;

    const saveFilterSettings = form.querySelector(
      '#filterListingsSaveSettings'
    );
    if (saveFilterSettings.checked) storage.save('filterSettings', [...params]);

    const listingsContainer = document.querySelector('[data-listing-grid]');
    listingsContainer.replaceChildren();

    setRenderGridListener(render, options);
    console.log(2);
    renderBadges(params);
    console.log(3);
    myModal.hide();
    console.log(myModal);
  });
}
