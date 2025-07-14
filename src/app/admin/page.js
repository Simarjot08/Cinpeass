
import Dashboard from '../component/molecule/admin/dashboard';
import { redirect } from 'next/navigation';
import { verifyTokenFromCookie } from '@/app/lib/middleware/verifytoken';
import User from '@/app/lib/models/userModel';
import { connectDB } from '../lib/config/db';

export default async function AdminPage() {
  await connectDB();

  try {
    const userId = await verifyTokenFromCookie();
    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      redirect('/'); 
    }

    return (
      <div>
        <Dashboard />
      </div>
    );
  } catch (error) {
    console.error('Admin page error:', error.message);
    redirect('/'); // fallback redirect on any error
  }
}

