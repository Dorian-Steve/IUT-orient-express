// src/lib/validations/auth-validators.ts
import * as z from "zod";

// Regex for School ID validation (if provided):
// - Student: starts with '2' followed by year (e.g., 24), then 'I' and 5 digits (e.g., 24I00001)
// - Advisor: starts with 'AV' followed by 6 digits (e.g., AV200302)
// - Admin: starts with 'AM' followed by 6 digits (e.g., AM405002)
const schoolIdRegex = /^(2[0-9]I\d{5}|AV\d{6}|AM\d{6})$/;

// --- Schema for Single Signup Form (Clerk-compatible) ---
export const studentSignUpFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    // schoolId is now optional for signup
    schoolId: z
      .string()
      .optional() // Made optional
      .refine(
        (val) => !val || schoolIdRegex.test(val), // Only validate if present
        "Invalid School ID format. Must be like 24I00001 (Student), AV200302 (Advisor), or AM405002 (Admin)."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof studentSignUpFormSchema>;


// --- Schema for Sign In Form (remains the same) ---
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
