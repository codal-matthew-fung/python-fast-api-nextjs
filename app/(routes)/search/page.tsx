import { Table } from '@/app/components/table'
import { Suspense } from 'react'
import { getData } from '@/app/utils'
import { Endpoints } from '@/app/globals'
import { SearchForm } from '@/app/components/search'
import type { Data } from '@/app/types/data'
import { Grid } from '@/app/components/grid'

interface SearchParams {
  field?: string
  term?: string
  min_pages?: string
  max_pages?: string
  sort_by?: 'ASC' | 'DESC'
  sort_by_field?: string
  page?: string
}

type SearchProps = {
  searchParams?: Promise<SearchParams>
}

export default async function Search(props: SearchProps) {
  const searchParams = await props.searchParams
  const { term, field, max_pages, min_pages, sort_by, sort_by_field, page } = searchParams || {}

  const params: Record<string, string | undefined> = { max_pages, min_pages, sort_by, sort_by_field, page }
  if (field) {
    params[field] = term
  }

  const data = (await getData({ params: params, endpoint: Endpoints.search })) as Data

  return (
    <div className='max-w-6xl mx-auto px-4 py-20'>
      <main className=''>
        <SearchForm />
        <Suspense fallback={<>Loading Data</>}>
          <Grid books={data.books} metadata={data.metadata} />
        </Suspense>
      </main>
    </div>
  )
}
