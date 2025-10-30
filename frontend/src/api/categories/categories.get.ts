import { appApiClient } from "@/api/ApiClient";

export async function getCategories() {
  console.log("I'm in getCategories")
  try {
    const response = await appApiClient.makeRequest("/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    console.log("result", result)
    return result;

  } catch (error) {
    throw error;
  }
}