import { Endpoints } from '@/app/globals'
import type { Stats } from '@/app/types/data'
import { getData } from '@/app/utils'

export default async function Stats() {
  const data = (await getData({ params: {}, endpoint: Endpoints.stats })) as Stats

  return (
    <div className='max-w-3xl mr-auto'>
      <h1 className='mb-2 text-2xl font-bold text-zinc-900'>Summary</h1>
      <p className='text-md text-zinc-900 mb-2'>
        This page shows some calculations that have been done to test my ability to congregate and interpret the data.
      </p>
      <div className='mb-20'>
        <h2 className='mb-2 text-xl font-bold text-zinc-900 mt-10'>Stats</h2>
        <p className='text-md text-zinc-900 mb-2'>
          Average Page Count: <span className='font-bold'>{data.average_page_count}</span>
        </p>
        <p className='text-md text-zinc-900 mb-2'>
          Average Rating: <span className='font-bold'>{data.average_rating}</span>
        </p>
        <h2 className='mb-2 text-xl font-bold text-zinc-900 mt-10'>Publishers with Highest Review vs Rating Ratio</h2>
        <p className='text-md text-zinc-500 mb-2'>
          This is the publisher which has the highest ratio of actual textual reviews versus a star rating. The higher
          the number, the more actual reviews they have.
        </p>
        <ul className='list-disc list-inside mb-2'>
          {data.review_ratios.map((publisher) => (
            <li key={publisher.publisher} className='mb-1 text-md text-zinc-500'>
              <span className='text-zinc-900'>{publisher.publisher}</span> has an average review to rating ratio of{' '}
              <span className='text-zinc-900'>{publisher.avg_review_ratio}</span> based on {publisher.total_books}{' '}
              books.
            </li>
          ))}
        </ul>
        <h2 className='mb-2 text-xl font-bold text-zinc-900 mt-10'>Publishers with Highest Book Count</h2>
        <ul className='list-disc list-inside mb-2'>
          {data.top_publishers.map((publisher) => (
            <li key={publisher.publisher} className='mb-1 text-md text-zinc-500'>
              <span className='text-zinc-900'>{publisher.publisher}</span> has a total of{' '}
              <span className='text-zinc-900'>{publisher.book_count}</span> books.
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
