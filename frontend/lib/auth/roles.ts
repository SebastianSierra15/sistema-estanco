export enum UserRole {
  ADMIN = "Administrador",
  VENDEDOR = "Vendedor",
  INVITADO = "Invitado",
}

/**
 * Verifica si el usuario tiene el rol requerido
 */
export function userHasRole(
  userRole?: string,
  requiredRole?: UserRole
): boolean {
  if (!requiredRole) return true;
  return userRole === requiredRole;
}
