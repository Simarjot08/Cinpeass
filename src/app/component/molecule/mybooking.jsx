

'use client';

import React, { useEffect, useState } from 'react';
import Loading from '../atom/loading';
import Timeformat from '@/app/lib/timeformat/timeformat';
import { dateFormat } from '@/app/lib/dateFormat/dateFormat';
import toast from 'react-hot-toast';

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

  // ⏳ Calculate time left for unpaid bookings
  const getTimeLeft = (createdAt) => {
    const expiryTime = new Date(createdAt).getTime() + 10 * 60 * 1000;
    const now = Date.now();
    const diff = expiryTime - now;

    if (diff <= 0) return 'Expired';
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs < 10 ? '0' + secs : secs}s left`;
  };

  useEffect(() => {
    getMyBookings();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment_intent')) {
      getMyBookings(); // Refresh after Stripe redirect
    }

    const interval = setInterval(() => {
      // Triggers UI re-render every second to update countdown
      setBookings((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
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
        window.location.href = data.url;
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
      {booking.map((item, index) => {
        const timeLeft = getTimeLeft(item.createdAt);
        if (!item.isPaid && timeLeft === 'Expired') return null; // Hide expired unpaid booking

        return (
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
                <p className='text-gray-400 text-sm'>
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

                {!item.isPaid ? (
                  <button
                    onClick={() => handlePayNow(item._id)}
                    className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-primary-dark transition'
                  >
                    Pay Now
                  </button>
                ) : (
                  <span className='text-green-400 font-semibold'>Paid</span>
                )}
              </div>

              {!item.isPaid && (
                <p className='text-yellow-300 text-sm font-medium mb-2'>
                  ⏳ {timeLeft}
                </p>
              )}

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
        );
      })}
    </div>
  );
}

export default Mybooking;
