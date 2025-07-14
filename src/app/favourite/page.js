import React from 'react'
import Favourite from '../component/molecule/favourite'

function Favouritetemp() {
  return (
    <div className="relative  moviesbody overflow-hidden">
  <div>
      <Favourite />
  </div>


  {/* Top gradient */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />

  {/* Bottom gradient */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />



</div>
  )
}

export default Favouritetemp
