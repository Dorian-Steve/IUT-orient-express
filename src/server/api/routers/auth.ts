// src/server/api/routers/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { studentSignUpFormSchema } from "@/lib/validations/auth-validators";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { UserRole } from "@prisma/client"; // Ensure UserRole enum is imported from Prisma client

export const authRouter = createTRPCRouter({
  student: createTRPCRouter({
    signup: publicProcedure
      .input(studentSignUpFormSchema)
      .mutation(async ({ input, ctx }) => {
        const { db } = ctx; // Use 'db' from context

        const existingUserByEmail = await db.user.findUnique({
          where: { email: input.email },
        });

        if (existingUserByEmail) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already registered.",
          });
        }

        const existingUserBySchoolId = await db.user.findUnique({
          where: { schoolId: input.schoolId },
        });

        if (existingUserBySchoolId) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "School ID is already in use.",
          });
        }

        let role: UserRole = UserRole.STUDENT;
        if (input.schoolId.startsWith("AM")) {
          role = UserRole.ADMIN;
        } else if (input.schoolId.startsWith("AV")) {
          role = UserRole.ADVISOR;
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const newUser = await db.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              email: input.email,
              passwordHash: hashedPassword,
              firstName: input.firstName,
              lastName: input.lastName,
              schoolId: input.schoolId,
              role: role,
              profileCompleted: false,
            },
          });

          if (role === UserRole.STUDENT) {
            await tx.studentProfile.create({
              data: {
                userId: user.id,
                // CRITICAL FIX: Use 'currentSpecialization' instead of 'speciality'
                currentSpecialization: "Unspecified",
                // CRITICAL FIX: 'academicBackground' is not a direct field on StudentProfile.
                // If you need to store initial academic background, consider using 'previousEducation'
                // or adding 'academicBackground' to your StudentProfile model in schema.prisma.
                // For now, I'm removing it to match your current schema.
                // academicBackground: "Unspecified", // REMOVED as it's not in your StudentProfile model
                profileCompleted: false,
              },
            });
          }

          return user;
        });

        return {
          success: true,
          message: "Account created successfully!",
          user: {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            profileCompleted: newUser.profileCompleted,
          },
          emailSent: false,
        };
      }),
  }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("Verifying email with token:", input.token);
      return { success: true, emailVerified: true };
    }),
});
