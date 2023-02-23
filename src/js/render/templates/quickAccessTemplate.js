export const quickAccessTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<section id="quickAccess" class="mw-lg mx-auto px-4 mt-5 mb-5 p-3 row">
			<h2>Quick Access</h2>
			<div id="quickAccessButtons" class="col-auto">
				<input
					type="radio"
					class="btn-check"
					name="quickAccessView"
					id="quickAccessViewFull"
					autocomplete="off"
					checked
				/>
				<label
					class="btn btn-outline-dark btn-sortby btn-sortby-full me-1"
					for="quickAccessViewFull"
				></label>

				<input
					type="radio"
					class="btn-check"
					name="quickAccessView"
					id="quickAccessViewGrid"
					autocomplete="off"
				/>
				<label
					class="btn btn-outline-dark btn-sortby btn-sortby-grid me-1"
					for="quickAccessViewGrid"
				></label>
			</div>
			<div id="quickAccessSort" class="mt-2 col-lg-auto">
				<input
					type="radio"
					class="btn-check"
					name="quickAccessSort"
					id="quickAccessWatchlist"
					autocomplete="off"
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
					autocomplete="off"
				/>
				<label
					class="btn btn-outline-dark rounded-pill py-1 px-3"
					for="quickAccessMyListings"
				>
					<i class="fa fa-user"></i>
					<span class="d-none d-sm-inline ms-2">My Listings</span>
				</label>
			</div>

			<div class="mt-5 px-0 mw-lg mx-auto" id="quickAccessSlider"></div>
		</section>
			`,
    'text/html'
  );
  return el.querySelector('body > *');
};
