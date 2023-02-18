import { getListing } from '../../api/listings';
import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { getProfile } from '../../api/profile/read/getProfiles';
import { getSearchParams } from '../../functions/searchParams';
import { createSlider } from '../../render/slider';

const getListingParams = new Map([
  ['_seller', true],
  ['_bids', true],
]);

export async function viewListing() {
  const params = getSearchParams();
  const id = params.get('id');

  const response = await getListing(id, getListingParams);
  const listing = await response.json();

  const { title, description, media, created, endsAt, bids, seller } = listing;

  const createdDate = new Date(created);
  const endsDate = new Date(endsAt);

  // add content to page
  document.querySelector('#title').textContent = title;
  document.querySelector('#name').textContent = seller.name;
  document.querySelector('#description').textContent = description;
  document.querySelector('#descriptionFull').textContent = description;
  document.querySelector('#ends').textContent = endsDate.toLocaleDateString();
  document.querySelector('#started').textContent =
    createdDate.toLocaleDateString();
  document.querySelector('#profileImg').src = seller.avatar
    ? seller.avatar
    : '../../../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg';

  addBidders(bids);
  addSliders(listing.seller.name);
  addMedia(media);
}

async function addSliders(profile) {
  const response = await getProfileListings(profile);
  const listings = await response.json();
  const profileListings = document.querySelector('#profileListings');
  profileListings.querySelector('h2').textContent = `${profile}'s Listings`;
  profileListings.appendChild(createSlider(listings));
}

async function addBidders(bids) {
  const highestBidElement = document.querySelector('#highestBid');
  const highestBidderElement = document.querySelector('#highestBidderName');
  const highestBidImgElement = document.querySelector('#highestBidderImg');

  if (!bids[0]) {
    highestBidElement.textContent = 'no bids';
    highestBidImgElement.remove();
    highestBidderElement.remove();
    return;
  }

  bids.sort((a, b) => b.amount - a.amount);
  const highestBid = bids[0];
  const highestBidderResponse = await getProfile(highestBid.bidderName);
  const highestBidder = await highestBidderResponse.json();
  highestBidElement.textContent = `$ ${highestBid.amount}`;
  highestBidderElement.textContent = highestBid.bidderName;
  highestBidImgElement.src = highestBidder.avatar
    ? highestBidder.avatar
    : '../../../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg';

  const history = document.querySelector('#bidHistory');
  history.append(...bids.map(createBidHistory));
}

function createBidHistory(bid) {
  const date = new Date(bid.created);

  const tableRow = document.createElement('tr');
  const colName = document.createElement('td');
  const name = document.createElement('a');
  name.textContent = bid.bidderName;
  name.href = `/profiles/?name=${bid.bidderName}`;
  colName.append(name);

  const colBid = document.createElement('td');
  colBid.textContent = '$ ' + bid.amount;

  const colDate = document.createElement('td');
  colDate.textContent = `${date.toLocaleDateString()}, ${date
    .toLocaleTimeString()
    .substring(0, 5)}`;

  tableRow.append(colName, colBid, colDate);
  return tableRow;
}

function addMedia(media) {
  const mediaCarousel = document.querySelector('#mediaCarousel');
  const indicatorContainer = mediaCarousel.querySelector(
    '.carousel-indicators'
  );
  const mediaContainer = mediaCarousel.querySelector('.carousel-inner');

  media.forEach((img, index) => {
    const indicatorTemplate = templateCarouselIndicator.content.cloneNode(true);
    const indicator = indicatorTemplate.firstElementChild;
    indicator.setAttribute('data-bs-slide-to', index);
    indicator.src = img;

    const itemTemplate = templateCarouselItem.content.cloneNode(true);
    const item = itemTemplate.firstElementChild;
    item.querySelector('img').src = img;

    if (index === 0) {
      indicator.setAttribute('aria-current', true);
      indicator.classList.add('active');
      item.classList.add('active');
    }

    indicatorContainer.append(indicator);
    mediaContainer.append(item);
  });
}

const templateCarouselIndicator = document.querySelector(
  '#templateCarouselIndicator'
);
const templateCarouselItem = document.querySelector('#templateCarouselItem');
