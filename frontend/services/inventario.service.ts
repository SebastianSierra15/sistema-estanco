import { apiClient } from "@/lib/api";

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stockMinimo: number;
}

export async function obtenerProductos(): Promise<Producto[]> {
  const api = await apiClient();
  const { data } = await api.get<Producto[]>("/inventario/productos");
  return data;
}

export async function obtenerProducto(id: number): Promise<Producto> {
  const api = await apiClient();
  const { data } = await api.get(`/inventario/productos/${id}`);
  return data;
}

export async function crearProducto(dto: Partial<Producto>) {
  const api = await apiClient();
  const { data } = await api.post("/inventario/productos", dto);
  return data;
}

export async function actualizarProducto(id: number, dto: Partial<Producto>) {
  const api = await apiClient();
  const { data } = await api.patch(`/inventario/productos/${id}`, dto);
  return data;
}

export async function eliminarProducto(id: number) {
  const api = await apiClient();
  const { data } = await api.delete(`/inventario/productos/${id}`);
  return data;
}
