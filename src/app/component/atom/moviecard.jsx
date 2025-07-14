// 'use client';

// import React from 'react'
// import { useRouter } from 'next/navigation';
// import { StarIcon } from 'lucide-react';
// import Timeformat from '@/app/lib/timeformat/timeformat';


// function Moviecard({movie}) {
      
//       const router = useRouter();
        
//           const handleClick = async () => {
//             router.push(`/movies/${movie._id}`);
//             window.scrollTo(0,0);
           

  
//           };

//   return (
//     <div className='flex flex-col justify-between p-3 bg-black/80 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
//         <img onClick={handleClick}
//         src={movie.backdrop_path} alt="" className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'/>
      
//       <p className='font-semibold mt-2 truncate'>{movie.title}</p>
//      <p className='text-sm text-gray-400 mt-2'>
//         {new Date(movie.release_date).getFullYear()} . {movie.genres.slice(0,2).map(genre=>genre.name).join("|")}.{Timeformat(movie.runtime)}
//      </p>
//      <div className='flex items-center justify-between mt-4 pb-3'>
//         <button  onClick={handleClick} className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
//             Buy Tickets
//         </button>
//         <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
//             <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//             {movie.vote_average.toFixed(1)};
//         </p>
//      </div>
   
//     </div>
//   )
// }

// export default Moviecard
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon } from 'lucide-react';
import Timeformat from '@/app/lib/timeformat/timeformat';

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function Moviecard({ movie }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${movie.id || movie._id}`);
    window.scrollTo(0, 0);
  };

  const genreNames = (movie.genre_ids || [])
    .slice(0, 2)
    .map((id) => genreMap[id])
    .filter(Boolean)
    .join(" | ");

  return (
    <div className='flex flex-col justify-between p-3 bg-black/80 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
      {/* <img
        onClick={handleClick}
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title || 'movie poster'}
        className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
      /> */}

<img
  onClick={handleClick}
  src={
    movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : null
  }
  alt={movie.title || 'movie poster'}
  className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer'
/>
      <p className='font-semibold mt-2 truncate'>{movie.title || 'Untitled'}</p>
      <p className='text-sm text-gray-400 mt-2'>
        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} . {genreNames || 'Unknown'} . {movie.runtime ? Timeformat(movie.runtime) : '—'}
      </p>
      <div className='flex items-center justify-between mt-4 pb-3'>
        <button
          onClick={handleClick}
          className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        >
          Buy Tickets
        </button>
        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary' />
          {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}
        </p>
      </div>
    </div>
  );
}

export default Moviecard;
