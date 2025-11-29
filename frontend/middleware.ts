import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

/**
 * MAPEO DE PERMISOS POR RUTA
 */
const permissionMap: Record<string, string[]> = {
  "/usuarios": ["ver_usuarios"],
  "/usuarios/crear": ["crear_usuarios"],
  "/usuarios/editar": ["editar_usuarios"],
  "/usuarios/eliminar": ["eliminar_usuarios"],

  "/mesas-canchas": ["ver_mesas"],
  "/mesas-canchas/gestionar": ["gestionar_mesas"],

  "/inventario": ["ver_inventario"],
  "/inventario/gestionar": ["gestionar_inventario"],

  "/ventas": ["ver_ventas"],
  "/ventas/crear": ["crear_ventas"],

  "/reportes": ["ver_reportes"],

  "/configuracion": ["gestionar_configuracion"],
};

/**
 * Verifica si el usuario tiene al menos UN permiso requerido
 */
function hasPermission(pathname: string, permisosUsuario: string[]): boolean {
  for (const route in permissionMap) {
    if (pathname.startsWith(route)) {
      const requiredPerms = permissionMap[route];
      return requiredPerms.some((perm) => permisosUsuario.includes(perm));
    }
  }
  return true; // rutas no mapeadas → acceso permitido
}

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token as any;
    const permisos = token?.permisos || [];
    const pathname = req.nextUrl.pathname;

    if (!hasPermission(pathname, permisos)) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/usuarios/:path*",
    "/mesas-canchas/:path*",
    "/inventario/:path*",
    "/ventas/:path*",
    "/reportes/:path*",
    "/configuracion/:path*",
  ],
};
