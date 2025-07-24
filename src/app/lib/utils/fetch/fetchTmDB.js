
// export async function fetchMovieDetailsFromTMDB(title) {
//   const apiKey = process.env.TMDB_API_KEY;
//   const query = encodeURIComponent(title);

//   // First search the movie by title
//   const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
//   const searchRes = await fetch(searchUrl);
//   const searchData = await searchRes.json();
//   const movie = searchData?.results?.[0];
//   if (!movie) return null;

//   // Then get full movie details including credits
//   const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits`;
//   const detailsRes = await fetch(detailsUrl);
//   const details = await detailsRes.json();

//   return {
//     _id: movie.id.toString(), // Required for your schema
//     title: movie.title,
//     overview: movie.overview,
//     poster_path: movie.poster_path,
//     backdrop_path: movie.backdrop_path,
//     release_date: movie.release_date,
//     original_language: movie.original_language,
//     tagline: details.tagline || '',
//     genres: details.genres?.map(g => g.name) || [],
//     casts: details.credits?.cast?.slice(0, 5).map(c => c.name) || [],
//     vote_average: movie.vote_average,
//     runtime: details.runtime || 0,
//   };
// }


// // utils/fetchTmDB/fetchTmDb.js
// export async function fetchMovieDetailsFromTMDB(title) {
//   const apiKey = process.env.TMDB_API_KEY;
//   const query = encodeURIComponent(title);

//   // Search by title
//   const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
//   const searchRes = await fetch(searchUrl);
//   const searchData = await searchRes.json();
//   const movie = searchData?.results?.[0];
//   if (!movie) return null;

//   // Get full movie details
//   const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits`;
//   const detailsRes = await fetch(detailsUrl);
//   const details = await detailsRes.json();

//   return {
//     _id: movie.id.toString(),
//     title: movie.title,
//     overview: movie.overview || '',
//     poster_path: movie.poster_path || '',
//     backdrop_path: movie.backdrop_path || '',
//     release_date: movie.release_date || '',
//     original_language: movie.original_language || '',
//     tagline: details.tagline || '',
//     genres: details.genres?.map(g => g.name) || [],
//     casts: details.credits?.cast?.slice(0, 5).map(c => c.name) || [],
//     vote_average: movie.vote_average || 0,
//     runtime: details.runtime || 0,
//   };
// }

// export async function fetchMovieDetailsFromTMDB(title) {
//   const apiKey = process.env.TMDB_API_KEY;
//   const query = encodeURIComponent(title);

//   // 1️⃣ Search movie by title
//   const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
//   console.log(searchUrl);
//   const searchRes = await fetch(searchUrl);
//   const searchData = await searchRes.json();

//   const movie = searchData?.results?.[0];

//   if (!movie || !movie.id) {
//     console.warn('TMDB search failed for:', title);
//     return null;
//   }

//   // 2️⃣ Fetch full movie details using movie.id
//   const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=credits`;
//   const detailsRes = await fetch(detailsUrl);
//   const details = await detailsRes.json();

//   if (!details || details.success === false) {
//     console.warn('TMDB details fetch failed for ID:', movie.id);
//     return null;
//   }

//   // 3️⃣ Return structured data
//   return {
//     _id: movie.id.toString(),
//     title: movie.title,
//     overview: movie.overview || '',
//     poster_path: movie.poster_path || '',
//     backdrop_path: movie.backdrop_path || '',
//     release_date: movie.release_date || '',
//     original_language: movie.original_language || '',
//     tagline: details.tagline || '',
//     genres: details.genres?.map(g => g.name) || [],
//     casts: details.credits?.cast?.slice(0, 5).map(c => c.name) || [],
//     vote_average: movie.vote_average || 0,
//     runtime: details.runtime || 0,
//   };
// }
export async function fetchMovieDetailsFromTMDB(title) {
  try {
    // Step 1: Search by title
    const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const searchData = await searchResponse.json();

    if (!searchResponse.ok || !searchData.results || searchData.results.length === 0) {
      console.error(`❌ TMDB search failed for "${title}":`, searchData);
      return null;
    }

    const movieId = searchData.results[0].id;

    // Step 2: Fetch full movie details
    const detailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const movie = await detailResponse.json();

    if (!detailResponse.ok || !movie) {
      console.error(`❌ Failed to fetch full details for movie ID ${movieId}`);
      return null;
    }

    return {
      _id: movie.id,
      tmdbId: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      releaseDate: movie.release_date,
      genreIds: movie.genres.map((g) => g.id), // genres is an array of objects
      runtime: movie.runtime,
      voteAverage: movie.vote_average,
    };
  } catch (error) {
    console.error('❌ Error fetching movie from TMDB:', error);
    return null;
  }
}
