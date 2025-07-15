import Stripe from "stripe";
import { connectDB } from "@/app/lib/config/db";
import Booking from "@/app/lib/models/bookingModel";

export const config = {
  runtime: 'nodejs', // ✅ Required to use Buffer and Stripe SDK
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata.bookingId;

    await connectDB();

    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentIntentId: session.payment_intent,
      paymentStatus: "paid",
    });

    console.log(`Booking ${bookingId} marked as paid.`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

