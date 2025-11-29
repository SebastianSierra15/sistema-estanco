import { apiClient } from "@/lib/api";

export interface CajaEstado {
  abierta: boolean;
  montoInicial: number;
  montoActual: number;
}

export async function estadoCaja(): Promise<CajaEstado> {
  const api = await apiClient();
  const { data } = await api.get("/caja/estado");
  return data;
}

export async function aperturaCaja(montoInicial: number) {
  const api = await apiClient();
  const { data } = await api.post("/caja/apertura", { montoInicial });
  return data;
}

export async function cierreCaja(montoFinal: number) {
  const api = await apiClient();
  const { data } = await api.post("/caja/cierre", { montoFinal });
  return data;
}
