'use client'
import React,{ useState,useEffect } from 'react'
import TrailerHeading from '../atom/trailerhead'
import VideoSection from '../atom/videoPlayer'
import { dummyTrailers } from '../../../../public/data/assets'
import { PlayCircleIcon } from 'lucide-react'

const Trailer = () => {
    const[currentTrailer,setCurrentTrailer]=useState(dummyTrailers[0]);
   console.log(currentTrailer.videoUrl);
   

  return (
    <div className='px-6 md:px-16 lg:px-15 xl:px-44 pb-20 overflow-hidden'>
 <TrailerHeading/>
 <div className='relative mt-10 ' >
   <VideoSection videoUrl={currentTrailer.videoUrl} />
 </div>
 {/* <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-2 max-w-3xl mx-auto'>
 {dummyTrailers.map((trailer)=>(
 <div key={trailer.image} className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'
 onClick={()=>setCurrentTrailer(trailer)}>
    <img src={trailer.image} alt="trailer" className='rounded-lg w-full h-full object-cover brightness-75'/>
   <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'/>
  
  </div> 
 ))}

 </div> */}
 {/* <div className='mt-2 max-w-6xl mx-auto'>
  <div className='flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto max-md:pl-4 scrollbar-hide'>
    {dummyTrailers.map((trailer) => (
      <div
        key={trailer.image}
        className='relative min-w-[45%] max-w-[45%] md:min-w-0 md:max-w-full group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer'
        onClick={() => setCurrentTrailer(trailer)}
      >
        <img
          src={trailer.image}
          alt="trailer"
          className='rounded-lg w-full h-full object-cover brightness-75'
        />
        <PlayCircleIcon
          strokeWidth={1.6}
          className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'
        />
      </div>
    ))}
  </div>
</div> */}
<div className='mt-2 max-w-6xl mx-auto'>
  <div className='flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto max-md:pl-4 max-md:pr-2 scrollbar-hide group'>
    {dummyTrailers.map((trailer) => (
      <div
        key={trailer.image}
        className='relative min-w-[45%] max-w-[45%] md:min-w-0 md:max-w-full group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition h-40 md:h-40 cursor-pointer'
        onClick={() => setCurrentTrailer(trailer)}
      >
        <img
          src={trailer.image}
          alt="trailer"
          className='rounded-lg w-full h-full object-cover brightness-75'
        />
        <PlayCircleIcon
          strokeWidth={1.6}
          className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'
        />
      </div>
    ))}
  </div>
</div>



       

    </div>
  )
}

export default Trailer