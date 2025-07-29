// types/signup.types.ts
import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  schoolId: z.string().min(1, "School ID is required").regex(/^(2[0-9]I\d{5}|AV\d{6}|AM\d{6})$/, "Invalid School ID format"),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

// This type is just for the ContactDetails component from your previous context,
// not directly used in the main signup form logic below, but kept for reference.
export type StepDefinition = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fields: readonly string[];
};