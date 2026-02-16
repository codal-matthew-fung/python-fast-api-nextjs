'use client';
import Link from "next/link"
import { ImageWithFallback } from "./ImageWithFallback";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HandlePaginationParams, fieldName, Book, Metadata } from "@/app/types/data";

export const Grid = ({metadata, books}: {metadata: Metadata, books: Book[]}) => {
        const searchParams = useSearchParams();
        const path = usePathname();
        const router = useRouter();
    
        if (!books || books?.length == 0) {
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
    console.log((current_page + 5) < metadata.total_pages)
    return  (
        <section>
            <div className="mb-20">
                    <p className="">Total Count: <span className="font-bold">{metadata.total_count}</span></p>
                    <p className="">Total Pages: <span className="font-bold">{metadata.total_pages}</span></p>
                    <p className="">Current Count: <span className="font-bold">{metadata.page_count}</span></p>
                    <p className="">Current Page: <span className="font-bold">{metadata.current_page}</span></p>
                    <button className="block my-2" onClick={() => router.replace(`${path}`)}>Clear Filters</button>
                </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-[repeat(auto-fill,378px_auto_auto)] xl:grid-cols-4 gap-8 mb-10">
                {books.map((book) => (
                    <li key={book.isbn} className="grid grid-rows-subgrid row-span-3">
                        <Link href={`/book/${book.isbn}`} className="grid grid-rows-subgrid row-span-3 gap-2 items-start">
                            <span className="w-full block max-w-full max-h-full rounded-sm">
                                <ImageWithFallback originalSrc={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`} altText={`Cover of the book titled, ${book.title}`} customClass="object-contain block h-[378px] w-full max-h-full max-w-full mx-auto rounded-sm"/>
                            </span>
                            <h3 className="font-semibold text-lg text-zinc-900 mb-2">{book.title}</h3>
                            <p className="font-normal text-sm text-zinc-500">{book.authors}</p>
                        </Link>
                    </li>
                ))}                
            </ul>
            <div className="text-center">
            <ul className="inline-flex gap-2">
                        {current_page !== 1 && (
                            <li><button onClick={() =>handlePagination({page: 1})}>{'<<'}</button></li>
                        )}
                        {
                            metadata?.has_prev_page && (<li><button onClick={() =>handlePagination({page: current_page - 1})}>Previous Page</button></li>)
                        }  
                        <li className="font-bold text-red-500 rounded-full bg-zinc-900 text-zinc-100 p-2 w-10 h-10 flex justify-center items-center text-center"><span>{current_page}</span></li>
                        {
                            metadata?.has_next_page && ((current_page + 5) < metadata.total_pages) && Array(5).fill('').map((item, idx) => (<li key={`page-${idx}`}><button type="button" onClick={() =>handlePagination({page: current_page + (idx + 1)})} className="cursor-pointer group text-zinc-500 p-2 w-10 h-10"><span className="border-b border-transparent group-hover:border-zinc-500 group-hover:transition-colors group-hover:ease-in-out group-hover:duration-250 duration-250 transition-colors">{current_page + idx + 1}</span></button></li>))
                        }
                        {/* {
                            metadata?.has_next_page && (<li><button onClick={() =>handlePagination({page: current_page + 1})}>Next Page</button></li>)
                        } */}
                        
                        {current_page !== metadata.total_pages && (
                            <li><button onClick={() =>handlePagination({page: metadata.total_pages})}>{'>>'}</button></li>
                        )}
                    </ul>
            </div>
        </section>
    )
}