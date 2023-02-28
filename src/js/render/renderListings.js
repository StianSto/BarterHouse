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
  const listing = listingSmall();

  const listingLink = listing.querySelector('.listing-small > a');
  const listingTitle = listing.querySelector('[data-listing="title"]');
  const listingImg = listing.querySelector('[data-listing="media"]');

  listingLink.href = `/listings/view/?id=${id}`;
  listingTitle.textContent = title;
  listingImg.src = media[0] ? media[0] : defaultImage;
  listingImg.loading = 'lazy';

  bids.sort((a, b) => b.amount - a.amount);
  addCountdown(endsAt, bids, listing);

  return listing;
}

// calculates and adds a static countdown to listing. if listing has less than a day left and is still active, it adds a live countdown
function addCountdown(endsAt, bids, listing) {
  const highestBid = document.createElement('p');
  highestBid.classList.add('mb-0');

  const count = countdown(endsAt, listing);
  const endsIn = listing.querySelector('[data-listing="endsIn"]');

  const user = storage.load('userDetails')?.name;

  if (!count) {
    endsIn.textContent = 'Auction has ended';
    if (bids[0] && bids[0].bidderName === user) {
      highestBid.textContent = 'You have won!';
      highestBid.classList.add('text-secondary');
    } else if (bids[0]) {
      highestBid.textContent = `${bids[0].bidderName} has won!`;
    }
  } else {
    if (bids[0] && bids[0].bidderName === user) {
      highestBid.classList.add('text-secondary');
      highestBid.textContent = 'In the lead!';
    } else if (bids[0]) {
      highestBid.textContent = `${bids[0].bidderName} is leading`;
    }

    endsIn.textContent = count + ' days left';
  }
  const bid = listing.querySelector('[data-listing="bid"]');
  bid.textContent = bids[0]?.amount ? '$ ' + bids[0].amount : 'no bids';
  bid.before(highestBid);
}
