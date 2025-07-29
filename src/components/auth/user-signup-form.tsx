"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UserPlus, Mail, Lock, School } from "lucide-react"; // Icons for fields
import { cn } from "@/lib/utils"; // Assuming this utility exists

// Define the Zod schema for the signup form
const signUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  schoolId: z
    .string()
    .min(1, "School ID is required")
    .regex(
      /^(2[0-9]I\d{5}|AV\d{6}|AM\d{6})$/,
      "Invalid School ID format. Must be like 24I00001 (Student), AV200302 (Advisor), or AM405002 (Admin).",
    ),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export function UserSignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      schoolId: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create user in Clerk
      const clerkSignUpAttempt = await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        // You can optionally pass publicMetadata here if you configure Clerk to accept it
        // publicMetadata: {
        //   schoolId: values.schoolId,
        // },
      });

      if (clerkSignUpAttempt.status === "complete") {
        // Step 2: Set the active session in Clerk
        await setActive({ session: clerkSignUpAttempt.createdSessionId });

        // Step 3: Call your custom backend API to save user profile and assign role
        // Pass the Clerk user ID along with other profile data
        const response = await fetch("/api/register-user-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: clerkSignUpAttempt.createdSession?.userId, // Get Clerk's user ID
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            schoolId: values.schoolId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to register user profile.",
          );
        }

        // Redirect to a dashboard or profile completion page
        router.push("/dashboard"); // Or "/profile-setup"
      } else {
        // Handle other Clerk signup statuses (e.g., email verification needed)
        console.log(clerkSignUpAttempt.status);
        if (clerkSignUpAttempt.status === "needs_email_verification") {
          // You might redirect to an email verification page
          router.push("/verify-email");
        } else {
          setError(
            clerkSignUpAttempt.firstError?.message ||
              "An unexpected error occurred during signup.",
          );
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
          err.message ||
          "An unknown error occurred.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <p className="text-muted-foreground mt-2">
            Create your account to get started
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          icon={<UserPlus className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          icon={<UserPlus className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                        icon={<Mail className="h-4 w-4 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        icon={<Lock className="h-4 w-4 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 24I00001, AV200302, AM405002"
                        {...field}
                        icon={<School className="h-4 w-4 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-center text-sm font-medium text-red-500">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={() => router.push("/sign-in")}
              className="h-auto p-0"
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// NOTE: This Input component is a placeholder. You need to adapt it
// to accept an 'icon' prop if your actual Input component doesn't.
// If your Input component doesn't support an 'icon' prop, you'll need
// to wrap it in a div with relative positioning and style the icon
// absolutely, or remove the icon prop from the Input usage.
// Example simple Input with icon support:
// const Input = ({ icon, ...props }) => (
//   <div className="relative flex items-center">
//     {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
//     <input className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", icon && "pl-10")} {...props} />
//   </div>
// );
