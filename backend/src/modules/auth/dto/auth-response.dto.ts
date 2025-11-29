export class AuthResponseDto {
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
