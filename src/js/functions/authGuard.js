import { storage } from '../storage/localStorage';

export function authGuard() {
  if (!storage.load('token')) {
    window.location.replace('/auth/?form=login');
  }
}
