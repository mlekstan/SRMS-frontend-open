import { appApiClient } from "./ApiClient";


export async function apiPut(url: string, id: string, value: Record<string, unknown>) {
  const path = `${url}/${id}`;

  try {
    const response = await appApiClient.makeRequest(path, {
      method: "PUT",
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