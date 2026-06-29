

import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';  
import Show from '@/app/lib/models/showmodel';

export async function GET() {
  try {
    await connectDB();

    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate('movie')
      .sort({ showDateTime: 1 });
      
  
    const movieMap = new Map();

    for (const show of shows) {
      const movie = show.movie;

      if (!movie || !movie.poster_path) continue;

      const movieId = movie._id.toString();
      if (!movieMap.has(movieId)) {
        movieMap.set(movieId, show);
      }
    }

    const uniqueShows = Array.from(movieMap.values());

    return NextResponse.json({ success: true, shows:uniqueShows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

