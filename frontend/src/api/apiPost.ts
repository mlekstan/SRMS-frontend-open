import { appApiClient } from "@/api/ApiClient";

export async function apiPost(url: string, value: Record<string, unknown>) {

  try {
    const response = await appApiClient.makeRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: value,
    });

    const result = response.json();
    return result;

  } catch (error) {
    throw error;
  }
}