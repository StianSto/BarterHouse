export function upBidListener(input, highestBid) {
  const upBidBtns = document.querySelectorAll('[data-up-bid]');

  input.value = upBidBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const upBid = parseInt(btn.dataset.upBid);
      const currentHighestBid = parseInt(highestBid ? highestBid.amount : 0);
      const value = parseInt(input.value ? input.value : currentHighestBid);
      input.value = value + upBid;
    });
  });
}
