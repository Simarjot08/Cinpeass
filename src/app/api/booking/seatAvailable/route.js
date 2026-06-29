
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/config/db';
import Show from '@/app/lib/models/showmodel';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { showId, selectedSeats } = body;

    if (!showId || !selectedSeats || !Array.isArray(selectedSeats)) {
      return NextResponse.json(
        { success: false, message: 'Invalid input' },
        { status: 400 }
      );
    }

    const showData = await Show.findById(showId);
    if (!showData) {
      return NextResponse.json(
        { success: false, message: 'Show not found' },
        { status: 404 }
      );
    }

    const occupiedSeats = showData.occupiedSeats || {};
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return NextResponse.json({
      success: true,
      available: !isAnySeatTaken,
    });
  } catch (error) {
    console.error('Seat check error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
