import { storage } from '../storage/localStorage';

export default function headers(contentType) {
  const headers = {};
  const token = storage.load('token');
  if (contentType) headers['Content-Type'] = contentType;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  return headers;
}
