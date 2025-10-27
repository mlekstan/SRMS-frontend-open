import { appApiClient } from "@/api/ApiClient";

export async function getBranches() {
  try {
    const response = await appApiClient.makeRequest("/branches", {
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
