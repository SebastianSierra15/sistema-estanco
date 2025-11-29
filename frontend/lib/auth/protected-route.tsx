"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionData } from "./session";
import { userHasRole, UserRole } from "./roles";

/**
 * HOC para proteger páginas:
 *
 *  export default withAuth(Pagina, UserRole.ADMIN);
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  roleRequired?: UserRole
) {
  const ProtectedRoute: React.FC<P> = (props) => {
    const router = useRouter();
    const { loading, user } = useSessionData();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      } else if (!loading && user && roleRequired) {
        if (!userHasRole(user.rol, roleRequired)) {
          router.replace("/403");
        }
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando...</p>
        </div>
      );
    }

    return <Component {...(props as P)} />;
  };

  return ProtectedRoute;
}
