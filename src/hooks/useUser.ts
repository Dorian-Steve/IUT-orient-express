// hooks/useUser.ts
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useSignIn, useSignUp, useAuth, useClerk } from "@clerk/nextjs"; // Import Clerk's hooks

import { toast } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth/auth.store";
import { api } from "@/trpc/react";
import type { SignInFormValues, SignUpFormValues } from "@/types/user.types";

export const useUser = () => {
  const router = useRouter();
  const utils = api.useUtils();
  const { isLoaded: clerkAuthLoaded, signOut: clerkSignOut } = useAuth(); // Clerk's signOut function
  const { user: clerkUser } = useClerk(); // Get Clerk user for direct sign out

  const {
    profile,
    isLoading: storeLoading, // Rename to avoid conflict with Clerk's loading states
    error,
    setLoading,
    setError,
    reset,
  } = useAuthStore();

  const { isLoaded: signUpLoaded, signUp: clerkSignUp, setActive } = useSignUp();
  const { isLoaded: signInLoaded, signIn: clerkSignIn } = useSignIn();

  // Combined loading state
  const isLoading = storeLoading || !signUpLoaded || !signInLoaded || !clerkAuthLoaded;

  // Sign up mutation (still uses tRPC for initial user creation in your DB)
  // This mutation will be called AFTER Clerk's signUp, to sync data to your Prisma DB.
  const trpcSignUpMutation = api.auth.student.signup.useMutation({
    onSuccess: async ({ data }) => {
      // Invalidate tRPC cache for auth data
      await utils.auth.student.invalidate();
      toast.success(data.message || "Account created successfully!");
      // No redirect here, handled by Clerk's setActive or the form directly
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to sync user data to backend.";
      toast.error(errorMessage);
    },
  });

  // Main signup function using Clerk
  const signUp = async (values: SignUpFormValues) => {
    if (!signUpLoaded) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Create user in Clerk
      const clerkSignUpResult = await clerkSignUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        // Store schoolId and role in publicMetadata for Clerk
        publicMetadata: {
          schoolId: values.studentId, // Map studentId from form to schoolId in Clerk metadata
          role: values.studentId.startsWith("AM") ? "ADMIN" : values.studentId.startsWith("AV") ? "ADVISOR" : "STUDENT",
        },
      });

      // 2. If successful, attempt to activate the session (sign in the user)
      if (clerkSignUpResult.status === "complete") {
        await setActive({ session: clerkSignUpResult.createdSessionId });

        // 3. Sync user data to your Prisma database via tRPC
        await trpcSignUpMutation.mutateAsync({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          schoolId: values.studentId, // Pass schoolId to tRPC mutation
          password: values.password, // This password will be hashed and stored in your DB
          confirmPassword: values.confirmPassword,
          // Pass other academic/contact/social details to your tRPC mutation
          department: values.department,
          program: values.program,
          level: values.level,
          yearOfAdmission: values.yearOfAdmission,
          expectedGraduationYear: values.expectedGraduationYear,
          speciality: values.speciality,
          academicBackground: values.academicBackground,
          phoneNumber: values.phoneNumber,
          website: values.website,
          skills: values.skills,
          interests: values.interests,
          x: values.x,
          linkedIn: values.linkedIn,
        });

        toast.success("Account created and signed in!");
        router.push("/"); // Redirect to home after successful signup and sync
      } else if (clerkSignUpResult.status === "needs_email_verification") {
        // Handle email verification flow if Clerk requires it
        toast.info("Please verify your email address. A verification code has been sent.");
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`); // Redirect to a verification page
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Clerk Signup Error:", JSON.stringify(err, null, 2));
      const clerkError = err?.errors?.[0]?.longMessage || err?.message || "An unexpected error occurred.";
      toast.error(clerkError);
      setError(new Error(clerkError));
    } finally {
      setLoading(false);
    }
  };


  // Main sign-in function using Clerk
  const signIn = async (values: SignInFormValues) => {
    if (!signInLoaded) return;
    setLoading(true);
    setError(null);

    try {
      const clerkSignInResult = await clerkSignIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (clerkSignInResult.status === "complete") {
        await setActive({ session: clerkSignInResult.createdSessionId });
        toast.success("Signed in successfully!");
        router.push("/"); // Redirect to home or dashboard
      } else {
        // Handle other sign-in statuses like 'needs_factor_one', 'needs_factor_two', etc.
        console.warn("Clerk Sign-in Status:", clerkSignInResult.status);
        toast.error("Sign in failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Clerk Sign-in Error:", JSON.stringify(err, null, 2));
      const clerkError = err?.errors?.[0]?.longMessage || err?.message || "An unexpected error occurred.";
      toast.error(clerkError);
      setError(new Error(clerkError));
    } finally {
      setLoading(false);
    }
  };

  // Sign out function using Clerk
  const signOut = async () => {
    if (!clerkAuthLoaded) return;
    setLoading(true);
    setError(null);
    try {
      await clerkSignOut({ redirectUrl: "/sign-in" }); // Redirect to sign-in page after logout
      reset(); // Reset auth store state
      toast.success("Successfully logged out.");
    } catch (err: any) {
      console.error("Clerk Sign out Error:", JSON.stringify(err, null, 2));
      const clerkError = err?.errors?.[0]?.longMessage || err?.message || "An unexpected error occurred.";
      toast.error(clerkError);
      setError(new Error(clerkError));
    } finally {
      setLoading(false);
    }
  };

  // Email verification (if you have a separate page for this)
  const verifyEmail = api.auth.verifyEmail.useMutation({
    onSuccess: async (result) => {
      if (result.success) {
        if (result.data?.emailVerified) {
          toast.success("Email successfully verified!");
          router.push("/sign-in");
        } else if (result.data?.emailSent) {
          toast.success("Verification email sent! Please check your inbox.");
        }
      } else {
        toast.error("Email verification failed.");
      }
    },
    onError: (error) => {
      console.error("Email verification error:", error);
      toast.error(error.message || "Email verification failed. Please try again.");
    },
  });


  return {
    profile,
    isLoading,
    error,
    isAuthenticated: !!profile, // Derived from local store profile
    signUp, // Clerk-based signup
    signIn, // Clerk-based signin
    signOut, // Clerk-based signOut
    verifyEmail: verifyEmail.mutateAsync, // Keep if you have a custom verification flow
  };
};
