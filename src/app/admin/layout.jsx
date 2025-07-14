import React from 'react'
import AdminNavbar from '../component/atom/admin/adminNavbar'
import Adminsidebar from '../component/atom/admin/adminSidebar'

function Adminlayout({children}) {
  return (
    <>
    <AdminNavbar/>
    <div className='flex'>
        <Adminsidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
            {children}
        </div>
    </div>

    </>
  )
}

export default Adminlayout
