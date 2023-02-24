export function setInlineTagsInputListener(tagsContainer) {
  const input = tagsContainer.querySelector('input');

  input.addEventListener('focusout', eventListener);
  input.addEventListener('keyup', (event) => {
    if (event.keyCode !== 32) return;
    eventListener();
  });

  function eventListener() {
    let tagValue = input.value.trim();
    if (!tagValue) return null;
    const tag = createTag(tagValue);
    input.value = '';
    input.before(tag);
  }
}

export function createTag(value) {
  const element = document.createElement('span');
  element.innerText = value;
  element.name = 'tag';
  element.classList.add(
    'tag',
    'badge',
    'badge-primary',
    'text-bg-light',
    'fw-normal',
    'py-1',
    'ms-1'
  );

  const closeBtn = document.createElement('i');
  closeBtn.classList.add('fa', 'fa-close', 'ms-2');
  closeBtn.addEventListener('click', () => {
    element.remove();
  });

  element.append(closeBtn);

  return element;
}
