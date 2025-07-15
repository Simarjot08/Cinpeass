

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loading() {
  return (
    <div className='w-full h-[50vh] mt-[10%] flex justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[70%]'>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className='bg-[#1f1f1f] p-4 rounded-xl shadow-md'
          >
            {/* Poster Skeleton */}
            <Skeleton
              height={220}
              baseColor="#2e2e2e"
              highlightColor="#3d3d3d"
              borderRadius={10}
            />

            {/* Title */}
            <div className='mt-3'>
              <Skeleton
                height={16}
                width={`80%`}
                baseColor="#2e2e2e"
                highlightColor="#3d3d3d"
                borderRadius={6}
              />
            </div>

            {/* Subtitle */}
            <div className='mt-2'>
              <Skeleton
                height={12}
                width={`60%`}
                baseColor="#2e2e2e"
                highlightColor="#3d3d3d"
                borderRadius={5}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;
