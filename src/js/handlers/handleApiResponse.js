export function handleApiResponse(response) {
  if (!response.ok) {
    if (response.status == 429)
      throw new Error('the server is overloaded, please try again later');
  }
}
