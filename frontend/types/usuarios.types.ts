export interface Rol {
  rolId: number;
  rolNombre: string;
}

export interface Usuario {
  usuarioId: number;
  usuarioNombre: string;
  usuarioUsuario: string;
  usuarioEstado?: "activo" | "inactivo";
  rol: Rol;
}

export interface CrearUsuarioDto {
  usuarioNombre: string;
  usuarioUsuario: string;
  usuarioContrasena: string;
  rolId: number;
  usuarioEstado?: "activo" | "inactivo";
}

export interface ActualizarUsuarioDto {
  usuarioNombre?: string;
  usuarioContrasena?: string;
  rolId?: number;
  usuarioEstado?: "activo" | "inactivo";
}
