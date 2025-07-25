'use client';

import React, { useEffect, useState } from 'react';
import Moviecard from '../atom/moviecard';
import Loading from '../atom/loading';

const Theaters= () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/trending', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // if you store JWT token in cookies
        });

        const result = await res.json();
        if (result.success && Array.isArray(result.movies)) {
          setMovies(result.movies);
        } else {
          setError(result.message || 'Failed to fetch movies');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    
    return (
      // <div className="flex flex-col items-center justify-center h-screen">
      //   <p className="text-lg">Loading movies...</p>
      // </div>
      <Loading/>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return movies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 min-h-[100vh] bg-blend-lighten">
      <h1 className="text-lg font-medium my-6">Trending in Theaters</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8 lg:h-[100%]">
        {movies.map((movie) => (
          <Moviecard movie={movie} key={movie.id || movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No Movies Available</h1>
    </div>
  );
};

export default Theaters;
