// import { clerkClient } from "@clerk/nextjs/server";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
// import { Redis } from "@upstash/redis";
// import { filterUserForClient } from "~/server/helpers/filterUserForClient";

// Create a new ratelimiter, that allows 3 requests per 1 minute
// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(3, "1 m"),
//   analytics: true,
//   /**
//    * Optional prefix for the keys used in redis. This is useful if you want to share a redis
//    * instance with other applications and want to avoid key collisions. The default prefix is
//    * "@upstash/ratelimit"
//    */
//   prefix: "@upstash/ratelimit",
// });

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    // const posts = await ctx.prisma.post.findMany({
    //   take: 100,
    //   orderBy: [{ createdAt: "desc" }],
    // });

    // const users = (
    //   await clerkClient.users.getUserList({
    //     userId: posts.map((post) => post.authorId),
    //     limit: 100,
    //   })
    // ).map(filterUserForClient);

    return products;

    // return posts.map((post) => {
    //   const author = users.find((user) => user.id === post.authorId);

    //   if (!author || !author.firstName)
    //     throw new TRPCError({
    //       code: "INTERNAL_SERVER_ERROR",
    //       message: "Author for post not found",
    //     });

    //   return {
    //     post,
    //     author: {
    //       ...author,
    //       firstName: author.firstName,
    //     },
    //   };
    // });
  }),
  getProductById: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: {
          id: input.productId,
        },
      });

      return product;
    }),

  //   create: privateProcedure
  //     .input(
  //       z.object({
  //         content: z.string().emoji("Only emojis are allowed").min(1).max(255),
  //       })
  //     )
  //     .mutation(async ({ ctx, input }) => {
  //       const authorId = ctx.currentUserId;

  //       const { success } = await ratelimit.limit(authorId);

  //       if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  //       const post = await ctx.prisma.post.create({
  //         data: {
  //           authorId,
  //           content: input.content,
  //         },
  //       });

  //       return post;
  //     }),
});
