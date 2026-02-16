import type {Book} from "@/app/types/data"
import { Fragment } from "react"
import { getData } from "@/app/utils"
import { Endpoints } from "@/app/globals"


export default async function GetBook ({params}: {params: Promise<{isbn: string}>}) {
    const {isbn} = await params

    const fetchParams: Record<string, string | undefined> = {isbn}

    const book = await getData({'params': fetchParams, endpoint: Endpoints.book}) as Book

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
          <main className="">
            <h2 className="mb-2">Book Page: {isbn}</h2> 
            <dl>
              {Object.entries(book)?.map(([key, value]) => (
                <Fragment key={`${book.isbn}-${key}`}>
                  <dt className="font-bold capitalize">{key}:</dt>
                  <dd className="mb-2">{value?.toString()}</dd>
                </Fragment>
              ))}
            </dl>
          </main>
        </div>
      );
}