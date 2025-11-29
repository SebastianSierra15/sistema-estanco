import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import { registerInterceptors } from "./interceptor";

/**
 * Crea un cliente Axios autenticado automáticamente
 */
export async function apiClient(): Promise<AxiosInstance> {
  const session = await getSession();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
    },
  });

  registerInterceptors(instance);

  return instance;
}
