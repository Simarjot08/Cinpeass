// export const updatefavourite=async(req,res)=>{
//     try{
//         const{movieId}=req.body;
//         const userId=req.auth().userId;
//         const user=await clerkClient.users.getUser(userId);
//         if(!user.privateMetadata.favourites){
//             user.privateMetadata.favourites=[]
//         }
//         if(!user.privateMetadata.favourites.includes(movieId)){
//             user.privateMetadata.favourites.push(movieId)
//         }else{
//             user.privateMetadata.favourites=user.privateMetadata.favourites.filter(item=>item !==movieId)
//         }
//         await clerkClient.users.updateMetadata(userId,{privateMetadata:user.privateMetadata})

//         res.json({success:true,message:"favourite movies updated successfully"})
//     }
//     catch(error){
//         console.error(error.message);
//         res.json({success:false,message:error.message});
//     }
// }
// app/api/user/favourite/route.js

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import User from '@/app/lib/models/userModel';
// import Movie from '@/app/lib/models/movieModel';
// import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';

// export const POST = async (req) => {
//   try {
//     await connectDB();

//     // 1. Get userId from JWT
//     const userId = await verifyTokenFromCookie();

//     // 2. Get movieId from request body
//     const { movieId } = await req.json();
//     if (!movieId) {
//       return NextResponse.json({ success: false, message: 'Movie ID is required' }, { status: 400 });
//     }

//     // 3. Check if movie exists
//     const movie = await Movie.findById(movieId);
//     if (!movie) {
//       return NextResponse.json({ success: false, message: 'Movie not found' }, { status: 404 });
//     }

//     // 4. Find user and toggle favourite
//     const user = await User.findById(userId);
//     const isFavourite = user.favourites.includes(movieId);

//     if (isFavourite) {
//       user.favourites = user.favourites.filter(id => id.toString() !== movieId);
//     } else {
//       user.favourites.push(movieId);
//     }

//     await user.save();

//     return NextResponse.json({
//       success: true,
//       message: isFavourite ? 'Removed from favourites' : 'Added to favourites',
//       favourites: user.favourites
//     });

//   } catch (error) {
//     console.error(error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import User from '@/app/lib/models/userModel';
import Movie from '@/app/lib/models/movieModel';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';

export const POST = async (req) => {
  try {
    await connectDB();

    const userId = await verifyTokenFromCookie();
    const { movieId } = await req.json();

    if (!movieId) {
      return NextResponse.json({ success: false, message: 'Movie ID is required' }, { status: 400 });
    }

    // No ObjectId validation here, movieId is string TMDb ID

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return NextResponse.json({ success: false, message: 'Movie not found' }, { status: 404 });
    }

    const user = await User.findById(userId);

    // Compare as strings, because favourites are string IDs
    const isFavourite = user.favourites.includes(movieId);

    if (isFavourite) {
      user.favourites = user.favourites.filter(id => id !== movieId);
    } else {
      user.favourites.push(movieId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: isFavourite ? 'Removed from favourites' : 'Added to favourites',
      favourites: user.favourites,
    });

  } catch (error) {
    console.error('Favourite toggle error:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
