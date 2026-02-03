import { Book, Table } from "@/app/components/table"
import { Fragment, Suspense } from "react"
import { getData } from "@/app/utils"
import { Endpoints } from "@/app/globals"
import { SearchForm } from "@/app/components/search"


export default async function GetBook ({params}: {params: Promise<{isbn: string}>}) {
    const {isbn} = await params

    console.log(isbn)
    const fetchParams: Record<string, string | undefined> = {isbn}

    const book = await getData({'params': fetchParams, endpoint: Endpoints.book}) as Book

    console.log(Object.keys(book))

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
          <main className="">
            <h2 className="mb-2">Book Page: {isbn}</h2> 
            <dl>
              {Object.entries(book)?.map(([key, value]) => (
                <Fragment key={`${book.isbn}-${key}`}>
                  <dt className="font-bold capitalize">{key}:</dt>
                  <dd className="mb-2">{value}</dd>
                </Fragment>
              ))}
            </dl>
          </main>
        </div>
      );
}