



'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeartIcon, PlayCircleIcon, StarIcon, X } from 'lucide-react';
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
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchMovieDetail = async () => {
    try {
      const res = await fetch(`/api/auth/getshows/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setShow({ movie: data.movie, dateTime: data.dateTime || {} });
      } else {
        toast.error(data.message || 'Failed to load movie details');
      }
    } catch (err) {
      console.error('Error fetching movie:', err);
      toast.error('Error fetching movie details');
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

  const fetchTrailer = async () => {
    try {
      const res = await fetch(`/api/trailer/${id}`);
      const data = await res.json();

      if (data.success && data.youtubeUrl) {
        const embedUrl = data.youtubeUrl.replace('watch?v=', 'embed/');
        setTrailerUrl(embedUrl);
        setShowTrailer(true);
      } else {
        toast.error('Trailer not found');
      }
    } catch (err) {
      toast.error('Error fetching trailer');
      console.error(err);
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
        body: JSON.stringify({ movieId: id }),
      });

      const data = await res.json();
      if (data.success) {
        const isNowFavourite = !favourites.includes(id);
        setFavourites(prev =>
          isNowFavourite ? [...prev, id] : prev.filter(mid => mid !== id)
        );

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
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto overflow-hidden rounded-xl ml-5 lg:ml-0">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : ''}
            alt={movie.title}
            className="rounded-xl h-104 max-w-70 object-cover hover:scale-[1.05] transition duration-300 ease-in-out"
          />
          <div className="relative flex flex-col gap-3">
            <p className="text-primary">{movie.original_language?.toUpperCase()}</p>
            <h1 className="text-2xl lg:text-4xl font-semibold max-w-96 text-balance">{movie.title}</h1>
            <div className="flex items-center gap-2 text-gray-300">
              <StarIcon className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              {movie.vote_average?.toFixed(1)} User Rating
            </div>
            <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{movie.overview}</p>
           
                   
              <p>
  {Timeformat(movie.runtime)} ·{' '}
  {movie.genres && movie.genres.length > 0
    ? movie.genres.map(g => g.name)
    : 'No genres'} 
  {movie.release_date?.split('-')[0]}
</p>




            <div className="flex items-center flex-wrap gap-4 mt-4">
              <button
                onClick={fetchTrailer}
                className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
              </button>
              <a
                href="#dateSelect"
                className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
              >
                Buy Tickets
              </a>
              <button
                onClick={handleFavouriteToggle}
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

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl px-4">
            <iframe
              className="w-full aspect-video rounded-xl"
              src={trailerUrl}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-red-800/90 p-4 sm:p-6 lg:p-5 flex justify-center flex-col items-center">
  <p className="font-bold pt-3 pb-3 text-center text-xl sm:text-2xl lg:text-3xl">Your Favourite Cast</p>

  <div className="overflow-x-auto no-scrollbar w-full mt-6 sm:mt-8 pb-4 md:justify-center md:flex">
    <div className="flex items-center gap-3 sm:gap-4 lg:gap-4 w-max px-3 sm:px-4">
      {movie.casts
        ?.slice(0, 12)
        .filter(cast => cast.profile_path)
        .map((cast, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center min-w-[64px] sm:min-w-[80px] lg:min-w-[100px]"
          >
            <img
              src={`${IMAGE_BASE}${cast.profile_path}`}
              alt={cast.name}
              className="rounded-full object-cover border-2 mt-2 border-white
                         hover:scale-[1.1] hover:shadow-sm hover:shadow-white
                         transition-all ease-in-out duration-200
                         h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            />
            <p className="mt-2 text-xs sm:text-sm lg:text-base">{cast.name}</p>
          </div>
        ))}
    </div>
  </div>
</div>


      <Dateselect dateTime={dateTime} id={id} />

      <div className="pl-0 lg:pl-[14%] bg-red-800/70 pt-2 lg:mt-30 mt-20 pb-8">
        <p className="text-2xl pl-10 lg:pl-0 font-bold lg:mt-20  mt-10 mb-8">You May Also Like</p>
        <div className="flex flex-wrap max-sm:justify-center lg:gap-8 gap-5">
          {allMovies.slice(0, 4).map((movie, index) => (
            <Moviecard key={index} movie={movie} />
          ))}
        </div>
        <div className="flex lg:ml-[38%] ml-30  mt-10 lg:mt-20">
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
