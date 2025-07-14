'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Loading from '../component/atom/loading';

export const Home = ({ user, onLogout }) => {
  return (
    <>
      <p>Welcome, {user.email}</p>
      <button
        onClick={onLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  async function fetchUserWithRefresh() {
    try {
      let res = await fetch('/api/auth/getUser');
      if (res.status === 401) {
        
        const refreshRes = await fetch('/api/auth/refresh');
        if (refreshRes.ok) {
         
          res = await fetch('/api/auth/getUser');
        } else {
          throw new Error('Refresh failed');
        }
      }

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  fetchUserWithRefresh();
}, []);


  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Logged out successfully');
        setUser(null);
        router.push('/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (err) {
      toast.error('Server error during logout');
    }
  };

  if (loading) return <div></div>;

  if (!user) return <div>Please login to access the dashboard.</div>;

  return <Home user={user} onLogout={handleLogout} />;
};

export default Dashboard;