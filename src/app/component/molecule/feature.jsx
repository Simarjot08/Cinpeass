

'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Blurcircle from '../atom/blurcircle';
import Moviecard from '../atom/moviecard';

function Feature() {
  const router = useRouter();
  const [shows, setShows] = useState([]); // ✅ initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleClick = () => {
    router.push('/movies');
  };



  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/auth/shows', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 🔐 to include JWT cookie
        });

        const result = await response.json();
      

        if (result.success && Array.isArray(result.movies)) {
          setShows(result.movies);
        } else {
          setError(result.message || 'Failed to fetch shows');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="px-6 md:px-16 lg:px-24 lg:py-8 xl:px-44 overflow-hidden bg-red-800/70">
      <div className="relative flex items-center justify-between pt-10 pb-10">
        <Blurcircle top="0" left="-10px" />
        <Blurcircle top="0" right="-80px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
        <button
          onClick={handleClick}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-orange-600 hover:text-md transition ease  "
        >
          View All
          <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5" />
        </button>
      </div>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
          {shows.slice(0, 4).map((movie) => (
            <Moviecard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10 mb-10 lg:mt-20">
        <button
          onClick={handleClick}
          className="px-10 py-3 text-sm bg-black/80 hover:bg-primary-dull transition   border-white border-1 rounded-md font-medium cursor-pointer">
          Show more
        </button>
      </div>
    </div>
  );
}

export default Feature;






