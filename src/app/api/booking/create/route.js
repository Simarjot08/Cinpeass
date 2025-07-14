

// export const createBooking=async(req,res)=>{
//     try{
//         const{userId}=req.auth();
//         const{showId,selectedSeats}=req.body;
//         const{origin}=req.headers;
//         //check if the seat is available for the selected show  
        
//         const  isAvailable=await checkSeatsAvailability(showId,selectedSeats)

//         if(!isAvailable){
//             return res.json({success:false,message:"Selected seats are not available"})
//         }
//         //get the showdetails

//         const showData=await Show.findById(showId).populate('movie');

//         //create a new 
//         const booking=await Booking.create({
//             user:userId,
//             show:showId,
//             amount:showData.showPrice*selectedSeats.length,
//             bookedSeats:selectedSeats
//         })
//         selectedSeats.map((seat)=>{
//          showData.occupiedSeats[seat]=userId ;

//         })
//        showData.markModified('occupiedSeats');
//        await  showData.save();

//        //stripe gateway initialize

//        res.json({success:true,message:'Booked Successfully'})

//     }catch(error){
// console.log(error.message);
// res.json({success:false,message:error.message})
        
//     }
// }

// app/api/booking/createbooking/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Show from '@/app/lib/models/showmodel';
import Booking from '@/app/lib/models/bookingModel';
import { cookies } from 'next/headers';
import Movie from '@/app/lib/models/movieModel';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Token verifier middleware from cookies
const verifyTokenFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.userId; // or decoded.id
};

export async function POST(req) {
  await connectDB();

  try {
    // ✅ Get userId from accessToken stored in HTTP-only cookie
    const userId =  await verifyTokenFromCookie();

    const body = await req.json();
    const { showId, selectedSeats } = body;

    // ✅ Fetch the show
  
    const showData = await Show.findById(showId).populate('movie');

    

    // ✅ Check if any of the selected seats are already booked
    const isAnySeatTaken = selectedSeats.some((seat) => showData.occupiedSeats[seat]);
    if (isAnySeatTaken) {
      return NextResponse.json({
        success: false,
        message: 'Some selected seats are already booked',
      });
    }

    // ✅ Create a new booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    // ✅ Mark seats as booked by user
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData.markModified('occupiedSeats');
    await showData.save();


    //stripe gateway initialise
  


    return NextResponse.json({
      success: true,
      message: 'Booked successfully',
      booking,
    });
  } catch (error) {
    console.error('Booking error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
