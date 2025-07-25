// app/api/booking/status/route.js

import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return new Response(JSON.stringify({ error: 'Booking ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return new Response(JSON.stringify({ error: 'Booking not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ isPaid: booking.isPaid }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
