export const quickAccessTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<section id="quickAccess" class="mw-lg mx-auto px-4 mt-5 mb-5 p-3 row">
			<h2>Quick Access</h2>

			<form id="quickAccessForm" class="row">
				<div id="quickAccessSize" class="col-auto">
					<input
						type="radio"
						class="btn-check active"
						name="quickAccessSize"
						id="quickAccessSizeGrid"
						value="grid"
						checked
					/>
					<label
						class="btn btn-outline-dark btn-sortby btn-sortby-grid me-1"
						for="quickAccessSizeGrid"
					></label>
					<input
						type="radio"
						class="btn-check"
						name="quickAccessSize"
						id="quickAccessSizeFull"
						value="full"
					/>
					<label
						class="btn btn-outline-dark btn-sortby btn-sortby-full me-1"
						for="quickAccessSizeFull"
					></label>
				</div>
				<div id="quickAccessSort" class="mt-2 col-lg-auto">
					<input
						type="radio"
						class="btn-check active"
						name="quickAccessSort"
						id="quickAccessWatchlist"
						value="watchlist"
						checked
					/>
					<label
						class="btn btn-outline-dark rounded-pill py-1 px-3"
						for="quickAccessWatchlist"
					>
						<i class="fa fa-eye"></i
						><span class="d-none d-sm-inline ms-2">Watchlist</span>
					</label>
					<input
						type="radio"
						class="btn-check"
						name="quickAccessSort"
						id="quickAccessMyListings"
						value="myListings"
					/>
					<label
						class="btn btn-outline-dark rounded-pill py-1 px-3"
						for="quickAccessMyListings"
					>
						<i class="fa fa-user"></i>
						<span class="d-none d-sm-inline ms-2">My Listings</span>
					</label>
				</div>
			</form>

			<div class="mt-5 px-0 mw-lg mx-auto" id="quickAccessSlider"></div>
		</section>
			`,
    'text/html'
  );
  return el.querySelector('body > *');
};
