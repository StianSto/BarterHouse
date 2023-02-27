import { logout } from '../api/auth/logout';
import { storage } from '../storage/localStorage';
import { navTemplate } from './templates/navTemplate';

export function renderNav() {
  const token = Boolean(storage.load('token'));
  const user = storage.load('userDetails');
  const navDOM = navTemplate();
  const linksContainer = navDOM.querySelector('#navLinks');
  const navProfile = navDOM.querySelector('#navProfile');

  if (!token) {
    const navProfileMobile = navDOM.querySelector('#navProfileMobile');
    navProfileMobile.innerHTML = '';
    navProfile.replaceWith(navLoginRegisterContainer());
    navLinks = navLinksUnauthorized;
    navDOM.querySelector('[data-btn-create]').remove();
  } else {
    const profileImg = navDOM.querySelectorAll('.profile-img');
    profileImg.forEach((img) => (img.src = user.avatar));
    const name = navDOM.querySelector('.profile-img + span');
    name.textContent = user.name;
    navProfile.append(dropdownMenuProfile());
  }

  navLinks.forEach(({ name, path }) => {
    const link = linkElement();
    const anchorTag = link.querySelector('.link');
    anchorTag.innerText = name;
    anchorTag.href = path;
    linksContainer.append(link);
  });

  const header = document.querySelector('header');
  header.append(navDOM.querySelector('nav'));
  const logoutBtn = document.querySelectorAll('[data-logout]');
  logoutBtn.forEach((btn) => btn.addEventListener('click', () => logout()));
}

function dropdownMenuProfile() {
  const dropdown = profileDropdownTemplate();
  return dropdown;
}

let navLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Listings',
    path: '/listings/',
  },
  {
    name: 'My Profile',
    path: '/profiles/',
  },
  {
    name: 'Watchlist',
    path: '/listings/?watchlist',
  },
];

let navLinksUnauthorized = [
  {
    name: 'Newest',
    path: '/listings/',
  },
  {
    name: 'Hottest',
    path: '/listings/',
  },
];

const linkElement = () => {
  const el = new DOMParser().parseFromString(
    `
		<li class="mt-2">
			<a href="" class="link | text-decoration-none fs-3 text-white">Home</a>
		</li>
		`,
    'text/html'
  );
  return el.querySelector('body > *');
};

const navLoginRegisterContainer = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="btn-unauth btn-group border mt-4 mt-lg-0 ms-md-auto">
			<a href="/auth/?form=login" class="btn btn-white text-primary fs-5 px-4 btn">Login</a>
			<a href="/auth/?form=register" class="btn btn-primary fs-5 px-4">Register</a>
		</div>
		`,
    'text/html'
  );

  return el.querySelector('body > *');
};

const profileDropdownTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<ul class="dropdown-menu dropdown-menu-end">
			<li class="dropdown-item" data-profile="name" ><a href="/profiles/" class="text-decoration-none text-black">My Profile</a></li>
			<li class="dropdown-item" ><a href="/listings/?watchlist" class="text-decoration-none text-black">Watchlist</a></li>
			<li class="dropdown-item d-flex flex-nowrap align-items-center mt-2 text-primary" data-logout>
				Log out
				<i
					class="fa fa-solid fa-door-open fs-6 text-primary ms-3"
				></i>
			</li>
		</ul>	
		`,
    'text/html'
  );
  return el.querySelector('body > *');
};
