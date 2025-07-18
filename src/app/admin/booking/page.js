"use client"
import React, { useEffect,useState } from 'react'
import Title from '@/app/component/atom/admin/title';
import Loading from '@/app/component/atom/loading';
import { dummyBookingData } from '../../../../public/data/assets';
import { dateFormat } from '@/app/lib/dateFormat/dateFormat';

function Page() {
  const[bookings,setBookings]=useState([]);
  const[isLoading,setIsLoading]=useState(true);

  // const getAllBookings=async()=>{
  //    setBookings(dummyBookingData)
  //    setIsLoading(false);
  // };

  const getAllBookings = async () => {
  try {
    const res = await fetch('/api/auth/adminbookings', {
     method: 'GET',
  headers: { 'Content-Type': 'application/json' },

    });

    if (!res.ok) throw new Error('Failed to fetch bookings');

    const data = await res.json();

    if (data.success) {
      console.log(data.bookings)
      setBookings(data.bookings);
    } else {
      console.error(data.message);
      setBookings([]);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    setBookings([]);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(()=>{
    getAllBookings();
  },[]);

  return !isLoading ? (
    <>
    <Title text1="List" text2="Bookings"/>
    <div className='max-w-4xl mt-6 overflow-x-auto'>
      <table className='w-full border-collaspe rounded-md overflow-hidden text-nowrap'>
        <thead>
          <tr className='bg-primary/20 text-left text-white'>
          <th className='p-2 font-medium pl-5'>User Name</th>
          <th className='p-2 font-medium'>Movie Name</th>
            <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
                <th className='p-2 font-medium'>Amount</th>
          
          </tr>
        </thead>
        <tbody className='text-sm font-light'>
          {bookings.map((item,index)=>(
            <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
              <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
              <td className='p-2'>{item.show.movie.title}</td>
              <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
              <td className='p-2'>{Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(" , ")}</td>
              <td  className='p-2'>$ {item.amount}</td>
            </tr>
          ))}





        </tbody>
        
      </table>
    </div>
    </>
  ):(
    <Loading/>
  )
}

export default Page
