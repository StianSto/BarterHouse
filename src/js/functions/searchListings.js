import { getAllListings } from '../api/listings';
import { handleApiResponse } from '../handlers/handleApiResponse';

export async function search(params, query) {
  let listings = [];
  let limit = params.get('limit');
  let arr;
  try {
    for (let i = 0; i < 5; i++) {
      params.set('offset', i * limit);
      const response = await getAllListings(params);
      handleApiResponse(response);
      arr = await response.json();

      listings = [...listings, ...filterSearch(arr, query)];
      if (arr?.length < limit) break;
    }
  } catch (error) {
    alert(error);
  }
  return listings;
}

function filterSearch(listings, query) {
  let filteredArr = listings.filter(({ title, description, tags }) => {
    query = query.toUpperCase();

    title = title ? title.toUpperCase() : '';
    description = description ? description.toUpperCase() : '';
    tags = tags ? tags.join().toUpperCase() : '';

    if (title.includes(query)) return true;
    if (description.includes(query)) return true;
    if (tags.includes(query)) return true;
    return false;
  });
  return filteredArr;
}
