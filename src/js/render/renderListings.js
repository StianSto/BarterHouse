import countdown from '../functions/countdown';
import { storage } from '../storage/localStorage';
import { listingSmall } from './templates/listings';

const defaultImage =
  'https://garden.spoonflower.com/c/11559317/p/f/m/wVUPX7NeVeeoRhPz3Mfzkqn9BCj1zYLRCGSjo-lR3N_5qJPAOioIs2I/Solid%20light%20grey%20g1_3-1.jpg';

export function renderListingSmall({
  media = '',
  title = '',
  bids = '',
  id = '',
  endsAt = '',
}) {
  const listing = new DOMParser().parseFromString(listingSmall, 'text/html');

  listing.querySelector('.listing-small > a').href = `/listings/view/?id=${id}`;
  listing.querySelector('[data-listing="title"]').textContent = title;
  listing.querySelector('[data-listing="media"]').src = media[0]
    ? media[0]
    : defaultImage;

  bids.sort((a, b) => b.amount - a.amount);

  addCountdown(endsAt, bids, listing);

  return listing.querySelector('.listing-small');
}

function addCountdown(endsAt, bids, listing) {
  const highestBid = document.createElement('p');
  highestBid.classList.add('mb-0');

  const count = countdown(endsAt, listing);
  const endsIn = listing.querySelector('[data-listing="endsIn"]');

  if (count < 0) {
    if (bids[0] && bids[0].bidderName === storage.load('userDetails').name) {
      highestBid.textContent = 'You have won!';
      highestBid.textContent = `${bids[0].bidderName} has won!`;
      endsIn.textContent = 'Auction has ended';
    }
  } else {
    if (bids[0] && bids[0].bidderName === storage.load('userDetails').name) {
      highestBid.classList.add('text-secondary');
      highestBid.textContent = 'In the lead!';
    } else {
      highestBid.textContent = 'Highest Bid!';
    }

    endsIn.textContent = count + ' days left';
    const bid = listing.querySelector('[data-listing="bid"]');
    bid.textContent = bids[0]?.amount ? '$ ' + bids[0].amount : 'no bids';
    bid.before(highestBid);
  }
}
