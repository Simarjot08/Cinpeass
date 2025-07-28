
// // app/api/booking/createbooking/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Show from '@/app/lib/models/showmodel';
// import Booking from '@/app/lib/models/bookingModel';
// import { cookies } from 'next/headers';
// import Movie from '@/app/lib/models/movieModel';
// import jwt from 'jsonwebtoken';
// import Stripe from 'stripe';

// const JWT_SECRET = process.env.JWT_SECRET;

// // ✅ Token verifier middleware from cookies
// const verifyTokenFromCookie = () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get('accessToken')?.value;

//   if (!token) {
//     throw new Error('No token provided');
//   }

//   const decoded = jwt.verify(token, JWT_SECRET);
//   return decoded.userId; // or decoded.id
// };

// export async function POST(req) {
//   await connectDB();

//   try {
//     // ✅ Get userId from accessToken stored in HTTP-only cookie
//     const userId =  await verifyTokenFromCookie();

//     const body = await req.json();
//     const { showId, selectedSeats } = body;

//     // ✅ Fetch the show
  
//     const showData = await Show.findById(showId).populate('movie');

    

//     // ✅ Check if any of the selected seats are already booked
//     const isAnySeatTaken = selectedSeats.some((seat) => showData.occupiedSeats[seat]);
//     if (isAnySeatTaken) {
//       return NextResponse.json({
//         success: false,
//         message: 'Some selected seats are already booked',
//       });
//     }

//     // ✅ Create a new booking
//     const booking = await Booking.create({
//       user: userId,
//       show: showId,
//       amount: showData.showPrice * selectedSeats.length,
//       bookedSeats: selectedSeats,
//     });

//     // ✅ Mark seats as booked by user
//     selectedSeats.forEach((seat) => {
//       showData.occupiedSeats[seat] = userId;
//     });

//     showData.markModified('occupiedSeats');
//     await showData.save();


//     //stripe gateway initialise
  


//     return NextResponse.json({
//       success: true,
//       message: 'Booked successfully',
//       booking,
//     });
//   } catch (error) {
//     console.error('Booking error:', error.message);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Show from '@/app/lib/models/showmodel';
// import Booking from '@/app/lib/models/bookingModel';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import Stripe from 'stripe';

// const JWT_SECRET = process.env.JWT_SECRET;
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ✅ Extract userId from JWT cookie (async because cookies() is async)
// const verifyTokenFromCookie = async () => {
//   // const cookieStore = cookies();
//   // const token = cookieStore.get('accessToken')?.value;
//   const cookieStore = await cookies();
// const token = cookieStore.get('accessToken')?.value;
//   if (!token) throw new Error('No token provided');

//   const decoded = jwt.verify(token, JWT_SECRET);
//   return decoded.userId;
// };

// export async function POST(req) {
//   await connectDB();

//   try {
//     const userId = await verifyTokenFromCookie();
//     const body = await req.json();
//     const { showId, selectedSeats } = body;
//     const origin = req.headers.get('origin');

//     const showData = await Show.findById(showId).populate('movie');
//     if (!showData) throw new Error('Show not found');

//     // ✅ Check seat availability
//     const isAnySeatTaken = selectedSeats.some((seat) => showData.occupiedSeats[seat]);
//     if (isAnySeatTaken) {
//       return NextResponse.json({
//         success: false,
//         message: 'Some selected seats are already booked',
//       });
//     }

//     // ✅ Calculate total amount
//     const amount = showData.showPrice * selectedSeats.length;

//     // ✅ Create booking with status: 'pending'
//     const booking = await Booking.create({
//       user: userId,
//       show: showId,
//       amount,
//       bookedSeats: selectedSeats,
//       status: 'pending',
//     });

//     // ✅ Temporarily lock seats
//     selectedSeats.forEach((seat) => {
//       showData.occupiedSeats[seat] = userId;
//     });
//     showData.markModified('occupiedSeats');
//     await showData.save();

//     // ✅ Create Stripe Checkout session with 30 mins expiry
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: `Ticket: ${showData.movie.title}`,
//             },
//             unit_amount: Math.floor(amount) * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       // success_url: `${origin}/booking?status=success&bookingId=${booking._id}`,
//       success_url: `${origin}/booking/processing?bookingId=${booking._id}`,

//       cancel_url: `${origin}/booking?status=cancel&bookingId=${booking._id}`,
//       metadata: {
//         bookingId: booking._id.toString(),
//         userId,
//       },
//       expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 mins expiry
//     });

//     // ✅ Save Stripe session URL
//     booking.paymentLink = session.url;
//     await booking.save();

//     return NextResponse.json({
//       success: true,
//       url: session.url,
//       bookingId: booking._id,
//     });
//   } catch (error) {
//     console.error('Booking error:', error.message);
//     return NextResponse.json(
//       { success: false, message: error.message || 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Show from '@/app/lib/models/showmodel';
import Booking from '@/app/lib/models/bookingModel';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const JWT_SECRET = process.env.JWT_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const verifyTokenFromCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.userId;
};

export async function POST(req) {
  await connectDB();

  try {
    const userId = await verifyTokenFromCookie();
    const body = await req.json();
    const { showId, selectedSeats } = body;
    const origin = req.headers.get('origin');

    console.log('👉 Booking request by user:', userId);
    console.log('🎟️ Show ID:', showId, 'Seats:', selectedSeats);

    const showData = await Show.findById(showId).populate('movie');
    if (!showData) throw new Error('Show not found');

    // Check seat availability
    const isAnySeatTaken = selectedSeats.some((seat) => showData.occupiedSeats[seat]);
    if (isAnySeatTaken) {
      return NextResponse.json({
        success: false,
        message: 'Some selected seats are already booked',
      });
    }

    const amount = showData.showPrice * selectedSeats.length;

    // Create booking with status: pending
    const booking = new Booking({
      user: userId,
      show: showId,
      amount,
      bookedSeats: selectedSeats,
      status: 'pending',
    });

    await booking.save(); // Make sure booking is saved before proceeding

    console.log('✅ Booking saved:', booking._id);

    // Temporarily lock seats
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified('occupiedSeats');
    await showData.save();

    console.log('🪑 Seats locked temporarily in show data.');
    console.log("📦 Creating session for booking:", booking._id);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ticket: ${showData.movie.title}`,
            },
            unit_amount: Math.floor(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/booking/processing?bookingId=${booking._id}`,
      cancel_url: `${origin}/booking?status=cancel&bookingId=${booking._id}`,
      metadata: {
        bookingId: booking._id.toString(),
        userId,
      },
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 mins
    });
  

    // Save Stripe session URL
    booking.paymentLink = session.url;
    await booking.save();

    console.log('💳 Stripe session created:', session.id);
    console.log('🔗 Payment link saved to booking.');

    return NextResponse.json({
      success: true,
      url: session.url,
      bookingId: booking._id,
    });
  } catch (error) {
    console.error('❌ Booking error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
