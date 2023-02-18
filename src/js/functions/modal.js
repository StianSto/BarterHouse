import { Modal } from 'bootstrap';

export function modal(element) {
  // const myModal = Modal.getOrCreateInstance(element);

  const options = { backdrop: 'static' };
  const myModal = new Modal(element, options);

  const btn = document.querySelector('#images button');
  btn.addEventListener('click', () => {
    myModal.show();
  });
}
