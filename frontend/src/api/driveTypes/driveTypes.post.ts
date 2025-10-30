import { appApiClient } from "../ApiClient";

export async function addDriveType(value: Record<string, unknown>) {
  try {
    const response = await appApiClient.makeRequest("/drive-types", {
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