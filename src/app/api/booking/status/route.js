// /api/booking/status/route.js
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) return Response.json({ error: 'Missing bookingId' }, { status: 400 });

  const booking = await Booking.findById(bookingId);
  if (!booking) return Response.json({ error: 'Booking not found' }, { status: 404 });

  return Response.json({ booking });
}
