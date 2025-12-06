// src/app/api/stripe/webhook/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserPremium } from "../../../../lib/premium";

// Lazy initialize Stripe to avoid build-time errors
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
  });
};

export async function POST(req) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
      console.log("✅ STRIPE WEBHOOK RECEIVED - Event Type:", event.type);
      
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("Checkout session completed:", session.id);

      // Get customer email from the session
      let customerEmail = session.customer_email;

      // If email is not directly available, fetch it from customer object
      if (!customerEmail && session.customer) {
        try {
          const customer = await stripe.customers.retrieve(session.customer);
          customerEmail = customer.email;
        } catch (err) {
          console.error("Error retrieving customer:", err);
        }
      }

      if (customerEmail) {
        console.log("Marking user as premium:", customerEmail);
        
        try {
          // Mark the user as premium in the database
          await setUserPremium(customerEmail, true);
          console.log("Successfully marked user as premium:", customerEmail);
        } catch (err) {
          console.error("Error setting user premium status:", err);
          // Return 500 so Stripe will retry the webhook
          return NextResponse.json(
            { error: "Failed to update user premium status" },
            { status: 500 }
          );
        }
      } else {
        console.error(
          "Premium activation skipped - no customer email found in session:",
          session.id,
          "Please ensure customer email is collected during checkout."
        );
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
