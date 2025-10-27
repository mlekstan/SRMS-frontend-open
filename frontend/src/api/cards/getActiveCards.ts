import { appApiClient } from "@/api/ApiClient";

export async function getActiveCards() {
  try {
    const response = await appApiClient.makeRequest("/cards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      searchParams: {
        active: "true"    
      },
    });

    const result = await response.json();
    return result;

  } catch(error) {
    throw error;
  }
}
