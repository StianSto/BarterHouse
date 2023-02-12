import { listingSmall } from './templates/listings';

const defaultImage =
  'https://garden.spoonflower.com/c/11559317/p/f/m/wVUPX7NeVeeoRhPz3Mfzkqn9BCj1zYLRCGSjo-lR3N_5qJPAOioIs2I/Solid%20light%20grey%20g1_3-1.jpg';

export function renderListingSmall({ media = '', title = '', bids = '' }) {
  const listing = new DOMParser().parseFromString(listingSmall, 'text/html');
  listing.querySelector('[data-listing="title"]').textContent = title;
  listing.querySelector('[data-listing="media"]').src = media[0]
    ? media[0]
    : defaultImage;
  listing.querySelector('[data-listing="bid"]').textContent = bids[0]?.amount
    ? '$ ' + bids[0].amount
    : 'no bids';

  console.log(listing.querySelector('.listing-small'));

  return listing.querySelector('.listing-small');
}
