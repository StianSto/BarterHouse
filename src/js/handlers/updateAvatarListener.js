import { updateProfile } from '../api/profile/update/update';
import { storage } from '../storage/localStorage';
import defaultAvatar from '../../assets/images/default-avatar.png';

export async function setUpdateAvatarListener(user, form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);

    const response = await updateProfile(user, JSON.stringify(body));
    if (response.ok) {
      const userDetails = await response.json();
      delete userDetails['wins'];
      if (!userDetails.avatar) {
        userDetails.avatar = defaultAvatar;
      }
      console.log(userDetails);
      storage.save('userDetails', userDetails);
    }
    window.location.reload();
  });

  const avatarInput = form.querySelector('#avatar');
  const avatarPreview = form.querySelector('#changeProfileImage');
  avatarInput.addEventListener(
    'paste',
    () => (avatarPreview.src = avatarInput.value)
  );
  avatarInput.addEventListener(
    'focusout',
    () => (avatarPreview.src = avatarInput.value)
  );
}
