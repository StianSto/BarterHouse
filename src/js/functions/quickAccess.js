import { getProfileBids } from '../api/profile/read/getProfileBids';
import { getProfileListings } from '../api/profile/read/getProfileListings';
import { storage } from '../storage/localStorage';

const user = storage.load('userDetails')?.name;

export const quickAccess = {
  myListings: async () => {
    const response = await getProfileListings(user, paramsMyListings);
    return await response.json();
  },

  watchlist: async () => {
    const response = await getProfileBids(user, paramsWatchlist);
    return await response.json();
  },
};

const paramsMyListings = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', 10],
  ['offset', null],
  ['tag', null],
  ['_active', null],
  ['_bids', true],
]);

const paramsWatchlist = new Map([
  ['sort', 'created'],
  ['sortOrder', 'desc'],
  ['limit', null],
  ['offset', null],
  ['_listings', true],
]);
