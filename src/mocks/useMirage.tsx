"use client";

import { ReactNode } from "react";
import { makeServer } from '@/mocks/handlers'

interface ClientWrapperProps {
  children: ReactNode;
}

if (process.env.NODE_ENV === "development") {
  console.log("🚀 MirageJS iniciado!");
  makeServer({ environment: "development" });
}

export default function UseMirage({ children }: ClientWrapperProps) {
  return <>{children}</>;
}