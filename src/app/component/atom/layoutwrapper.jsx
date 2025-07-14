'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../molecule/navbar';
import Footer from '../molecule/footer';
import { Toaster } from 'react-hot-toast';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute=pathname.startsWith('/login');
  const isSignUpRoute=pathname.startsWith('/signup');

  return (
    <>
      {!isAdminRoute && !isLoginRoute && !isSignUpRoute &&<Navbar />}
      <Toaster position="top-right" />
      <main>{children}</main>
      {!isAdminRoute && !isLoginRoute && !isSignUpRoute &&  <Footer />}
    </>
  );
}