import { appApiClient } from "@/api/ApiClient";

export async function addUser(value: Record<string, unknown>) {

  try {
    const response = await appApiClient.makeRequest("/users", {
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