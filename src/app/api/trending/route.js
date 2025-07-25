import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // Optional: Set a timeout controller (advanced, not required initially)
      // signal: controller.signal,
      next: { revalidate: 60 }, // Caches this request for 60 seconds (optional for better performance)
    });

    if (!res.ok) {
      throw new Error(`TMDb responded with status ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      movies: data.results,
    });
  } catch (error) {
    console.error('TMDB API Fetch Error:', error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}