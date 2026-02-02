export const API_HOST = "http://127.0.0.1:8000"
export enum Endpoints {
    list_books=`${API_HOST}/books`,
    search=`${API_HOST}/books/search`,
    // TODO: Add other endpoints
}