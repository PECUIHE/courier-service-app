'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { FaEnvelope, FaUser } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';


export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: '',
    about: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (data) setProfile(data);
      if (error) console.error(error);
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const { error } = await supabase.from('profiles').update(profile).match({ email: profile.email });
    if (error) console.error(error);
    else alert('Profile updated successfully!');

    setLoading(false)
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-gray-700 text-xl font-bold mb-4">Edit Profile</h2>
      
      <form onSubmit={updateProfile} className="space-y-4">
      {/* Full Name Field */}
                <div className="w-full relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name:
                  </label>
                  <div className='relative w-full flex flex-row gap-4'>
                  <input
                    type="text"
                    id='first_name'
                    name='first_name'
                    placeholder={user?.first_name}
                    disabled
                    className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm placeholder:text-gray-700"
                  />
                  <FaUser className='absolute top-[42%] right-[55%] text-gray-700' />
                  
                  <input
                    type="text"
                    id='last_name'
                    name='last_name'
                    placeholder={user?.last_name}
                    disabled
                    className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm placeholder:text-gray-700"
                  />
                  <FaUser className='absolute top-[42%] right-3 text-gray-700' />
                  </div>
                </div>
      
                {/* Email Field */}
                <div className="w-full relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={user?.email}
                    disabled
                    className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm placeholder:text-gray-700"
                  />
                  <FaEnvelope className='absolute top-[56%] right-3 text-gray-700' />
                </div>


      
                {/* Submit Button with Spinner */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-md font-semibold ${
                    loading
                      ? 'bg-red-400 text-white cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>

    </div>
  );
}


















// // import ProfileForm from '@/app/components/ProfileForm'
// import React from 'react'

// export default function ProfilePage() {
//   return (
//     <div>
//       ProfilePage
//       {/* <ProfileForm /> */}
//     </div>
//   )
// }

