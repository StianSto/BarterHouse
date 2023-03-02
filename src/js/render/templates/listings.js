export const listingSmall = () => {
  const el = new DOMParser().parseFromString(
    `
    <div class="listing-small listing | h-100">
	
		<a href="" class="text-decoration-none text-black">
      <div class="card p-0 h-100 justify-content-between">
        <div>
          <img
            src="../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg"
						data-listing="media"
            class="img-fluid rounded-top bg-light w-100"
            style="aspect-ratio: 5 / 4; object-fit: contain"
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
            <div class="bid-container | card-text mt-4 fs-6 mt-4" >
              <span class="me-4 fw-bold fs-4 d-flex flex-nowrap" data-listing="bid"></span>
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

export const listingFull = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="listing-full listing | col h-100">
			<a href="" class="text-decoration-none text-black">
				<div class="card flex-md-row   p-0 h-100 justify-content-between">
					<div class="col">
						<img
							src="../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg"
							data-listing="media"
							class="img-fluid rounded-top bg-light w-100 h-100"
							style="aspect-ratio: 5 / 4; object-fit: contain;"
							alt="Card title"
						/>
					</div>

					<div class="col d-flex justify-content-between h-100">
						<div class="card-body d-flex flex-column  p-sm-5">
							<h3 class="card-title fs-2" data-listing="title">Card title</h3>
							<p>
								<i class="fa fa-clock me-1"></i>
								<span data-listing="endsIn"></span>
							</p>
							<p data-listings="description" class="fs-6 fs-md-5 mt-2"></p>
							<div class="bid-container | card-text mt-4 fs-6 fs-md-5 mt-auto" >
								<span class="me-4 fw-bold fs-4 d-flex flex-nowrap" data-listing="bid"></span>
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
