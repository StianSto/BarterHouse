import { updateProfile } from '../api/profile/update/update';
import { updateLocalProfile } from '../functions/updateLocalProfile';

export async function setUpdateAvatarListener(user, form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData);

    const response = await updateProfile(user, JSON.stringify(body));
    if (response.ok) await updateLocalProfile();
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
