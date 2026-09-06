
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/component/atom/loading';

function BookingProcessingInner() {
  const [statusText, setStatusText] = useState('Verifying your payment...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    if (!bookingId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/booking/status?bookingId=${bookingId}`, {
          cache: 'no-store',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });

        if (res.status === 401) {
          setStatusText('❌ Unauthorized. Please log in.');
          clearInterval(interval);
          return;
        }

        const data = await res.json();

        if (!data || !data.booking) {
          console.warn("Booking not found or malformed response:", data);
          setStatusText('⚠ Booking not found. Please refresh.');
          clearInterval(interval);
          return;
        }

        const booking = data.booking;


        if (booking.isPaid) {
          clearInterval(interval);
          setStatusText('Payment successful! Redirecting...');
          setTimeout(() => {
            router.push('/booking');
          }, 1500);
        } else {
          console.log('Booking not paid yet');
        }

      } catch (err) {
        console.error('Error verifying payment:', err);
        setStatusText('⚠ Error verifying payment. Retrying...');
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [bookingId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
      <Loading />
      <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
        {statusText}
      </p>
    </div>
  );
}

export default function BookingProcessingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookingProcessingInner />
    </Suspense>
  );
}

