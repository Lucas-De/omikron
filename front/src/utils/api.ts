import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthenticationStore } from "../modules/authentication/authentication.store";

interface ApiOptions {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  body?: object;
  query?: { [key: string]: string | number };
}

export async function httpRequest({ method, body, query, path }: ApiOptions) {
  const userToken = useAuthenticationStore.getState().user?.token;
  const logout = useAuthenticationStore.getState().logout;

  const config: AxiosRequestConfig = {
    method,
    url: path,
    baseURL: "http://localhost:3000",
    data: body,
    params: query,
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken ? `Bearer ${userToken}` : undefined,
    },
  };

  try {
    const request = await axios.request(config);
    return request.data;
  } catch (e) {
    if (e instanceof AxiosError && e?.response?.status === 401) logout();
    else throw e;
  }
}
