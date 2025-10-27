type MakeRequestOptions = {
  method: "GET" | "HEAD" | "PUT" | "POST" | "DELETE" | "OPTIONS" | "TRACE" | "CONNECT" | "PATCH",
  headers: HeadersInit,
  body?: any,
  searchParams?: string[][] | Record<string, string> | string | URLSearchParams,
}


class ApiClient {
  private scheme
  private hostName
  private port
  
  constructor(
    scheme: "http" | "https",
    hostName: string,
    port: number
  ) {
    this.scheme = scheme;
    this.hostName = hostName;
    this.port = port
  }


  async makeRequest(path: string, options: MakeRequestOptions) {
    
    const { method, headers, body, searchParams } = options;
    let searchParamsStr;
    
    if (searchParams) {
      searchParamsStr = `?${(new URLSearchParams(searchParams)).toString()}`;
    } else {
      searchParamsStr = "";
    }
    
    const baseURL = `${this.scheme}://${this.hostName}:${this.port}`;
    const fullURL = new URL(`${path}${searchParamsStr}`, baseURL);

    try {
      const response = await fetch(fullURL, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const { message = "" } = (await response.json()) ?? {};
        throw new Error(`${response.status}. ${response.statusText}. ${message}.`)
      }

      return response;

    } catch(error) {
      throw error;
    }
  }

}



export const appApiClient = new ApiClient("https", "localhost", 3000);