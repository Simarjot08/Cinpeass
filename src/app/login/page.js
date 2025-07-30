
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { toast,Toaster } from 'react-hot-toast';
import Button from '../component/atom/button';
import Input from '../component/atom/input';
import Link from 'next/link'
import styles from './login.module.css';

function LoginPageTemplate() {
     const router = useRouter();

  //    const handleGoogleSignIn = () => {
  //   const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/google/callback&response_type=code&scope=email%20profile`;
  //   window.location.href = googleUrl;
  // };
  const handleGoogleSignIn = () => {
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
  window.location.href = googleUrl;
};


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("button clicked");
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        // toast.success('Logged in successfully!');
          console.log('Redirecting to:', data.redirectUrl);
        setTimeout(() => router.push(data.redirectUrl), 1500);
      } else {
        toast.error(data.error || ' Invalid credentials');
      }
    } catch (err) {
      toast.error('Server error');
    }
  }
  return (
    <div>  
     <div className={styles.loginBody}>
      <div className="flex flex-col h-[60%] px-15 py-15 bg-black/80 rounded-md  gap-5 mt-[10%] ">
     <h1 className="text-center text-4xl font-bold  "> Welcome</h1>
           <div className="flex gap-7 flex-col mt-5">
  
      <Input name="email" type="email" value={formData.email}  onChange={handleChange} title="Email"/>  
      
       <Input name="password" type="password" value={formData.password} onChange={handleChange} title="Password"/>  
       <Button title="login" onclick={handleSubmit}/>

        <button onClick={handleGoogleSignIn} className='text-white px-10 py-2 rounded-lg border-white border-2 hover:bg-green-700 transition-all ease'>Sign in with Google</button>
    </div>
          {/* <p className="text-gray-400">Don't have account ? <Link className="text-blue-500" href="./signup">Sign Up</Link> </p> */}
          <p className="text-gray-400">
  {`Don't have account ? `}<Link className="text-blue-500" href="./signup">Sign Up</Link>
</p>

     </div>
     </div>
    </div>
  )
}

export default LoginPageTemplate
