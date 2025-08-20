
"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loading() {
  return (
    <div className='w-full min-h-[50vh] lg:mt-[10%]  mt-[25%]  mb-[5%] flex justify-center items-center px-4 sm:px-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[95%] sm:w-[90%] md:w-[70%] max-w-5xl'>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className='bg-[#1f1f1f] p-4 rounded-xl shadow-md'
          >
            {/* Poster Skeleton */}
            <Skeleton
              baseColor="#2e2e2e"
              highlightColor="#3d3d3d"
              borderRadius={10}
              className='w-full h-[140px] sm:h-[180px] md:h-[220px]'
            />

            {/* Title */}
            <div className='mt-3'>
              <Skeleton
                height={16}
                width='60%'
                smWidth='70%'
                mdWidth='80%'
                baseColor="#2e2e2e"
                highlightColor="#3d3d3d"
                borderRadius={6}
                className='w-[60%] sm:w-[70%] md:w-[80%]'
              />
            </div>

            {/* Subtitle */}
            <div className='mt-2'>
              <Skeleton
                height={12}
                baseColor="#2e2e2e"
                highlightColor="#3d3d3d"
                borderRadius={5}
                className='w-[40%] sm:w-[50%] md:w-[60%]'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;

