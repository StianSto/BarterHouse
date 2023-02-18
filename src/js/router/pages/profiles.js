import { getListing } from '../../api/listings';
import { getProfileBids } from '../../api/profile/read/getProfileBids';
import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { getProfile } from '../../api/profile/read/getProfiles';
import { setUpdateAvatarListener } from '../../handlers/updateAvatarListener';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';
import { profileTemplate } from '../../render/templates/profileTemplate';
import { storage } from '../../storage/localStorage';

const url = window.location.search;
const params = new URLSearchParams(url);
const nameParam = params.get('name');

export async function profiles() {
  if (nameParam === storage.load('userDetails').name) await authorizedUser();
  insertProfileInfo();
  insertProfileListings();
}

const profile = profileTemplate();

async function insertProfileInfo() {
  const response = await getProfile(nameParam);
  const user = await response.json();

  profile.querySelector('#profileImg').src = user.avatar;
  profile.querySelector('#profileName').innerText = user.name;
  profile.querySelector('#profileEmail').innerText = user.email;
  profile.querySelector('#profileListings').innerText = user.listings.length;
  profile.querySelector('#profileWins').innerText = user.wins.length;
  if (nameParam === storage.load('userDetails').name) {
    profile.querySelector(
      '#profileFunds'
    ).innerHTML = `<span class="fs-3 text-black">Funds: </span>$ ${user.credits}`;
  }

  const profileSection = document.querySelector('#profileSection');
  profileSection.append(profile);
}

async function insertProfileListings() {
  const listingsContainer = document.querySelector('#listingsContainer > .row');

  const getListings = await getProfileListings(nameParam);
  const listings = await getListings.json();

  if (listings.length === 0) {
    const noListings = document.createElement('p');
    noListings.innerText = 'no listings';
    return listingsContainer.append(noListings);
  }

  listingsContainer.append(...listings.map(renderListingSmall));
}

async function authorizedUser() {
  const quickAccess = new DOMParser().parseFromString(
    quickAccessDOM,
    'text/html'
  );
  const quickAccessContainer = quickAccess.querySelector('#quickAccessSlider');
  const listings = await watchlist();
  quickAccessContainer.append(createSlider(listings));
  document
    .querySelector('#profileSection')
    .after(quickAccess.querySelector('body > *'));

  const profileImg = profile.querySelector('#profileImg');
  const changeImgBtn = new DOMParser().parseFromString(
    `
		<button
			data-bs-toggle="modal" data-bs-target="#changeAvatarModal"
			class="btn btn-light py-1 rounded-2 position-absolute"
			style="bottom: 0; left: 0; translate: calc(50% - 1rem)"
		>
			change&nbsp;image
		</button>
		`,
    'text/html'
  );
  changeImgBtn.innerHTML = `
	
		`;
  profileImg.after(changeImgBtn.querySelector('body > *'));
  const updateAvatarForm = document.querySelector('#changeAvatarModal > form');
  setUpdateAvatarListener(nameParam, updateAvatarForm);
}

export async function watchlist() {
  const name = storage.load('userDetails').name;
  if (!name) return;

  const bids = await getProfileBids(name);
  const mybids = await bids.json();
  const idSet = [...new Set(mybids.map((bid) => bid.listing.id))];

  const listings = idSet.map(async (id) => {
    const response = await getListing(id);
    return await response.json();
  });

  let results = [];
  for (const item of listings) {
    results.push(await item);
  }

  return results;
}

const quickAccessDOM = `

<section id="quickAccess" class="mw-lg mx-auto px-4 mt-5 mb-5 p-3 row">
        <h2>Quick Access</h2>
        <div id="quickAccessButtons" class="col-auto">
          <input
            type="radio"
            class="btn-check"
            name="quickAccessView"
            id="quickAccessViewFull"
            autocomplete="off"
            checked
          />
          <label
            class="btn btn-outline-dark btn-sortby btn-sortby-full me-1"
            for="quickAccessViewFull"
          ></label>

          <input
            type="radio"
            class="btn-check"
            name="quickAccessView"
            id="quickAccessViewGrid"
            autocomplete="off"
          />
          <label
            class="btn btn-outline-dark btn-sortby btn-sortby-grid me-1"
            for="quickAccessViewGrid"
          ></label>
        </div>
        <div id="quickAccessSort" class="mt-2 col-lg-auto">
          <input
            type="radio"
            class="btn-check"
            name="quickAccessSort"
            id="quickAccessWatchlist"
            autocomplete="off"
            checked
          />
          <label
            class="btn btn-outline-dark rounded-pill py-1 px-3"
            for="quickAccessWatchlist"
          >
            <i class="fa fa-eye"></i
            ><span class="d-none d-sm-inline ms-2">Watchlist</span>
          </label>
          <input
            type="radio"
            class="btn-check"
            name="quickAccessSort"
            id="quickAccessHottest"
            autocomplete="off"
          />
          <label
            class="btn btn-outline-dark rounded-pill py-1 px-3"
            for="quickAccessHottest"
          >
            <i class="fa fa-fire"></i
            ><span class="d-none d-sm-inline ms-2">Hottest</span>
          </label>
          <input
            type="radio"
            class="btn-check"
            name="quickAccessSort"
            id="quickAccessMyListings"
            autocomplete="off"
          />
          <label
            class="btn btn-outline-dark rounded-pill py-1 px-3"
            for="quickAccessMyListings"
          >
            <i class="fa fa-user"></i>
            <span class="d-none d-sm-inline ms-2">My Listings</span>
          </label>
        </div>

        <div class="mt-5 px-0 mw-lg mx-auto" id="quickAccessSlider"></div>
      </section>
			`;
