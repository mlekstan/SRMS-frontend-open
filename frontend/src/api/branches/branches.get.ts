import { appApiClient } from "@/api/ApiClient";


export type Branch = {
  id: number;
  name: string;
  country: string;
  city: string;
  street: string;
  streetNumber: number;
  flatNumber: number;
  zipCode: string;
}

export async function getBranches(): Promise<Branch[]> {
  try {
    const response = await appApiClient.makeRequest("/branches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    const result = await response.json();
    return result;

  } catch(error) {
    throw error;
  }
}
