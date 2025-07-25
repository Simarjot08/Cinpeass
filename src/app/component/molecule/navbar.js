// // 'use client';

// // import { Divide, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
// // import Link from 'next/link';
// // import { useState } from 'react';



// // export default function Navbar() {
// //           const [isOpen,setIsOpen]=useState(false);
         
    
  

// //     return (
  
// //     <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
// //         <Link href="/" className='max-md:flex-1'>
// //         <img src="/images/logo2.svg" alt="logo" className="w-36 h-auto rounded-full"></img>
// //         </Link>
// //         <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 
// //             ${isOpen ? 'max-md:w-full': 'max-md:w-0'}`}>

// //             <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor:pointer"onClick={()=>setIsOpen(!isOpen)} />
// //               <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Home</Link>
// //               <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/movies">Movies</Link>
// //              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Theaters</Link>
// //              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Releases</Link>
// //              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/favourite">Favorites</Link>

// //         </div>
// //         <div className='flex items-center gap-8'>
// //             <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
// //             <button className='px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
// //               <Link href="/login">Login </Link></button>
// //         </div>
// //         <MenuIcon className='mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
// // import Link from 'next/link';
// // import { toast } from 'react-hot-toast';

// // export default function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);
 
  
// //   const router = useRouter();

// //   // ✅ Check if user is logged in on component mount
// //   useEffect(() => {
// //     const checkLogin = async () => {
// //       try {
// //         const res = await fetch('/api/auth/me', {
// //           method: 'GET',
// //           credentials: 'include', // Send cookies
// //         });
// //         const data = await res.json();
// //         setIsLoggedIn(data.loggedIn);
// //       } catch (err) {
// //         console.error('Auth check failed:', err);
// //         setIsLoggedIn(false);
// //       }
// //     };

// //     checkLogin();
// //   }, []);

// //   // ✅ Logout handler
// //   const handleLogout = async () => {
// //     try {
// //       await fetch('/api/auth/logout', {
// //         method: 'POST',
// //         credentials: 'include',
// //       });
// //       toast.success('Logged out');
// //       setIsLoggedIn(false);
// //       router.push('/');
// //     } catch (err) {
// //       toast.error('Logout failed');
// //     }
// //   };

// //   return (
// //     <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5  bg-red-800 ">
// //       <Link href="/" className="max-md:flex-1">
// //         {/* <img src="/images/logo.png" alt="logo" className="w-36 h-auto rounded-full" /> */}
// //         <h1 className="text-2xl font-bold ">CINEPASS</h1>
// //       </Link>

// //       <div
// //         className={`max-md:absolute  max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center gap-8 py-3 
// //         max-md:h-screen  backdrop-blur bg-black/70 md:bg-white/10 md:border lg:bg-black/40 border-gray-300/20 overflow-hidden transition-[width] lg:pl-10 lg:pr-10 lg:rounded-full duration-300 
// //         ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
// //       >
// //         <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
// //         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Home</Link>
// //         <Link className=" hover:text-red-400" href="/movies" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Movies</Link>
// //         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Theaters</Link>
// //         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Releases</Link>
// //         <Link className=" hover:text-red-400" href="/favourite" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Favorites</Link>
// //         {isLoggedIn && <Link href="/booking" className=" hover:text-red-400" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>My Bookings</Link>}
// //       </div>

// //       <div className="flex items-center gap-8">
// //         <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

// //         {isLoggedIn ? (
// //           <button
// //             onClick={handleLogout}
// //             className="px-4 py-1 sm:px-7 sm:py-3 lg:bg-black/50 hover:bg-primary-dull transition rounded-full font-medium text-white"
// //           >
// //             Logout
// //           </button>
// //         ) : (
// //           <Link
// //             href="/login"
// //             className="px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white"
// //           >
// //             Login
// //           </Link>
// //         )}
// //       </div>

// //       <MenuIcon className="mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [hasFavorites, setHasFavorites] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const router = useRouter();

//   // useEffect(() => {
    
//   //   setMounted(true);

//   //   const checkLoginAndFavorites = async () => {
//   //     try {
//   //       // Check login status
//   //       const resAuth = await fetch('/api/auth/me', {
//   //         method: 'GET',
//   //         credentials: 'include',
//   //       });
//   //       const authData = await resAuth.json();
//   //       setIsLoggedIn(authData.loggedIn);

//   //       if (authData.loggedIn) {
//   //         // Fetch favorite movies only if logged in
//   //         const resFav = await fetch('/api/user/getfavourite', {
//   //           method: 'GET',
//   //           credentials: 'include',
//   //         });
//   //         const favData = await resFav.json();
//   //         if (favData.success && favData.movies && favData.movies.length > 0) {
//   //           setHasFavorites(true);
//   //         } else {
//   //           setHasFavorites(false);
//   //         }
//   //       } else {
//   //         setHasFavorites(false);
//   //       }
//   //     } catch (err) {
//   //       console.error('Error checking auth/favorites:', err);
//   //       setIsLoggedIn(false);
//   //       setHasFavorites(false);
//   //     }
//   //   };
//   useEffect(() => {
//   setMounted(true);

