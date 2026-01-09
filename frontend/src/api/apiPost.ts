import { appApiClient } from "@/api/ApiClient";
import { authService } from "@/main";

export async function apiPost<T>(
  { url, value }: { url: string, value: any }
): Promise<T>;
export async function apiPost<T>(
  { url, id, value }: { url: string, id: string, value: any }
): Promise<T>;
export async function apiPost<T>(
  { url, searchParams, value }: { url: string, searchParams: string | string[][] | Record<string, string> | URLSearchParams, value: any }
): Promise<T>;
export async function apiPost(
  { url, id, searchParams, value }: { url: string, id?: string, searchParams?: string | string[][] | Record<string, string> | URLSearchParams , value: any }
) {
  const path = id ? `${url}/${id}` : url;

  try {
    const response = await appApiClient.makeRequest(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authService.getState().accessToken}`
      },
      searchParams,
      body: value,
    });

    const result = await response.json();
    return result;

  } catch (error) {
    throw error;
  }
}