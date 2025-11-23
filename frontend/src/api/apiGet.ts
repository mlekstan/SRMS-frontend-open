import { appApiClient } from "@/api/ApiClient";


export async function apiGet<T>(
  { url, id }: { url: string, id: string }
): Promise<T>;
export async function apiGet<T>(
  { url, searchParams }: { url: string, searchParams?: string | string[][] | Record<string, string> | URLSearchParams }
): Promise<T[]>;
export async function apiGet(
  { url, id, searchParams }: { url: string, id?: string, searchParams?: string | string[][] | Record<string, string> | URLSearchParams }
) {
  const path = id ? `${url}/${id}` : url;

  try {
    const response = await appApiClient.makeRequest(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      searchParams: searchParams
    });

    const result = await response.json();
    return result;

  } catch(error) {
    throw error;
  }
}