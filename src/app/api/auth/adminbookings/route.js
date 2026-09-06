
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';          // Your DB connection
import Booking from '@/app/lib/models/bookingModel';// Booking model
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';// Your verify token

export async function GET(req) {
  try {
    await connectDB();

    
    const userId = await verifyTokenFromCookie();

    
    const bookings = await Booking.find({})
      .populate('user','email')
      .populate({
        path: 'show',
        populate: { path: 'movie' }
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error in getAllBookings:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
