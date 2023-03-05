import { getSearchParams } from '../functions/getSearchParams';

export function renderBadges(params) {
  const badgesMap = new Map();
  const container = document.querySelector('#filtersBadges');

  let sort = params.get('sort');
  let sortOrder = params.get('sortOrder');
  let active = params.get('_active');
  let tag = params.get('_tag');
  let limit = params.get('limit');

  const searchParams = getSearchParams();
  let view = searchParams.get('view');
  let query = searchParams.get('query');


  switch (sort) {
    case 'created':
      badgesMap.set('sortBy', sortOrder === 'desc' ? 'Newest' : 'Oldest');
      break;
    case 'title':
      badgesMap.set('sortBy', sortOrder === 'desc' ? 'Z - A ' : 'A - Z');
      break;
    default:
      false;
  }

  switch (view) {
    case 'watchlist':
      badgesMap.set('view', 'My Watchlist');
      
      limit = null;
      break;
    case 'myListings':
      badgesMap.set('view', 'My Listings');

      break;
    case 'newest':
      badgesMap.set('view', 'Newest');
      badgesMap.delete('sortBy');
      break;
    case 'hottest':
      badgesMap.set('view', 'Hottest Listings');
      badgesMap.delete('sortBy');
      break;

    case 'search':
      badgesMap.set('view', `Search: ${query}`);
      badgesMap.delete('sortBy');
      tag = null;
      limit = null;
      break;

    default:
      false;
  }

  switch (active) {
    case true:
      badgesMap.set('_active', 'Active auctions only');

      break;
  }

  if (limit) badgesMap.set('limit', `${limit} per page`);
  if (tag) badgesMap.set('tag', tag);

  const badges = [...badgesMap.values()];
  container.replaceChildren(...badges.map(badge));
}

const badge = (title) => {
  const el = new DOMParser().parseFromString(
    `
		<div class="col-auto">
			<span class="px-4 py-1 rounded-pill text-bg-light small fs-md-6"
				></span
			>
		</div>
		`,
    'text/html'
  );

  const badge = el.querySelector('body > *');
  badge.querySelector('span').innerText = title;

  return badge;
};
