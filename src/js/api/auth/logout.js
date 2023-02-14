import { storage } from '../../storage/localStorage';

export function logout() {
  if (!storage.load('token')) return;
  console.log('i was executed');
  storage.remove('token');
  storage.remove('userDetails');

  window.location.reload();
}
