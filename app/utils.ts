import type { Book, Data } from "@/app/types/data";
import { Endpoints } from "./globals";

export const getData = async ({params, endpoint}: {params: Record<string, string | undefined>, endpoint: Endpoints}) => {
    const fetchURL = new URL(endpoint);
    console.log({params, endpoint})
    if (endpoint == Endpoints.book && Object.hasOwn(params, 'isbn')) {
      fetchURL.href = `${endpoint}/${params?.isbn}`
      console.log(fetchURL.href)
    } else {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          fetchURL.searchParams.set(key, value)
        }
      });
    }
    
    const data = await fetch(`${fetchURL?.toString()}`, {
      'method': 'GET',
    }).then((res) => res.json()).catch(err => {
      console.error(err)
    });
    if (endpoint !== Endpoints.book) {
      return data as Data;
    } else {
      return data as Book
    }
  }