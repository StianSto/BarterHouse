export function profileTemplate() {
  const profileTemplate = new DOMParser().parseFromString(
    `
	<div class="row justify-content-center">
		<div class="col-auto position-relative">
			<img
				src="../assets/images/irene-kredenets-KStSiM1UvPw-unsplash.jpg"
				alt=""
				class="w-100 rounded-circle"
				style="aspect-ratio: 1; max-width: 200px; object-fit: cover;"
				id="profileImg"
			/>
		</div>
		<div class="col-12 col-md-auto my-auto px-4 pt-4">
			<h1 id="profileName"></h1>
			<div>
				<p class="mb-1">
					<b>Email: </b
					><span id="profileEmail"></span>
				</p>
				<span class="me-3">
					<b>Listings: </b><span id="profileListings"></span>
				</span>
				<span> <b>wins: </b><span id="profileWins"></span> </span>
			</div>
			<p id="profileFunds" class="mt-4 text-secondary fs-2 fw-bold "></p>
		</div>
	</div>
	`,
    'text/html'
  );

  return profileTemplate.querySelector('body > div');
}
