// 'use client'

// import React, { useEffect,useState } from 'react'
// import { dummyBookingData } from '../../../../public/data/assets';
// import Loading from '../atom/loading';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIndianRupeeSign, faDollarSign } from '@fortawesome/free-solid-svg-icons';
// import Timeformat from '@/app/lib/timeformat/timeformat';
// import { dateFormat } from '@/app/lib/dateFormat/dateFormat';
// import { Currency } from 'lucide-react';
// function Mybooking() {

//   const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;
//     // const currency=import.meta.env.VITE_CURRENCY
//     const[booking,setbookings]=useState([])
//     const[isLoading,setIsLoading]=useState(true);

    

//     // const getMyBookings=async()=>{
//     //     setbookings(dummyBookingData)
//     //     console.log(dummyBookingData);
//     //     setIsLoading(false)
//     // }
//     const getMyBookings = async () => {
//   try {
//     const res = await fetch('/api/user/booking', {
//       method: 'GET',
//       credentials: 'include', // important to include cookies
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await res.json();
//     if (data.success) {
//       setbookings(data.bookings);
//     } else {
//       console.error('Failed to fetch bookings:', data.message);
//     }
//   } catch (err) {
//     console.error('Error fetching bookings:', err);
//   } finally {
//     setIsLoading(false);
//   }
// };

//     useEffect(()=>{
//      getMyBookings()
//     },[])

//   return !isLoading? (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-10 md:pt-0 min-h-[80vh'>
//         {booking.map((item,index)=>(
//             <div key={index} className='flex flex-col md:flex-row justify-between bg-red-800/70 border-red-800 rounded-lg mt-4 p-2 max-w-3xl'>
//                 <div className='flex flex-col md:flex-row'>
//                     {/* <img src={item.show.movie.poster_path} alt="movie_img " className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
//                      */}

//                      <img
//   src={item.show.movie.poster_path ? `${IMAGE_BASE}${item.show.movie.poster_path}` : '/default.jpg'}
//   alt="movie_img"
//   className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
// />


//                     <div className='flex flex-col p-4'>
//                         <p className='text-lg font-semibold'>{item.show.movie.title}</p>
//                           <p className='text-gray-400 text-sm '>{Timeformat(item.show.movie.runtime)}</p>
//                             <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
//                     </div>
                     
//                 </div>

//               <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
//                   <div className='flex items-center gap-4'>
//                     <p className='text-2xl font-semibold mb-3'> 
//                       {/* <FontAwesomeIcon icon={faIndianRupeeSign} className="text-white-600" /> */}
//                      $  {item.amount}</p>
//                     {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
//                   </div>
//                   <div className='text-sm'> 
//                    <p><span className='text-white-400'> Total Tickets : </span>{item.bookedSeats.length}</p>
//                     <p><span className='text-white-400'> Seat number : </span>{item.bookedSeats.join(", ")}</p>
//                   </div>
//                 </div>

//                 </div>
//         ))}
      
//     </div>
//   ):(
//     <Loading/>
//   )
// }

// export default Mybooking

'use client'

import React, { useEffect, useState } from 'react';
import Loading from '../atom/loading';
import Timeformat from '@/app/lib/timeformat/timeformat';
import { dateFormat } from '@/app/lib/dateFormat/dateFormat';
import toast from 'react-hot-toast'; // Assuming you use react-hot-toast or replace with your toast

function Mybooking() {
  const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;
  const [booking, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const res = await fetch('/api/user/booking', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error('Failed to fetch bookings: ' + data.message);
      }
    } catch (err) {
      toast.error('Error fetching bookings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  const handlePayNow = async (bookingId) => {
    try {
      const res = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        toast.error(data.error || 'Failed to initiate payment');
      }
    } catch (error) {
      toast.error('Error initiating payment');
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className='relative px-6 md:px-16 lg:px-40 pt-10 md:pt-0 min-h-[80vh]'>
      {booking.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No bookings found.</p>
      )}
      {booking.map((item, index) => (
        <div
          key={index}
          className='flex flex-col md:flex-row justify-between bg-red-800/70 border-red-800 rounded-lg mt-4 p-2 max-w-3xl'
        >
          <div className='flex flex-col md:flex-row'>
            <img
              src={
                item.show.movie.poster_path
                  ? `${IMAGE_BASE}${item.show.movie.poster_path}`
                  : '/default.jpg'
              }
              alt='movie_img'
              className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
            />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm '>
                {Timeformat(item.show.movie.runtime)}
              </p>
              <p className='text-gray-400 text-sm mt-auto'>
                {dateFormat(item.show.showDateTime)}
              </p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>${item.amount}</p>

              {!item.isPaid && (
                <button
                  onClick={() => handlePayNow(item._id)}
                  className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-primary-dark transition'
                >
                  Pay Now
                </button>
              )}
              {item.isPaid && (
                <span className='text-green-400 font-semibold'>Paid</span>
              )}
            </div>

            <div className='text-sm'>
              <p>
                <span className='text-white-400'>Total Tickets: </span>
                {item.bookedSeats.length}
              </p>
              <p>
                <span className='text-white-400'>Seat number: </span>
                {item.bookedSeats.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mybooking;
