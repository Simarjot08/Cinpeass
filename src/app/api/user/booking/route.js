

import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Show from '@/app/lib/models/showmodel';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';

// 🔁 Utility: Cancel expired unpaid bookings older than 10 minutes
const cancelExpiredBookings = async (userId) => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const expiredBookings = await Booking.find({
    user: userId,
    isPaid: false,
    createdAt: { $lt: tenMinutesAgo },
  }).populate('show');

  for (const booking of expiredBookings) {
    const show = await Show.findById(booking.show._id);
    if (show) {
      booking.bookedSeats.forEach((seat) => {
        if (show.occupiedSeats[seat]?.toString() === booking.user.toString()) {
          delete show.occupiedSeats[seat];
        }
      });

      show.markModified('occupiedSeats');
      await show.save();
    }

    await booking.deleteOne(); // ❌ Remove expired booking
  }
};

export async function GET(req) {
  await connectDB();

  try {
    // ✅ Extract user ID from cookie token
    const userId = await verifyTokenFromCookie();

    // ✅ Cancel this user's expired unpaid bookings
    await cancelExpiredBookings(userId);

    // ✅ Get updated list of bookings
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: { path: 'movie' }
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Get User Bookings Error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
