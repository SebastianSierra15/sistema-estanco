import { apiClient } from "@/lib/api";

export interface Venta {
  ventaId: number;
  fecha: string;
  total: number;
  metodoPago: string;
  usuarioId: number;
}

export async function obtenerVentas(): Promise<Venta[]> {
  const api = await apiClient();
  const { data } = await api.get<Venta[]>("/ventas");
  return data;
}

export async function obtenerVenta(id: number): Promise<Venta> {
  const api = await apiClient();
  const { data } = await api.get(`/ventas/${id}`);
  return data;
}

export async function crearVenta(dto: any) {
  const api = await apiClient();
  const { data } = await api.post("/ventas", dto);
  return data;
}
