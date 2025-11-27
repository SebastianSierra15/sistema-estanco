'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '../api';
import toast from 'react-hot-toast';

interface LoginCredentials {
  usuario: string;
  contrasena: string;
}

interface AuthResponse {
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
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
      }
      queryClient.setQueryData(['auth', 'me'], data.usuario);
      toast.success('Inicio de sesión exitoso');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al iniciar sesión';
      toast.error(message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          // Continuar con el logout incluso si hay error
        }
      }
    },
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      queryClient.clear();
      toast.success('Sesión cerrada');
      router.push('/login');
    },
    onError: () => {
      // Limpiar local storage incluso si hay error
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      queryClient.clear();
      router.push('/login');
    },
  });

  // Get current user
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      if (typeof window === 'undefined') return null;
      const token = localStorage.getItem('token');
      if (!token) return null;

      const { data } = await api.get('/auth/me');
      return data;
    },
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    retry: false,
    initialData: () => {
      if (typeof window === 'undefined') return null;
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
  });

  const isAuthenticated = !!user && (typeof window !== 'undefined' ? !!localStorage.getItem('token') : false);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

