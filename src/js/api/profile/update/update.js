import createUrl from '../../../functions/createFlagString';
import headers from '../../headers';

const PROFILES_ENDPOINT = 'auction/profiles/';

export async function updateProfile(user) {
  const URL = createUrl(`${PROFILES_ENDPOINT}${user}/media`);
  const response = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({
      avatar:
        'http://lh6.ggpht.com/PT75OQLfbP6YSbyRLZqTmkVIby8qgpyajKjI1flX5C7TIhjNhM5l1focEtErI8NgUlY7Eg_rIRe8ALRb2bg=s600',
    }),
    headers: headers('application/json'),
  });

  return response;
}
