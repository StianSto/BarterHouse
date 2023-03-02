import { render } from '../render/render';

export function setMoreListingsListener(btn, offset, params, view = null) {
  btn.addEventListener('click', async () => {
    btn.innerHTML = `
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
		`;
    let limit = parseFloat(params.get('limit'));
    offset += limit;
    params.set('offset', offset);

    try {
      await render(view, params);
    } catch (error) {
      const err = document.createElement('p');
      err.innerText = 'an error ocurred: ' + error;
      btn.after(err);
    }
    btn.innerHTML = 'See More Listings';
  });
}
