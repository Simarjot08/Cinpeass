
'use client';

import Link from "next/link";

 function Footer() {
  return (
      <footer className="bg-gray-800  text-center py-4 mt-40 px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-2 border-b border-gray-500 pb-14">
                <div className="md:max-w-96">
                    <img className="w-36 h-auto rounded-lg" src="/images/logo.png" alt="logo"  />
                    <p className="mt-6 text-lg text-left">
                        🎬 CinePass – Your Gateway to the Big Screen. 🍿 Book. Watch. Repeat.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <img src="/data/googlePlay.svg" alt="google play" className="h-9 w-auto border" />
                        <img src="/data/appStore.svg" alt="app store" className="h-9 w-auto" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-center mt-10 gap-20 md:gap-40">
                    <div>
                        <ul className="text-lg space-y-2 text-left">
                            <li><Link href="/" className="hover:text-red-500 transition ease">Home</Link></li>
                            <li><Link href="/movies"className="hover:text-red-500 transition ease">Movie</Link></li>
                            <li><Link href="/" className="hover:text-red-500 transition ease">Theater</Link></li>
                            <li><Link href="/favourites" className="hover:text-red-500 transition ease">Favourites</Link></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            
      
      <p className="py-8">© 2025 QuickSeat. All rights reserved.</p>
    </footer>
  );
}

export default Footer
