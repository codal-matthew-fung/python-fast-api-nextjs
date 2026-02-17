export interface Data {
  metadata: Metadata
  books: Book[]
}

export interface Metadata {
  total_count: number
  total_pages: number
  current_page: number
  page_count: number
  has_next_page: boolean
  has_prev_page: boolean
}

export interface Book {
  [k: string]: number | string
  bookID: number
  title: string
  authors: string
  average_rating: number
  isbn: string
  isbn13: number
  language_code: string
  num_pages: number
  ratings_count: number
  text_reviews_count: number
  publication_date: string
  publisher: string
}

export interface TableProps {
  data: Data
}

export type HandlePaginationParams = { page: number }
export type fieldName = keyof Book

export interface Stats {
  top_publishers: TopPublisher[]
  average_page_count: number
  average_rating: number
  review_ratios: ReviewRatio[]
}

export interface TopPublisher {
  book_count: number
  publisher: string
}

export interface ReviewRatio {
  publisher: string
  total_books: number
  avg_review_ratio: number
}
