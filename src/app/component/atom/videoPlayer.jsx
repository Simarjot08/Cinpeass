'use client';

import { ArrowUpToLine } from 'lucide-react';
import React from 'react';

const VideoSection = ({ videoUrl }) => {
  return (
    <div className="relative mt-6 pt-[56.25%] w-full max-w-4xl  mx-auto">
      <div className="absolute top-0 left-0 w-full h-[89%]">
        <iframe
          src={videoUrl}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen 
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
