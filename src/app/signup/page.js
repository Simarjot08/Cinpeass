    'use client';
import React from 'react'
import Input from '../component/atom/input.js';
import Button from '../component/atom/button.js';
import Link from 'next/link'
 import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast,Toaster } from 'react-hot-toast';
import styles from "./sigup.module.css";





function  SignupTemplate() {
 
  const router = useRouter();
   const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email: '',
    password: '',
    confirmPassword: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("in handle");
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname:formData.firstname,
          lastname:formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(' Account created! Redirecting...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error(data.error || ' Something went wrong');
      }
    } catch (err) {
      toast.error(' Server error');
    }
  }
  return (
    <div className={styles.signbody}>
          <div className="flex flex-col hover:border-2 hover:border-white h-[60%] lg:h-[80%] px-10 lg:px-15  py-10 lg:py-15 bg-black/80 rounded-md  lg:gap-5  gap-3 mt-[20%] lg:mt-[6%]">
      
        <h1 className="text-center text-3xl lg:text-4xl font-bold ">Sign Up</h1>
          <div className="flex gap-6 lg:gap-7 flex-col mt-3  lg:mt-5">




                    <Input
          name="firstname"
          title="Firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Firstname"
          type="text"
        />
              
                    <Input
          name="lastname"
          title="Lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Email"
          type="text"
        />
           
               <Input
          name="email"
          title="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />

        <Input
        title="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />

        <Input
          name="confirmPassword"
          title="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
        />

       
        
    <button className="bg-red-500 text-white text-lg  py-2 w-[100%] rounded-md " onClick={handleSubmit} >Sign up</button>
    
    
            
          </div>
          <p className="text-gray-500">Already have account ? <Link className="text-blue-500" href="./login">Log In</Link> </p>
           <hr></hr>
     </div>
       </div>
  )
}

export default SignupTemplate
