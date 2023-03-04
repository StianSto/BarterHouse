export function setSearchListener(searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const query = formData.get('query');

    const base = import.meta.env.BASE_URL;
    const url = new URL(window.location);

    url.pathname = base + 'listings/';
    url.searchParams.set('view', 'search');
    url.searchParams.set('query', query);
    window.location.replace(url);
  });
}
