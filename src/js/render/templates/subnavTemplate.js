export const subnavTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<div class="container mt-5 mw-lg mx-auto px-4">
			<ul class="row text-primary p-0 d-none d-lg-flex">
				<li class="d-inline-block col-auto">
					<a href="/" class="text-decoration-none">Home</a>
				</li>
				<li class="d-inline-block col-auto">
					<a href="/listings/?view=hottest" class="text-decoration-none"
						>Hottest</a
					>
				</li>
				<li class="d-inline-block col-auto">
					<a href="/listings/?view=newest" class="text-decoration-none"
						>Newest</a
					>
				</li>
				<li class="d-inline-block col-auto">
					<a href="/listings/?view=watchlist" class="text-decoration-none"
						>Watchlist</a
					>
				</li>
				<li class="d-inline-block col-auto ms-auto">
					<a href="/listings/?view=myListings" class="text-decoration-none"
						>My Listings</a
					>
				</li>
				<li class="d-inline-block col-auto">
					<a href="/profiles/" class="text-decoration-none">My Profile</a>
				</li>
			</ul>

			<div class="input-group">
				<input
					type="text"
					class="form-control rounded-2"
					placeholder="Search listings"
					aria-label="Search listings"
					aria-describedby="button-searchbar"
				/>
				<button
					id="button-searchbar"
					class="btn btn-primary d-flex justify-content-center align-items-center position-absolute h-100"
					style="right: 0; z-index: 5"
				>
					<i class="fa fa-search text-white fs-5"></i>
				</button>
			</div>
			<div id="categoriesContainer" class="container mt-4 mw-lg">
        <ul class="row row-cols-4 row-cols-lg-auto justify-content-lg-around p-0"></ul>
      </div>

		</div>
		`,
    'text/html'
  );

  const categoriesContainer = el.querySelector('#categoriesContainer ul');

  categories.forEach(({ name, tag, fontAwesomeIcon }) => {
    const element = categoryTemplate();
    element.querySelector('a').href = `/listings/?tag=${tag}`;
    element.querySelector('i').classList.add(...fontAwesomeIcon);
    element.querySelector('span').textContent = name;

    categoriesContainer.append(element);
  });

  return el.querySelector('body > *');
};

export const categoryTemplate = () => {
  const el = new DOMParser().parseFromString(
    `
		<li class="col list-unstyled mb-2">
			<a
				href="/listings/"
				class="text-decoration-none text-black-50 d-flex flex-column align-items-center"
				><i class="fa fs-3"></i>
				<span></span>
			</a>
		</li>
		`,
    'text/html'
  );
  return el.querySelector('body > *');
};

const categories = [
  {
    name: 'Vehicles',
    tag: 'vehicles',
    fontAwesomeIcon: ['fa-solid', 'fa-car'],
  },
  {
    name: 'Fashion',
    tag: 'fashion',
    fontAwesomeIcon: ['fa-solid', 'fa-tshirt'],
  },
  {
    name: 'Electronics',
    tag: 'electronics',
    fontAwesomeIcon: ['fa-solid', 'fa-laptop'],
  },
  {
    name: 'Wine',
    tag: 'wine',
    fontAwesomeIcon: ['fa-solid', 'fa-wine-glass'],
  },
  {
    name: 'Housing',
    tag: 'realestate',
    fontAwesomeIcon: ['fa-solid', 'fa-home'],
  },
  {
    name: 'Phone',
    tag: 'phone',
    fontAwesomeIcon: ['fa-solid', 'fa-mobile'],
  },
];
