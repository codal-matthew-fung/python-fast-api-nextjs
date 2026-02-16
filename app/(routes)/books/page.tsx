import { Suspense } from "react";
import { getData } from "@/app/utils";
import { Endpoints } from "@/app/globals";
import { Grid } from "@/app/components/grid";
import {Data} from "@/app/types/data";


export default async function Book(props: {searchParams?: Promise<{
  sort_by_field?: string,
  sort_by?: string
  page?: string
}>}) {
  const searchParams = await props.searchParams;
  const sort_by_field = searchParams?.sort_by_field || ''; 
  const sort_by = searchParams?.sort_by || ''; 
  const page = searchParams?.page || '1';

  const data = await getData({params: {page, sort_by, sort_by_field}, endpoint: Endpoints.list_books}) as Data
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <main className="">
        <Suspense fallback={<>Loading Data</>}>
          <Grid books={data.books} metadata={data.metadata} />
        </Suspense>
      </main>
    </div>
  );
}
