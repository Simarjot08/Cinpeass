
// import nodemailer from 'nodemailer';
// import { connectDB } from '@/app/lib/config/db';
// import Booking from '@/app/lib/models/bookingModel';
// import User from '@/app/lib/models/userModel';
// import Show from '@/app/lib/models/showmodel';
// import Movie from '@/app/lib/models/movieModel';

// export async function POST(req) {
//   await connectDB();

//   try {
//     const { bookingId } = await req.json();

//     const booking = await Booking.findById(bookingId)
//       .populate({
//         path: 'show',
//         populate: { path: 'movie', model: 'Movie' },
//       })
//       .populate('user');

//     if (!booking || !booking.user?.email) {
//       return new Response(JSON.stringify({ success: false, message: 'Booking or user email not found' }), { status: 400 });
//     }

//     console.log(`📧 Sending email to ${booking.user.email} for booking ID ${booking._id}`);

//     // ✅ Setup Nodemailer transport using SMTP
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: parseInt(process.env.SMTP_PORT),
//       secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for 587
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"CinePass" <${process.env.SENDER_EMAIL}>`,
//       to: booking.user.email,
//       subject: '🎉 Booking Confirmed - CinePass',
//       html: `
//         <h2>Hello ${booking.user.name || 'User'},</h2>
//         <p>Thank you for booking with CinePass! Here are your booking details:</p>
//         <ul>
//           <li><strong>Movie:</strong> ${booking.show?.movie?.title || 'N/A'}</li>
//           <li><strong>Date:</strong> ${booking.show?.showDateTime ? new Date(booking.show.showDateTime).toLocaleDateString() : 'N/A'}</li>
//           <li><strong>Time:</strong> ${booking.show?.showDateTime ? new Date(booking.show.showDateTime).toLocaleTimeString() : 'N/A'}</li>
//           <li><strong>Seats:</strong> ${Array.isArray(booking.bookedSeats) ? booking.bookedSeats.join(', ') : 'N/A'}</li>
//           <li><strong>Total Price:</strong> ₹${booking.amount}</li>
//         </ul>
//         <p>Enjoy your show!</p>
//         <p>- CinePass Team 🎬</p>
//       `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // ✅ (Optional) Update booking to mark email sent
//     booking.emailSent = true;
//     await booking.save();

//     return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200 });

//   } catch (error) {
//     console.error('❌ Email sending failed:', error.message);
//     return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
//   }
// }


import nodemailer from 'nodemailer';
import { connectDB } from '@/app/lib/config/db';
import Booking from '@/app/lib/models/bookingModel';
import User from '@/app/lib/models/userModel';
import Show from '@/app/lib/models/showmodel';
import Movie from '@/app/lib/models/movieModel';

export async function POST(req) {
  await connectDB();

  try {
    const { bookingId } = await req.json();

    const booking = await Booking.findById(bookingId)
      .populate({
        path: 'show',
        populate: { path: 'movie', model: 'Movie' },
      })
      .populate('user');

    if (!booking || !booking.user?.email) {
      return new Response(JSON.stringify({ success: false, message: 'Booking or user email not found' }), { status: 400 });
    }

    console.log(`📧 Sending email to ${booking.user.email} for booking ID ${booking._id}`);

    // ✅ Setup Nodemailer transport using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"CinePass" <${process.env.SENDER_EMAIL}>`,
      to: booking.user.email,
      subject: '🎉 Booking Confirmed - CinePass',
      html: `
        <h2>Hello ${booking.user.name || 'User'},</h2>
        <p>Thank you for booking with CinePass! Here are your booking details:</p>
        <ul>
          <li><strong>Movie:</strong> ${booking.show?.movie?.title || 'N/A'}</li>
          <li><strong>Date:</strong> ${booking.show?.showDateTime ? new Date(booking.show.showDateTime).toLocaleDateString() : 'N/A'}</li>
          <li><strong>Time:</strong> ${booking.show?.showDateTime ? new Date(booking.show.showDateTime).toLocaleTimeString() : 'N/A'}</li>
          <li><strong>Seats:</strong> ${Array.isArray(booking.bookedSeats) ? booking.bookedSeats.join(', ') : 'N/A'}</li>
          <li><strong>Total Price:</strong> ₹${booking.amount}</li>
        </ul>
        <p>Enjoy your show!</p>
        <p>- CinePass Team 🎬</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // ✅ (Optional) Update booking to mark email sent
    booking.emailSent = true;
    await booking.save();

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200 });

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
