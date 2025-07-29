// src/types/next-auth.d.ts
// This file augments the NextAuth.js types to include custom fields.
import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { type UserRole } from "@prisma/client"; // Import UserRole from your Prisma client

// Extend the default NextAuth.js User type
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // Explicitly declare id as string
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    schoolId?: string | null;
    role?: UserRole | null; // CRITICAL FIX: Allow null for role
    emailVerified?: Date | null;
    // name?: string | null; // Only if directly on Prisma User model
    // image?: string | null; // Only if directly on Prisma User model
  }

  // Extend the default session.user type
  interface Session extends DefaultSession {
    user: {
      id: string; // Explicitly declare id as string
      email?: string | null;
      name?: string | null;
      image?: string | null;

      firstName?: string | null;
      lastName?: string | null;
      schoolId?: string | null;
      role?: UserRole | null; // CRITICAL FIX: Allow null for role
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }
}

// Extend the default JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Explicitly declare id as string
    email?: string | null;
    name?: string | null;
    picture?: string | null;

    firstName?: string | null;
    lastName?: string | null;
    schoolId?: string | null;
    role?: UserRole | null; // CRITICAL FIX: Allow null for role
    emailVerified?: Date | null;
  }
}
