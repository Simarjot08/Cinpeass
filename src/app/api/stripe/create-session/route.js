import Stripe from "stripe";
import { connectDB } from "@/app/lib/config/db";
import Booking from "@/app/lib/models/bookingModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  try {
    const { bookingId } = await req.json();

    const booking = await Booking.findById(bookingId).populate("show");

    if (!booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
      });
    }

    if (booking.isPaid) {
      return new Response(JSON.stringify({ error: "Booking already paid" }), {
        status: 400,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: booking.user.email, // or get user email however stored
      line_items: [
        {
          price_data: {
            currency: "usd", // your currency
            product_data: {
              name: `Movie Tickets - ${booking.show.movie.title}`,
            },
            unit_amount: booking.amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
      metadata: {
        bookingId: booking._id.toString(),
      },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Stripe create session error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
