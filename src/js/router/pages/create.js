import { setCreateListingFormListener } from '../../handlers/createListingFormListener';
import { setInlineTagsInputListener } from '../../handlers/inlineTagsInputListener';

class Images {
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
let images = new Images();

export async function create() {
  const modalAddImages = document.querySelector('#modalAddImages');
  const save = modalAddImages.querySelector('[data-save]');

  const form = document.querySelector('#createListing');
  console.log(form);
  setCreateListingFormListener(form);

  const tagsContainer = document.querySelector('#tagsContainer');
  setInlineTagsInputListener(tagsContainer);

  save.addEventListener('click', saveImages);
  const addImageBtn = document.querySelector('#addImageBtn');
  const imageInputsContainer = document.querySelector('#imageInputs');
  addImageBtn.addEventListener('click', () => {
    imageInputsContainer.append(addImageInput());
  });

  const modalBtnAddImages = document.querySelector('#images');
  modalBtnAddImages.addEventListener('click', reloadModal);

  draggable(imageInputsContainer);
  addImagePreview();
}

function saveImages() {
  const modalAddImages = document.querySelector('#modalAddImages');
  const imagesInputs = [...modalAddImages.querySelectorAll('input')];
  const sources = [...imagesInputs.map((img) => img.value)];
  images.update(sources);
  addImagePreview();
}

function reloadModal() {
  const imageInputsContainer = document.querySelector('#imageInputs');
  const imageList = images.getAllImages();
  const arr = imageList.map((value) => {
    const input = addImageInput();
    input.querySelector('input').value = value;
    return input;
  });

  imageInputsContainer.replaceChildren(...arr);
}

function addImageInput() {
  const input = imageInputDOM();
  const removeBtn = input.querySelector('[data-remove]');
  removeBtn.addEventListener('click', () => input.remove());

  input.addEventListener('dragstart', () => input.classList.add('dragging'));
  input.addEventListener('dragend', () => input.classList.remove('dragging'));
  return input;
}

function addImagePreview() {
  const container = document.querySelector('#previewImagesContainer');
  const imagesArr = images.getAllImages();

  const array = imagesArr.map((src, index) => {
    const imagePreview = imagePreviewDOM();
    imagePreview.querySelector('img').src = src;
    imagePreview.querySelector('.btn-close').addEventListener('click', () => {
      images.remove(index);
      addImagePreview();
    });
    return imagePreview;
  });

  container.replaceChildren(...array);
}

const imagePreviewDOM = () => {
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

const imageInputDOM = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="draggable | mb-3 row align-items-center pe-2" draggable='true'>
			<i class="fa fa-grip-vertical col-auto fs-4 text-black-50" aria-hidden="true"></i>
			<input type="text" class="form-control col" name="" id="" aria-describedby="helpId" placeholder="">
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

function draggable(container) {
  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const setAfterElement = getDragAfterElement(container, event.clientY);
    const dragging = document.querySelector('.dragging');

    setAfterElement == null
      ? container.appendChild(dragging)
      : container.insertBefore(dragging, setAfterElement);
  });
}

// this function is heavily inspired by WebDevSimplified
// https://github.com/WebDevSimplified/Drag-And-Drop/blob/master/script.js
function getDragAfterElement(container, posY) {
  const draggable = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggable.reduce(
    (closest, child) => {
      const rect = child.getBoundingClientRect();
      const offset = posY - rect.top - rect.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}