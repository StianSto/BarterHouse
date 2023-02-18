import { storage } from '../../storage/localStorage';

export function logout() {
  if (!storage.load('token')) return;
  storage.remove('token');
  storage.remove('userDetails');

  window.location.reload();
}
