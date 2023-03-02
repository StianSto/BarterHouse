import { createBid } from '../api/listings/create/createBid';
import { updateLocalProfile } from '../functions/updateLocalProfile';
import { modalAlertTemplate } from '../render/templates/modalAlertTemplate';
import { Modal } from 'bootstrap';

export async function setaddBidListener(form, id) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = form.querySelector('input[name=amount]').value;
    const response = await createBid(id, parseFloat(amount));

    let msgBody;
    let msgTitle;

    if (response.ok) {
      const result = await response.json();
      updateLocalProfile();
      msgBody = `you made a $ ${amount} bid on ${result.title}`;
    } else {
      const result = await response.json();
      msgTitle.textContent = 'oops. seems there is a problem';
      let status = document.createElement('p');
      status.textContent = `${result.statusCode}: ${result.status}: `;

      let message = document.createElement('p');
      result.errors.forEach((err) => message.append(err.message));
      msgBody.append(status, message);
    }

    const modalElement = modalFeedback(msgBody, msgTitle);
    const modal = new Modal(modalElement);
    modal.show();
    modal._element.addEventListener('hide.bs.modal', () => {
      window.location.reload();
    });
  });
}

export function modalFeedback(message, title) {
  const modalElement = modalAlertTemplate();
  const modalTitle = modalElement.querySelector('.modal-title');
  const modalBody = modalElement.querySelector('.modal-body');

  title ? modalTitle.append(title) : null;
  modalBody.append(message);

  return modalElement;
}
