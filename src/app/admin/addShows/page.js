"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { dummyShowsData } from '../../../../public/data/assets';
import Loading from '@/app/component/atom/loading';
import Title from '@/app/component/atom/admin/title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { Kconvertor } from '@/app/lib/convertor/isconvertor';
import toast from 'react-hot-toast';



function Page() {
  const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
  const[selectedMovie,setSelectedMovie]=useState(null);
  const[dateTimeSelector,setDateTimeSelection]=useState({});
  const[dateTimeInput,setDateTimeInput]=useState("");
  const[showPrice,setShowPrice]=useState("");

  const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;


    useEffect(() => {
    const fetchNowPlayingMovies = async () => {
    try {
      const res = await fetch('/api/auth/shows', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNowPlayingMovies(data.movies);
      } else {
        console.error('Failed to fetch now playing movies');
      }
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  fetchNowPlayingMovies();

}, []);



const handleAddShow = async () => {
  if (!selectedMovie || !showPrice || Object.keys(dateTimeSelector).length === 0) {
    return toast.error("Please fill all required fields!");
  }

  const showInput = Object.entries(dateTimeSelector).map(([date, time]) => ({
    date,
    time,
  }));

  try {
    const res = await fetch('/api/auth/addshows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        movieId: selectedMovie,
        showInput,
        showPrice,
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      toast.success("Show added successfully!");
      // Reset form
      setSelectedMovie(null);
      setDateTimeInput('');
      setDateTimeSelection({});
      setShowPrice('');
    } else {
      toast.error(data.message || "Failed to add show");
    }
  } catch (error) {
    console.error('Error adding show:', error);
    toast.error("Something went wrong while adding the show.");
  }
};



  const handleDateTimeAdd=()=>{
    if(!dateTimeInput)
      return;
    const[date,time]=dateTimeInput.split("T");
    if(!date || !time) return;

    // to store selected date and time

    setDateTimeSelection((prev)=>{
      const times=prev[date] || [];
      if(!times.includes(time)){
        return{...prev,[date]:[...times,time]};
      }
      return prev;
    })
  };

  const handleRemoveTime=(date,time)=>{
    setDateTimeSelection((prev)=>{
      const filteredTimes=prev[date].filter((t)=>t!==time);
      if(filteredTimes.length===0)
      {
        const{[date]:_,...rest}=prev;
        return rest;
      }
      return{
        ...prev,
        [date]:filteredTimes,
      };
    });
  };



  return nowPlayingMovies.length>0 ? (
    <>
    <Title text1="Add" text2="Shows"/>
    <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
    <div className='overflow-x-auto pb-4 mt-8'>
      <div className='group flex flex-wrap gap-2 mt-4 w-max'>
        {nowPlayingMovies.map((movie)=>(
          <div key={movie.id} onClick={()=>setSelectedMovie(movie.id)}
           className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}>
            <div className='relative rounded-lg overflow-hidden'>
              <img  src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title}  className='w-full object-cover brightness-90'/>
              <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
              <p className='flex items-center gap-1 text-gray-400'>
                <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                {movie.vote_average.toFixed(1)}
              </p>
              <p className='text-gray-300'>
                {Kconvertor(movie.vote_count)} Votes
              </p>
              </div>

              </div>

              {selectedMovie === movie.id &&(
                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                  <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>
                  </div>
              ) }
              <p className='font-medium truncate'>{movie.title}</p>
              <p className='text-gray-400 text-sm'>{movie.release_date}</p>

            </div>
        ))}
      </div>
    </div>
    {/* show price input */}
    <div className='mt-8'>
      <label className='block text-sm font-medium mb-2'>Show Price</label>
      <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
        <p className='text-gray-400 text-sm'> $ </p>
        <input min={0} type="number" value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} placeholder="Enter Show Price" className='outline-none'/>

      </div>
    </div>


    {/* DAte & time selection */}

    <div className='mt-6'>
      <label className='block text-sm font-medium mb-2'>
        Select Date and Time
      </label>
      <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
        <input type="datetime-local" value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)} className='outline-none rounded-md'/>
        <button onClick={handleDateTimeAdd}  className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>
        Add Time
        </button>
      </div>
    </div>

    {/* display selected time */}
    {Object.keys(dateTimeSelector).length>0 && (
      <div className='mt-6'>
        <h2 className='mb-2'>Selected Date-Time</h2>
        <ul className='space-y-3'>
          {Object.entries(dateTimeSelector).map(([date,times])=>(
            <li key={date}>
              <div className='font-medium'>{date}</div>
              <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                {times.map((time)=>(
                  <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
                    <span>{time}</span>
                    <DeleteIcon onClick={()=>handleRemoveTime(date,time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
                </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}

    <button onClick={handleAddShow} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>
    Add Show</button>


    </>
  ):(
    <Loading/>
  )
}

export default Page
