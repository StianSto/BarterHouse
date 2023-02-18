import { getListing } from '../../api/listings';
import { getSearchParams } from '../../functions/searchParams';
import {
  setInlineTagsInputListener,
  createTag,
} from '../../handlers/inlineTagsInputListener';
import { setUpdateListingFormListener } from '../../handlers/updateListingFormListener';
import {
  addImageInput,
  addImagePreview,
  draggable,
  Images,
  reloadModal,
  saveImages,
} from './create';

let images = new Images();

export async function edit() {
  const params = getSearchParams();
  const id = params.get('id');

  const response = await getListing(id);
  const listing = await response.json();

  const { title, tags, endsAt, description, media } = listing;

  const dateObject = new Date(endsAt);
  const date = dateObject.toISOString().split('T')[0];
  const time = dateObject.toLocaleTimeString();

  document.querySelector('#title').value = title;
  document.querySelector('#endsAtDate').value = date;
  document.querySelector('#endsAtTime').value = time;
  document.querySelector('#description').value = description;

  // insert tags and add eventlistener
  const tagsContainer = document.querySelector('#tagsContainer');
  setInlineTagsInputListener(tagsContainer);
  tags.forEach((tag) => {
    const el = createTag(tag);
    tagsContainer.querySelector('input').before(el);
  });

  // insert images and add modal and other image related functions
  images.update(media);

  const modalAddImages = document.querySelector('#modalAddImages');
  const save = modalAddImages.querySelector('[data-save]');

  save.addEventListener('click', () => saveImages(images));
  const addImageBtn = document.querySelector('#addImageBtn');
  const imageInputsContainer = document.querySelector('#imageInputs');
  addImageBtn.addEventListener('click', () => {
    imageInputsContainer.append(addImageInput());
  });

  const modalBtnAddImages = document.querySelector('#images');
  modalBtnAddImages.addEventListener('click', reloadModal(images));

  draggable(imageInputsContainer);
  addImagePreview(images);

  const form = document.querySelector('#updateListing');
  setUpdateListingFormListener(form, id);
}
