'use client'
import Link from 'next/link'
import { ImageWithFallback } from './ImageWithFallback'
import { useSearchParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { HandlePaginationParams, fieldName, Book, Metadata } from '@/app/types/data'

export const Grid = ({ metadata, books }: { metadata: Metadata; books: Book[] }) => {
  const searchParams = useSearchParams()
  const path = usePathname()
  const router = useRouter()

  if (!books || books?.length == 0) {
    return <>No data</>
  }

  const current_page = parseInt(searchParams.get('page') ?? '1')
  const sort_by_field = searchParams.get('sort_by_field') ?? 'none'
  const sort_by = searchParams.get('sort_by') ?? 'ASC'

  const handlePagination = ({ page }: HandlePaginationParams) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('page', page.toString())

    router.replace(`${path}?${newSearchParams.toString()}`)
  }

  const handleSort = ({ fieldToSort, direction }: { fieldToSort: fieldName; direction: 'ASC' | 'DESC' }) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('sort_by_field', fieldToSort.toString())

    newSearchParams.set('sort_by', direction)

    router.replace(`${path}?${newSearchParams.toString()}`)
  }
  return (
    <section>
      <div className='mb-20'>
        <p className='text-md text-zinc-900 mb-2'>
          Total Count: <span className='font-bold'>{metadata.total_count}</span>
        </p>
        <p className='text-md text-zinc-900 mb-2'>
          Total Pages: <span className='font-bold'>{metadata.total_pages}</span>
        </p>
        <p className='text-md text-zinc-900 mb-2'>
          Current Count: <span className='font-bold'>{metadata.page_count}</span>
        </p>
        <p className='text-md text-zinc-900 mb-2'>
          Current Page: <span className='font-bold'>{metadata.current_page}</span>
        </p>
        <button
          className='rounded-sm px-4 py-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-700 transition-colors duration-250 font-bold text-md block'
          onClick={() => router.replace(`${path}`)}
        >
          Clear Filters
        </button>
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-[repeat(auto-fill,378px_auto_auto_auto)] xl:grid-cols-4 gap-8 mb-10'>
        {books.map((book) => (
          <li key={book.isbn} className='grid grid-rows-subgrid row-span-4'>
            <Link href={`/book/${book.isbn}`} className='grid grid-rows-subgrid row-span-4 gap-2 items-start group'>
              <span className='w-full block max-w-full max-h-full'>
                <ImageWithFallback
                  originalSrc={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`}
                  altText={`Cover of the book titled, ${book.title}`}
                  customClass='object-contain block h-[378px] w-full max-h-full max-w-full mx-auto object-top-left'
                />
              </span>
              <h3 className='font-semibold text-lg text-zinc-900 mb-2 underline decoration-transparent underline-offset-[2px] decoration-[2px] group-hover:decoration-zinc-900 group-hover:transition-colors group-hover:duration-250 duration-250 transition-colors'>
                {book.title}
              </h3>
              <p className='font-normal text-sm text-zinc-500'>{book.authors}</p>
              <p className='font-normal text-sm text-zinc-500 flex items-center gap-1'>
                <span className='hidden'>Rating: {book.average_rating} out of 5</span>
                {Array(Math.floor(book.average_rating))
                  .fill('')
                  .map((_, idx) => (
                    <svg
                      key={`book-${book.isbn}-${idx}`}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='goldenrod'
                      viewBox='0 0 24 24'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                      />
                    </svg>
                  ))}
                {book.average_rating % 1 !== 0 && (
                  <svg xmlns='http://www.w3.org/2000/svg' fill='goldenrod' viewBox='0 0 24 24' className='size-6'>
                    <defs>
                      <clipPath id={`half-star-${book.isbn}`}>
                        <rect x='0' y='0' width='12' height='24' />
                      </clipPath>
                    </defs>
                    <path
                      fill='goldenrod'
                      clipPath={`url(#half-star-${book.isbn})`}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                    />
                  </svg>
                )}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-center'>
        <ul className='inline-flex items-center justify-center gap-2'>
          {current_page !== 1 && (
            <li className='w-10 h-10 flex items-center justify-center'>
              <button
                onClick={() => handlePagination({ page: 1 })}
                className='font-bold text-red-500 rounded-full hover:bg-zinc-900 hover:text-zinc-100 text-zinc-500 transition-colors duration-250 p-2 w-10 h-10 flex justify-center items-center text-center'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </li>
          )}
          {metadata?.has_prev_page && (
            <li className='w-10 h-10 flex items-center justify-center'>
              <button
                onClick={() => handlePagination({ page: current_page - 1 })}
                className='font-bold rounded-full hover:bg-zinc-900 hover:text-zinc-100 text-zinc-500 transition-colors duration-250 p-2 w-10 h-10 flex justify-center items-center text-center'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </li>
          )}
          <li className='font-bold text-red-500 rounded-full bg-zinc-900 text-zinc-100 p-2 w-10 h-10 flex justify-center items-center text-center'>
            <span>{current_page}</span>
          </li>
          {metadata?.has_next_page &&
            current_page + 5 < metadata.total_pages &&
            Array(5)
              .fill('')
              .map((item, idx) => (
                <li key={`page-${idx}`}>
                  <button
                    type='button'
                    onClick={() => handlePagination({ page: current_page + (idx + 1) })}
                    className='cursor-pointer group text-zinc-500 p-2 w-10 h-10'
                  >
                    <span className='border-b border-transparent group-hover:border-zinc-500 group-hover:transition-colors group-hover:ease-in-out group-hover:duration-250 duration-250 transition-colors'>
                      {current_page + idx + 1}
                    </span>
                  </button>
                </li>
              ))}
          {metadata?.has_next_page && (
            <li className='w-10 h-10 flex items-center justify-center'>
              <button
                onClick={() => handlePagination({ page: current_page + 1 })}
                className='font-bold rounded-full hover:bg-zinc-900 hover:text-zinc-100 text-zinc-500 transition-colors duration-250 p-2 w-10 h-10 flex justify-center items-center text-center'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </li>
          )}

          {current_page !== metadata.total_pages && (
            <li className='w-10 h-10 flex items-center justify-center'>
              <button
                onClick={() => handlePagination({ page: metadata.total_pages })}
                className='font-bold rounded-full hover:bg-zinc-900 hover:text-zinc-100 text-zinc-500 transition-colors duration-250 p-2 w-10 h-10 flex justify-center items-center text-center'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                    clipRule='evenodd'
                  />
                  <path
                    fillRule='evenodd'
                    d='M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
