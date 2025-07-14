'use client'
import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect,useState } from 'react'
import { dummyDashboardData } from '../../../../../public/data/assets';
import Loading from '../../atom/loading';
import Title from '../../atom/admin/title';
import { dateFormat } from '@/app/lib/dateFormat/dateFormat';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Dashboard() {
 
  const router=useRouter();
  
  const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: "$ "+ dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: "$ "+ dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: "$ "+ dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: "$ "+ dashboardData.totalUser || "0",
      icon: UserIcon,
    },
  ];


  const handleLogout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Make sure cookies are sent
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || 'Logged out successfully!');
      setTimeout(() => router.push('/'), 1000); // Redirect to login or home
    } else {
      toast.error(data.error || 'Logout failed!');
    }
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Something went wrong!');
  }
};
  // const fetchDashboardData = async () => {
  //   setDashboardData(dummyDashboardData);
  //   setLoading(false);
  // };
const fetchDashboardData = async () => {
  try {
    const res = await fetch('/api/auth/admindash', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ Send cookies (for JWT)
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setDashboardData(data.dashboardData);
    } else {
      toast.error(data.message || 'Failed to load dashboard data');
    }
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
    <div className='flex gap-[70%]'>
       <Title text1="Admin" text2="Dashboard" />
         
          <button
            onClick={handleLogout}
            className="px-4 py-1 sm:px-7 sm:py-3 lg:bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white">
            Logout
          </button>
       
    </div>
     

      <div className='relative flex flex-wrap gap-4 mt-6'>
        <div className='flex flex-wrap gap-4 w-full'>
        {dashboardCards.map((card,index)=>(
            <div key={index} className='flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
                <div>
                    <h1 className='text-sm'>{card.title}</h1>
                    <p className='text-xl font-medium mt-1'>{card.value}</p>
                    </div>
                    <card.icon className='w-6 h-6'/>
                    </div>
        ))}

        </div>
      </div>
      <p className='mt-10 text-lg font-medium'> Active Shows</p>

      <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
        {dashboardData.activeShows.map((show)=>(
            <div key={show._id} className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:translate-y-1 transition duration-300'>
                <img src={`${IMAGE_BASE}${show.movie.poster_path}`} alt="image"  onError={(e) => e.target.style.display = 'none'} className='h-60 w-full object-cover'/>
                <p className='font-medium p-2 truncate'>{show.movie.title}</p>
                <div className='flex items-center justify-between px-2'>
                    <p className='text-lg font-medium'> $ {show.showPrice}</p>
                    <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                        <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                        {show.movie.vote_average.toFixed(1)}
                    </p>
                </div>
                <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
                </div>
        ))}

      </div>
   
    </>
  ) : (
    <Loading />
  );
}

export default Dashboard;

