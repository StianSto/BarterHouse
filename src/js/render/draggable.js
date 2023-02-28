export function draggable(container) {
  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const setAfterElement = getDragAfterElement(container, event.clientY);
    const dragging = document.querySelector('.dragging');

    setAfterElement == null
      ? container.appendChild(dragging)
      : container.insertBefore(dragging, setAfterElement);
  });
}

// this function is heavily inspired by Kyle Cook a.k.a. WebDevSimplified
// https://github.com/WebDevSimplified/Drag-And-Drop/blob/master/script.js
export function getDragAfterElement(container, posY) {
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

export function dragElementEvents(el) {
  el.addEventListener('dragstart', () => el.classList.add('dragging'));
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
}
