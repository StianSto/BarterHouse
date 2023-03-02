export function sliderTemplate() {
  const el = new DOMParser().parseFromString(
    `
			<div class="slider">
				<div class="outer-wrapper">
					<div
						class="inner-wrapper row gap-3 flex-nowrap  gx-1"
					></div>
				</div>
				<div class="track bg-light"></div>
			</div>
		`,
    'text/html'
  );

  return el.querySelector('body > *');
}
