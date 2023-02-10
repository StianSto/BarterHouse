import { getAllListings } from '../../api/listings/read/getListings';
import { renderListingSmall } from '../../render/renderListings';

export async function listings() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const listingsContainer = document.querySelector('#listingsContainer > .row');
  listingsContainer.append(...listings.map(renderListingSmall));
}

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
