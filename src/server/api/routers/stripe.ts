import { env } from "~/env.mjs";
// import { getOrCreateStripeCustomerIdForUser } from "~/server/stripe/stripe-webhook-handlers";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: privateProcedure.mutation(async ({ ctx }) => {
    const { stripe, currentUserId, prisma } = ctx;

    // const customerId = await getOrCreateStripeCustomerIdForUser({
    //   prisma,
    //   stripe,
    //   userId: session.user?.id,
    // });

    // if (!customerId) {
    //   throw new Error("Could not create customer");
    // }

    const baseUrl =
      env.NODE_ENV === "development"
        ? `http://${"localhost:3000"}`
        : `https://${"localhost:3000"}`;
        // ? `http://${req.headers.host ?? "localhost:3000"}`
        // : `https://${req.headers.host ?? env.NEXTAUTH_URL}`;

    const checkoutSession = await stripe.checkout.sessions.create({
    //   customer: customerId,
    //   client_reference_id: session.user?.id,
      payment_method_types: ["card"],
      mode: "payment",
    //   line_items: [
    //     {
    //       price: env.STRIPE_PRICE_ID,
    //     //   price: env.STRIPE_PRICE_ID,
    //       quantity: 1,
    //     },
    //   ],
      success_url: `${baseUrl}/dashboard?checkoutSuccess=true`,
      cancel_url: `${baseUrl}/dashboard?checkoutCanceled=true`,
    //   subscription_data: {
    //     metadata: {
    //       userId: session.user?.id,
    //     },
    //   },
    });

    if (!checkoutSession) {
      throw new Error("Could not create checkout session");
    }

    return { checkoutUrl: checkoutSession.url };
  }),
//   createBillingPortalSession: privateProcedure.mutation(async ({ ctx }) => {
//     const { stripe, currentUserId, prisma } = ctx;
//     // const { stripe, currentUserId, prisma, req } = ctx;

//     // const customerId = await getOrCreateStripeCustomerIdForUser({
//     //   prisma,
//     //   stripe,
//     //   userId: session.user?.id,
//     // });

//     // if (!customerId) {
//     //   throw new Error("Could not create customer");
//     // }

//     const baseUrl =
//       env.NODE_ENV === "development"
//         ? `http://${"localhost:3000"}`
//         : `https://${env.NEXTAUTH_URL}`;
//         // ? `http://${req.headers.host ?? "localhost:3000"}`
//         // : `https://${req.headers.host ?? env.NEXTAUTH_URL}`;

//     // const stripeBillingPortalSession =
//     //   await stripe.billingPortal.sessions.create({
//     //     customer: customerId,
//     //     return_url: `${baseUrl}/dashboard`,
//     //   });

//     // if (!stripeBillingPortalSession) {
//     //   throw new Error("Could not create billing portal session");
//     // }

//     // return { billingPortalUrl: stripeBillingPortalSession.url };
//   }),
});