//   const checkLoginAndFavorites = async () => {
//     try {
//       const resAuth = await fetch('/api/auth/me', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       const authData = await resAuth.json();
//       setIsLoggedIn(authData.loggedIn);

//       if (authData.loggedIn) {
//         const resFav = await fetch('/api/user/getfavourite', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const favData = await resFav.json();
//         setHasFavorites(favData.success && favData.movies?.length > 0);
//       } else {
//         setHasFavorites(false);
//       }
//     } catch (err) {
//       console.error('Error checking auth/favorites:', err);
//       setIsLoggedIn(false);
//       setHasFavorites(false);
//     }
//   };

//   checkLoginAndFavorites();

//   // 🔁 Add event listener for favourites update
//   const handleFavouritesChanged = () => {
//     checkLoginAndFavorites();
//   };

//   window.addEventListener('favouritesChanged', handleFavouritesChanged);

//   return () => {
//     window.removeEventListener('favouritesChanged', handleFavouritesChanged);
//   };
// }, []);


//   //   checkLoginAndFavorites();
//   // }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch('/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
//       toast.success('Logged out');
//       setIsLoggedIn(false);
//       setHasFavorites(false);
//       router.push('/');
//     } catch (err) {
//       toast.error('Logout failed');
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-red-800">
//       <Link href="/" className="max-md:flex-1">
//         <h1 className="text-2xl font-bold">CINEPASS</h1>
//       </Link>

//       <div
//         className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center gap-8 py-3 
//         max-md:h-screen backdrop-blur bg-black/70 md:bg-white/10 md:border lg:bg-black/40 border-gray-300/20 overflow-hidden 
//         transition-[width] lg:pl-10 lg:pr-10 lg:rounded-full duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
//       >
//         <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
//         <Link className="hover:text-red-400" href="/" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//           Home
//         </Link>
//         <Link className="hover:text-red-400" href="/movies" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//           Movies
//         </Link>
//         <Link className="hover:text-red-400" href="/" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//           Theaters
//         </Link>
//         <Link className="hover:text-red-400" href="/" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//           Releases
//         </Link>

//         {/* Show Favorites link ONLY if logged in AND has favorite movies */}
//         {isLoggedIn && hasFavorites && (
//           <Link className="hover:text-red-400" href="/favourite" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//             Favorites
//           </Link>
//         )}

//         {isLoggedIn && (
//           <Link className="hover:text-red-400" href="/booking" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
//             My Bookings
//           </Link>
//         )}
//       </div>

//       <div className="flex items-center gap-8">
      
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="px-4 py-1 sm:px-7 sm:py-3 lg:bg-black/50 hover:bg-primary-dull transition rounded-full font-medium text-white"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             href="/login"
//             className="px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white"
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       <MenuIcon
//         className="mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       />
//     </div>
//   );
// }

// 'use client';

// import { Divide, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
// import Link from 'next/link';
// import { useState } from 'react';



// export default function Navbar() {
//           const [isOpen,setIsOpen]=useState(false);
         
    
  

//     return (
  
//     <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
//         <Link href="/" className='max-md:flex-1'>
//         <img src="/images/logo2.svg" alt="logo" className="w-36 h-auto rounded-full"></img>
//         </Link>
//         <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 
//             ${isOpen ? 'max-md:w-full': 'max-md:w-0'}`}>

//             <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor:pointer"onClick={()=>setIsOpen(!isOpen)} />
//               <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Home</Link>
//               <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/movies">Movies</Link>
//              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Theaters</Link>
//              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/">Releases</Link>
//              <Link onClick={()=>{scrollTo(0,0),setIsOpen(false)}} href="/favourite">Favorites</Link>

//         </div>
//         <div className='flex items-center gap-8'>
//             <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer'/>
//             <button className='px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
//               <Link href="/login">Login </Link></button>
//         </div>
//         <MenuIcon className='mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer' onClick={()=>setIsOpen(!isOpen)}/>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
// import Link from 'next/link';
// import { toast } from 'react-hot-toast';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
 
  
//   const router = useRouter();

//   // ✅ Check if user is logged in on component mount
//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const res = await fetch('/api/auth/me', {
//           method: 'GET',
//           credentials: 'include', // Send cookies
//         });
//         const data = await res.json();
//         setIsLoggedIn(data.loggedIn);
//       } catch (err) {
//         console.error('Auth check failed:', err);
//         setIsLoggedIn(false);
//       }
//     };

//     checkLogin();
//   }, []);

//   // ✅ Logout handler
//   const handleLogout = async () => {
//     try {
//       await fetch('/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });
//       toast.success('Logged out');
//       setIsLoggedIn(false);
//       router.push('/');
//     } catch (err) {
//       toast.error('Logout failed');
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5  bg-red-800 ">
//       <Link href="/" className="max-md:flex-1">
//         {/* <img src="/images/logo.png" alt="logo" className="w-36 h-auto rounded-full" /> */}
//         <h1 className="text-2xl font-bold ">CINEPASS</h1>
//       </Link>

