'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !contrasena) {
      return;
    }
    login({ usuario, contrasena });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sistema de Gestión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                name="usuario"
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu usuario"
                autoComplete="username"
              />
            </div>
            <div>
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                name="contrasena"
                type="password"
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="mt-1"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
