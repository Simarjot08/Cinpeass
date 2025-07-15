
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

nProgress.configure({ showSpinner: false, trickleSpeed: 80 });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      nProgress.start();
    };

    const handleComplete = () => {
      nProgress.done();
    };

    handleStart();

    const timeout = setTimeout(() => {
      handleComplete();
    }, 600); // artificial delay to see progress bar

    return () => {
      clearTimeout(timeout);
      handleComplete();
    };
  }, [pathname]);

  return null;
}


