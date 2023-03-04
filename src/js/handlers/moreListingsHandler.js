import { loadMoreBtn } from '../render/loadMoreBtn';

export async function setRenderGridListener(
  renderCallback,
  renderOptions,
  container = document.querySelector('#loadListings')
) {
  const params = renderOptions['params'];
  const btn = loadMoreBtn();
  btn.loadingState();
  container.replaceChildren(btn);

  await callbackFunction(renderCallback, renderOptions);

  btn.resetState();

  let limit = parseInt(params.get('limit'));
  let offset = limit ? limit : 100;

  btn.addEventListener('click', async () => {
    btn.loadingState();
    try {
      params.set('offset', offset);
      offset += limit;

      await callbackFunction(renderCallback, renderOptions);
    } catch (error) {
      const err = document.createElement('p');
      err.innerText = 'an error ocurred: ' + error;
      btn.after(err);
    }
    btn.resetState();
  });
}

async function callbackFunction(callback, options) {
  await callback(options);
}
