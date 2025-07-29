// src/server/api/routers/post.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"; // Ensure correct path

export const postRouter = createTRPCRouter({
  // Define the 'create' mutation
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // Simulate a delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real application, you would save the post to your database
      // For example, if you have a Post model in Prisma:
      // const newPost = await ctx.db.post.create({
      //   data: {
      //     name: input.name,
      //     // Add other fields like userId if applicable
      //   },
      // });
      // return newPost;

      // For now, we'll just return a mock object
      console.log("Creating post with name:", input.name);
      return {
        id: `mock-post-${Date.now()}`,
        name: input.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  // Define the 'getLatest' query
  getLatest: publicProcedure.query(async ({ ctx }) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real application, you would fetch the latest post from your database
    // For example:
    // const latestPost = await ctx.db.post.findFirst({
    //   orderBy: { createdAt: 'desc' },
    // });
    // return latestPost;

    // For now, return a mock latest post
    return {
      id: "mock-latest-post",
      name: "My First Mock Post",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),

  // If you also want 'getFeatured', define it here:
  // getFeatured: publicProcedure.query(async ({ ctx }) => {
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   return [
  //     { id: "feat1", name: "Featured Post 1", createdAt: new Date(), updatedAt: new Date() },
  //     { id: "feat2", name: "Featured Post 2", createdAt: new Date(), updatedAt: new Date() },
  //   ];
  // }),
});
