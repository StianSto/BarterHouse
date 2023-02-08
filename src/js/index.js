// import sass files
import '../scss/index.scss';

// import bootstrap files
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';

function productCardsSmall() {
  const productCardSmall = document.querySelector(`template#productCardSmall`);
  const clone = productCardSmall.content.cloneNode(true);

  return clone;
}

for (let index = 0; index < 11; index++) {
  const clone = productCardsSmall();

  const quickAccessGrid = document.querySelector('#listingsContainer > .row');
  quickAccessGrid.appendChild(clone);
}

function productCardLarge() {
  const productCardSmall = document.querySelector(`template#productCardLarge`);
  const clone = productCardSmall.content.cloneNode(true);

  return clone;
}

for (let index = 0; index < 3; index++) {
  const clone = productCardLarge();

  const quickAccessSlider = document.querySelector(
    '#quickAccessSlider > .carousel-inner'
  );
  const carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item', 'px-2');
  carouselItem.append(clone);
  if (index === 0) {
    carouselItem.classList.add('active');
  }
  quickAccessSlider.appendChild(carouselItem);
}
