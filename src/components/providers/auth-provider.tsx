// src/components/providers/auth-provider.tsx
"use client";

import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs"; // Import Clerk's hooks
import { useAuthStore } from "@/stores/auth/auth.store";
import { Loader } from "@/components/shared/loader"; // Assuming you have a Loader component

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoaded: clerkLoaded, isSignedIn, userId, sessionId } = useAuth(); // Clerk's auth state
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useUser(); // Clerk's user object

  const {
    setProfile,
    setLoading,
    setInitialized,
    isAuthenticated,
    profile, // Keep profile from store to avoid re-rendering if it's the same
  } = useAuthStore();

  useEffect(() => {
    // Set loading state based on Clerk's loading status
    setLoading(!clerkLoaded || !clerkUserLoaded);

    if (clerkLoaded && clerkUserLoaded) {
      if (isSignedIn && clerkUser) {
        // Map Clerk user data to your UserProfile type
        const userProfile = {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || null,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          imageUrl: clerkUser.imageUrl,
          schoolId: (clerkUser.publicMetadata?.schoolId as string) || null, // Assuming schoolId is in publicMetadata
          role:
            (clerkUser.publicMetadata?.role as
              | "ADMIN"
              | "ADVISOR"
              | "STUDENT"
              | "GUEST") || "GUEST", // Assuming role is in publicMetadata
          profileCompleted:
            (clerkUser.publicMetadata?.profileCompleted as boolean) || false, // Assuming profileCompleted is in publicMetadata
        };
        setProfile(userProfile);
      } else {
        setProfile(null); // User is not signed in
      }
      setInitialized(true); // Mark store as initialized after Clerk has loaded
    }
  }, [
    clerkLoaded,
    clerkUserLoaded,
    isSignedIn,
    clerkUser,
    setProfile,
    setLoading,
    setInitialized,
  ]);

  // If the auth store is not yet initialized, show a loader or null
  if (!clerkLoaded || !clerkUserLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
