import { appApiClient } from "@/api/ApiClient";

export async function addClient(value: Record<string, unknown>) {
  
  try {
    const response = await appApiClient.makeRequest("/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: value,
    });

    const result = await response.json();
    return result;
  
  } catch (error) {
    throw error;
  }
}