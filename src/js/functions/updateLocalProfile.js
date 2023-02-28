import { getProfile } from '../api/profile/read/getProfiles';
import { storage } from '../storage/localStorage';
import defaultAvatar from '../../assets/images/default-avatar.png';

export async function updateLocalProfile() {
  const response = await getProfile(storage.load('userDetails').name);

  const { name, avatar, credits, email } = await response.json();

  if (!userDetails.avatar) {
    userDetails.avatar = defaultAvatar;
  }

  const userDetails = {
    name,
    avatar,
    credits,
    email,
  };

  storage.save('userDetails', userDetails);
}
