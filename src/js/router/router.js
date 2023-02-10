import * as pages from './pages/';

const url = window.location.pathname;

export async function router() {
  console.log(url);
  switch (url) {
    case '/':
    case '/index.html':
      console.log('Home Page');
      pages.home();
      break;

    case '/listings/':
    case '/listings/index.html':
      console.log('Listings');
      pages.listings();
      break;

    case '/listings/view/':
    case '/listings/view/index.html':
      console.log('View Listing');
      pages.viewListing();
      break;
  }
}
