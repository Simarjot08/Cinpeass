// // /app/api/getshow/[movieId]/route.js
// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Show from '@/app/lib/models/showmodel';

// export async function GET(request, { params }) {
//   await connectDB();

//   try {
//     const { movieId } = params;

//     if (!movieId) {
//       return NextResponse.json({ success: false, message: 'movieId is required' }, { status: 400 });
//     }

//     const shows = await Show.find({
//       movie: movieId,
//       showDateTime: { $gte: new Date() },
//     }).sort({ showDateTime: 1 });

//     return NextResponse.json({ success: true, shows });
//   } catch (error) {
//     console.error('Error fetching shows:', error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
// import Movie from "@/app/lib/models/movieModel";
// import Show from "@/app/lib/models/showmodel";

// export const getShow=async(req,res)=>{
//     try{
//         const{movieId}=req.params;
//         //get all upcoming shows for the movie
// const shows=await Show.find({movie:movieId,showDateTime:{
//     $gte : new Date()}})  
//   const movie=await Movie.findById(movieId);
//   const dateTime={};

//   Show.forEach((show) => {
//     const date=show.showDateTime.toISOString().split("T")[0];
//     if(!dateTime[date]){
//         dateTime[date]=[0]
//     }

// dateTime[date].push({time:show.showDateTime,showId:show._id})
    
//   });

// res.json({success:true,movie,dateTime})

// }catch(error){
//   console.error(error);
//   res.json({success:false,message:error.message})  
// }
// } 
// /app/api/getshow/[movieId]/route.js





import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Movie from '@/app/lib/models/movieModel';
import Show from '@/app/lib/models/showmodel';

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { movieId } = params;

    if (!movieId) {
      return NextResponse.json({ success: false, message: 'movieId is required' }, { status: 400 });
    }

    // 1. Get upcoming shows for the movie
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    }).sort({ showDateTime: 1 });

    // 2. Get movie details
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return NextResponse.json({ success: false, message: 'Movie not found' }, { status: 404 });
    }

    // 3. Create dateTime object grouping shows by date
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
      });
    });

    return NextResponse.json({
      success: true,
      movie,
      dateTime,
    });
  } catch (error) {
    console.error('Error fetching show data:', error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
