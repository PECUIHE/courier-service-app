"use client";

import Image from 'next/image';
import React, { useEffect } from 'react';
import { supabase } from '@/utils/supabase'; // Ensure Supabase is properly configured
import { useUser } from '@/context/UserContext'; // Context for user authentication


const Avatar = () => {
  const { user } = useUser();
    
    // Fetch Profile of the verified/authenticated user from Supabase
    useEffect(() => {
      const fetchData = async () => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const { data: { user } } = await supabase.auth.getUser();
      };
      fetchData();
    }, [user]);
  

  return (
    <div className="flex items-center space-x-2 text-gray-700">
      <Image 
        src={user?.avatar_url || '/default-avatar.png'} 
        width={30}
        height={30}
        alt="Avatar" 
        className="rounded-full cursor-pointer bg-gray-200" 
      />
      <div>
        <h3 className="text-[12px] font-semibold capitalize">{user?.first_name}</h3>
        <p className='text-[10px]'>{user?.email}</p>
      </div>
    </div>
  );
};

export default Avatar;

