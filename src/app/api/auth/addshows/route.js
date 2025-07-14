import { NextResponse } from 'next/server';
import axios from 'axios';
import Movie from '@/app/lib/models/movieModel';
import Show from '@/app/lib/models/showmodel';
import { connectDB } from '@/app/lib/config/db';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { movieId, showInput, showPrice } = body;

    if (!movieId || !showInput || !Array.isArray(showInput) || !showPrice) {
      return NextResponse.json(
        { success: false, message: "Invalid input data" },
        { status: 400 }
      );
    }

    let movie = await Movie.findById(movieId);

    if (!movie) {
      try {
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
          }),
        ]);

        const movieApiData = movieDetailsResponse.data;
        const movieCreditsData = movieCreditsResponse.data;

        const movieDetails = {
          _id: movieId,
          title: movieApiData.title,
          overview: movieApiData.overview,
          poster_path: movieApiData.poster_path,
          backdrop_path: movieApiData.backdrop_path,
          genres: movieApiData.genres,
          casts: movieCreditsData.cast,
          release_date: movieApiData.release_date,
          original_language: movieApiData.original_language,
          tagline: movieApiData.tagline || " ",
          vote_average: movieApiData.vote_average,
          runtime: movieApiData.runtime,
        };

        movie = await Movie.create(movieDetails);
      } catch (tmdbError) {
        console.error("TMDB API fetch error:", tmdbError.response?.data || tmdbError.message);
        return NextResponse.json(
          { success: false, message: "Failed to fetch movie details from TMDB" },
          { status: 500 }
        );
      }
    }

    const showsToCreate = [];

    showInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = time.length === 5 ? `${showDate}T${time}:00` : `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    return NextResponse.json({ success: true, message: "Shows added successfully" });
  } catch (error) {
    console.error("Error in addshow:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


