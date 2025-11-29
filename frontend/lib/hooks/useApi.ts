"use client";

import { useMemo } from "react";
import { apiClient } from "../api/client";
import { useSessionData } from "./useSessionData";

/**
 * Hook que retorna un cliente Axios autenticado automáticamente
 */
export function useApi() {
  const { token } = useSessionData();

  const clientPromise = useMemo(() => apiClient(), [token]);

  return clientPromise;
}
