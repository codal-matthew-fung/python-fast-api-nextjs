'use client'
import Form from 'next/form'
export const SearchForm = () => {
  return (
    <section className='py-10'>
      <h2 className='text-xl text-zinc-900 font-bold'>Search</h2>
      <Form action={'/search'}>
        <input
          type='search'
          name='term'
          className='border border-zinc-300 p-2 text-md text-zinc-500 rounded-sm mb-4'
          placeholder='Enter a search term..'
        />
        <h2 className='text-md text-zinc-900 font-bold mb-2'>Search By</h2>
        <div className='flex gap-4 mb-2'>
          <input type='radio' name='field' id='author' value='author' />
          <label htmlFor='author' className='text-md text-zinc-900 font-normal'>
            Author
          </label>
        </div>
        <div className='flex gap-4 mb-2'>
          <input type='radio' name='field' id='title' value='title' />
          <label htmlFor='title' className='text-md text-zinc-900 font-normal'>
            Title
          </label>
        </div>
        <div className='flex gap-4 mb-4 items-center justify-start'>
          <input
            type='number'
            name='max_pages'
            className='border border-zinc-300 rounded-sm p-2 text-md text-zinc-500 rounded-sm'
          />
          <label htmlFor='max_pages'>Max Pages</label>
        </div>
        <div className='flex gap-4 mb-4 items-center justify-start'>
          <input
            type='number'
            name='min_pages'
            className='border border-zinc-300 rounded-sm p-2 text-md text-zinc-500 rounded-sm'
          />
          <label htmlFor='min_pages'>Min Pages</label>
        </div>
        <button
          type='submit'
          className='rounded-sm px-4 py-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-700 transition-colors duration-250 font-bold text-md block'
        >
          Submit
        </button>
      </Form>
    </section>
  )
}
