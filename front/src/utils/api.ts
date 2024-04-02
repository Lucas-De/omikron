import axios from "axios";

interface ApiOptions {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  body?: object;
  query?: URLSearchParams;
}

export async function httpRequest({ method, body, query, path }: ApiOptions) {
  const request = await axios.request({
    method,
    url: path,
    baseURL: "http://localhost:3000",
    data: body,
    params: query,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return request.data;
}
