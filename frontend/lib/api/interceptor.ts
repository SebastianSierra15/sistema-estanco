import type { AxiosInstance, AxiosError } from "axios";
import { toast } from "react-hot-toast";

/**
 * Tipado para errores personalizados del backend
 */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

/**
 * Registra interceptores de seguridad en Axios
 */
export function registerInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      const status = error.response?.status;
      const data = error.response?.data;

      // Si expira la sesión → redirigir al login
      if (status === 401) {
        toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
        window.location.href = "/login";
      }

      // Errores 400–500 del backend NestJS
      if (data?.message) {
        const msg = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;

        toast.error(msg);
      } else {
        toast.error("Ocurrió un error inesperado.");
      }

      return Promise.reject(error);
    }
  );
}
