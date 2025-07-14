// import Show from "@/app/lib/models/showmodel";

// export const getOccupiedSeats=async(req,res)=>{
//     try{
//         const{showId}=req.params;
//         const showData=await Show.findById(showId);
//         const occupiedSeats=Object.keys(showData.occupiedSeats)
//         res.json({success:true},occupiedSeats)

//     }catch(error){
//         console.log(error.message);
//         res.json({succes:false,message:error.message})
//     }
// }
// app/api/booking/occupied/route.js

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Show from '@/app/lib/models/showmodel';

// // URL: /api/booking/occupied?showId=123
// export async function GET(req) {
//   await connectDB();

//   try {
//     const { searchParams } = new URL(req.url);
//     const showId = searchParams.get('showId');

//     if (!showId) {
//       return NextResponse.json({ success: false, message: 'Missing showId in query' }, { status: 400 });
//     }

//     const showData = await Show.findById(showId);

//     if (!showData) {
//       return NextResponse.json({ success: false, message: 'Show not found' }, { status: 404 });
//     }

//     const occupiedSeats = Object.keys(showData.occupiedSeats || {});

//     return NextResponse.json({ success: true, occupiedSeats }, { status: 200 });
//   } catch (error) {
//     console.error('Get Occupied Seats Error:', error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import { connectDB } from '@/app/lib/config/db';
// import Show from '@/app/lib/models/showmodel';

// export async function GET(request, { params }) {
//   await connectDB();

//   try {
   
//     const showId = await params.showid;

//     if (!showId) {
//       return NextResponse.json({ success: false, message: 'Missing showId in params' }, { status: 400 });
//     }

//     const showData = await Show.findById(showId);

//     if (!showData) {
//       return NextResponse.json({ success: false, message: 'Show not found' }, { status: 404 });
//     }

//     const occupiedSeats = Object.keys(showData.occupiedSeats || {});

//     return NextResponse.json({ success: true, occupiedSeats }, { status: 200 });
//   } catch (error) {
//     console.error('Get Occupied Seats Error:', error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Show from '@/app/lib/models/showmodel';

export async function GET(request, context) {
  await connectDB();

  try {
    // Await the params object here
    const params = await context.params;

    const showId = params.showid;


    if (!showId) {
      return NextResponse.json({ success: false, message: 'Missing showId in params' }, { status: 400 });
    }

    const showData = await Show.findById(showId);

    if (!showData) {
      return NextResponse.json({ success: false, message: 'Show not found' }, { status: 404 });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});

    return NextResponse.json({ success: true, occupiedSeats }, { status: 200 });
  } catch (error) {
    console.error('Get Occupied Seats Error:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


