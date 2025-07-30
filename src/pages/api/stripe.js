import { buffer } from 'micro';
import Stripe from 'stripe';
import Booking from '@/app/lib/models/bookingModel';
import { connectDB } from '@/app/lib/config/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  await connectDB();

  const rawBody = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`📩 Stripe event: ${event.type}`);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session?.metadata?.bookingId;

      if (!bookingId) {
        console.warn('⚠️ bookingId missing in metadata');
        return res.status(400).end('Missing bookingId');
      }

      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentLink: '',
      });

      console.log(`✅ Booking ${bookingId} marked as paid.`);

      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('❌ Error in webhook handler:', err);
    return res.status(500).end('Internal Server Error');
  }
}

