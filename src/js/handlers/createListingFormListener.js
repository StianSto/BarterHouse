import { createListing } from '../api/listings';
import { renderListing } from '../render/renderListings';
import { modalFeedback } from './addBidListener';

export function setCreateListingFormListener(form, imagesState) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);

    const tagsList = [...form.querySelectorAll('.tag')];
    const tags = tagsList.map((tag) => tag.innerText);
    body.tags = tags;
    body.media = imagesState.getAllImages();

    const response = await createListing(body);
    let result = await response.json();

    let modalBody = document.createElement('div');
    let modalTitle = document.createElement('h3');

    if (response.ok) {
      modalTitle.innerText = `you created a new listing: ${result.title}`;

      const preview = renderListing(result, 'full');
      preview.querySelector('.bid-container').remove();

      modalBody.append(preview);
    } else {
      modalTitle.textContent = 'oops. seems there is a problem';
      let status = document.createElement('p');
      status.textContent = `${result.statusCode}: ${result.status}: `;

      let message = document.createElement('p');
      result.errors.forEach((err) => message.append(err.message));
      modalBody.append(status, message);
    }
    const modal = modalFeedback(modalBody, modalTitle);
    modal.show();
  });
}
