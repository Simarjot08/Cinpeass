
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Show from '@/app/lib/models/showmodel';

export async function GET() {
    
  await connectDB();

  try {
    const now = new Date();
const futureShows = await Show.find({ showDateTime: { $gte: now } });
console.log("Future shows:", futureShows);
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate('movie') 
      .sort({ showDateTime: 1 });

    // extract unique movies using Set
    const movieMap = new Map();
    shows.forEach(show => {
      const movieId = show.movie._id.toString();
      if (!movieMap.has(movieId)) {
        movieMap.set(movieId, show.movie); 
      }
    });

    return NextResponse.json({
      success: true,
      shows: Array.from(movieMap.values()), 
    });
  } catch (error) {
    console.error('Error fetching shows:', error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
