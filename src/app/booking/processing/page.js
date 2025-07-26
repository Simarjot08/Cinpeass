// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Loading from '@/app/component/atom/loading';

// function BookingProcessingInner() {
//   const [statusText, setStatusText] = useState('Verifying your payment...');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get('bookingId');

//   useEffect(() => {
//     if (!bookingId) return;

//     const interval = setInterval(async () => {
//       try {
//         // const res = await fetch('/api/user/booking', { cache: 'no-store' });
//         const res = await fetch('/api/user/booking', {
//   cache: 'no-store',
//   credentials: 'include',
// });
//         const data = await res.json();

//         const booking = data.bookings.find(b => b._id === bookingId);

//         if (booking?.isPaid) {
//           clearInterval(interval);
//           setStatusText('✅ Payment successful! Redirecting to your bookings...');
//           setTimeout(() => {
//             window.location.href = '/booking';
//           }, 2000);
//         }
//       } catch (err) {
//         console.error('Error checking payment status:', err);
//         setStatusText('🔁 Still verifying payment, please wait...');
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [bookingId]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
//       <Loading />
//       <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
//         {statusText}
//       </p>
//     </div>
//   );
// }

// export default function BookingProcessingPage() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <BookingProcessingInner />
//     </Suspense>
//   );
// }

// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Loading from '@/app/component/atom/loading';

// function BookingProcessingInner() {
//   const [statusText, setStatusText] = useState('Verifying your payment...');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get('bookingId');

//   useEffect(() => {
//     if (!bookingId) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch('/api/user/booking', {
//           cache: 'no-store',
//           credentials: 'include',
//           headers: { Accept: 'application/json' },
//         });

//         console.log('Booking API response status:', res.status);

//         if (res.status === 401) {
//           setStatusText('❌ Unauthorized - No token sent. Please login.');
//           clearInterval(interval);
//           return;
//         }

//         // const data = await res.json();
//         const data = await res.json();
// if (!data || !Array.isArray(data.bookings)) {
//   console.warn("No bookings array in response:", data);
//   return;
// }
//         console.log('Bookings data:', data);

//         const booking = data.bookings.find(b => b._id === bookingId);

