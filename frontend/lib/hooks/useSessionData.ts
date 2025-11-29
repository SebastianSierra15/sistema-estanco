"use client";

import { useSession } from "next-auth/react";
import { SessionData, SessionUser } from "../auth/session";

/**
 * Hook para obtener la sesión tipada desde React
 */
export function useSessionData(): {
  session: SessionData | null;
  loading: boolean;
  user: SessionUser | null;
  token: string | null;
} {
  const { data, status } = useSession();

  const session = data as SessionData | null;

  return {
    session,
    loading: status === "loading",
    user: session?.user ?? null,
    token: session?.accessToken ?? null,
  };
}
