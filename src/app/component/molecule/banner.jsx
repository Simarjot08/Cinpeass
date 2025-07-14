'use client';

import { ArrowRight, Calendar1Icon, Clock10Icon, ImportIcon, Link } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation';


function Banner() {

  const router = useRouter();

  const handleClick = () => {
    router.push('/movies');
  };



  return (
    <div className='bg-[url("/images/banner-3.jpg")] mt-0 mask-y-from-80%  mask-y-to-100% flex flex-col items-start justify-center gap-4 px-8  md:px-28  sm:px-10 bg-cover bg-center h-screen lg:w-[100%] w-[100%'>
      <img src="/images/marvellogo.svg" alt="" className='max-h-11 lg:h-11 mt-20' />
       <h1 className='lg:text-5xl text-2xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians
        <br /> of the Galaxy
       </h1>
       <div className='flex lg:flex-row flex-col items-center gap-4 text-gray-300'>
        <span> Action | Adventure | Sci-Fi</span>
       <div className='flex items-center gap-1'>
        <Calendar1Icon className='w-4.5 h-4.5'/>2018
       </div>
        <div className='flex items-center gap-1'>
        <Clock10Icon className='w-4.5 h-4.5'/> 2h 8m
       </div>
       </div>
       <p className='max-w-md text-gray-300 text-justify'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in london and try to stop a conspiracy</p>
       
       <button className='flex items-center gap-1 px-6 py-3 text-md bg-red-500 hover:bg-red-600 hover:scale-[1.05] transition ease hover:shadow-sm rounded-full font-medium cursor-pointer'
        onClick={handleClick}> Explore Movies
            <ArrowRight className='w-5 h-5'/>   
       </button>
    </div>
  )
}

export default Banner
