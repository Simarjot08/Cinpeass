

'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '@/app/lib/isotime/isotimeformat'
import toast from 'react-hot-toast'
import Loading from '@/app/component/atom/loading'

function SeatLayout() {
  const router = useRouter()
  const { id, date } = useParams()

  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [bookedSeats, setBookedSeats] = useState([])
  const [bookingLoading, setBookingLoading] = useState(false)

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  // Fetch show data with unique times and credentials included
  const getShow = async () => {
    try {
      const res = await fetch(`/api/auth/getshows/${id}`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to fetch shows')

      const data = await res.json()

      if (data.success && data.dateTime[date]) {
        const uniqueTimesMap = new Map()
        data.dateTime[date].forEach((item) => {
          const timeKey = new Date(item.time).toISOString()
          if (!uniqueTimesMap.has(timeKey)) {
            uniqueTimesMap.set(timeKey, item)
          }
        })
        const uniqueDateTimes = Array.from(uniqueTimesMap.values())

        setShow({
          movie: data.movie,
          dateTime: {
            ...data.dateTime,
            [date]: uniqueDateTimes,
          },
        })
      } else {
        toast.error("No shows available for selected date")
      }
    } catch (error) {
      toast.error("Failed to load show data")
      console.error("API Error:", error.message)
    }
  }

  // Fetch booked seats for selected show with credentials
  const fetchOccupiedSeats = async (showId) => {
    try {
      const res = await fetch(`/api/booking/seats/${showId}`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to fetch booked seats')
      const data = await res.json()
      if (data.success) {
        setBookedSeats(data.occupiedSeats)
      } else {
        toast.error("Failed to load seat availability")
      }
    } catch (error) {
      console.error("Error fetching booked seats", error)
      toast.error("Failed to load seat availability")
    }
  }

  useEffect(() => {
    getShow()
  }, [])

  useEffect(() => {
    if (selectedTime?.showId) {
      fetchOccupiedSeats(selectedTime.showId)
      setSelectedSeats([]) // reset seat selection when time changes
    }
  }, [selectedTime])

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first")
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select five seats")
    }
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    )
  }

  const handleBooking = async () => {
    if (!selectedTime || selectedSeats.length === 0) {
      return toast.error("Please select show time and at least one seat")
    }
    setBookingLoading(true)
    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // crucial for sending cookies!
        body: JSON.stringify({
          showId: selectedTime.showId,
          selectedSeats,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401 || data.message === 'No token provided') {
          setBookingLoading(false)
          return toast.error("Please log in to book seats")
        }
        if (data.message?.includes("already booked")) {
          setBookingLoading(false)
          return toast.error("Some selected seats are already booked")
        }
        setBookingLoading(false)
        return toast.error(data.message || "Booking failed")
      }

     
      if (data.success && data.url) {
  window.location.href = data.url; // Hard redirect to Stripe Checkout page
} else {
  toast.error("Failed to initiate payment session");
}

      
    
    } catch (error) {
      console.error("Booking error:", error.message)
      toast.error("Something went wrong during booking")
    } finally {
      setBookingLoading(false)
    }
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`
          const isBooked = bookedSeats.includes(seatId)
          const isSelected = selectedSeats.includes(seatId)

          return (
            <button
              key={seatId}
              disabled={isBooked || bookingLoading}
              onClick={() => !isBooked && handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-red-800/60 
                ${isBooked ? "bg-gray-400 text-white cursor-not-allowed" : ""}
                ${isSelected ? "bg-primary text-white" : ""}
                ${!isBooked && !isSelected ? "hover:bg-red-500/20" : ""}
              `}
            >
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  return show ? (
    <>
      <div className="text-center mt-30 mb-12 px-4">
        <h2 className="text-sm uppercase tracking-widest text-white font-semibold">
          Step into the Experience
        </h2>
        <h1 className="text-3xl md:text-5xl font-extrabold text-red-500 drop-shadow-lg mt-3 animate-pulse">
          Book Your Seat 🎟️
        </h1>
        <p className="text-white text-base text-sm md:text-lg max-w-2xl mx-auto mt-4">
          Choose your showtime, pick your perfect seat, and get ready for a thrilling journey.
          Your screen, your moment — it's showtime!
        </p>
      </div>

      <div className='flex flex-col bg-backdetail md:flex-row px-6 md:px-10 lg:px-40 py-30 pt-10 md:pt-50'>
        {/* Show Time */}
        <div className='w-60 bg-red-800/70 border border-primary/20 rounded-lg py-10 h-max md:sticky ml-10 lg:ml-0 md:top-30'>
          <p className='text-lg font-semibold px-6'>Available Timings</p>
          <div className='mt-5 space-y-1'>
            {show.dateTime[date].map((items) => (
              <div
                key={items.time}
                onClick={() => setSelectedTime(items)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition 
                  ${selectedTime?.time === items.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}
              >
                <ClockIcon className='w-4 h-4' />
                <p className='text-sm'>{isoTimeFormat(items.time)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Layout */}
        <div className='relative flex-1 flex flex-col items-center max-md:mt-10'>
          <h1 className='text-2xl font-semibold mb-4'> Select your Seat</h1>
          <img src="/images/screenImage_red.svg" alt="screen" className='text-red-500' />
          <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

          <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
            <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
              {groupRows[0].map(row => renderSeats(row))}
            </div>
            <div className='grid grid-cols-2 gap-11'>
              {groupRows.slice(1).map((group, idx) => (
                <div key={idx}>
                  {group.map(row => renderSeats(row))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className={`flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-red-800 hover:bg-red-700/70 hover:scale-[1.05] transition rounded-full font-medium cursor-pointer active:scale-95
              ${bookingLoading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {bookingLoading ? 'Processing...' : 'Proceed to Checkout !'}
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div><Loading /></div>
  )
}

export default SeatLayout
