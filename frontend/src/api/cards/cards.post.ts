import { appApiClient } from "../ApiClient";

export async function addCard(value: Record<string, unknown>) {
  try {
    const response = await appApiClient.makeRequest("/cards", {
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