//       <div
//         className={`max-md:absolute  max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center gap-8 py-3 
//         max-md:h-screen  backdrop-blur bg-black/70 md:bg-white/10 md:border lg:bg-black/40 border-gray-300/20 overflow-hidden transition-[width] lg:pl-10 lg:pr-10 lg:rounded-full duration-300 
//         ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
//       >
//         <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
//         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Home</Link>
//         <Link className=" hover:text-red-400" href="/movies" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Movies</Link>
//         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Theaters</Link>
//         <Link className=" hover:text-red-400" href="/" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Releases</Link>
//         <Link className=" hover:text-red-400" href="/favourite" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>Favorites</Link>
//         {isLoggedIn && <Link href="/booking" className=" hover:text-red-400" onClick={()=>{scrollTo(0,0);setIsOpen(false)}}>My Bookings</Link>}
//       </div>

//       <div className="flex items-center gap-8">
//         <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="px-4 py-1 sm:px-7 sm:py-3 lg:bg-black/50 hover:bg-primary-dull transition rounded-full font-medium text-white"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             href="/login"
//             className="px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white"
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       <MenuIcon className="mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasFavorites, setHasFavorites] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  // useEffect(() => {
    
  //   setMounted(true);

  //   const checkLoginAndFavorites = async () => {
  //     try {
  //       // Check login status
  //       const resAuth = await fetch('/api/auth/me', {
  //         method: 'GET',
  //         credentials: 'include',
  //       });
  //       const authData = await resAuth.json();
  //       setIsLoggedIn(authData.loggedIn);

  //       if (authData.loggedIn) {
  //         // Fetch favorite movies only if logged in
  //         const resFav = await fetch('/api/user/getfavourite', {
  //           method: 'GET',
  //           credentials: 'include',
  //         });
  //         const favData = await resFav.json();
  //         if (favData.success && favData.movies && favData.movies.length > 0) {
  //           setHasFavorites(true);
  //         } else {
  //           setHasFavorites(false);
  //         }
  //       } else {
  //         setHasFavorites(false);
  //       }
  //     } catch (err) {
  //       console.error('Error checking auth/favorites:', err);
  //       setIsLoggedIn(false);
  //       setHasFavorites(false);
  //     }
  //   };
  useEffect(() => {
  setMounted(true);

  const checkLoginAndFavorites = async () => {
    try {
      const resAuth = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      const authData = await resAuth.json();
      setIsLoggedIn(authData.loggedIn);

      if (authData.loggedIn) {
        const resFav = await fetch('/api/user/getfavourite', {
          method: 'GET',
          credentials: 'include',
        });
        const favData = await resFav.json();
        setHasFavorites(favData.success && favData.movies?.length > 0);
      } else {
        setHasFavorites(false);
      }
    } catch (err) {
      console.error('Error checking auth/favorites:', err);
      setIsLoggedIn(false);
      setHasFavorites(false);
    }
  };

  checkLoginAndFavorites();

  // 🔁 Add event listener for favourites update
  const handleFavouritesChanged = () => {
    checkLoginAndFavorites();
  };

  window.addEventListener('favouritesChanged', handleFavouritesChanged);

  return () => {
    window.removeEventListener('favouritesChanged', handleFavouritesChanged);
  };
}, []);


  //   checkLoginAndFavorites();
  // }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      toast.success('Logged out');
      setIsLoggedIn(false);
      setHasFavorites(false);
      router.push('/');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-red-800">
      <Link href="/" className="max-md:flex-1">
        <h1 className="text-2xl font-bold">CINEPASS</h1>
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center gap-8 py-3 
        max-md:h-screen backdrop-blur bg-black/70 md:bg-white/10 md:border lg:bg-black/40 border-gray-300/20 overflow-hidden 
        transition-[width] lg:pl-10 lg:pr-10 lg:rounded-full duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
      >
        <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
        <Link className="hover:text-red-400" href="/" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
          Home
        </Link>
        <Link className="hover:text-red-400" href="/movies" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
          Movies
        </Link>
        <Link className="hover:text-red-400" href="/theater" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
          Theaters
        </Link>
        <Link className="hover:text-red-400" href="/releases" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
          Releases
        </Link>

        {/* Show Favorites link ONLY if logged in AND has favorite movies */}
        {isLoggedIn && hasFavorites && (
          <Link className="hover:text-red-400" href="/favourite" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
            Favorites
          </Link>
        )}

        {isLoggedIn && (
          <Link className="hover:text-red-400" href="/booking" onClick={() => { scrollTo(0, 0); setIsOpen(false); }}>
            My Bookings
          </Link>
        )}
      </div>

      <div className="flex items-center gap-8">
      
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1 sm:px-7 sm:py-3 lg:bg-black/50 hover:bg-primary-dull transition rounded-full font-medium text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-1 sm:px-7 sm:py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white"
          >
            Login
          </Link>
        )}
      </div>

      <MenuIcon
        className="mx-md:ml-4 md:hidden w-6 ml-2 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}