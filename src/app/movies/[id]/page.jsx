

// 'use client'
// import { useParams } from 'next/navigation'
// import React, { useEffect,useState } from 'react'
// import Link from 'next/link';
// import { dummyDateTimeData, dummyShowsData } from '../../../../public/data/assets';
// import Timeformat from '@/app/lib/timeformat/timeformat';
// import { HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react';
// import Dateselect from '@/app/component/molecule/Dateselect';
// import Moviecard from '@/app/component/atom/moviecard';
// import { useRouter } from 'next/navigation';
// import Loading from '@/app/component/atom/loading';


// function Moviedetail() {

//     const router = useRouter();
      
//         const handleclick = () => {
//           router.push('/movies');
//         };
      
//     const{id}=useParams();
//     const[show,setShow]=useState(null);

//     const getShow=async()=>{
//         const show=dummyShowsData.find(show=>show._id===id)
//         if(show){
//         setShow({
//             movie:show,
//             dateTime:dummyDateTimeData
//              })
//         }
      
//     }

   
//     useEffect(()=>{
//      getShow();
//     },[id]);
//   return show ? (
//     <>
//     <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50 bg-backdetail pb-26 rounded-xl'>
//         <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto overflow-hidden  rounded-xl'>
//          <img src={show.movie.poster_path} alt="img" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover hover:scale-[1.05] transition duration-300 ease-in-out'/>
//           <div className='relative flex flex-col gap-3'> 
//           <p className='text-primary'>English</p>
//           <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
//           <div className='flex items-centergap-2 text-gray-300'>
//             <StarIcon className="w-5 h-5 text-primary fill-primary" />
//             {show.movie.vote_average.toFixed(1)}  User Rating

//           </div>
//           <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
//             {show.movie.overview}</p>
         
//          <p>
//             {Timeformat(show.movie.runtime)} . {show.movie.genres.map(genre=>genre.name).join(" ")} .  {show.movie.release_date.split("-")[0]}
//          </p>
//          <div className='flex items-center flex-wrap gap-4 mt-4'>
//           <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
//             <PlayCircleIcon className="w-5 h-5" />
//             Watch Trailer</button>
//           <a href="#dateSelect" className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95">Buy Tickets</a>
//           <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
//             <HeartIcon className={`w-5 h-5`} ></HeartIcon>

//           </button>
//          </div>
         
//           </div>
//         </div>
        
//     </div>
//         <div className='bg-red-800/90 p-5 flex justify-center flex-col items-center'> 
//         <p className='font-bold  pt-3 pb-3 text-3xl'> Your Favourite Cast</p>
//         <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
//           <div className='flex items-center gap-4 w-max px-4 no-scrollbar' >
//             {show.movie.casts.slice(0,12).map((cast,index)=>(
//               <div key={index} className='flex flex-col items-center text-center'>
//                 <img src={cast.profile_path} alt={cast.name} className='rounded-full h-20 md:h-20 aspect-square object-cover border-2  mt-2 border-white hover:scale-[1.1] hover:shadow-sm hover:shadow-white transition-all ease '/>
//                  <p className="mt-3 text-sm">{cast.name}</p>
//                 </div>
                
//             ))}

//           </div>
//         </div>
//         </div>

//    <Dateselect dateTime={show.dateTime} id={id}/>
//    <div className="pl-[14%] bg-red-800/70 pt-2 mt-30 pb-8" >
//    <p className='text-2xl font-bold mt-20 mb-8'> You May Also Like
//    </p>
//   <div className='flex flex-wrap max-sm:justify-center gap-8'>
//     {dummyShowsData.slice(0,4).map((movie,index)=>(
//       <Moviecard key={index} movie={movie}/>
//     ))}

//   </div>
//   <div className="flex ml-[38%] mt-20">
//     <button onClick={handleclick} className='px-10 ml-0 py-3  text-sm bg-black/80 border-2 border-white  hover:bg-primary-dull transition rounded-md font-medium cursor-pointer '>
//       Show More</button></div>
//       </div>

