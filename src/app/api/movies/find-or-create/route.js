

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

    //  find the movie by tmdbId field
    let movie = null;
    if (tmdbId) {
      movie = await Movie.findOne({ _id: tmdbId.toString() }); 
    }

    // Try by title
    if (!movie && title) {
      movie = await Movie.findOne({ title: new RegExp(`^${title}$`, 'i') });
    }

    //  movie found, return it
    if (movie) {
      return NextResponse.json({ success: true, movie });
    }

    const movieData = await fetchMovieDetailsFromTMDB(title);
    if (!movieData) {
      return NextResponse.json({ success: false, message: 'TMDB fetch failed' });
    }

    // Create and save movie
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
