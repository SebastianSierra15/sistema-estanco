import { getSession, useSession } from "next-auth/react";
import { UserRole } from "./roles";

export interface SessionUser {
  usuario: string;
  rol: UserRole | string;
  permisos: string[];
}

export interface SessionData {
  accessToken: string;
  user: SessionUser;
}

export function useSessionData() {
  const { data, status } = useSession();

  return {
    session: (data as any) ?? null,
    loading: status === "loading",
    user: (data as any)?.user ?? null,
    token: (data as any)?.accessToken ?? null,
  };
}

export async function getServerSessionData(): Promise<SessionData | null> {
  const session = await getSession();
  return session as any;
}
