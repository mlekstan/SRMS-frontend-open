import { appApiClient } from "../ApiClient";

export async function addCategory(value: Record<string, unknown>) {
  try {
    const response = await appApiClient.makeRequest("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: value
    });

    const result = await response.json();
    return result;

  } catch (error) {
    throw error;
  }
}