


'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 text-white px-6 md:px-24 py-12">
      
      {/* Top Section: Logo + Description */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 border-b border-gray-700 pb-10">
        
        {/* Brand and Tagline */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-3xl font-bold text-red-500">🎬 Cine<span className="text-white">Pass</span></h2>
          <p className="text-sm mt-3 text-gray-300">
            Your ultimate pass to the world of cinema. Book tickets seamlessly, explore top-rated movies, and enjoy your favorite theaters — all in one place.
          </p>
        </div>

        {/* Horizontal Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm md:mt-2 md:pr-10">
          <Link href="/" className="hover:text-red-400 transition">Home</Link>
          <Link href="/movies" className="hover:text-red-400 transition">Movie</Link>
          <Link href="/theaters" className="hover:text-red-400 transition">Theater</Link>
          <Link href="/favourites" className="hover:text-red-400 transition">Favourites</Link>
        </div>
      </div>

      {/* Middle Section: Informational Content */}
      <div className="mt-10 grid md:grid-cols-2 gap-8 text-sm text-gray-400">
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Why CinePass?</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Hassle-free movie ticket booking</li>
            <li>Discover trending and top-rated films</li>
            <li> Choose your seat, your way</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-700 pt-6">
        © 2025 <span className="text-red-500 font-medium">CinePass</span>. All rights reserved.
      </div>
    </footer>
  );
}


