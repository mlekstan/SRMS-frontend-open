import { appApiClient } from "@/api/ApiClient";

export async function addSubcategory(value: Record<string, unknown>) {
  console.log("Subact form val", value)

  try {
    const response = await appApiClient.makeRequest("/subcategories", {
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