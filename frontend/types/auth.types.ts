export interface AuthRole {
  rolId: number;
  rolNombre: string;
}

export interface AuthUsuario {
  usuarioId: number;
  usuarioNombre: string;
  usuarioUsuario: string;
  rol: AuthRole;
}

export interface AuthResponse {
  access_token: string;
  usuario: AuthUsuario;
}

// Payload del JWT generado por NestJS
export interface JwtPayload {
  sub: number;
  usuario: string;
  rol: string;
}
