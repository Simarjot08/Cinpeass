// import { LayoutDashboardIcon, LinkIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
// import React from 'react'
// import Link from 'next/link'

// function Adminsidebar() {

//   const user={
//     firstname:'Admin',
//     lastname:'User',
//     imageUrl:"data/profile.png",
//   }

//   const adminNavLinks=[
//     {
//         name:'Dashboard',
//         path:'/admin',
//          icon:LayoutDashboardIcon
//     },
//     {
//         name:'Add Shows',
//         path:'/admin/addShows',
//          icon:PlusSquareIcon,
//     },
//      {
//         name:'List Shows',
//         path:'/admin/shows',
//          icon:ListIcon,
//     },
//      {
//         name:'List Bookings',
//         path:'/admin/booking',
//          icon:ListCollapseIcon
//     },
//   ]
 
//   return (
//     <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
//     <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar"></img>
//      <p className='mt-2 text-base max-md:hidden'>{user.firstname}{user.lastname}</p>
//       <div className='w-full'>
//         {adminNavLinks.map((link,index)=>(
//             <NavLink key={index} href={link.path} className={({isActive})=> `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
//                 {({isActive})=>(
//                     <>
//                     <LinkIcon className='w-5 h-5'/>
//                     <p className='max-md:hdden'>{link.name}</p>
//                    <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`}/>                    
//                     </>
//                 )}
//             </NavLink>
//         ))}

//       </div>
//     </div>
//   )
// }

// export default Adminsidebar

'use client';

import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Adminsidebar() {
  const pathname = usePathname();

  const user = {
    firstname: 'Admin',
    lastname: 'User',
    imageUrl: '/data/profile.png', // Ensure this path exists in `public` folder
  };

  const adminNavLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      name: 'Add Shows',
      path: '/admin/addShows',
      icon: PlusSquareIcon,
    },
    {
      name: 'List Shows',
      path: '/admin/shows',
      icon: ListIcon,
    },
    {
      name: 'List Bookings',
      path: '/admin/booking',
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      <img
        className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto'
        src={user.imageUrl}
        alt='sidebar'
      />
      <p className='mt-2 text-base max-md:hidden'>
        {user.firstname} {user.lastname}
      </p>

      <div className='w-full'>
        {adminNavLinks.map((link, index) => {
          const isActive = pathname === link.path;
          const Icon = link.icon;

          return (
            <Link
              key={index}
              href={link.path}
              className={`relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 hover:bg-gray-100/5 transition ${
                isActive ? 'bg-primary/15 text-primary' : ''
              }`}
            >
              <Icon className='w-5 h-5' />
              <p className='max-md:hidden'>{link.name}</p>
              {isActive && (
                <span className='w-1.5 h-10 rounded-l right-0 absolute bg-primary' />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Adminsidebar;
