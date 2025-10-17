"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type AuthContextValue = {
  status: "authenticated" | "anonymous" | "loading";
  displayName?: string;
};

const AuthContext = createContext<AuthContextValue>({ status: "anonymous" });

export function AuthProvider({ value, children }: { value: AuthContextValue; children: ReactNode }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
