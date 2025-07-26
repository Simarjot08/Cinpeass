
import mongoose, { Schema, model, models } from 'mongoose';

const bookingSchema = new Schema(
  {
    // user: { type: String, required: true ,ref:'User' },
    // show: { type: String, required: true,ref:'Show' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
show: { type: Schema.Types.ObjectId, ref: 'Show', required: true },

//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// show: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
   status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
    amount: { type: Number, required: true },
    bookedSeats: { type: Array ,required:true},
    isPaid:{type:Boolean,default:false},
    emailSent: { type: Boolean, default: false },
    paymentLink:{type:String},
  },{timestamps:true});

// ✅ Use 'models.Movie' if it already exists, otherwise create it
const Booking = models.Booking || model('Booking', bookingSchema);

export default Booking;



