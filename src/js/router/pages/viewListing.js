import getAllListings from '../../api/listings/get';
// import { renderListingSmall } from './render/renderListings';
import { createSlider } from '../../render/slider';

export async function viewListing() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const profileListings = document.querySelector('#profileListings');
  profileListings.appendChild(createSlider(listings));

  const similarListings = document.querySelector('#similarListings');
  similarListings.appendChild(createSlider(listings));
}
