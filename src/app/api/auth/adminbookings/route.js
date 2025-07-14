// import Booking from "@/app/lib/models/booking"

// export const getAllBookings=async(req,res)=>{
//     try{

//         const bookings=await Booking.find({}).populate('user').populate({
//             path:"show",
//             populte:{path:"movie"}
//         }).sort({createdAt:-1})
//         res.json({success:true,bookings})

//     }
//     catch(error){
// console.log(error);
// res.json({success:false,message:error.message})
//     }
// }



import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';          // Your DB connection
import Booking from '@/app/lib/models/bookingModel';// Booking model
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';// Your verify token

export async function GET(req) {
  try {
    await connectDB();

    // Await token verification (async function)
    const userId = await verifyTokenFromCookie();

    // Optional: You can check if userId has admin rights here

    // Fetch all bookings with nested populates
    const bookings = await Booking.find({})
      .populate('user')
      .populate({
        path: 'show',
        populate: { path: 'movie' }
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error in getAllBookings:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
