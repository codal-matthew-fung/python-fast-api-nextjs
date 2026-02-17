export const API_HOST = process.env.NEXT_PUBLIC_API_HOST
export const Endpoints = {
  list_books: `${API_HOST}/books`,
  search: `${API_HOST}/books/search`,
  book: `${API_HOST}/book`,
  stats: `${API_HOST}/stats/summary`
  // TODO: Add other endpoints
}
