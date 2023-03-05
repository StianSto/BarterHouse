import { getProfile } from '../../api/profile/read/getProfiles';
import { getProfileCredits } from '../../api/profile/read/getProfileCredits';
import { authGuard } from '../../functions/authGuard';
import { quickAccess } from '../../functions/quickAccess';
import { setUpdateAvatarListener } from '../../handlers/updateAvatarListener';
import { profileTemplate } from '../../render/templates/profileTemplate';
import { storage } from '../../storage/localStorage';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import { render } from '../../render/render';
import { setRenderGridListener } from '../../handlers/moreListingsHandler';

let nameParam;
const profile = profileTemplate();

export async function profiles() {
  authGuard();
  const localUser = storage.load('userDetails').name;

  const url = window.location.search;
  const params = new URLSearchParams(url);
  nameParam = params.get('name');
  if (!nameParam) nameParam = storage.load('userDetails')?.name;
  if (nameParam === localUser) await authorizedUser(localUser);

  insertProfileInfo(nameParam);
  insertProfileListings(localUser);
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

async function insertProfileListings(profile) {
  const params = new Map([]);
  const renderOptions = {
    view: 'myListings',
    params,
    profile,
  };
  setRenderGridListener(render, renderOptions);
}

async function authorizedUser(localUser) {
  const user = storage.load('userDetails');

  const quickAccessSection = await quickAccess();
  document.querySelector('#profileSection').after(quickAccessSection);

  const profileImg = profile.querySelector('#profileImg');
  const changeImgBtn = document.querySelector('template#changeImageBtn');
  profileImg.after(changeImgBtn.content.cloneNode(true));

  const previewImgValue = document.querySelector('#avatar');
  const previewImg = document.querySelector('#changeProfileImage');
  previewImgValue.value = user.avatar;
  previewImg.src = user.avatar;

  const updateAvatarForm = document.querySelector('#changeAvatarModal > form');
  setUpdateAvatarListener(nameParam, updateAvatarForm);

  const userCredits = profile.querySelector('#profileFunds');
  const userCreditsElement = document.createElement('span');
  userCreditsElement.classList.add('fs-3');
  let response = await getProfileCredits(localUser);
  let { credits } = await response.json();
  userCreditsElement.innerText = 'Funds: $ ' + credits;
  userCredits.append(userCreditsElement);
}
