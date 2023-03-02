import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { getProfile } from '../../api/profile/read/getProfiles';
import { authGuard } from '../../functions/authGuard';
import { quickAccess } from '../../functions/quickAccess';
import { setUpdateAvatarListener } from '../../handlers/updateAvatarListener';
import { profileTemplate } from '../../render/templates/profileTemplate';
import { storage } from '../../storage/localStorage';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import { render } from '../../render/render';

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
  const getListings = await getProfileListings(nameParam);
  const listings = await getListings.json();
  render(listings);
}

async function authorizedUser() {
  const user = storage.load('userDetails');

  const quickAccessSection = await quickAccess();
  document.querySelector('#profileSection').after(quickAccessSection);

  const profileImg = profile.querySelector('#profileImg');

  const previewImgValue = document.querySelector('#avatar');
  const previewImg = document.querySelector('#changeProfileImage');
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

  profileImg.after(changeImgBtn.querySelector('body > *'));
  const updateAvatarForm = document.querySelector('#changeAvatarModal > form');
  setUpdateAvatarListener(nameParam, updateAvatarForm);

  const userCredits = profile.querySelector('#profileFunds');
  const userCreditsElement = document.createElement('span');
  userCreditsElement.classList.add('fs-3');
  userCreditsElement.innerText = 'Funds: $ ' + user.credits;
  userCredits.append(userCreditsElement);
}
