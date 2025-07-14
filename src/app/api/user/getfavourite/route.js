// export const getFavourites=async(req,res)=>{
//     try{
//         const user=await clerkClient.users.getUser(req.auth().userId)
//         const favourites=user.privateMetadata.favourites;

//         //get movies from databse

//         const movies=await Movie.find({_id:{$in:favourites}})
//         res.json({success:true,movies})
//     }catch(error){
//         console.error(error.message);
//         res.json({success:false,message:error.message})
//     }
// }
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
import Movie from '@/app/lib/models/movieModel';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';

export const GET = async (req) => {
  try {
    await connectDB();

    // 1. Extract userId from JWT token
    const userId = await verifyTokenFromCookie();

    // 2. Get the user from DB
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // 3. Fetch movie details for all favourite IDs
    const favouriteMovieIds = user.favourites || [];
    const movies = await Movie.find({ _id: { $in: favouriteMovieIds } });

    return NextResponse.json({ success: true, movies });

  } catch (error) {
    console.error('Error in getfavourite:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
