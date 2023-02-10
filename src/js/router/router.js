import * as pages from './pages/';

// import { storage } from '../storage/localStorage';
const url = window.location.pathname;

export async function router() {
  switch (url) {
    case '/':
    case '/index.html':
      pages.home();
      break;

    case '/listings/':
    case '/listings/index.html':
      pages.listings();
      break;

    case '/listings/view/':
    case '/listings/view/index.html':
      pages.viewListing();
      break;
  }
}
