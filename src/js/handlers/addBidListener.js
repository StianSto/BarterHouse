import { createBid } from '../api/listings/create/createBid';
import { updateLocalProfile } from '../functions/updateLocalProfile';

export function setaddBidListener(form, id) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = form.querySelector('input[name=amount]').value;
    const response = await createBid(id, parseFloat(amount));

    if (response.ok) {
      updateLocalProfile();
      const result = await response.json();
      alert(`you placed a $${amount} bid on ${result.title}`);
      window.location.reload();
    }
  });
}
