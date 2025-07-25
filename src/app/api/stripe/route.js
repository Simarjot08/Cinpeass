

// import Stripe from 'stripe';
// import Booking from '@/app/lib/models/bookingModel';
// import { connectDB } from '@/app/lib/config/db';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req) {
  
//   await connectDB();

//   const rawBody = await req.arrayBuffer();
//   const bodyBuffer = Buffer.from(rawBody);
//   const sig = req.headers.get('stripe-signature');

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       bodyBuffer,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed:', err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }
//    console.log(`📩 Event type: ${event.type}`);

//   try {
//     switch (event.type) {
//       case 'checkout.session.completed': {
//         const session = event.data.object;
//         const bookingId = session?.metadata?.bookingId;

//         if (!bookingId) {
//           console.warn('⚠️ No bookingId in session metadata.');
//           break;
//         }

//         // Mark booking as paid
//         await Booking.findByIdAndUpdate(bookingId, {
//           isPaid: true,
//           paymentLink: '',
//         });

//         console.log(`✅ Booking ${bookingId} marked as paid.`);

//         // Trigger email
//         const emailRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ bookingId }),
//         });

//         console.log('📩 Email sent status:', emailRes.status);
//         break;
//       }

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return new Response(JSON.stringify({ received: true }), { status: 200 });
//   } catch (error) {
//     console.error('❌ Error processing webhook:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }


// import Stripe from 'stripe';
// import Booking from '@/app/lib/models/bookingModel';
// import { connectDB } from '@/app/lib/config/db';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false, // Required by Stripe to validate the raw body
//   },
// };

// export async function POST(req) {
//   await connectDB();

//   const rawBody = await req.arrayBuffer();
//   const bodyBuffer = Buffer.from(rawBody);
//   const sig = req.headers.get('stripe-signature');

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       bodyBuffer,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed:', err.message);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   console.log(`📩 Stripe Event Received: ${event.type}`);

//   try {
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object;
//       const bookingId = session?.metadata?.bookingId;
//       const userId = session?.metadata?.userId;
//       const customerEmail = session?.customer_details?.email;

//       if (!bookingId) {
//         console.warn('⚠️ No bookingId found in session metadata.');
//         return new Response('Missing booking ID in metadata.', { status: 400 });
//       }

//       console.log(`✅ Booking ID: ${bookingId}`);
//       console.log(`👤 User ID: ${userId}`);
//       console.log(`📧 Customer Email: ${customerEmail}`);

//       // Update booking as paid
//       await Booking.findByIdAndUpdate(bookingId, {
//         isPaid: true,
//         paymentLink: '',
//         email: customerEmail,
//         user: userId,
//       });

//       console.log(`✅ Booking ${bookingId} marked as paid in DB.`);

//       // Send confirmation email
//       const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookingId }),
//       });

//       console.log(`📨 Email trigger response status: ${emailResponse.status}`);
//     } else {
//       console.log(`❓ Unhandled event type: ${event.type}`);
//     }

//     return new Response(JSON.stringify({ received: true }), { status: 200 });
//   } catch (error) {
//     console.error('❌ Error processing webhook:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }

// /app/api/stripe/route.js or /pages/api/stripe.js depending on your project structure
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import { connectDB } from '@/app/lib/config/db';
// import Booking from '@/app/lib/models/bookingModel';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ✅ Corrected utility function to read raw body without micro
// async function readRawBody(readable) {
//   const reader = readable.getReader();
//   const chunks = [];

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     if (value) chunks.push(value);
//   }

//   return Buffer.concat(chunks);
// }

// export async function POST(req) {
//   console.log('📦 Incoming Stripe webhook...');

//   await connectDB();
//   console.log('✅ MongoDB connected');

//   const sig = req.headers.get('stripe-signature');
//   const rawBody = await readRawBody(req.body);

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//     console.log(`📨 Stripe event received: ${event.type}`);
//   } catch (err) {
//     console.error('❌ Webhook signature verification failed:', err.message);
//     return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
//   }

//   // ✅ Handle only checkout.session.completed
//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     console.log('🧾 Checkout session data:', session);

//     const bookingId = session.metadata?.bookingId;
//     console.log(`🔍 Extracted bookingId: ${bookingId}`);

//     if (!bookingId) {
//       console.error('❌ No bookingId found in metadata');
//       return NextResponse.json({ received: true });
//     }

//     try {
//       const booking = await Booking.findById(bookingId);
//       if (booking) {
//         console.log(`🛠️ Booking found:`, booking);
//         booking.isPaid = true;
//         await booking.save();
//         console.log(`✅ Booking ${bookingId} marked as paid and saved to DB`);
//       } else {
//         console.error(`❌ Booking not found for ID ${bookingId}`);
//       }
//     } catch (err) {
//       console.error('❌ Failed to update booking:', err.message);
//     }
//   } else {
//     // 👇 log all other events (like payment_intent.succeeded)
//     console.log(`ℹ️ Unhandled event type: ${event.type}`);
//     console.log('📦 Full event payload:', JSON.stringify(event, null, 2));
//   }

//   return NextResponse.json({ received: true });
// }
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';

export const config = {
  api: {
    bodyParser: false, // Required for Stripe signature verification
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  console.log('📦 Incoming Stripe webhook...');
  await connectDB();
  console.log('✅ MongoDB connected');

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
    console.log(`📨 Stripe event received: ${event.type}`);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session?.metadata?.bookingId;
      const userId = session?.metadata?.userId;
      const customerEmail = session?.customer_details?.email;

      if (!bookingId) {
        console.warn('⚠️ No bookingId found in metadata.');
        return NextResponse.json({ received: true });
      }

      console.log(`🔍 Booking ID: ${bookingId}`);
      console.log(`👤 User ID: ${userId}`);
      console.log(`📧 Customer Email: ${customerEmail}`);

      // Update booking as paid
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentLink: '',
        email: customerEmail,
        user: userId,
      });

      console.log(`✅ Booking ${bookingId} marked as paid.`);

      // Trigger email sending
      const emailRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      console.log(`📤 Email sent status: ${emailRes.status}`);
    } else {
      console.log(`ℹ️ Event type ${event.type} received but not handled.`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
