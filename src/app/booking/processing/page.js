// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Loading from '@/app/component/atom/loading';

// const BookingProcessingPage = () => {
//   const [statusText, setStatusText] = useState('Verifying your payment...');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get('bookingId');

//   useEffect(() => {
//     if (!bookingId) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch('/api/user/mybooking', { cache: 'no-store' });
//         const data = await res.json();

//         const booking = data.bookings.find(b => b._id === bookingId);
//         if (booking?.isPaid) {
//           clearInterval(interval);
//           setStatusText('✅ Payment successful! Redirecting to bookings...');
//           setTimeout(() => {
//             router.push('/booking');
//           }, 1500);
//         }
//       } catch (err) {
//         console.error('Payment check failed:', err);
//         setStatusText('🔁 Retrying to confirm your payment...');
//       }
//     }, 3000); // check every 3 seconds

//     return () => clearInterval(interval);
//   }, [bookingId, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
//       <Loading />
//       <p className="mt-8 text-lg sm:text-xl font-medium">{statusText}</p>
//     </div>
//   );
// };

// export default BookingProcessingPage;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/component/atom/loading';

const BookingProcessingPage = () => {
  const [statusText, setStatusText] = useState('Verifying your payment...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    if (!bookingId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/user/booking', { cache: 'no-store' });
        const data = await res.json();

        const booking = data.bookings.find(b => b._id === bookingId);

        if (booking?.isPaid) {
          clearInterval(interval);
          setStatusText('✅ Payment successful! Redirecting to your bookings...');
          setTimeout(() => {
            window.location.href = '/booking'; // forces fresh reload
 // ensure redirection to updated list
          }, 2000);
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
        setStatusText('🔁 Still verifying payment, please wait...');
      }
    }, 3000);

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
};

export default BookingProcessingPage;

