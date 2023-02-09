// import sass files
import '../scss/index.scss';

// import bootstrap files
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';

// code

import getAllListings from './api/listings/get';
// import { renderListingSmall } from './render/renderListings';
import { createSlider } from './render/slider';

const getListings = await getAllListings();
const listings = await getListings.json();

// function productCardsSmall({ media, title }) {
//   const productCardSmall = document.querySelector(`template#productCardSmall`);
//   const clone = productCardSmall.content.cloneNode(true);

//   clone.querySelector('.listing-img').src = media[0]
//     ? media[0]
//     : '/assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg';
//   clone.querySelector('.card-title').textContent = title;

//   return clone;
// }

const slider = createSlider(listings);

const container = document.querySelector('#profileListings');
container.appendChild(slider);

// listings.forEach((listing) => {
//   const clone = productCardsSmall(listing);

//   const quickAccessGrid = document.querySelector('#listingsContainer > .row');
//   quickAccessGrid.appendChild(clone);
// });

// function productCardLarge() {
//   const productCardSmall = document.querySelector(`template#productCardLarge`);
//   const clone = productCardSmall.content.cloneNode(true);

//   return clone;
// }

// for (let index = 0; index < 3; index++) {
//   const clone = productCardLarge();

//   const quickAccessSlider = document.querySelector(
//     '#quickAccessSlider > .carousel-inner'
//   );
//   const carouselItem = document.createElement('div');
//   carouselItem.classList.add('carousel-item', 'px-2');
//   carouselItem.append(clone);
//   if (index === 0) {
//     carouselItem.classList.add('active');
//   }
//   quickAccessSlider.appendChild(carouselItem);
// }
