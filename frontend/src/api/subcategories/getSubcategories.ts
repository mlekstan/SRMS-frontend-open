import { appApiClient } from "@/api/ApiClient";

export async function getSubcategories() {

  try {
    const response = await appApiClient.makeRequest("/subcategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = response.json();
    return result;

  } catch (error) {
    throw error;
  }
}