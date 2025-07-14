
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Show from '@/app/lib/models/showmodel';
import User from '@/app/lib/models/userModel';
import Movie from '@/app/lib/models/movieModel';

export async function GET() {
  try {
    await connectDB();

    // Get all paid bookings
    const bookings = await Booking.find({ isPaid: true });

    // Get active shows with future dates & populate movie
    // const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');
     
 const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');

// Filter to keep only unique movies with posters
const movieMap = new Map();

for (const show of shows) {
  const movie = show.movie;

  // Skip if movie is null or has no poster
  if (!movie || !movie.poster_path) continue;

  const movieId = movie._id.toString();

  // Only keep the first show per unique movie
  if (!movieMap.has(movieId)) {
    movieMap.set(movieId, show);
  }
}

const activeShows = Array.from(movieMap.values());

    // Get total user count
    const totalUser = await User.countDocuments();

  

    const dashboardData = {
  totalBookings: bookings.length,
  totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
  activeShows,
  totalUser,
};

    return NextResponse.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

