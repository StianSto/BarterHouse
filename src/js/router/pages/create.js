import { authGuard } from '../../functions/authGuard';
import { setCreateListingFormListener } from '../../handlers/createListingFormListener';
import { setInlineTagsInputListener } from '../../handlers/inlineTagsInputListener';
import { dragElementEvents, draggable } from '../../render/draggable';

export class Images {
  constructor(array = []) {
    this.array = [...array];
  }

  addImage(image) {
    this.array.push(image);
  }

  update(newArray) {
    this.empty();
    this.array = newArray;
  }

  remove(index) {
    this.array.splice(index, 1);
  }

  getAllImages() {
    return this.array;
  }
  get() {
    return this;
  }
  empty() {
    this.array = [];
  }
}

export async function create() {
  authGuard();

  let images = new Images();

  const form = document.querySelector('#createListing');
  const tagsContainer = document.querySelector('#tagsContainer');
  const addImageBtn = document.querySelector('#addImageBtn');
  const imageInputsContainer = document.querySelector('#imageInputs');
  const modalBtnAddImages = document.querySelector('#images > button');
  const save = document.querySelector('[data-save]');

  setCreateListingFormListener(form, images);
  setInlineTagsInputListener(tagsContainer);
  addImageBtn.addEventListener('click', () => {
    addImageInput(imageInputsContainer);
  });
  draggable(imageInputsContainer);
  modalBtnAddImages.addEventListener('click', () => reloadModal(images));
  save.addEventListener('click', () => saveImages(images));
  addImagePreview(images);
}

export function saveImages(imagesState) {
  const modalAddImages = document.querySelector('#modalAddImages');
  const imagesInputs = [...modalAddImages.querySelectorAll('input')];
  const sources = [...imagesInputs.map((img) => img.value)];
  imagesState.update(sources);
  addImagePreview(imagesState);
}

export function reloadModal(imagesState) {
  const container = document.querySelector('#imageInputs');
  container.replaceChildren();
  const imagesArr = imagesState.getAllImages();

  imagesArr.forEach((value) => addImageInput(container, value));
}

export function addImageInput(imageInputsContainer, value = null) {
  const imageInput = imageInputElement();
  const removeBtn = imageInput.querySelector('[data-remove]');
  removeBtn.addEventListener('click', () => imageInput.remove());

  dragElementEvents(imageInput);
  const input = imageInput.querySelector('input');
  if (value) input.value = value;
  imageInputsContainer.append(imageInput);
  input.focus();
}

export function addImagePreview(imagesState) {
  const container = document.querySelector('#previewImagesContainer');
  const imagesArr = imagesState.getAllImages();

  const array = imagesArr.map((src, index) => {
    const imagePreview = imagePreviewElement();
    imagePreview.querySelector('img').src = src;
    imagePreview.querySelector('.btn-close').addEventListener('click', () => {
      imagesState.remove(index);
      addImagePreview(imagesState);
      reloadModal(imagesState);
    });
    return imagePreview;
  });

  container.replaceChildren(...array);
}

export const imagePreviewElement = () => {
  const el = new DOMParser().parseFromString(
    `
	<div
		class="position-relative col p-0"
		style="max-width: 70px; aspect-ratio: 1"
	>
		<img
			class="w-100 h-100 rounded"
			style="object-fit: cover"
			src=""
			alt=""
		/>
		<button
			type="button"
			class="btn btn-close position-absolute fs-6"
			style="bottom: 0; right: 0; translate: 50% 50%"
		></button>
	</div>
`,
    'text/html'
  );

  return el.querySelector('body > *');
};

export const imageInputElement = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="draggable | mb-3 row align-items-center pe-2" draggable='true'>
			<i class="fa fa-grip-vertical col-auto fs-4 text-black-50" aria-hidden="true"></i>
			<input type="text" class="form-control col" name="" id="box" aria-describedby="helpId" placeholder="">
			<button
				class="rounded-circle btn btn-primary p-0 mx-2"
				style="height: 24px; width: 24px"
				data-remove
			>
				<i class="fa fa-minus"></i>
			</button>
		</div>
		`,
    'text/html'
  );
  return el.querySelector('body > *');
};
