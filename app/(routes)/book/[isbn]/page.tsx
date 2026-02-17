import type { Book } from '@/app/types/data'
import { Fragment } from 'react'
import { getData } from '@/app/utils'
import { Endpoints } from '@/app/globals'

export default async function GetBook({ params }: { params: Promise<{ isbn: string }> }) {
  const { isbn } = await params

  const fetchParams: Record<string, string | undefined> = { isbn }

  const book = (await getData({ params: fetchParams, endpoint: Endpoints.book })) as Book

  return (
    <>
      <h2 className='mb-2 text-2xl font-bold text-zinc-900'>Book Page: {isbn}</h2>
      <dl>
        {Object.entries(book)?.map(([key, value]) => (
          <Fragment key={`${book.isbn}-${key}`}>
            <dt className='font-bold capitalize'>{key}:</dt>
            <dd className='mb-2'>{value?.toString()}</dd>
          </Fragment>
        ))}
      </dl>
    </>
  )
}
