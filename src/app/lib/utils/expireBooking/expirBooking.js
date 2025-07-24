import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import Show from '@/app/lib/models/showmodel';

export const cancelExpiredBookings = async () => {
  await connectDB();

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  const expiredBookings = await Booking.find({
    isPaid: false,
    createdAt: { $lt: tenMinutesAgo }
  }).populate('show');

  for (const booking of expiredBookings) {
    const show = await Show.findById(booking.show._id);
    if (show) {
      booking.bookedSeats.forEach((seat) => {
        if (show.occupiedSeats[seat]?.toString() === booking.user.toString()) {
          delete show.occupiedSeats[seat];
        }
      });
      show.markModified('occupiedSeats');
      await show.save();
    }

    await booking.deleteOne(); // ❌ Delete expired booking
  }
};
