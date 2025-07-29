// app/api/register-user-profile/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define a Zod schema for the incoming request body
const registerUserSchema = z.object({
  clerkUserId: z.string().min(1, "Clerk User ID is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  schoolId: z.string().optional().nullable(), // schoolId is now optional and can be null
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerUserSchema.parse(body);

    const { clerkUserId, email, firstName, lastName, schoolId } = validatedData;

    let userRole: "STUDENT" | "ADVISOR" | "ADMIN" = "STUDENT"; // Default role

    // If schoolId is provided, validate it and determine role
    if (schoolId) {
      const validSchoolIdEntry = await prisma.validSchoolId.findUnique({
        where: { schoolId: schoolId },
      });

      if (!validSchoolIdEntry) {
        return NextResponse.json(
          { message: "Invalid School ID. Please check your School ID." },
          { status: 400 }
        );
      }

      if (validSchoolIdEntry.isUsed) {
        return NextResponse.json(
          { message: "This School ID has already been used. Please contact support if you believe this is an error." },
          { status: 409 } // Conflict
        );
      }
      userRole = validSchoolIdEntry.userRole; // Assign role from ValidSchoolId table
    }

    // Check if a user with this Clerk ID or email already exists in your DB
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { clerkId: clerkUserId },
          { email: email }
        ]
      },
    });

    if (existingUser) {
      // If user already exists, update their profile if necessary or just return success
      // This can happen if a user signs up via OAuth and then tries email/password, or vice versa.
      console.warn(`User with Clerk ID ${clerkUserId} or email ${email} already exists in DB. Skipping creation, possibly updating.`);
      
      // You might want to update existing user's schoolId or role if it's a re-sync
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          firstName: firstName,
          lastName: lastName,
          schoolId: schoolId, // Update schoolId, which can now be null
          role: userRole, // Update role based on schoolId or default
          // Add other fields you want to keep in sync
        },
      });

      // If a schoolId was provided and used, mark it as used
      if (schoolId && !existingUser.schoolId) { // Only mark as used if it wasn't already linked
         const validSchoolIdEntry = await prisma.validSchoolId.findUnique({ where: { schoolId: schoolId } });
         if (validSchoolIdEntry && !validSchoolIdEntry.isUsed) {
            await prisma.validSchoolId.update({
                where: { id: validSchoolIdEntry.id },
                data: { isUsed: true },
            });
         }
      }

      return NextResponse.json(
        { message: "User profile updated successfully!", user: updatedUser },
        { status: 200 }
      );
    }

    // Create the new user in your PostgreSQL database
    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkUserId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        schoolId: schoolId, // Can be null
        role: userRole, // Assigned based on schoolId or default to STUDENT
        profileCompleted: false, // Initial state
      },
    });

    // If a schoolId was provided, mark it as used
    if (schoolId) {
      await prisma.validSchoolId.update({
        where: { schoolId: schoolId },
        data: { isUsed: true },
      });
    }

    // Optionally, create a student profile immediately for STUDENT role
    if (userRole === "STUDENT") {
      await prisma.studentProfile.create({
        data: {
          userId: newUser.id,
          schoolId: schoolId, // Link studentProfile to schoolId (can be null)
          profileCompleted: false,
        },
      });
    }
    // Add similar logic for ADVISOR or ADMIN profiles if they need immediate creation
    // else if (userRole === "ADVISOR") {
    //   await prisma.advisorProfile.create({
    //     data: { userId: newUser.id },
    //   });
    // }
    // else if (userRole === "ADMIN") {
    //   await prisma.adminProfile.create({
    //     data: { userId: newUser.id },
    //   });
    // }

    return NextResponse.json(
      { message: "User registered successfully!", user: newUser },
      { status: 201 }
    );

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    console.error("Error registering user profile:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
