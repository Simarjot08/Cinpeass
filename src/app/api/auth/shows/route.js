
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
         'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({
      success: true,
      movies: data.results,
    });

  } catch (error) {
    console.error('TMDB API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}


