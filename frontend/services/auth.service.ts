import { apiClient } from "@/lib/api";

interface LoginResponse {
  access_token: string;
  usuario: {
    usuarioId: number;
    usuarioNombre: string;
    usuarioUsuario: string;
    rol: {
      rolId: number;
      rolNombre: string;
    };
  };
  permisos: string[];
}

export async function login(usuario: string, contrasena: string) {
  const api = await apiClient();
  const { data } = await api.post<LoginResponse>("/auth/login", {
    usuario,
    contrasena,
  });
  return data;
}

export async function getProfile() {
  const api = await apiClient();
  const { data } = await api.get("/auth/me");
  return data;
}

export async function logout() {
  const api = await apiClient();
  const { data } = await api.post("/auth/logout");
  return data;
}
