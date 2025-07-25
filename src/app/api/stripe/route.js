

import Stripe from 'stripe';
import Booking from '@/app/lib/models/bookingModel';
import { connectDB } from '@/app/lib/config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  
  await connectDB();

  const rawBody = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
   console.log(`📩 Event type: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const bookingId = session?.metadata?.bookingId;

        if (!bookingId) {
          console.warn('⚠️ No bookingId in session metadata.');
          break;
        }

        // Mark booking as paid
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: '',
        });

        console.log(`✅ Booking ${bookingId} marked as paid.`);

        // Trigger email
        const emailRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });

        console.log('📩 Email sent status:', emailRes.status);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

