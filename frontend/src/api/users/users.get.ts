import { appApiClient } from "@/api/ApiClient";

type Branch = {
  id: number,
  name: string
}

export type User = {
  id: number,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  areaCode: string,
  phoneNumber: string,
  dateJoined: Date,
  branch: Branch,
}

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