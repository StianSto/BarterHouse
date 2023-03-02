import { getProfile } from '../api/profile/read/getProfiles';
import { storage } from '../storage/localStorage';
import defaultAvatar from '../../assets/images/default-avatar.png';

export async function updateLocalProfile() {
  const response = await getProfile(storage.load('userDetails').name);
  const { name, avatar, credits, email } = await response.json();

  const userDetails = {
    name,
    avatar: avatar ? avatar : defaultAvatar,
    credits,
    email,
  };

  storage.save('userDetails', userDetails);
}
