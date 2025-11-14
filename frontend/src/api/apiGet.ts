
import { appApiClient } from "@/api/ApiClient";


export async function apiGet<T>(url: string): Promise<T[]>;
export async function apiGet<T>(url: string, id: string): Promise<T>;
export async function apiGet(url: string, id?: string) {
  const path = id ? `${url}/${id}` : url;

  try {
    const response = await appApiClient.makeRequest(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = await response.json();
    return result;

  } catch(error) {
    throw error;
  }
}