export const listingSmall = () => {
  const el = new DOMParser().parseFromString(
    `
    <div class="listing-small | col h-100">
	
		<a href="" class="text-decoration-none text-black">
      <div class="card p-0 h-100 justify-content-between">
        <div>
          <img
            src="../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg"
						data-listing="media"
            class="img-fluid rounded-top bg-light w-100"
            style="aspect-ratio: 5 / 4; object-fit: cover"
            alt="Card title"
          />
        </div>

        <div class="d-flex justify-content-between h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title fs-4" data-listing="title">Card title</h3>
            <p class="small mb-auto" >
              <i class="fa fa-clock me-1"></i>
							<span data-listing="endsIn"></span>
            </p>
            <div class="bid-container | card-text mt-4 fs-6 fs-sm-5 mt-4" >
              <span class="me-4 fw-bold fs-4 d-flex flex-nowrap" data-listing="bid">$ 40</span>
            </div>
          </div>
        </div>
      </div>
		</a>
    </div>
	`,
    'text/html'
  );

  return el.querySelector('body > *');
};