//     </>
//   ):(
//     <div><Loading/></div>
//   )
// }

// export default Moviedetail
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react';
// import Loading from '@/app/component/atom/loading';
// import Dateselect from '@/app/component/molecule/Dateselect';
// import Moviecard from '@/app/component/atom/moviecard';
// import Timeformat from '@/app/lib/timeformat/timeformat';

// export default function Moviedetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [show, setShow] = useState(null);
//   const [favourites, setFavourites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchMovieDetail = async () => {
//     try {
//       const res = await fetch(`/api/auth/getshows/${id}`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await res.json();
//       if (data.success) {
//         setShow({ movie: data.movie, dateTime: data.dateTime });
//       }
//     } catch (err) {
//       console.error('Error fetching movie:', err);
//     }
//   };

//   const fetchFavourites = async () => {
//     try {
//       const res = await fetch('/api/user/getfavourite', {
//         method: 'GET',
//         credentials: 'include'
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFavourites(data.movies.map(m => m._id));
//       }
//     } catch (err) {
//       console.error('Error fetching favourites:', err);
//     }
//   };

//   const handleFavouriteToggle = async () => {
//     try {
//       const res = await fetch('/api/user/favourite', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ movieId: id })
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFavourites(prev =>
//           prev.includes(id)
//             ? prev.filter(mid => mid !== id)
//             : [...prev, id]
//         );
//       }
//     } catch (err) {
//       console.error('Error toggling favourite:', err);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       await Promise.all([fetchMovieDetail(), fetchFavourites()]);
//       setLoading(false);
//     };
//     load();
//   }, [id]);

//   const isFavourite = favourites.includes(id);

//   if (loading || !show) return <Loading />;

//   const { movie, dateTime } = show;

//   return (
//     <>
//       <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50 bg-backdetail pb-26 rounded-xl">
//         <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto overflow-hidden rounded-xl">
//           <img src={movie.poster_path} alt="img" className="rounded-xl h-104 max-w-70 object-cover hover:scale-[1.05] transition duration-300 ease-in-out" />
//           <div className="relative flex flex-col gap-3">
//             <p className="text-primary">English</p>
//             <h1 className="text-4xl font-semibold max-w-96 text-balance">{movie.title}</h1>
//             <div className="flex items-centergap-2 text-gray-300">
//               <StarIcon className="w-5 h-5 text-primary fill-primary" />
//               {movie.vote_average.toFixed(1)} User Rating
//             </div>
//             <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{movie.overview}</p>
//             <p>{Timeformat(movie.runtime)} · {movie.genres?.map(g => g.name).join(', ')} · {movie.release_date.split('-')[0]}</p>
//             <div className="flex items-center flex-wrap gap-4 mt-4">
//               <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
//                 <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
//               </button>
//               <a href="#dateSelect" className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95">Buy Tickets</a>
//               <button onClick={handleFavouriteToggle} className={`bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 ${isFavourite ? 'text-primary fill-primary' : 'text-white'}`}>
//                 <HeartIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-red-800/90 p-5 flex justify-center flex-col items-center">
//         <p className="font-bold pt-3 pb-3 text-3xl">Your Favourite Cast</p>
//         <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
//           <div className="flex items-center gap-4 w-max px-4 no-scrollbar">
//             {movie.casts?.slice(0, 12).map((cast, i) => (
//               <div key={i} className="flex flex-col items-center text-center">
//                 <img src={cast.profile_path} alt={cast.name} className="rounded-full h-20 aspect-square object-cover border-2 mt-2 border-white hover:scale-[1.1] hover:shadow-sm hover:shadow-white transition-all ease" />
//                 <p className="mt-3 text-sm">{cast.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Dateselect dateTime={dateTime} id={id} />

//       <div className="pl-[14%] bg-red-800/70 pt-2 mt-30 pb-8">
//         <p className="text-2xl font-bold mt-20 mb-8">You May Also Like</p>
//         <div className="flex flex-wrap max-sm:justify-center gap-8">
//           {[movie, ...favourites].slice(0, 4).map((m, i) => (
//             <Moviecard key={i} movie={m} />
//           ))}
//         </div>
//         <div className="flex ml-[38%] mt-20">
//           <button onClick={() => router.push('/movies')} className="px-10 py-3 text-sm bg-black/80 border-2 border-white hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">
//             Show More
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react';
// import Loading from '@/app/component/atom/loading';
// import Dateselect from '@/app/component/molecule/Dateselect';
// import Moviecard from '@/app/component/atom/moviecard';
// import Timeformat from '@/app/lib/timeformat/timeformat';

// const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || '';

// export default function Moviedetail() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [show, setShow] = useState(null);
//   const [favourites, setFavourites] = useState([]);
//   const [allMovies, setAllMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch movie details + showtimes grouped by date
//   const fetchMovieDetail = async () => {
//     try {
//       const res = await fetch(`/api/auth/getshows/${id}`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await res.json();
//       if (data.success) {
//         // Adjust poster_path and other images to full URL here
//         const movieWithFullImages = {
//           ...data.movie,
//           poster_path: IMAGE_BASE_URL + data.movie.poster_path,
//           backdrop_path: IMAGE_BASE_URL + data.movie.backdrop_path,
//           casts: data.movie.casts?.map(cast => ({
//             ...cast,
//             profile_path: cast.profile_path ? IMAGE_BASE_URL + cast.profile_path : ''
//           }))
//         };
//         setShow({ movie: movieWithFullImages, dateTime: data.dateTime });
//       }
//     } catch (err) {
//       console.error('Error fetching movie:', err);
//     }
//   };

//   // Fetch user's favourite movies IDs
//   const fetchFavourites = async () => {
//     try {
//       const res = await fetch('/api/user/getfavourite', {
//         method: 'GET',
//         credentials: 'include'
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFavourites(data.movies.map(m => m._id));
//       }
//     } catch (err) {
//       console.error('Error fetching favourites:', err);
//     }
//   };

//   // Fetch all upcoming movies (for "You May Also Like")
//   const fetchAllMovies = async () => {
//     try {
//       const res = await fetch('/api/auth/getshows', {
//         method: 'GET',
//         credentials: 'include'
//       });
//       const data = await res.json();
//       if (data.success) {
//         // Append full image URLs
//         const moviesWithFullImages = data.shows.map(movie => ({
//           ...movie,
//           poster_path: IMAGE_BASE_URL + movie.poster_path,
//           backdrop_path: IMAGE_BASE_URL + movie.backdrop_path,
//         }));
//         setAllMovies(moviesWithFullImages);
//       }
//     } catch (err) {
//       console.error('Error fetching all movies:', err);
//     }
//   };

//   // Toggle favourite state and call API
//   const handleFavouriteToggle = async () => {
//     try {
//       const res = await fetch('/api/user/favourite', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ movieId: id }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setFavourites(prev =>
//           prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
//         );
//       }
//     } catch (err) {
//       console.error('Error toggling favourite:', err);
//     }
//   };

//   useEffect(() => {
//     const load = async () => {
//       await Promise.all([fetchMovieDetail(), fetchFavourites(), fetchAllMovies()]);
//       setLoading(false);
//     };
//     load();
//   }, [id]);

//   const isFavourite = favourites.includes(id);

//   if (loading || !show) return <Loading />;

//   const { movie, dateTime } = show;

//   // Filter out current movie from "You May Also Like"
//   const youMayAlsoLike = allMovies.filter(m => m._id !== id).slice(0, 4);

//   return (
//     <>
//       <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50 bg-backdetail pb-26 rounded-xl">
//         <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto overflow-hidden rounded-xl">
//           <img
//             src={movie.poster_path}
//             alt={movie.title}
//             className="rounded-xl h-104 max-w-70 object-cover hover:scale-[1.05] transition duration-300 ease-in-out"
//           />
//           <div className="relative flex flex-col gap-3">
//             <p className="text-primary">English</p>
//             <h1 className="text-4xl font-semibold max-w-96 text-balance">{movie.title}</h1>
//             <div className="flex items-center gap-2 text-gray-300">
//               <StarIcon className="w-5 h-5 text-primary fill-primary" />
//               {movie.vote_average.toFixed(1)} User Rating
//             </div>
//             <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{movie.overview}</p>
//             <p>
//               {Timeformat(movie.runtime)} · {movie.genres?.map(g => g.name).join(', ')} · {movie.release_date.split('-')[0]}
//             </p>
//             <div className="flex items-center flex-wrap gap-4 mt-4">
//               <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
//                 <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
//               </button>
//               <a href="#dateSelect" className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95">
//                 Buy Tickets
//               </a>
//               <button
//                 onClick={handleFavouriteToggle}
//                 className={`bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 ${
//                   isFavourite ? 'text-primary fill-primary' : 'text-white'
//                 }`}
//               >
//                 <HeartIcon className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-red-800/90 p-5 flex justify-center flex-col items-center">
//         <p className="font-bold pt-3 pb-3 text-3xl">Your Favourite Cast</p>
//         <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
//           <div className="flex items-center gap-4 w-max px-4 no-scrollbar">
//             {movie.casts?.slice(0, 12).map((cast, i) => (
//               <div key={i} className="flex flex-col items-center text-center">
//                 <img
//                   src={cast.profile_path}
//                   alt={cast.name}
//                   className="rounded-full h-20 aspect-square object-cover border-2 mt-2 border-white hover:scale-[1.1] hover:shadow-sm hover:shadow-white transition-all ease"
//                 />
//                 <p className="mt-3 text-sm">{cast.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Dateselect dateTime={dateTime} id={id} />

//       <div className="pl-[14%] bg-red-800/70 pt-2 mt-30 pb-8">
//         <p className="text-2xl font-bold mt-20 mb-8">You May Also Like</p>
//         <div className="flex flex-wrap max-sm:justify-center gap-8">
//           {youMayAlsoLike.map((m, i) => (
//             <Moviecard key={m._id} movie={m} />
//           ))}
//         </div>
//         <div className="flex ml-[38%] mt-20">
//           <button
//             onClick={() => router.push('/movies')}
//             className="px-10 py-3 text-sm bg-black/80 border-2 border-white hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
//           >
//             Show More
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeartIcon, PlayCircleIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import Loading from '@/app/component/atom/loading';
import Dateselect from '@/app/component/molecule/Dateselect';
import Moviecard from '@/app/component/atom/moviecard';
import Timeformat from '@/app/lib/timeformat/timeformat';
import toast from 'react-hot-toast';

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

export default function Moviedetail() {
  const { id } = useParams();
  const router = useRouter();

  const [show, setShow] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetail = async () => {
    try {
      const res = await fetch(`/api/auth/getshows/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setShow({ movie: data.movie, dateTime: data.dateTime });
      }
    } catch (err) {
      console.error('Error fetching movie:', err);
    }
  };

  const fetchFavourites = async () => {
    try {
      const res = await fetch('/api/user/getfavourite', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setFavourites(data.movies.map(m => m._id));
      }
    } catch (err) {
      console.error('Error fetching favourites:', err);
    }
  };
  const fetchAllMovies = async () => {
  try {
    const res = await fetch('/api/auth/getshows', {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
      const filtered = data.shows.filter(m => m._id !== id && m.poster_path);
      setAllMovies(filtered);
    }
  } catch (err) {
    console.error('Error fetching other movies:', err);
  }
};

  
const handleFavouriteToggle = async () => {
  try {
    const checkAuth = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    });
    const authData = await checkAuth.json();

    if (!authData.loggedIn) {
      toast.error('Login required to add favourites');
      return;
    }

    const res = await fetch('/api/user/favourite', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie._id }),
    });

    const data = await res.json();
    if (data.success) {
      const isNowFavourite = !favourites.includes(id);
      setFavourites(prev =>
        isNowFavourite ? [...prev, id] : prev.filter(mid => mid !== id)
      );

      // 🔁 Notify navbar to re-check
      window.dispatchEvent(new Event('favouritesChanged'));

      toast.success(isNowFavourite ? 'Movie added to favourites' : 'Removed from favourites');
    } else {
      toast.error(data.message || 'Error toggling favourite');
    }
  } catch (err) {
    toast.error('Error toggling favourite');
    console.error(err);
  }
};



  useEffect(() => {
    const load = async () => {
      await Promise.all([fetchMovieDetail(), fetchFavourites(), fetchAllMovies()]);
      setLoading(false);
    };
    load();
  }, [id]);

  const isFavourite = favourites.includes(id);
  const { movie, dateTime } = show || {};

  if (loading || !movie) return <Loading />;

  return (
    <>
      <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50 bg-backdetail pb-26 rounded-xl">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto overflow-hidden rounded-xl">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : ''}
            alt={movie.title}
            className="rounded-xl h-104 max-w-70 object-cover hover:scale-[1.05] transition duration-300 ease-in-out"
          />
          <div className="relative flex flex-col gap-3">
            <p className="text-primary">{movie.original_language?.toUpperCase()}</p>
            <h1 className="text-4xl font-semibold max-w-96 text-balance">{movie.title}</h1>
            <div className="flex items-centergap-2 text-gray-300">
              <StarIcon className="w-5 h-5 text-primary fill-primary" />
              {movie.vote_average.toFixed(1)} User Rating
            </div>
            <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{movie.overview}</p>
            <p>
              {Timeformat(movie.runtime)} · {movie.genres?.map(g => g.name).join(', ')} ·{' '}
              {movie.release_date?.split('-')[0]}
            </p>
            <div className="flex items-center flex-wrap gap-4 mt-4">
              <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
                <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
              </button>
              <a
                href="#dateSelect"
                className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                Buy Tickets
              </a>
              {/* <button
                onClick={handleFavouriteToggle}
                className={`bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95 ${
                  isFavourite ? 'text-primary fill-primary' : 'text-white'
                }`}
              >
                <HeartIcon className="w-5 h-5" />
              </button> */}
              <button onClick={handleFavouriteToggle}
 className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95"
>
  <HeartIcon
    className={`w-5 h-5 ${isFavourite ? 'text-red-600 fill-red-600' : 'text-white'}`}
    fill={isFavourite ? 'currentColor' : 'none'}
  />
</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="bg-red-800/90 p-5 flex justify-center flex-col items-center">
        <p className="font-bold pt-3 pb-3 text-3xl">Your Favourite Cast</p>
        <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
          <div className="flex items-center gap-4 w-max px-4 no-scrollbar">
  
            {movie.casts
        ?.slice(0, 12)
         .filter(cast => cast.profile_path) // ✅ Filter only those with images
          .map((cast, i) => (
    <div key={i} className="flex flex-col items-center text-center">
      <img
        src={`${IMAGE_BASE}${cast.profile_path}`}
        alt={cast.name}
        className="rounded-full h-20 aspect-square object-cover border-2 mt-2 border-white hover:scale-[1.1] hover:shadow-sm hover:shadow-white transition-all ease"
      />
      <p className="mt-3 text-sm">{cast.name}</p>
    </div>
))}

          </div>
        </div>
      </div>

      <Dateselect dateTime={dateTime} id={id} />

      {/* You May Also Like */}
      <div className="pl-[14%] bg-red-800/70 pt-2 mt-30 pb-8">
        <p className="text-2xl font-bold mt-20 mb-8">You May Also Like</p>
        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {allMovies.slice(0, 4).map((movie, index) => (
            <Moviecard key={index} movie={movie} />
          ))}
        </div>
        <div className="flex ml-[38%] mt-20">
          <button
            onClick={() => router.push('/movies')}
            className="px-10 py-3 text-sm bg-black/80 border-2 border-white hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show More
          </button>
        </div>
      </div>
    </>
  );
}
