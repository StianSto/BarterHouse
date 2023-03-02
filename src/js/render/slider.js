/* eslint-disable indent */

import { renderListing } from './renderListings';

export function renderSlideritem(
  listingData,
  sort = 'watchlist',
  size = 'grid'
) {
  const sliderItem = document.createElement('div');

  let sizeClass = size === 'grid' ? 'slider-item-small' : 'slider-item-full';
  sliderItem.classList.add('slider-item', sizeClass);

  let listing = renderListing(listingData, size);
  sliderItem.appendChild(listing);

  if (sort === 'watchlist') sliderItem.querySelector('.bid-container').remove();

  return sliderItem;
}
