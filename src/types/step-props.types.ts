// src/types/step-props.types.ts
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type Variants } from "framer-motion";
import { type SignUpFormValues } from "@/lib/validations/auth-validators"; // Import from auth-validators

export type Option = {
  id: string;
  name: string;
};

export type StepDefinition = {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fields: readonly string[];
};

// Base props for step components
export interface StepComponentProps {
  form: UseFormReturn<SignUpFormValues>;
  itemVariants: Variants;
  contentVariants: Variants;
  step: StepDefinition;
}