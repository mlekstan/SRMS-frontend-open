import { appApiClient } from "../ApiClient";


export async function putUsers(id: string, value: Record<string, unknown>) {
  const path = `/users/${id}`;

  try {
    const response = await appApiClient.makeRequest(path, {
      method: "PUT",
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