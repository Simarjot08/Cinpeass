// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Booking from '@/app/lib/models/bookingModel';
// import Show from '@/app/lib/models/showmodel';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   await connectDB();
//   try {
//     const { bookingId } = await req.json();
//     const origin = req.headers.get('origin');

//     const booking = await Booking.findById(bookingId).populate({
//       path: 'show',
//       populate: { path: 'movie' },
//     });

//     if (!booking) {
//       return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
//     }

//     if (booking.isPaid) {
//       return NextResponse.json({ success: false, error: 'Booking already paid' }, { status: 400 });
//     }

//     const show = booking.show;
//     const movie = show.movie;

//     const amount = booking.amount;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: `Ticket: ${movie.title}`,
//             },
//             unit_amount: Math.floor(amount) * 100,
//           },
//           quantity: 1,
//         },
//       ],
//     //   success_url: `${origin}/booking?status=success&bookingId=${booking._id}`,
//     success_url: `${origin}/booking/processing?bookingId=${booking._id}`,

//       cancel_url: `${origin}/booking?status=cancel&bookingId=${booking._id}`,
//       metadata: {
//         bookingId: booking._id.toString(),
//         userId: booking.user.toString(),
//       },
//       expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     return NextResponse.json({ success: true, url: session.url });
//   } catch (error) {
//     console.error('Stripe session creation error:', error.message);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  try {
    const { bookingId } = await req.json();
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;

    const booking = await Booking.findById(bookingId).populate({
      path: 'show',
      populate: { path: 'movie' },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    if (booking.isPaid) {
      return NextResponse.json({ success: false, error: 'Booking already paid' }, { status: 400 });
    }

    const show = booking.show;
    const movie = show.movie;

    const amountInCents = Math.floor(booking.amount * 100); // amount is assumed in dollars

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ticket: ${movie.title}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/booking/processing?bookingId=${booking._id}`,
      cancel_url: `${origin}/booking?status=cancel&bookingId=${booking._id}`,
      // metadata: {
      //   bookingId: booking._id.toString(),
      //   userId: booking.user.toString(),
      // },
      metadata: {
  bookingId: booking._id.toString(),
  userId: booking.user.toString(),
},
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 min
    });

    // Save the payment link
    booking.paymentLink = session.url;
    await booking.save();

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('❌ Stripe session creation failed:', error.message);
    return NextResponse.json({ success: false, error: 'Session creation error' }, { status: 500 });
  }
}


