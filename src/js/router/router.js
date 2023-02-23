import { renderNav } from '../render/renderNav';
import * as pages from './pages/';
const url = window.location.pathname;

export async function router() {
  console.log(url);
  switch (url) {
    case '/':
    case '/index.html':
      console.log('home');
      renderNav();
      pages.home();
      break;

    case '/auth/':
    case '/auth/index.html':
      pages.auth();
      break;

    case '/listings/':
    case '/listings/index.html':
      renderNav();
      pages.listings();
      break;

    case '/listings/view/':
    case '/listings/view/index.html':
      renderNav();
      pages.viewListing();
      break;
    case '/profiles/':
    case '/profiles/index.html':
      renderNav();
      pages.profiles();
      break;
    case '/create/':
    case '/create/index.html':
      renderNav();
      pages.create();
      break;
    case '/listings/edit/':
    case '/listings/edit/index.html':
      renderNav();
      pages.edit();
      break;
  }
}