//         if (booking?.isPaid) {
//           clearInterval(interval);
//           setStatusText('✅ Payment successful! Redirecting to your bookings...');
//           setTimeout(() => {
//             router.push('/booking');
//           }, 2000);
//         }
//       } catch (err) {
//         console.error('Error checking payment status:', err);
//         setStatusText('🔁 Still verifying payment, please wait...');
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [bookingId, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
//       <Loading />
//       <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
//         {statusText}
//       </p>
//     </div>
//   );
// }

// export default function BookingProcessingPage() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <BookingProcessingInner />
//     </Suspense>
//   );
// }







// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import Loading from '@/app/component/atom/loading';

// // const BookingProcessingPage = () => {
// //   const [statusText, setStatusText] = useState('Verifying your payment...');
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const bookingId = searchParams.get('bookingId');

// //   useEffect(() => {
// //     if (!bookingId) return;

// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await fetch('/api/user/booking', { cache: 'no-store' });
// //         const data = await res.json();

// //         const booking = data.bookings.find(b => b._id === bookingId);

// //         if (booking?.isPaid) {
// //           clearInterval(interval);
// //           setStatusText('✅ Payment successful! Redirecting to your bookings...');
// //           setTimeout(() => {
// //             window.location.href = '/booking';
// //           }, 2000);
// //         }
// //       } catch (err) {
// //         console.error('Error checking payment status:', err);
// //         setStatusText('🔁 Still verifying payment, please wait...');
// //       }
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [bookingId]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
// //       <Loading />
// //       <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
// //         {statusText}
// //       </p>
// //     </div>
// //   );
// // };

// // export default BookingProcessingPage;








// // 'use client'

// // import React, { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import Loading from '@/app/component/atom/loading';

// // const BookingProcessingPage = () => {
// //   const [statusText, setStatusText] = useState('Verifying your payment...');
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const bookingId = searchParams.get('bookingId');

// //   useEffect(() => {
// //     if (!bookingId) return;

// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await fetch('/api/user/booking', { cache: 'no-store' });
// //         const data = await res.json();

// //         const booking = data.bookings.find(b => b._id === bookingId);

// //         if (booking?.isPaid) {
// //           clearInterval(interval);
// //           setStatusText('✅ Payment successful! Redirecting to your bookings...');
// //           setTimeout(() => {
// //             window.location.href = '/booking'; // forces fresh reload
// //  // ensure redirection to updated list
// //           }, 2000);
// //         }
// //       } catch (err) {
// //         console.error('Error checking payment status:', err);
// //         setStatusText('🔁 Still verifying payment, please wait...');
// //       }
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [bookingId, router]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
// //       <Loading />
// //       <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
// //         {statusText}
// //       </p>
// //     </div>
// //   );
// // };

// // export default BookingProcessingPage;


// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import Loading from '@/app/component/atom/loading';

// // const BookingProcessingPage = () => {
// //   const [statusText, setStatusText] = useState('Verifying your payment...');
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const bookingId = searchParams.get('bookingId');

// //   useEffect(() => {
// //     if (!bookingId) return;

// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await fetch('/api/user/mybooking', { cache: 'no-store' });
// //         const data = await res.json();

// //         const booking = data.bookings.find(b => b._id === bookingId);
// //         if (booking?.isPaid) {
// //           clearInterval(interval);
// //           setStatusText('✅ Payment successful! Redirecting to bookings...');
// //           setTimeout(() => {
// //             router.push('/booking');
// //           }, 1500);
// //         }
// //       } catch (err) {
// //         console.error('Payment check failed:', err);
// //         setStatusText('🔁 Retrying to confirm your payment...');
// //       }
// //     }, 3000); // check every 3 seconds

// //     return () => clearInterval(interval);
// //   }, [bookingId, router]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
// //       <Loading />
// //       <p className="mt-8 text-lg sm:text-xl font-medium">{statusText}</p>
// //     </div>
// //   );
// // };

// // export default BookingProcessingPage;
// 'use client';

// import React, { useEffect, useState, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Loading from '@/app/component/atom/loading';

// function BookingProcessingInner() {
//   const [statusText, setStatusText] = useState('Verifying your payment...');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get('bookingId');
//   console.log("Booking ID from URL:", bookingId);

//   useEffect(() => {
//     if (!bookingId) return;

//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch('/api/user/booking', {
//           cache: 'no-store',
//           credentials: 'include',
//           headers: { Accept: 'application/json' },
//         });

//         console.log('Booking API response status:', res.status);

//         if (res.status === 401) {
//           setStatusText('❌ Unauthorized. Please log in.');
//           clearInterval(interval);
//           return;
//         }

//         const data = await res.json();

//         // Defensive checks
//         if (!data || !Array.isArray(data.bookings)) {
//           console.warn("No bookings found or malformed response:", data);
//           setStatusText('⚠ Booking not found. Please refresh.');
//           clearInterval(interval);
//           return;
//         }


//         console.log("bookingId from URL:", bookingId);
// console.log("Server booking IDs:", data.bookings.map(b => ({
//   id: b._id,
//   type: typeof b._id
// })));


//         // const booking = data.bookings.find(b => b._id === bookingId);
//         // const booking = data.bookings.find(b => b._id.toString() === bookingId);
//         const booking = data.bookings.find(b => String(b._id) === String(bookingId));

//         if (!booking) {
//           console.warn('No matching booking for bookingId:', bookingId);
//           setStatusText('❌ Booking not found.');
//           clearInterval(interval);
//           return;
//         }

//         if (booking.isPaid) {
//           clearInterval(interval);
//           setStatusText('✅ Payment successful! Redirecting...');
//           setTimeout(() => {
//             router.push('/booking');
//           }, 1500);
//         } else {
//           console.log('Booking not paid yet:', booking);
//         }

//       } catch (err) {
//         console.error('Error verifying payment:', err);
//         setStatusText('⚠ Error verifying payment. Retrying...');
//       }
//     }, 3000); // Retry every 3 seconds

//     return () => clearInterval(interval);
//   }, [bookingId, router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
//       <Loading />
//       <p className="mt-8 text-lg sm:text-xl font-medium animate-pulse">
//         {statusText}
//       </p>
//     </div>
//   );
// }

// export default function BookingProcessingPage() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <BookingProcessingInner />
//     </Suspense>
//   );
// }
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/component/atom/loading';

function BookingProcessingInner() {
  const [statusText, setStatusText] = useState('Verifying your payment...');
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  console.log("Booking ID from URL:", bookingId);

  useEffect(() => {
    if (!bookingId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/booking/status?bookingId=${bookingId}`, {
          cache: 'no-store',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });

        console.log('Booking status API response status:', res.status);

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
        console.log('Current booking status:', booking);

        if (booking.isPaid) {
          clearInterval(interval);
          setStatusText('✅ Payment successful! Redirecting...');
          setTimeout(() => {
            router.push('/booking');
          }, 1500);
        } else {
          console.log('Booking not paid yet, will retry...');
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

