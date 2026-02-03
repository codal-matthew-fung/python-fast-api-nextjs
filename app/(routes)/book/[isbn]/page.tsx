import { Table } from "@/app/components/table"
import { Suspense } from "react"
import { getData } from "@/app/utils"
import { Endpoints } from "@/app/globals"
import { SearchForm } from "@/app/components/search"


export default async function GetBook (params: {isbn: string}) {
    const {isbn} = params

    const fetchParams: Record<string, string | undefined> = {isbn}

    const data = await getData({'params': fetchParams, endpoint: Endpoints.search})

    console.log(data)

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
          <main className="">
            <SearchForm />
            <Suspense fallback={<>Loading Data</>}>
              <Table data={data} />
            </Suspense>
          </main>
        </div>
      );
}