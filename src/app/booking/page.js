import React from 'react'
import Mybooking from '../component/molecule/mybooking'
function Bookings() {
  return (
    <div>
  <div className="text-center mt-30 mb-12 px-4">
  <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 drop-shadow-lg mt-3 animate-pulse">
    My Bookings
  </h1>
  {/* <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-4">
   🍿 "Ticket booked. Popcorn ready?"
  </p> */}
  <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-4">
  {`🍿 "Ticket booked. Popcorn ready?"`}
</p>

</div>
 <Mybooking/>
  
    </div>
  )
}

export default Bookings
