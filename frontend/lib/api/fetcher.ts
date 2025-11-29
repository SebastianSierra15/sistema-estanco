import { apiClient } from "./client";

/**
 * Fetcher tipado para React Query
 * ejemplo: useQuery(["/inventario/productos"], fetcher)
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const api = await apiClient();
  const { data } = await api.get<T>(url);
  return data;
};
