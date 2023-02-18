import { updateListing } from '../api/listings';

export function setUpdateListingFormListener(form, id) {
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

    console.log(body);

    const response = await updateListing(id, body);
    if (response.ok) {
      alert('succesfully updated your listing');
    }
  });
}
