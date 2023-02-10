// import { login } from '../../api/auth/login';
import { getAllListings } from '../../api/listings/read/getListings';
import { getProfileListings } from '../../api/profile/read/getProfileListings';
import { createSlider } from '../../render/slider';
// import { storage } from '../../storage/localStorage';

export async function viewListing() {
  const getListings = await getAllListings();
  const listings = await getListings.json();

  const profileListings = document.querySelector('#profileListings');
  profileListings.appendChild(createSlider(listings));

  const similarListings = document.querySelector('#similarListings');
  similarListings.appendChild(createSlider(listings));

  // const postData = {
  //   name: 'surdeigogmoreller',
  //   email: 'surdeigogmoreller@stud.noroff.no',
  //   password: 'surdeigogmoreller',
  // };

  // const response = await login(postData.email, postData.password);
  // console.log(response);
  // if (response.ok) {
  //   const result = await response.json();
  //   console.log(result);
  //   storage.save('token', result.accessToken);
  // }

  getProfileListings('Lester');
}
