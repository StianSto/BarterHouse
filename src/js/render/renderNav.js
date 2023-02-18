import { logout } from '../api/auth/logout';
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
		<a href="/auth/?form=login" class="col-auto p-0"><button class="btn btn-primary px-4">Login</button></a>
		<a href="/auth/?form=register" class="col-auto p-0"><button class="btn btn-outline-primary col-auto px-4">Register</button></a>
	</div>
	`,
  'text/html'
);

export function renderNav() {
  const token = Boolean(storage.load('token'));
  const navDOM = navTemplate();
  const linksContainer = navDOM.querySelector('#navLinks');
  const navProfile = navDOM.querySelector('#navProfile');

  if (!token) {
    const navProfileMobile = navDOM.querySelector('#navProfileMobile');
    navProfileMobile.innerHTML = '';

    navProfile.replaceWith(
      navLoginRegisterContainer.querySelector('.btn-unauth')
    );

    navLinks = navLinksUnauthorized;
  } else {
    console.log(123);
    navProfile.append(dropdownMenuProfile());
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

function dropdownMenuProfile() {
  const dropdown = new DOMParser().parseFromString(
    `
	<ul class="dropdown-menu dropdown-menu-end">
		<li class="dropdown-item" ><a href="/profile/" class="text-decoration-none text-black">My Profile</a></li>
		<li class="dropdown-item" ><a href="/listings/?watchlist" class="text-decoration-none text-black">Watchlist</a></li>
		<li class="dropdown-item d-flex flex-nowrap align-items-center mt-2 text-primary" id="logout">
			Log out
			<i
				class="fa fa-solid fa-door-open fs-6 text-primary ms-3"
			></i>
		</li>
	</ul>
	`,
    'text/html'
  );

  const logoutBtn = dropdown.querySelector('#logout');
  console.log(logoutBtn);
  logoutBtn.addEventListener('click', logout);

  return dropdown.querySelector('.dropdown-menu');
}
