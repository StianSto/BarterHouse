import { storage } from '../storage/localStorage';
import { navTemplate } from './templates/navTemplate';

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
    name: 'Login / Register',
    path: '/auth/login/',
  },

  {
    name: 'Newest',
    path: '/listings/',
  },
  {
    name: 'Hottest',
    path: '/listings/',
  },
];

const linkElement = new DOMParser().parseFromString(
  `
	<li class="mt-2">
		<a href="" class="link | text-decoration-none fs-3 text-white">Home</a>
	</li>
	`,
  'text/html'
);

const navLoginRegisterContainer = new DOMParser().parseFromString(
  `
	<div class="btn-unauth | row row-cols-2 d-none d-md-flex gap-2">
		<button class="btn btn-primary col-auto px-4">Login</button>
		<button class="btn btn-outline-primary col-auto px-4">Register</button>
	</div>
	`,
  'text/html'
);

export function renderNav() {
  const token = Boolean(storage.load('token'));
  console.log(token);
  const navDOM = navTemplate();
  const linksContainer = navDOM.querySelector('#navLinks');

  if (token) {
    const navProfileMobile = navDOM.querySelector('#navProfileMobile');
    navProfileMobile.innerHTML = '';

    const navProfile = navDOM.querySelector('#navProfile');
    navProfile.replaceWith(
      navLoginRegisterContainer.querySelector('.btn-unauth')
    );

    console.log(navProfile);
    navLinks = navLinksUnauthorized;
  }

  navLinks.forEach(({ name, path }) => {
    const link = linkElement.cloneNode(true);
    const anchorTag = link.querySelector('.link');
    anchorTag.innerText = name;
    anchorTag.href = path;
    linksContainer.append(link.querySelector('li'));
  });
  const header = document.querySelector('header');
  header.append(navDOM.querySelector('nav'));
}
