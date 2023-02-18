import { renderNav } from '../render/renderNav';
import { storage } from '../storage/localStorage';
import * as pages from './pages/';
const url = window.location.pathname;

export async function router() {
  switch (url) {
    case '/':
    case '/index.html':
      // authCheck();
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
  }
}

export function authCheck(redirect) {
  const token = storage.load('token');
  let url = `/auth/?form=login`;
  if (redirect) url += `&redirect=${redirect}`;
  if (!token) {
    window.location.replace(url);
  }
}
