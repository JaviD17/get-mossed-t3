import { env } from "~/env.mjs";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import type { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["products"]["getAll"][number];

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: privateProcedure
    .input(
      z.array(
        z.object({
          id: z.string(),
          // createdAt: z.string(),
          // updatedAt: z.string(),
          // Product has these 2 as dates and zod expects dates but it recognized them as strings so I have to coerce them
          createdAt: z.coerce.date(),
          updatedAt: z.coerce.date(),
          title: z.string(),
          description: z.string(),
          size: z.string(),
          price: z.string(),
          cartQuantity: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { stripe } = ctx;
      // const { stripe, currentUserId, prisma } = ctx;

      const baseUrl =
        env.NODE_ENV === "development"
          ? `http://${"localhost:3000"}`
          : `https://${"localhost:3000"}`;
      // ? `http://${req.headers.host ?? "localhost:3000"}`
      // : `https://${req.headers.host ?? env.NEXTAUTH_URL}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        //   customer: currentUserId,
        //   client_reference_id: session.user?.id,
        submit_type: "pay",
        payment_method_types: ["card"],
        mode: "payment",
        line_items: input.map(
          (cartItem: Pick<Product, "title" | "price" | "cartQuantity">) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: cartItem.title,
                },
                unit_amount: Number(cartItem.price) * 100,
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: Number(cartItem.cartQuantity),
            };
          }
        ),
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/cancel`,
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
});
