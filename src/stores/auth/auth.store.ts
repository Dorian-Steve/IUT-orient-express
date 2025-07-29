// src/stores/auth/auth.store.ts
"use client";

import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { TRPCError } from "@trpc/server";
import { AuthError } from "@auth/core/errors"; // CRITICAL FIX: Corrected import path for AuthError

import { AuthStore, UserProfile, AuthState, AuthActions } from "@/types/user.types";

const initialAuthState: AuthState = {
  profile: null,
  isLoading: false,
  isInitialized: false,
  error: null,
  lastActivity: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        ...initialAuthState,

        setProfile: (profile: UserProfile | null) => {
          set((state) => {
            state.profile = profile;
            state.error = null;
            state.isAuthenticated = !!profile;
            state.isLoading = false;
          });
        },

        setLoading: (isLoading: boolean) => {
          set((state) => {
            state.isLoading = isLoading;
          });
        },

        setInitialized: (isInitialized: boolean) => {
          set((state) => {
            state.isInitialized = isInitialized;
          });
        },

        setError: (error: TRPCError | AuthError | null) => { // Type is now AuthError
          set((state) => {
            state.error = error;
            state.isLoading = false;
          });
        },

        updateLastActivity: () => {
          set((state) => {
            state.lastActivity = Date.now();
          });
        },

        reset: () => {
          set((state) => {
            state.profile = null;
            state.isLoading = false;
            state.isInitialized = true;
            state.error = null;
            state.lastActivity = null;
            state.isAuthenticated = false;
          });
        },
      })),
      {
        name: "auth-storage",
        partialize: (state) => ({
          profile: state.profile,
          lastActivity: state.lastActivity,
        }),
      },
    ),
  ),
);
