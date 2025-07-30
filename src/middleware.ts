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

// Temporary fix to bypass authentication for development purposes
// src/middleware.ts
// src/middleware.ts
// Use clerkMiddleware as it's the exported member in your version
// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // Import NextResponse

// This middleware will temporarily allow all requests to pass through
// without any authentication checks by Clerk.
export default clerkMiddleware((auth, req) => {
  // --- TEMPORARY SIMPLE BYPASS START ---
  // For development, simply allow the request to proceed.
  // This bypasses all Clerk authentication and authorization logic within the middleware.
  // REMEMBER TO REVERT THIS ENTIRE FUNCTION FOR PRODUCTION!
  return NextResponse.next();
  // --- TEMPORARY SIMPLE BYPASS END ---

  // Original logic (you can keep it commented out below for reference,
  // but it will not be executed while the bypass is active):
  // if (!auth().userId && !req.nextUrl.pathname.startsWith('/sign-in') && !req.nextUrl.pathname.startsWith('/sign-up')) {
  //   const signInUrl = new URL('/sign-in', req.url);
  //   signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
  //   return NextResponse.redirect(signInUrl);
  // }
});

export const config = {
  // This matcher ensures the middleware runs on all relevant paths
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
// bellow is the protected root logic i commented
// import { clerkMiddleware } from "@clerk/nextjs/server"; // CRITICAL FIX: Import from @clerk/nextjs/server

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default clerkMiddleware();

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
