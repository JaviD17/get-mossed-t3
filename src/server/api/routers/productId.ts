// import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const productIdRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const productId = await ctx.prisma.product.findFirst({
        where: {
          id: input.productId,
        },
      });

      if (!productId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      //   return filterUserForClient(user);
      return productId;
    }),
});
