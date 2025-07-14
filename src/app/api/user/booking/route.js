// import Booking from "@/app/lib/models/booking";

// export const getUserBookings=async(req,res)=>{
//     try{
//         const user=req.auth().userId;
//         const bookings=await Booking.find({user}).populate({
//             path:"show",
//             populate:{path:"movie"}
//         }).sort({createdAt:-1})
//         res.json({success:true,bookings})

//     }catch(error){
//         console.lerror(error.message);
//         res.json({success:false,message:error.message});
//     }

// }
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Show from '@/app/lib/models/showmodel';
import Movie from '@/app/lib/models/movieModel';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken'; // Your verify function

export async function GET(req) {
  await connectDB();

  try {
    // Get userId from JWT token stored in cookie
    const userId = await verifyTokenFromCookie();

    // Find bookings for this user, populate nested show -> movie, sorted descending by createdAt
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: 'show',
        populate: { path: 'movie' }
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Get User Bookings Error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
