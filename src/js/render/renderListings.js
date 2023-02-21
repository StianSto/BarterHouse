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

  const highestBid = document.createElement('p');
  highestBid.classList.add('mb-0');
  if (bids[0] && bids[0].bidderName === storage.load('userDetails').name) {
    highestBid.classList.add('text-secondary');
    highestBid.textContent = 'In the lead!';
  } else {
    highestBid.textContent = 'Highest Bid';
  }
  const bid = listing.querySelector('[data-listing="bid"]');
  bid.before(highestBid);

  const today = new Date();
  const ends = new Date(endsAt);

  const count = countdown(endsAt, listing);
  console.log(count);

  (() => {
    if (ends < today) {
      console.log(bids);
      if (bids.length === 0) return;
      bids[0].bidderName === storage.load('userDetails').name
        ? (highestBid.textContent = 'You have won!')
        : (highestBid.textContent = `${bids[0].bidderName} has won!`);
    }
  })();

  bid.textContent = bids[0]?.amount ? '$ ' + bids[0].amount : 'no bids';

  return listing.querySelector('.listing-small');
}
