"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionData } from "./useSessionData";
import { UserRole, userHasRole } from "../auth/roles";

/**
 * Hook para proteger páginas o componentes según sesión o rol
 */
export function useAuthGuard(requiredRole?: UserRole) {
  const router = useRouter();
  const { user, loading } = useSessionData();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    if (
      !loading &&
      user &&
      requiredRole &&
      !userHasRole(user.rol, requiredRole)
    ) {
      router.replace("/403");
    }
  }, [loading, user, requiredRole, router]);
}
