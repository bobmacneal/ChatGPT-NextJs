"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface SessionProviderProps {
  children?: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}