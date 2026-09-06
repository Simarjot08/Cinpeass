
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
