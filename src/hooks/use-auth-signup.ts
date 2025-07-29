// src/hooks/use-auth-signup.ts
"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { type SignUpFormValues } from "@/lib/validations/auth-validators";

export function useAuthSignUp() {
  const { isLoaded, signUp: clerkSignUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (data: SignUpFormValues): Promise<boolean> => {
    if (!isLoaded) {
      toast.error("Clerk not loaded. Please try again.");
      return false;
    }

    setIsLoading(true);
    try {
      // IMPORTANT: Ensure firstName and lastName are camelCase for Clerk's API
      const clerkSignUpAttempt = await clerkSignUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName, // This must be camelCase
        lastName: data.lastName,   // This must be camelCase
      });

      if (clerkSignUpAttempt.status === "complete") {
        await setActive({ session: clerkSignUpAttempt.createdSessionId });

        // Call your custom backend API to save user profile and assign role
        const response = await fetch("/api/register-user-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: clerkSignUpAttempt.createdSession?.userId,
            email: data.email,
            firstName: data.firstName, // Also camelCase for your backend API
            lastName: data.lastName,   // Also camelCase for your backend API
            schoolId: data.schoolId || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to register user profile in database.");
        }

        toast.success("Account created successfully!");
        return true;
      } else {
        console.log("Clerk signup status:", clerkSignUpAttempt.status);
        if (clerkSignUpAttempt.status === "needs_email_verification") {
          toast.info("Please check your email to verify your account.", {
            description: "A verification email has been sent to " + data.email,
          });
        } else {
          // This will display the specific Clerk error, including "Password has been found in an online data breach."
          toast.error("Signup Failed", {
            description: clerkSignUpAttempt.firstError?.longMessage || "An unexpected error occurred during Clerk signup.",
          });
        }
        return false;
      }
    } catch (err: any) {
      console.error("Signup process error:", JSON.stringify(err, null, 2));
      toast.error("Signup Failed", {
        description: err.errors?.[0]?.longMessage || err.message || "An unknown error occurred during signup.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
}
