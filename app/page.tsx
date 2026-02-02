import { Suspense } from "react";
import {Data, Table} from "./components/table"


export const getData = async ({page, sort_by, sort_by_field}: {page: string, sort_by?: string, sort_by_field?: string}) => {
  const fetchURL = new URL(`http://127.0.0.1:8000/books`);
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page)
  }

  if (sort_by) {
    searchParams.set('sort_by', sort_by)
  }

  if (sort_by_field) {
    searchParams.set('sort_by_field', sort_by_field)
  }

  console.log(`${fetchURL}?${searchParams.toString()}`)
  
  const data: Data = await fetch(`${fetchURL}?${searchParams.toString()}`, {
    'method': 'GET',
  }).then((res) => res.json()).catch(err => {
    console.error(err)
  });

  return data;
}

export default async function Home(props: {searchParams?: Promise<{
  sort_by_field?: string,
  sort_by?: string
  page?: string
}>}) {
  const searchParams = await props.searchParams;
  const sort_by_field = searchParams?.sort_by_field || ''; 
  const sort_by = searchParams?.sort_by || ''; 
  const page = searchParams?.page || '1';

  const data = await getData({page, sort_by, sort_by_field})
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <main className="">
        <Suspense fallback={<>Loading Data</>}>
          <Table data={data} />
        </Suspense>
      </main>
    </div>
  );
}
