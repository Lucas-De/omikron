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
  const isLoggedIn = !!useAuthenticationStore.getState().user;

  const config: AxiosRequestConfig = {
    method,
    url: path,
    baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
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
    const unauthorized = e instanceof AxiosError && e?.response?.status === 401;
    if (isLoggedIn && unauthorized) logout();
    throw e;
  }
}
