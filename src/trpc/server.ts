// src/trpc/server.ts
import "server-only"; // Ensures this file is only used on the server

import { headers } from "next/headers";
import { cache } from "react";

// CRITICAL FIX: Import createCaller from "@/server/api/trpc"
import { createCaller, type AppRouter } from "@/server/api/trpc";
import { createTRPCContext } from "@/server/api/trpc"; // Still need createTRPCContext for the caller factory
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createCaller` helper in a `cache` to ensure the same caller instance is used across
 * requests and to avoid re-creating it on every call.
 *
 * The headers are used to pass down the `x-trpc-source` header to the tRPC context.
 */
export const api = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createCaller(() => createTRPCContext({ headers: heads }));
});

export const getQueryClient = cache(createQueryClient);
