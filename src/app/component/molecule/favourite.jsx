// import React from 'react'
// import { dummyShowsData } from '../../../../public/data/assets'
// import Moviecard from '../atom/moviecard'
// const Favourite=()=> {
//   return dummyShowsData.length>0 ? (
//     <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44  min-h[100vh] bg-blend-lighten '> 
//         <h1 className='text-lg font-medium my-4'>Your Favourite Movies</h1>
//         <div className='flex flex-wrap max-sm:justify-center gap-8 lg:h-[100%]'>
//             {dummyShowsData.map((movie)=>(
//                 <Moviecard movie={movie} key={movie._id} />
//             ))}</div>
//             </div>

//   ):(
//     <div className='flex flex-col items-center justify-center h-screen'>
// <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
//     </div>
//   )
// }

// export default Favourite
'use client';

import React, { useEffect, useState } from 'react';
import Moviecard from '../atom/moviecard';

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch('/api/user/getfavourite', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // send cookies for JWT token auth
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.movies)) {
          setFavourites(data.movies);
        } else {
          setError(data.message || 'Failed to load favourites');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-white">Loading your favourites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return favourites.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 min-h-[100vh] bg-blend-lighten">
      <h1 className="text-lg font-medium my-4 text-white">Your Favourite Movies</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8 lg:h-[100%]">
        {favourites.map((movie) => (
          <Moviecard movie={movie} key={movie._id || movie.id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center text-white">No Favourite Movies</h1>
    </div>
  );
};

export default Favourite;
