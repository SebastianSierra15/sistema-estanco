// src/services/usuarios.service.ts
import { apiClient } from "@/lib/api";

export interface Usuario {
  usuarioId: number;
  usuarioNombre: string;
  usuarioUsuario: string;
  rol: {
    rolId: number;
    rolNombre: string;
  };
}

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const api = await apiClient();
  const { data } = await api.get<Usuario[]>("/usuarios");
  return data;
}

export async function obtenerUsuario(id: number): Promise<Usuario> {
  const api = await apiClient();
  const { data } = await api.get(`/usuarios/${id}`);
  return data;
}

export async function crearUsuario(dto: any) {
  const api = await apiClient();
  const { data } = await api.post("/usuarios", dto);
  return data;
}

export async function actualizarUsuario(id: number, dto: any) {
  const api = await apiClient();
  const { data } = await api.patch(`/usuarios/${id}`, dto);
  return data;
}

export async function eliminarUsuario(id: number) {
  const api = await apiClient();
  const { data } = await api.delete(`/usuarios/${id}`);
  return data;
}
