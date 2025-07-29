// // src/middleware.ts
// // CORRECT IMPORT: authMiddleware is imported from "@clerk/nextjs/server"
// import { authMiddleware } from "@clerk/nextjs/server";

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)", "/sso-callback(.*)", "/api/register-user-profile"], // Adjust public routes as needed
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


import { clerkMiddleware } from "@clerk/nextjs/server"; // CRITICAL FIX: Import from @clerk/nextjs/server

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
