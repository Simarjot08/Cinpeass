// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';


// const Dateselect = ({dateTime,id}) => {

//     const Router=useRouter();
//    const[selected,setSelected]=useState(null);
//    const onBookHAndler=()=>{
//     if(!selected){
//         return toast('Please select a date')
//     }
// Router.push(`/movies/${id}/seats/${selected}`)
// scrollTo(0,0);
//    }


//   return (
//     <div id='dateSelect' className='pt-30 ml-[25%]  w-[43%]'>
//         <div className='flex flex-col md:flex-row items-center justify-between  relative p-8 bg-red-800/50 border border-primary/20 rounded-lg'>
     
//      <div>
//         <p className='text-lg font-semibold'>Choose Date</p>
//         <div className='flex items-center gap-6 text-sm mt-5'>
//             <ChevronLeftIcon width={28}/>
//             <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
//                 {Object.keys(dateTime).map((date)=>(
//                     <button onClick={()=>setSelected(date)} key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected===date? "bg-primary text-white" :"border border-primary/70"}`}>
//                     <span>{new Date(date).getDate()}</span>
//                     <span>{new Date(date).toLocaleDateString("en-US",{month:"short"})}

//                     </span>
//                     </button>
//                ))}
//             </span>
//             <ChevronRightIcon width={28}/>
//         </div>
//         </div>
//         <button onClick={onBookHAndler} className='bg-white  font-bold text-black px-8 py-2 mt-6 rounded hover:text-white hover:bg-primary/90 transition-all cursor-pointer mr-6'>Book Now</button>
//         </div>
//     </div>
//   )
// }

// export default Dateselect
// 

// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';

// const Dateselect = ({ shows = [], id }) => {
//   const Router = useRouter();
//   const [selected, setSelected] = useState(null);

//   // Extract unique dates from all shows' showDateTime
//   const uniqueDates = Array.from(
//     new Set(shows.map((show) => new Date(show.showDateTime).toISOString().split('T')[0]))
//   );

//   const onBookHAndler = () => {
//     if (!selected) {
//       return toast.error('Please select a date');
//     }
//     Router.push(`/movies/${id}/seats/${selected}`);
//     scrollTo(0, 0);
//   };

//   return (
//     <div id="dateSelect" className="pt-30 ml-[25%] w-[43%]">
//       <div className="flex flex-col md:flex-row items-center justify-between relative p-8 bg-red-800/50 border border-primary/20 rounded-lg">
//         <div>
//           <p className="text-lg font-semibold">Choose Date</p>
//           <div className="flex items-center gap-6 text-sm mt-5">
//             <ChevronLeftIcon width={28} />
//             <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
//               {uniqueDates.length === 0 ? (
//                 <p className="text-sm text-red-500">No dates available.</p>
//               ) : (
//                 uniqueDates.map((date) => (
//                   <button
//                     onClick={() => setSelected(date)}
//                     key={date}
//                     className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
//                       selected === date ? 'bg-primary text-white' : 'border border-primary/70'
//                     }`}
//                   >
//                     <span>{new Date(date).getDate()}</span>
//                     <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
//                   </button>
//                 ))
//               )}
//             </span>
//             <ChevronRightIcon width={28} />
//           </div>
//         </div>
//         <button
//           onClick={onBookHAndler}
//           className="bg-white font-bold text-black px-8 py-2 mt-6 rounded hover:text-white hover:bg-primary/90 transition-all cursor-pointer mr-6"
//         >
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dateselect;

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Dateselect = ({ dateTime = {}, id }) => {
  const Router = useRouter();
  const [selected, setSelected] = useState(null);

  // Extract unique dates from dateTime object keys
  const uniqueDates = Object.keys(dateTime);

  const onBookHAndler = () => {
    if (!selected) {
      return toast.error('Please select a date');
    }
    Router.push(`/movies/${id}/seats/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-30 ml-[25%] w-[43%]">
      <div className="flex flex-col md:flex-row items-center justify-between relative p-8 bg-red-800/50 border border-primary/20 rounded-lg">
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {uniqueDates.length === 0 ? (
                <p className="text-sm text-red-500">No dates available.</p>
              ) : (
                uniqueDates.map((date) => (
                  <button
                    onClick={() => setSelected(date)}
                    key={date}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                      selected === date ? 'bg-primary text-white' : 'border border-primary/70'
                    }`}
                  >
                    <span>{new Date(date).getDate()}</span>
                    <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </button>
                ))
              )}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={onBookHAndler}
          className="bg-white font-bold text-black px-8 py-2 mt-6 rounded hover:text-white hover:bg-primary/90 transition-all cursor-pointer mr-6"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Dateselect;
