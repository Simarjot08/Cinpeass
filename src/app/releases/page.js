


import React from 'react'
import Releases from '../component/molecule/releases'



function Latest() {
  return (
   <div className="relative  moviesbody overflow-hidden">
  <div>
      <Releases/>
  </div>


  {/* Top gradient */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />

  {/* Bottom gradient */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />



</div>
  )
}

export default Latest