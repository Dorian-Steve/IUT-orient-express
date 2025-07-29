"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from sign up data
    const signUpData = sessionStorage.getItem("signUpData");
    if (signUpData) {
      const data = JSON.parse(signUpData);
      setEmail(data.email);
    }
  }, []);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    setIsVerifying(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // Clear stored data
        sessionStorage.removeItem("signUpData");

        toast.success("Account verified successfully!", {
          description: "Welcome to our platform!",
        });

        // Redirect to dashboard or onboarding
        router.push("/dashboard");
      } else {
        console.error("Verification incomplete:", completeSignUp);
        toast.error("Verification failed", {
          description: "Please try again or contact support.",
        });
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.message ||
        "Invalid verification code. Please try again.";

      toast.error("Verification failed", {
        description: errorMessage,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;

    setIsResending(true);
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification code sent!", {
        description: "Please check your email for the new code.",
      });
    } catch (error: any) {
      console.error("Resend error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.message ||
        "Failed to resend verification code.";

      toast.error("Resend failed", {
        description: errorMessage,
      });
    } finally {
      setIsResending(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md border-0 bg-white/90 shadow-xl backdrop-blur-sm dark:bg-gray-800/90">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-base">
            We've sent a verification code to{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {email}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-12 border-gray-200 text-center text-lg tracking-widest focus:border-blue-500 focus:ring-blue-500"
                maxLength={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
              disabled={isVerifying || code.length !== 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Email
                </>
              )}
            </Button>
          </form>

          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend verification code"
              )}
            </Button>
          </div>

          <div className="border-t border-gray-100 pt-4 text-center dark:border-gray-700">
            <p className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <AlertCircle className="h-3 w-3" />
              Check your spam folder if you don't see the email
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
