const loading = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
		`,
    'text/html'
  );

  el.remove = () => {
    el.remove();
  };

  return el.querySelector('body > *');
};

export const loadMoreBtn = () => {
  const el = new DOMParser().parseFromString(
    `
		<button class="col-auto px-5 py-2 btn btn-outline-primary" id="loadListingsBtn">
			See More Listings
		</button>
		`,
    'text/html'
  );
  const button = el.querySelector('body > *');

  button.loadingState = () => button.replaceChildren(loading());
  button.resetState = () => button.replaceChildren('See More Listings');
  button.hide = () => (button.style.display = 'none');
  button.show = () => (button.style.display = 'block');

  return button;
};
