

import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Show from '@/app/lib/models/showmodel';
import Movie from '@/app/lib/models/movieModel';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';

// 🔁 Cancel expired unpaid bookings older than 10 minutes
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

    await booking.deleteOne();
  }
};

export async function GET(req) {
  await connectDB();

  try {
    const userId = await verifyTokenFromCookie();

    await cancelExpiredBookings(userId);

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      })
      .sort({ createdAt: -1 });

    // 📧 Send email for paid bookings that haven't been emailed yet
    for (const booking of bookings) {
      if (booking.isPaid && !booking.emailSent) {
        try {
          const emailRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendbookingemail`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId: booking._id }),
          });

          const emailData = await emailRes.json();

          if (emailRes.ok && emailData.success) {
            booking.emailSent = true;
            await booking.save();
          } else {
            console.error('❌ Failed to send email:', emailData.message || emailData.error);
          }
        } catch (err) {
          console.error('❌ Email sending error:', err.message);
        }
      }
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Get User Bookings Error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
