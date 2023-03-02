export const getSearchParams = (url = window.location.search) => {
  return new URLSearchParams(url);
};
