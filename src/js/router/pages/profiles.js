import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { getProfile } from '../../api/profile/read/getProfiles';
import { authGuard } from '../../functions/authGuard';
import { quickAccess } from '../../functions/quickAccess';
import { setUpdateAvatarListener } from '../../handlers/updateAvatarListener';
import { renderListingSmall } from '../../render/renderListings';
import { createSlider } from '../../render/slider';
import { profileTemplate } from '../../render/templates/profileTemplate';
import { quickAccessTemplate } from '../../render/templates/quickAccessTemplate';
import { storage } from '../../storage/localStorage';
import defaultAvatar from '../../../assets/images/default-avatar.png';

let nameParam;
const profile = profileTemplate();

export async function profiles() {
  authGuard();

  const url = window.location.search;
  const params = new URLSearchParams(url);
  nameParam = params.get('name');
  if (!nameParam) nameParam = storage.load('userDetails').name;
  if (nameParam === storage.load('userDetails').name) await authorizedUser();

  insertProfileInfo(nameParam);
  insertProfileListings();
}

async function insertProfileInfo() {
  const response = await getProfile(nameParam);
  const user = await response.json();

  profile.querySelector('#profileImg').src = user.avatar
    ? user.avatar
    : defaultAvatar;
  profile.querySelector('#profileName').innerText = user.name;
  profile.querySelector('#profileEmail').innerText = user.email;
  profile.querySelector('#profileListings').innerText = user.listings.length;
  profile.querySelector('#profileWins').innerText = user.wins.length;

  const profileSection = document.querySelector('#profileSection');
  profileSection.append(profile);
}

async function insertProfileListings() {
  const listingsContainer = document.querySelector('[data-listing-grid]');

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
  const user = storage.load('userDetails');

  const quickAccessSection = quickAccessTemplate();
  const quickAccessContainer =
    quickAccessSection.querySelector('#quickAccessSlider');
  const listings = await watchlist();
  quickAccessContainer.append(createSlider(listings));
  document.querySelector('#profileSection').after(quickAccessSection);

  const profileImg = profile.querySelector('#profileImg');

  const previewImgValue = document.querySelector('#avatar');
  const previewImg = document.querySelector('#changeProfileImage');
  console.log(previewImg);
  previewImgValue.value = user.avatar;
  previewImg.src = user.avatar;
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

  // profile.querySelector(
  //   '#profileFunds'
  // ).innerHTML = `<span class="fs-3 text-black">Funds: </span>$ ${user.credits}`;
  const userCredits = profile.querySelector('#profileFunds');
  const userCreditsElement = document.createElement('span');
  userCreditsElement.classList.add('fs-3');
  userCreditsElement.innerText = 'Funds: $ ' + user.credits;
  userCredits.append(userCreditsElement);
}

// will create an array of listings that the user has bid on. will rearrange the returned data s oeach listing includes bids
export async function watchlist() {
  const myBids = await quickAccess.watchlist();
  let results = {};

  myBids.filter((bid) => {
    const { listing, ...bidData } = bid;
    listing['bids'] = [bidData];

    let today = new Date();
    let ends = new Date(bid.listing.endsAt);
    if (ends.getTime() < today.getTime()) return;

    if (results[bid.listing.id]) {
      let a = results[bid.listing.id].amount;
      let b = bid.amount;

      if (b > a) return (results[listing.id] = listing);
      return;
    }

    results[listing.id] = listing;
  });

  const listings = Object.values(results);
  return listings;
}
