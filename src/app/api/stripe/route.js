// import Stripe from "stripe";
// import Booking from "@/app/lib/models/bookingModel";
// export const stripeWebhooks=async(request,response)=>{
//     const stripeInstance=new stripeWebhooks(process.env.STRIPE_SECRET_KEY);
//     const sig=request.headers["stripe-signature"];
//     let event;

//     try{
//         event=stripeInstance.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
//     }catch(error){
//         return response.status(400).send(`webhook Error: ${error.message}`);
//     }

//     try{
//         switch(event.type){
//             case "payment_intent.succeeded":{
//                 const paymentIntent=event.data.object;
//                 const sessionList=await stripeInstance.checkout.sessions.list({
//                     payment_intent:paymentIntent.id
//                 })
//                 const session=sessionList.data[0];
//                 const {bookingId}=session.metadata;

//                 await Booking.findByIdAndUpdate(bookingId,{
//                     isPaid:true,
//                     paymentLink:""
//                 })
//                break;
//             }

//            default:console.log('unhandeled event type :',event.type)

//         }
//         response.json({recieved:true})
//     }catch(error){
//         console.log("webhook processing error",error);
//         response.status(500).send("Internal server error");
//     }
// }

import Stripe from 'stripe';
import Booking from '@/app/lib/models/bookingModel';
import { connectDB } from '@/app/lib/config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Required to receive raw body
  },
};

export async function POST(req) {
  await connectDB();

  const rawBody = await req.arrayBuffer();
  const bodyBuffer = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;

        // Fetch the session associated with this intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        const session = sessions.data[0];
        const bookingId = session?.metadata?.bookingId;

        if (bookingId) {
          await Booking.findByIdAndUpdate(bookingId, {
            isPaid: true,
            paymentLink: '',
          });
          console.log(`✅ Booking ${bookingId} marked as paid.`);
        } else {
          console.warn('⚠️ No bookingId found in session metadata.');
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
