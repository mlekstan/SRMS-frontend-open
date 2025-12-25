import { appApiClient } from "@/api/ApiClient";

export async function apiPost<T>(url: string, value: Record<string, unknown>): Promise<T> {

  try {
    const response = await appApiClient.makeRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: value,
    });

    const result = await response.json();
    return result;

  } catch (error) {
    throw error;
  }
}