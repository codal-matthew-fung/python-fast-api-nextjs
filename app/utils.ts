import { Data } from "./components/table";
import { Endpoints } from "./globals";

export const getData = async ({params, endpoint}: {params: Record<string, string | undefined>, endpoint: Endpoints}) => {
    const fetchURL = new URL(endpoint);
  
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        fetchURL.searchParams.set(key, value)
      }
    });
  
    const data: Data = await fetch(`${fetchURL?.toString()}`, {
      'method': 'GET',
    }).then((res) => res.json()).catch(err => {
      console.error(err)
    });
  
    return data;
  }