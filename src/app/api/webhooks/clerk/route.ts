import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to determine user role from school ID
function getUserRoleFromSchoolId(schoolId: string): "STUDENT" | "ADVISOR" | "ADMIN" | null {
  if (!schoolId) return null;
  
  // Student IDs: start with numbers (e.g., 24I00001)
  if (/^\d+[A-Z]\d+$/.test(schoolId)) {
    return "STUDENT";
  }
  
  // Advisor IDs: start with AV (e.g., AV200302)
  if (/^AV\d+$/.test(schoolId)) {
    return "ADVISOR";
  }
  
  // Admin IDs: start with AM (e.g., AM405002)
  if (/^AM\d+$/.test(schoolId)) {
    return "ADMIN";
  }
  
  return null;
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to your environment variables");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;
      
      const email = email_addresses[0]?.email_address;
      const schoolId = unsafe_metadata?.schoolId as string;
      
      if (!email || !schoolId) {
        console.error("Missing required user data:", { email, schoolId });
        return NextResponse.json({ error: "Missing required user data" }, { status: 400 });
      }

      // Determine user role from school ID
      const userRole = getUserRoleFromSchoolId(schoolId);
      if (!userRole) {
        console.error("Invalid school ID format:", schoolId);
        return NextResponse.json({ error: "Invalid school ID format" }, { status: 400 });
      }

      // Check if school ID is valid and not used
      const validSchoolId = await prisma.validSchoolId.findUnique({
        where: { schoolId },
      });

      if (!validSchoolId) {
        console.error("School ID not found in valid school IDs:", schoolId);
        return NextResponse.json({ error: "Invalid school ID" }, { status: 400 });
      }

      if (validSchoolId.isUsed) {
        console.error("School ID already in use:", schoolId);
        return NextResponse.json({ error: "School ID already in use" }, { status: 400 });
      }

      if (validSchoolId.userRole !== userRole) {
        console.error("School ID role mismatch:", { expected: validSchoolId.userRole, got: userRole });
        return NextResponse.json({ error: "School ID role mismatch" }, { status: 400 });
      }

      // Create user in database
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email,
          firstName: first_name || null,
          lastName: last_name || null,
          name: first_name && last_name ? `${first_name} ${last_name}` : null,
          imageUrl: image_url || null,
          schoolId,
          role: userRole,
          emailVerified: new Date(), // Clerk handles email verification
          profileCompleted: false,
        },
      });

      // Mark school ID as used
      await prisma.validSchoolId.update({
        where: { schoolId },
        data: { isUsed: true },
      });

      // Create profile based on user role
      switch (userRole) {
        case "STUDENT":
          await prisma.studentProfile.create({
            data: {
              userId: user.id,
              schoolId,
            },
          });
          break;
        case "ADVISOR":
          await prisma.advisorProfile.create({
            data: {
              userId: user.id,
              specialties: [],
              fieldsOfWork: [],
            },
          });
          break;
        case "ADMIN":
          await prisma.adminProfile.create({
            data: {
              userId: user.id,
              permissions: [],
            },
          });
          break;
      }

      console.log("User created successfully:", user.id);
    }

    if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      const email = email_addresses[0]?.email_address;

      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email || undefined,
          firstName: first_name || null,
          lastName: last_name || null,
          name: first_name && last_name ? `${first_name} ${last_name}` : null,
          imageUrl: image_url || null,
        },
      });

      console.log("User updated successfully:", id);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      // Get user to free up school ID
      const user = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (user) {
        // Mark school ID as unused
        await prisma.validSchoolId.update({
          where: { schoolId: user.schoolId },
          data: { isUsed: false },
        });

        // Delete user (cascades to profiles)
        await prisma.user.delete({
          where: { clerkId: id },
        });
      }

      console.log("User deleted successfully:", id);
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}