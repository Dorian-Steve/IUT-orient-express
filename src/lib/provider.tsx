"use client";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
