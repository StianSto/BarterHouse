export const navTemplate = () => {
  const nav = new DOMParser().parseFromString(
    `
	
	<nav class="navbar navbar-expand-lg bg-white p-0 m-0 shadow">
		<div class="container-fluid mw-lg pt-2 px-0">
			<a class="navbar-brand ff-brand fs-1 p-4 py-2" href="/"
				><span class="text-secondary ff-brand fw-light">Barter</span
				><span class="text-primary">House</span></a
			>
			<button
				class="navbar-toggler border-0 me-4 p-1 btn-outline-light"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<div class="menu-icon d-flex flex-column justify-content-between">
					<span class="bg-primary"></span>
					<span class="bg-primary"></span>
					<span class="bg-primary"></span>
				</div>
			</button>
			<div
				class="collapse navbar-collapse bg-primary px-4 px-sm-5 align-content-stretch"
				id="navbarSupportedContent"
			>
				<div class="d-lg-none d-flex align-items-center mt-4 " id="navProfileMobile">
					<a href="">
						<img
							src=""
							alt=""
							class="profile-img rounded-circle"
						/>
						<span class="fs-4 ms-3 text-white"></span>
					</a>
					<button class="btn ms-auto" data-logout>
						<i class="fa fa-solid fa-door-open fs-1 text-white"></i>
					</button>
				</div>
				
				<ul class="mt-4 d-lg-none list-unstyled ff-brand" id="navLinks"></ul>
				<a
					href="/create/"
					class="nav-btn | fs-5 text-black ms-auto me-4 px-0 d-none d-lg-flex text-decoration-none py-3" data-btn-create
				>
					<div class="my-auto d-flex align-items-center gap-2">
						<span class="text-primary fs-2">+ </span>
						<span> New Listing </span>
					</div>
				</a>
				<div id="navProfile" class="d-none d-lg-block dropdown">
					<img
						src=""
						alt=""
						class="profile-img rounded-circle dropdown-toggle"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					/>
				</div>
			</div>
		</div>
	</nav>
	`,
    'text/html'
  );

  return nav;
};
