
"use client"
import React from 'react'
import { dummyShowsData } from '../../../../public/data/assets';
import { useState,useEffect } from 'react';
import Loading from '@/app/component/atom/loading';
import Title from '@/app/component/atom/admin/title';
import { dateFormat } from '@/app/lib/dateFormat/dateFormat';

function Page() {
   const[shows,setShows]=useState([]);
   const[loading,setLoading]=useState(true);

  //  
        const getAllShows = async () => {
  try {
    const res = await fetch('/api/auth/adminshows', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ Ensures cookies (with JWT) are sent
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setShows(data.shows);
    } else {
      console.error('Fetch error:', data.message);
    }
  } catch (error) {
    console.error('Error fetching shows:', error);
  } finally {
    setLoading(false);
  }
};




   useEffect(()=>{
    getAllShows();
   },[]);

  return!loading ? (
    <>

  <Title text1="List" text2="Shows"/>
  <div className='max-w-4xl mt-6 overflow-x-auto'>
    <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
       <thead>
        <tr className='bg-primary/20 text-left text-white'>
        <th className='p-2 font-medium pl-5'>Movie Name</th>
         <th className='p-2 font-medium '>Show Time</th>
          <th className='p-2 font-medium'>Total Bookings</th>
           <th className='p-2 font-medium '>Earnings</th>
        </tr>
       </thead>
       <tbody className='text-sm font-light'>
        {shows.map((show,index)=>(
          <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
            <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
            <td className='p-2'>{dateFormat(show.showDateTime)}</td>
             <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
              <td className='p-2'>$ {Object.keys(show.occupiedSeats).length * show.showPrice}</td>

          </tr>
        )
        )}
       </tbody>
    </table>

  </div>
      
    </>
  ):(
    <Loading/>
  )
}

export default Page
