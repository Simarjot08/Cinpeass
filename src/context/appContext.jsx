

// // "use client";

// // import { createContext, useContext ,useEffect,useState} from "react";
// // import axios from "axios";

// // export const Appcontext = createContext();

// // export const AppProvider = ({ children }) => {

// //     const[shows,setShows]=useState([]);
// //     const[favouriteMovies,setFAvouriteMovies]=useState([])


// //   const value = {
// //     // any global state or function you want to pass
// //   };

// //   const fetchShows=async()=>{
// //     try{
// //       const {data}=await axios.get('/api/auth/getshows')
// //       if(data.success){
// //         setShows(data.shows);
// //       }else{
// //         toast.error(data.message)
// //       }

// //       useEffect(()=>{
// //         fetchShows
// //       },[])

// //       const fetchFavouriteMovies=async()=>{
// //         try{
// //           const{data}=await axios.get('/api/user/favourite')
// //           if(data.success){
// //             setFavouriteMovies(data.movies)
// //           }else{
// //             toast.error(data.message);
// //           }
// //         }catch(error){
// //           console.error(error)
// //         }
// //       }

// //     }catch(error){
// //       console.error(error)
// //     }
// //   }

// //   return (
// //     <Appcontext.Provider value={value}>
// //       {children}
// //     </Appcontext.Provider>
// //   );
// // };

// // export const useAppContext = () => useContext(Appcontext);
// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// export const Appcontext = createContext();

// export const AppProvider = ({ children }) => {
//   const [shows, setShows] = useState([]);
//   const [favouriteMovies, setFavouriteMovies] = useState([]);

//   // ✅ Helper to safely parse JSON
//   const safeJSON = async (res) => {
//     try {
//       const text = await res.text();
//       return text ? JSON.parse(text) : {};
//     } catch {
//       return {};
//     }
//   };

//   // ✅ Fetch shows
//   const fetchShows = async () => {
//     try {
//       const res = await fetch('/api/auth/shows', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       const data = await safeJSON(res);

//       if (res.ok && data.success) {
//         setShows(data.shows);
//       } else {
//         toast.error(data.message || 'Failed to fetch shows');
//       }
//     } catch (error) {
//       console.error('Error fetching shows:', error);
//     }
//   };

//   // ✅ Fetch favourite movies
//   const fetchFavouriteMovies = async () => {
//     try {
//       const res = await fetch('/api/user/favourite', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });

//       const data = await safeJSON(res);

//       if (res.ok && data.success) {
//         setFavouriteMovies(data.movies);
//       } else {
//         toast.error(data.message || 'Failed to fetch favourites');
//       }
//     } catch (error) {
//       console.error('Error fetching favourites:', error);
//     }
//   };

//   // ✅ Auto-fetch on mount
//   useEffect(() => {
//     fetchShows();
//     fetchFavouriteMovies();
//   }, []);

//   // ✅ Provide global values
//   const value = {
//     shows,
//     favouriteMovies,
//     fetchShows,
//     fetchFavouriteMovies,
//   };

//   return (
//     <Appcontext.Provider value={value}>
//       {children}
//     </Appcontext.Provider>
//   );
// };

// export const useAppContext = () => useContext(Appcontext);

