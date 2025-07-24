

import Stripe from 'stripe';
import Booking from '@/app/lib/models/bookingModel';
import { connectDB } from '@/app/lib/config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Required to receive raw body
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

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;

        // Fetch the session associated with this intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        const session = sessions.data[0];
        const bookingId = session?.metadata?.bookingId;

        if (bookingId) {
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


        } else {
          console.warn('⚠️ No bookingId found in session metadata.');
        }

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
// import Stripe from 'stripe';
// import Booking from '@/app/lib/models/bookingModel';
// import Show from '@/app/lib/models/showmodel';
// import Movie from '@/app/lib/models/movieModel';
// import User from '@/app/lib/models/userModel';
// import { connectDB } from '@/app/lib/config/db';
// import { send } from '@emailjs/nodejs';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false, // For raw body
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

//   try {
//     if (event.type === 'payment_intent.succeeded') {
//       const paymentIntent = event.data.object;

//       // Get checkout session to extract metadata
//       const sessions = await stripe.checkout.sessions.list({
//         payment_intent: paymentIntent.id,
//         limit: 1,
//       });

//       const session = sessions.data[0];
//       const bookingId = session?.metadata?.bookingId;

//       if (!bookingId) {
//         console.warn('⚠️ No bookingId found in session metadata.');
//         return new Response('No bookingId found.', { status: 400 });
//       }

//       // Update booking as paid
//       const booking = await Booking.findByIdAndUpdate(
//         bookingId,
//         { isPaid: true, paymentLink: '' },
//         { new: true }
//       )
//         .populate({
//           path: 'show',
//           populate: { path: 'movie' },
//         })
//         .populate('user');

//       if (!booking) {
//         console.warn('⚠️ Booking not found for ID:', bookingId);
//         return new Response('Booking not found.', { status: 404 });
//       }

//       // Send email using EmailJS
//       const { user, show } = booking;
//       const { movie } = show;

//       const templateParams = {
//         user_name: `${user.firstname} ${user.lastname}`,
//         user_email: user.email,
//         movie_title: movie.title,
//         show_date: new Date(show.showDateTime).toLocaleDateString(),
//         show_time: new Date(show.showDateTime).toLocaleTimeString(),
//         seats: booking.bookedSeats.join(', '),
//       };

//       try {
//         await send(
//           process.env.EMAILJS_SERVICE_ID,
//           process.env.EMAILJS_TEMPLATE_ID,
//           templateParams,
//           {
//             publicKey: process.env.EMAILJS_PUBLIC_KEY,
//             privateKey: process.env.EMAILJS_PRIVATE_KEY,
//           }
//         );

//         console.log(`📧 Confirmation email sent to ${user.email}`);
//       } catch (emailErr) {
//         console.error('❌ Failed to send confirmation email:', emailErr.message);
//       }

//       console.log(`✅ Booking ${bookingId} marked as paid.`);
//     }

//     return new Response(JSON.stringify({ received: true }), { status: 200 });
//   } catch (error) {
//     console.error('❌ Error processing webhook:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }
