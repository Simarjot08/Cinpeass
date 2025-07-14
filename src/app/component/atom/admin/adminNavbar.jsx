import React from 'react'
import Link from 'next/link'

function AdminNavbar() {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
      <Link href='/'>
      <h1 className="text-2xl md:text-3xl font-extrabold text-center">
      <span className="text-red-600 drop-shadow-lg">Cine</span>
     <span className="text-red-500ml-2">Pass</span>
     </h1>
      </Link>
    </div>
  )
}

export default AdminNavbar
