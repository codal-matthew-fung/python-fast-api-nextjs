import { StyledLink } from '@/app/components/Link'

export default async function Home() {
  return (
    <article className='max-w-3xl'>
      <h1 className='text-xl lg:text-3xl font-semibold mb-2'>CIT-1063 - Python FastAPI Training Project</h1>
      <h2 className='text-xl lg:text-2xl font-semibold mb-2 mt-10'>Project Overview</h2>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        This frontend serves as the interface for a suite of APIs developed to master FastAPI and modern Python backend
        development. Built as a successor to a previous training project, this application focuses on reinforcing data
        validation, SQL integration, and RESTful architecture.
      </p>
      <p className='text-md text-zinc-500 lg:text-xl italic mb-4'>
        <span className='text-zinc-900'>Note on UI/UX</span>: As the primary objective was backend engineering, the
        frontend styling is functional rather than highly polished. You may encounter some UI inconsistencies, as the
        design was kept minimal to prioritize API integration logic.
      </p>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        <StyledLink href='https://github.com/codal-matthew-fung/python-fastapi-training'>Source Code</StyledLink>:
        Explore the Repository
      </p>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        <StyledLink href={`${process.env.NEXT_PUBLIC_API_HOST}/docs`}>Interactive Documentation</StyledLink>: View the
        Swagger/OpenAPI docs.
      </p>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        <StyledLink href='https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks'>Data Source</StyledLink>: This
        project utilizes a cleaned Goodreads dataset from Kaggle, chosen for its rich metadata, including ratings and
        review counts.
      </p>
      <h2 className='text-xl lg:text-2xl font-semibold mb-2 mt-10'>Architecture & Tech Stack</h2>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        The API is built with FastAPI and deployed via Vercel. I architected the system to be modular, ensuring that new
        endpoints can be added with minimal friction while maintaining strict validation and error handling.
      </p>
      <h3 className='text-xl font-semibold mb-2 mt-10'>Core Technologies</h3>
      <ul className='list-disc list-inside mb-4 text-md text-zinc-500 lg:text-xl'>
        <li className='mb-1'>
          FastAPI & Uvicorn: For high-performance asynchronous request handling and local development.
        </li>
        <li className='mb-1'>
          Pydantic: Used extensively for schema enforcement, data serialization, and automated validation.
        </li>
        <li className='mb-1'>
          Pandas: Leveraged for specific analytical tasks and data shaping, complementing the primary SQL logic.
        </li>
        <li className='mb-1'>SQLite: Chosen as the relational engine for structured book data.</li>
      </ul>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        The current implementation includes endpoints for collection listing, multi-criteria searching, and aggregate
        statistics for the dataset.
      </p>
      <h2 className='text-xl lg:text-2xl font-semibold mb-2 mt-10'>Key Learnings & Reflection</h2>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        This project was a deep dive into the Python ecosystem. Beyond basic CRUD operations, I gained significant
        experience in:
      </p>
      <ul className='list-disc list-inside mb-4 text-md text-zinc-500 lg:text-xl'>
        <li className='mb-1'>Structured API Design: Organizing routers and dependencies for scalability.</li>
        <li className='mb-1'>Database Interoperability: Managing state and queries between Python and SQLite.</li>
        <li className='mb-1'>
          Robust Error Handling: Implementing meaningful HTTP status codes and user-friendly validation errors.
        </li>
      </ul>
      <h2 className='text-xl lg:text-2xl font-semibold mb-2 mt-10'>Moving Forward</h2>
      <p className='text-md text-zinc-500 lg:text-xl mb-4'>
        While I am pleased with the technical foundation established, given more time, I would expand the endpoint
        variety (e.g., user reviews or authentication) and refine the frontend to match the quality of the underlying
        API.
      </p>
    </article>
  )
}
