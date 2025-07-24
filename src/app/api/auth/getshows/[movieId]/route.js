



import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Movie from '@/app/lib/models/movieModel';
import Show from '@/app/lib/models/showmodel';

export async function GET(request, { params }) {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');

    const movieId = params.movieId;
    if (!movieId) {
      return NextResponse.json({ success: false, message: 'movieId is required' }, { status: 400 });
    }

    // 1. Check if movie exists
    let movie = await Movie.findById(movieId);
    if (!movie) {
      console.log('📦 Movie not found in DB. Fetching from TMDb...');

      const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`, {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!tmdbRes.ok) {
        const errorText = await tmdbRes.text();
        console.error(`❌ TMDb API failed for movieId ${movieId} - Status: ${tmdbRes.status}`);
        console.error('📝 Error Response:', errorText);
        return NextResponse.json(
          { success: false, message: `TMDb fetch failed for movieId ${movieId}` },
          { status: tmdbRes.status }
        );
      }

      const tmdbData = await tmdbRes.json();

      const castArray = tmdbData.credits?.cast?.slice(0, 8)?.map(c => ({
        name: c.name,
        character: c.character,
        profile_path: c.profile_path,
      })) || [];

      const genreArray = tmdbData.genres?.map(g => g.name) || [];

      movie = await Movie.create({
        _id: tmdbData.id.toString(),
        title: tmdbData.title,
        overview: tmdbData.overview,
        poster_path: tmdbData.poster_path,
        backdrop_path: tmdbData.backdrop_path,
        release_date: tmdbData.release_date,
        original_language: tmdbData.original_language,
        tagline: tmdbData.tagline,
        genres: genreArray,
        casts: castArray,
        vote_average: tmdbData.vote_average,
        runtime: tmdbData.runtime,
      });

      console.log('🎬 Movie saved to DB:', movie.title);
    } else {
      console.log('✅ Movie found in DB:', movie.title);
    }

    // 2. Fetch shows
    let shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    })
      .sort({ showDateTime: 1 })
      .select('showDateTime screen _id showPrice');

    // 3. If no shows found, create dummy shows
    if (shows.length === 0) {
      console.log('📅 No shows found, adding dummy shows...');

      const randomTimes = ['10:30', '13:45', '17:00', '20:15'];
      const dummyShows = [];

      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i); // today + i

        for (let time of randomTimes) {
          const [hours, minutes] = time.split(':');
          const showDateTime = new Date(date);
          showDateTime.setHours(+hours);
          showDateTime.setMinutes(+minutes);
          showDateTime.setSeconds(0);

          dummyShows.push({
            movie: movieId,
            showDateTime,
            screen: `Screen ${Math.floor(Math.random() * 3) + 1}`,
            showPrice: 250, // required field
          });
        }
      }

      await Show.insertMany(dummyShows);
      console.log('✅ Dummy shows inserted.');

      // Re-fetch shows
      shows = await Show.find({
        movie: movieId,
        showDateTime: { $gte: new Date() },
      })
        .sort({ showDateTime: 1 })
        .select('showDateTime screen _id showPrice');
    }

    // 4. Group by date, but limit to first 3 distinct dates
    const dateTime = {};
    const uniqueDates = new Set();

    for (const show of shows) {
      const dateKey = show.showDateTime.toISOString().slice(0, 10);

      if (!uniqueDates.has(dateKey)) {
        if (uniqueDates.size >= 3) break; // stop after 3 dates
        uniqueDates.add(dateKey);
        dateTime[dateKey] = [];
      }

      if (uniqueDates.has(dateKey)) {
        dateTime[dateKey].push({
          time: show.showDateTime.toISOString(),
          showId: show._id.toString(),
          screen: show.screen,
          showPrice: show.showPrice,
        });
      }
    }

    return NextResponse.json({
      success: true,
      movie: {
        _id: movie._id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        original_language: movie.original_language,
        tagline: movie.tagline,
        genres: movie.genres,
        casts: movie.casts,
        vote_average: movie.vote_average,
        runtime: movie.runtime,
      },
      dateTime,
    });

  } catch (error) {
    console.error('🔥 Error in GET /getshows/:movieId:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
