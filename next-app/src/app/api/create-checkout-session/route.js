import Stripe from "stripe";
import { pricingTiers } from "@/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { planId } = body;

    if (!planId) {
      return Response.json(
        { error: "planId is required." },
        { status: 400 }
      );
    }

    // Look up the plan from config — never trust prices from the frontend
    const plan = pricingTiers.find((p) => p.id === planId);
    if (!plan) {
      return Response.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // DEV MODE FALLBACK: If using dummy keys, skip Stripe and jump straight to thank you page.
    if (process.env.STRIPE_SECRET_KEY === "sk_test_dummy_key") {
      console.log("[create-checkout-session] DEV MODE: Mocking Stripe checkout session");
      const mockSessionId = `cs_test_mock_${Date.now()}`;
      const mockUrl = `${appUrl}/thank-you?session_id=${mockSessionId}&token=${Buffer.from(mockSessionId).toString("base64url")}`;
      return Response.json({ url: mockUrl });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AURUM EA – ${plan.name} Plan`,
              description: "Lifetime licence · No recurring fees",
              // Tax code for SaaS / electronically supplied services
              tax_code: "txcd_10000000",
              metadata: {
                planId,
                planName: plan.name,
              },
            },
            // tax_behavior: exclusive means Stripe Tax is added ON TOP of the base price
            unit_amount: plan.priceBase * 100, // cents
            tax_behavior: "exclusive",
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Stripe Automatic Tax — Stripe determines customer location from billing info
      automatic_tax: { enabled: true },
      // Collect billing address so Stripe Tax can compute the right rate
      billing_address_collection: "required",
      success_url: `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?cancelled=1`,
      metadata: {
        planId,
        planName: plan.name,
        basePrice: String(plan.priceBase),
        currency: "USD",
      },
      customer_creation: "always",
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("[create-checkout-session] Error:", err);
    return Response.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
