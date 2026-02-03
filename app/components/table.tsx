'use client';
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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

interface TableProps {
    data: Data
}

type HandlePaginationParams = {page: number}
type fieldName = keyof Book
export const Table = ({data}: TableProps) => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    if (!data || data?.books?.length == 0) {
        return (<>No data</>)
    }
    
    const current_page = parseInt(searchParams.get('page') ?? '1')
    const sort_by_field = searchParams.get('sort_by_field') ?? 'none';
    const sort_by = searchParams.get('sort_by') ?? 'ASC';
    
    const handlePagination = ({page}: HandlePaginationParams) => {
        const newSearchParams = new URLSearchParams(searchParams);
        
        newSearchParams.set('page', page.toString())

        router.replace(`${path}?${newSearchParams.toString()}`)
    }

    const handleSort = ({fieldToSort, direction}: {fieldToSort: fieldName, direction: 'ASC' | 'DESC'}) => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set('sort_by_field', fieldToSort.toString());

        newSearchParams.set('sort_by', direction)

        router.replace(`${path}?${newSearchParams.toString()}`)
    }
    // TODO: Update UI to be less ugly
    return (
        <>
        <div className="mb-20">
          <p className="">Total Count: <span className="font-bold">{data.metadata.total_count}</span></p>
          <p className="">Total Pages: <span className="font-bold">{data.metadata.total_pages}</span></p>
          <p className="">Current Count: <span className="font-bold">{data.metadata.page_count}</span></p>
          <p className="">Current Page: <span className="font-bold">{data.metadata.current_page}</span></p>
          <button className="block my-2" onClick={() => router.replace(`${path}`)}>Clear Filters</button>
          <ul className="inline-flex gap-2">
            {current_page !== 1 && (
                <li><button onClick={() =>handlePagination({page: 1})}>{'<<'}</button></li>
            )}
            {
                data?.metadata?.has_prev_page && (<li><button onClick={() =>handlePagination({page: current_page - 1})}>Previous Page</button></li>)
            }  
            <li className="font-bold text-red-500">{current_page}</li>
            {
                data?.metadata?.has_next_page && (<li><button onClick={() =>handlePagination({page: current_page + 1})}>Next Page</button></li>)
            }
            
            {current_page !== data.metadata.total_pages && (
                <li><button onClick={() =>handlePagination({page: data.metadata.total_pages})}>{'>>'}</button></li>
            )}
          </ul>
        </div>
        <table className="rounded-sm w-full max-w-full">
          <thead>
            <tr className="bg-zinc-100 border-b-zinc-900 border-zinc-600">
              {
                data?.books?.[0] && Object.keys(data?.books?.[0]).map((key) => {
                    return (
                        <th key={key} className={`text-md px-8 py-4 font-semibold text-zinc-600 align-bottom text-left`}>
                        <button className={`${key.includes('isbn') ? 'uppercase' : 'capitalize' }${sort_by_field == key ? ' font-bold': ''}`} onClick={() => handleSort({fieldToSort: key, direction: sort_by == 'ASC' ? 'DESC' : 'ASC'})}>{key.replaceAll('_', ' ')} {sort_by_field === key && sort_by}</button></th>
                    )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              data.books.map((book, idx) => (
                <tr key={book.isbn} className={`${idx % 2 != 0 && idx !== 0 ? 'bg-zinc-50' : ''}`}>
                  {
                    Object.keys(book).map((key) => {
                        let value = book[key]
                        if (key === 'authors') {
                            const authors = book.authors.split('/')
                            if (authors.length > 2) {
                                value = authors[0] + ' et al' 
                            } 
                        }
                        if (key === 'language_code') {
                            value = book.language_code.toUpperCase()
                        }
                        return (
                            <td key={`${book.isbn}-${key}`} className={`px-8 py-4 text-zinc-500 ${key === 'title' ? 'font-bold hover:underline' : 'font-normal'}`}>{key === 'title' ? <Link href={`/book/${book.isbn}`}>{value}</Link> : value}</td>
                        )
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        </>
    )
}