import { createListing } from '../api/listings';

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
    if (response.ok) alert('created a new listing');
  });
}
