import { renderListingSmall } from './renderListings';
function renderSlideritem(listings) {
  const clone = renderListingSmall(listings);

  const sliderItem = document.createElement('div');
  sliderItem.classList.add('slider-item', '|', 'col', 'h-100');
  sliderItem.appendChild(clone);

  return sliderItem;
}

export function createSlider(listings) {
  const slider = new DOMParser().parseFromString(
    `
			<div class="slider">
				<div class="outer-wrapper">
					<div
						class="inner-wrapper row gap-3 flex-nowrap row-cols-2 row-cols-md-3"
					></div>
				</div>
				<div class="track bg-grey"></div>
			</div>
		`,
    'text/html'
  );

  slider
    .querySelector('.inner-wrapper')
    .append(...listings.map(renderSlideritem));

  return slider.querySelector('.slider');
}
