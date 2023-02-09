export default async function getAllListings() {
  const response = await fetch(
    `https://api.noroff.dev/api/v1/auction/listings
		?limit=10
		&_bids=true
		&sort=created
		&sortOrder=desc
		`,
    // sort=title				title | created
    // &sortOrder=asc		asc | desc
    // &limit=10				number
    // &offset=1				true | false
    // &_active=true		true | false
    // &_seller=true		true | false
    // &_bids=true			true | false
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
}
