'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
  }, [pathname]); // Add pathname to dependencies to re-run on pathname change

  function handleCreate() {
    router.push('/signup');
  }

  function handleLogin() {
    router.push('/login');
  }

  async function handleLogout() {
    try {
      const res = await axios.get('/api/out');
      console.log(res.data);
      router.push('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="w-full bg-[#212121] h-[6vh] flex items-center justify-between p-[0.4vw] font-geistSans text-white">
      <h1 className="text-[1.5rem] cursor-pointer">
        <Link href='/'>Employee Management System</Link>
      </h1>
      <div className="left mr-[5%] flex text-[1.2rem] gap-[10px]">
        {pathname === '/' && (
          <>
            <button className='mr-[1vw]' onClick={handleCreate}>Signup</button>
           
            <button onClick={handleLogin}>Login</button>
          </>
        )}
        {pathname === '/signup' && <button onClick={handleLogin}>Login</button>}
        {pathname === '/login' && <button onClick={handleCreate}>Signup</button>}
        {pathname === '/adminFinal' && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}

export default Nav;
