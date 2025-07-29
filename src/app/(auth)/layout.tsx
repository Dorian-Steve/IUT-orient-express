// src/app/(auth)/layout.tsx
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This div provides the overall styling for auth pages.
    // It does NOT contain <html> or <body> tags.
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      {children}
    </div>
  );
}
