import { createListing } from '../api/listings';

export function setCreateListingFormListener(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);

    const tagsList = [...form.querySelectorAll('.tag')];
    const tags = tagsList.map((tag) => tag.innerText);
    body.tags = tags;

    const imagesList = [
      ...form.querySelectorAll('#previewImagesContainer img'),
    ];
    const media = imagesList.map((image) => image.src);
    body.media = media;

    const response = await createListing(body);
    console.log(response);
    if (response.ok) {
      alert('created a new listing');
    }
  });
}
