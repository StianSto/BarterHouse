import { storage } from '../../storage/localStorage';
import { subnavTemplate } from '../../render/templates/subnavTemplate';
import { quickAccess } from '../../functions/quickAccess';
import { setMoreListingsListener } from '../../handlers/moreListingsHandler';
import { render } from '../../render/render';

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
  const subnav = document.querySelector('#subnav');
  subnav.append(subnavTemplate());

  if (storage.load('token')) {
    const quickAccessSection = await quickAccess();
    const hero = document.querySelector('#hero');
    hero.after(quickAccessSection);
  }

  render(null, paramsAllListings);

  let offset = 0;
  const moreListingsBtn = document.querySelector('#loadListings');
  setMoreListingsListener(moreListingsBtn, offset, paramsAllListings);
}
