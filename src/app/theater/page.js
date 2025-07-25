// 'use client';

// import React, { useEffect, useState } from 'react';
// import Moviecard from '../atom/moviecard';
// import Loading from '../atom/loading';

// const Theater = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTrendingMovies = async () => {
//       try {
//         const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
//             accept: 'application/json',
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch trending movies');

//         const data = await res.json();
//         const trendingMovies = data.results || [];

//         setMovies(trendingMovies);
//       } catch (err) {
//         console.error(err);
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrendingMovies();
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );
//   }

//   return movies.length > 0 ? (
//     <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 min-h-[100vh] bg-blend-lighten">
//       <h1 className="text-lg font-medium my-4">Trending Movies</h1>
//       <div className="flex flex-wrap max-sm:justify-center gap-8 lg:h-[100%]">
//         {movies.map((movie) => (
//           <Moviecard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold text-center">No Movies Available</h1>
//     </div>
//   );
// };

// export default Theater;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Moviecard from '../component/atom/moviecard';
// import Loading from '../component/atom/loading';

// const Theater = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

// //   const fetchTrendingMovies = async () => {
// //     try {
// //       const res = await fetch('https://api.themoviedb.org/3/trending/movie/week', {
// //         method: 'GET',
// //         headers: {
// //           Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
// //           Accept: 'application/json',
// //         },
// //         next: { revalidate: 3600 }, // cache for 1 hour in Next.js
// //       });

// //       if (!res.ok) throw new Error('Failed to fetch trending movies');

// //       const data = await res.json();
// //       setMovies(data.results || []);
// //     } catch (err) {
// //       console.error('❌ TMDB fetch error:', err);
// //       setError(err.message || 'Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };




// const fetchTrendingMovies = async () => {
//   try {
//     const res = await fetch('/api/trending'); // now from your backend route
//     const result = await res.json();

//     if (!result.success) throw new Error(result.message || 'Failed to load trending movies');

//     setMovies(result.movies || []);
//   } catch (err) {
//     console.error('❌ TMDB fetch error:', err);
//     setError(err.message || 'Something went wrong');
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchTrendingMovies();
//   }, []);

//   if (loading) return <Loading />;

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );
//   }

//   return movies.length > 0 ? (
//     <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 min-h-[100vh] bg-blend-lighten">
//       <h1 className="text-lg font-medium my-4">Trending This Week</h1>
//       <div className="flex flex-wrap max-sm:justify-center gap-8 lg:h-[100%]">
//         {movies.map((movie) => (
//           <Moviecard
//             key={movie.id}
//             movie={{
//               _id: movie.id,
//               title: movie.title,
//               overview: movie.overview,
//               posterPath: movie.poster_path,
//               releaseDate: movie.release_date,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold text-center">No Trending Movies Found</h1>
//     </div>
//   );
// };

// export default Theater;

import React from 'react'
import Theaters from '../component/molecule/theaters'


function Theater() {
  return (
   <div className="relative  moviesbody overflow-hidden">
  <div>
      <Theaters/>
  </div>


  {/* Top gradient */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />

  {/* Bottom gradient */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />



</div>
  )
}

export default Theater



