import { appApiClient } from "@/api/ApiClient";

export async function getUsers(): Promise<User[]>; 
export async function getUsers(id: string): Promise<User>;
export async function getUsers(id?: string) {
  const path = id ? `/users/${id}` : "/users";

  try {
    const response = await appApiClient.makeRequest(path, {
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