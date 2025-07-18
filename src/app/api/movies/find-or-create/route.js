

// 
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Movie from '@/app/lib/models/movieModel';
import { fetchMovieDetailsFromTMDB } from '@/app/lib/utils/fetch/fetchTmDB';

export async function POST(req) {
  try {
    await connectDB();
    const { tmdbId, title } = await req.json();

    if (!tmdbId && !title) {
      return NextResponse.json({ success: false, message: 'Missing tmdbId or title' }, { status: 400 });
    }

    // 1️⃣ Try to find the movie by tmdbId field (not _id!)
    let movie = null;
    if (tmdbId) {
      movie = await Movie.findOne({ _id: tmdbId.toString() }); // still okay, as you save _id = tmdbId
    }

    // 2️⃣ Try by title (case-insensitive match)
    if (!movie && title) {
      movie = await Movie.findOne({ title: new RegExp(`^${title}$`, 'i') });
    }

    // 3️⃣ If movie found, return it
    if (movie) {
      return NextResponse.json({ success: true, movie });
    }

    // 4️⃣ If not found, use helper to fetch from TMDB
    const movieData = await fetchMovieDetailsFromTMDB(title);
    if (!movieData) {
      return NextResponse.json({ success: false, message: 'TMDB fetch failed' });
    }

    // 5️⃣ Create and save movie
    const newMovie = new Movie({
      _id: movieData._id,
      ...movieData,
    });

    await newMovie.save();

    return NextResponse.json({ success: true, movie: newMovie });
  } catch (error) {
    console.error('Error in find-or-create:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
