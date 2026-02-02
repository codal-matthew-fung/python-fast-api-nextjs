import { Suspense } from "react";
import {Data, Table} from "./components/table"


export const getData = async ({page}: {page: string}) => {
  const fetchURL = new URL(`http://127.0.0.1:8000/books`);
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page)
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
  query?: string,
  page?: string
}>}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || ''; 
  const page = searchParams?.page || '1';

  const data = await getData({'page': page})
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
