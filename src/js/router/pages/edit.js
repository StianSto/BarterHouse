import { getListing } from '../../api/listings';
import { getSearchParams } from '../../functions/searchParams';
import {
  setInlineTagsInputListener,
  createTag,
} from '../../handlers/inlineTagsInputListener';
import { setUpdateListingFormListener } from '../../handlers/updateListingFormListener';
import { draggable } from '../../render/draggable';
import {
  addImageInput,
  addImagePreview,
  Images,
  reloadModal,
  saveImages,
} from './create';

export async function edit() {
  let images = new Images();
  const params = getSearchParams();
  const id = params.get('id');

  const form = document.querySelector('#updateListing');
  setUpdateListingFormListener(form, id, images);

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
    addImageInput(imageInputsContainer);
  });

  const modalBtnAddImages = document.querySelector('#images > button');
  modalBtnAddImages.addEventListener('click', () => reloadModal(images));

  addImagePreview(images);
  draggable(imageInputsContainer);
}
