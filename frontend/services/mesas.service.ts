import { apiClient } from "@/lib/api";

export interface Mesa {
  mesaId: number;
  nombre: string;
  estado: "libre" | "ocupada";
}

export async function obtenerMesas(): Promise<Mesa[]> {
  const api = await apiClient();
  const { data } = await api.get<Mesa[]>("/mesas-canchas");
  return data;
}

export async function actualizarEstadoMesa(id: number, estado: string) {
  const api = await apiClient();
  const { data } = await api.patch(`/mesas-canchas/${id}`, { estado });
  return data;
}
