import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({
  path:
    process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSessionService = async ({ lineItems, metadata }) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: lineItems,

    metadata,

    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
  });

  return session;
};

export const verifyWebhookSignatureService = (payload, signature) => {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );
};
