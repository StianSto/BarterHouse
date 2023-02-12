export function navTemplate() {
  const nav = new DOMParser().parseFromString(
    `
	
	<nav class="navbar navbar-expand-lg bg-white p-0 m-0 shadow">
        <div class="container-fluid mw-lg pt-2 px-0">
          <a class="navbar-brand ff-brand fs-1 p-4 py-2" href="#"
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
            class="collapse navbar-collapse bg-primary px-4 py-3 px-sm-5 py-sm-4 py-md-0 align-content-stretch"
            id="navbarSupportedContent"
          >
            <div class="d-lg-none d-flex align-items-center">
              <a href="">
                <img
                  src="https://www.nzherald.co.nz/resizer/lKgrR0xF3qocbN-mTVRaFmX0XIc=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/S7UIQ527KPM6YO6MMOMZD64GM4.jpg"
                  alt=""
                  class="profile-img rounded-circle"
                />
                <span class="fs-4 ms-3 text-white">Ron F. Swanson</span>
              </a>
              <button class="btn ms-auto" id="logout">
                <i class="fa fa-solid fa-door-open fs-1 text-white"></i>
              </button>
            </div>
            <ul class="mt-4 d-lg-none list-unstyled ff-brand">
              <li class="mt-2">
                <a href="" class="text-decoration-none fs-3 text-white">Home</a>
              </li>
              <li class="mt-2">
                <a href="" class="text-decoration-none fs-3 text-white"
                  >My Profile</a
                >
              </li>
              <li class="mt-2">
                <a href="" class="text-decoration-none fs-3 text-white"
                  >Watchlist</a
                >
              </li>
              <li class="mt-2">
                <a href="" class="text-decoration-none fs-3 text-white"
                  >New Listing
                </a>
              </li>
            </ul>
            <a
              href=""
              class="nav-btn | fs-5 text-black ms-auto me-4 px-0 d-none d-lg-flex text-decoration-none py-3"
            >
              <div class="my-auto d-flex align-items-center gap-2">
                <span class="text-primary fs-2">+ </span>
                <span> New Listing </span>
              </div>
            </a>
            <div id="nav-profile" class="d-none d-lg-block dropdown">
              <img
                src="https://www.nzherald.co.nz/resizer/lKgrR0xF3qocbN-mTVRaFmX0XIc=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/S7UIQ527KPM6YO6MMOMZD64GM4.jpg"
                alt=""
                class="profile-img rounded-circle dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">My Profile</a></li>
                <li><a class="dropdown-item" href="#">Watchlist</a></li>
                <li class="d-flex flex-nowrap align-items-center mt-2">
                  <a class="dropdown-item text-primary" href="#"
                    >Log out
                    <i
                      class="fa fa-solid fa-door-open fs-6 text-primary ms-3"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
	`,
    'text/html'
  );

  console.log(nav.querySelector('nav'));
  return nav.querySelector('nav');
}
