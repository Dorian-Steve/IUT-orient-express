// Removed the handleGoogleSignUp block to simplify the answer for now
// and focus on the main form issues, as useSignIn hook must be called at the top level
// or within another hook, not inside a handler.
// If you need Google Sign-Up, you'll need to refactor that part.
// For example, you might move `useSignIn()` directly into the component's top level.

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaGoogle as GoogleIcon } from "react-icons/fa";
import { User as UserIcon, Mail, Lock, School, Loader2 } from "lucide-react";
import { useSignIn } from "@clerk/nextjs"; // Import Clerk's useSignIn hook

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  studentSignUpFormSchema,
  type SignUpFormValues,
} from "@/lib/validations/auth-validators";
import { useAuthSignUp } from "@/hooks/use-auth-signup"; // Custom hook for Clerk signup & backend registration

export default function StudentSignUpForm() {
  const { signUp, isLoading: isAuthLoading } = useAuthSignUp();
  const router = useRouter();

  // Clerk's useSignIn must be called at the top level of your component
  // or inside a custom hook, not inside an event handler like handleGoogleSignUp.
  const {
    isLoaded: signInLoaded,
    signIn: clerkSignIn,
    setActive,
  } = useSignIn();

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(studentSignUpFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      schoolId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form submitted:", data);
    const success = await signUp(data); // Assuming useAuthSignUp handles Clerk's create and backend registration
    if (success) {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignUp = async () => {
    if (!signInLoaded) return;
    setIsGoogleLoading(true);
    try {
      await clerkSignIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error: any) {
      console.error("Google sign-up error:", JSON.stringify(error, null, 2));
      const clerkError =
        error?.errors?.[0]?.longMessage ||
        error?.message ||
        "An unexpected error occurred during Google sign-up.";
      toast.error("Google Sign Up Failed", {
        description: clerkError,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-sm overflow-hidden rounded-lg border-none shadow-lg">
        <CardHeader className="space-y-1 bg-gray-100 p-6 text-center dark:bg-gray-800">
          <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            Join Us
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        icon={<Mail className="h-4 w-4 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          icon={<UserIcon className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          icon={<UserIcon className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      School ID (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="School ID (Optional)"
                        {...field}
                        icon={<School className="h-4 w-4 text-gray-400" />}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          icon={<Lock className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          icon={<Lock className="h-4 w-4 text-gray-400" />}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Error display */}
              {form.formState.errors.root?.message && (
                <p className="text-center text-sm font-medium text-red-500">
                  {form.formState.errors.root.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
                disabled={
                  isAuthLoading ||
                  !form.formState.isValid ||
                  form.formState.isSubmitting
                }
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Social Login Section */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={handleGoogleSignUp}
            disabled={isAuthLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Sign up with Google
              </>
            )}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
