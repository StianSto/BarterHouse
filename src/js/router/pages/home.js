import { storage } from '../../storage/localStorage';
import { subnavTemplate } from '../../render/templates/subnavTemplate';
import { quickAccess } from '../../functions/quickAccess';
import { setRenderGridListener } from '../../handlers/moreListingsHandler';
import { render } from '../../render/render';

const params = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 12],
  ['offset', 0],
  ['_active', true],
  ['_seller', 'John_Doe'],
  ['_bids', true],
]);

export async function home() {
  const subnav = document.querySelector('#subnav');
  subnav.append(subnavTemplate());

  if (storage.load('token')) {
    const quickAccessSection = await quickAccess();
    const hero = document.querySelector('#hero');
    hero.after(quickAccessSection);
  }

  const renderOptions = {
    params,
  };
  setRenderGridListener(render, renderOptions);
}
