import { API_URL } from '../api/constants';

export default function createUrl(endpoint, params = []) {
  const url = new URL(API_URL + endpoint);

  params.forEach((value, key) => {
    if (!value) return;
    url.searchParams.set(key, value);
  });

  return url;
}
