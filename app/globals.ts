export const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8000';
export const Endpoints = {
    list_books: `${API_HOST}/books`,
    search: `${API_HOST}/books/search`,
    book: `${API_HOST}/book`
    // TODO: Add other endpoints
}