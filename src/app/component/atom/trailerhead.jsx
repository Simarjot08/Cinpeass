// 'use client';

// import React from 'react';

// function TrailerHeading() {
//   return (
//     <div className="text-center my-10 px-4">
//       <h1 className="text-6xl font-extrabold text-red-800 tracking-wide drop-shadow-lg">
//         TRAILERS
//       </h1>

//       <p className="mt-3 text-2xl text-white font-semibold italic tracking-wide">
//         Unleash the drama before the show begins
//       </p>

//       <p className="mt-2 text-sm text-gray-400 uppercase tracking-[0.2em]">
//         Every second tells a story
//       </p>
//     </div>
//   );
// }

// export default TrailerHeading;
'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function TrailerHeading() {
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const sublineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        sublineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <div className="text-center my-10 px-4 overflow-hidden">
      <h1
        ref={headingRef}
        className="text-6xl font-extrabold text-red-700 tracking-wide drop-shadow-lg animate-pulse-slow"
      >
        TRAILERS
      </h1>

      <p
        ref={taglineRef}
        className="mt-3 text-2xl text-white font-semibold italic tracking-wide"
      >
        Unleash the drama before the show begins
      </p>

      <p
        ref={sublineRef}
        className="mt-2 text-sm text-gray-400 uppercase tracking-[0.2em]"
      >
        Every second tells a story
      </p>
    </div>
  );
}

export default TrailerHeading;

