import { appApiClient } from "@/api/ApiClient";

export async function getDriveTypes() {
  try {
    const response = await appApiClient.makeRequest("/drive-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = await response.json();
    return result;

  } catch (error) {
    throw error;
  }
}