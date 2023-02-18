// import { login } from '../../api/auth/login';
// import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { getAllListings } from '../../api/listings';
import { createSlider } from '../../render/slider';
// import { storage } from '../../storage/localStorage';

export async function viewListing() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const profileListings = document.querySelector('#profileListings');
  profileListings.appendChild(createSlider(listings));

  const similarListings = document.querySelector('#similarListings');
  similarListings.appendChild(createSlider(listings));

  // const response = await login(postData.email, postData.password);
  // if (response.ok) {
  //   const result = await response.json();
  //   storage.save('token', result.accessToken);
  // }
}

// const profile = {
//   name: 'surdeigogmoreller',
//   email: 'surdeigogmoreller@stud.noroff.no',
//   password: 'surdeigogmoreller',
// };

// const newListing = {
//   title: 'New Shoe',
//   id: "b278a05f-f3ca-4b7d-a1d9-e290ad4ca9cd"
//   description: 'it is a brand new shoe ',
//   endsAt: new Date('February 17, 2023 00:00:00').toJSON(),
//   tags: ['shoe', 'fashion'],
//   media: ['https://m.media-amazon.com/images/I/71qFb2FIz5L._UL1500_.jpg'],
// };
