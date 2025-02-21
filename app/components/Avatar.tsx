"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase'; // Ensure Supabase is properly configured
import { useUser } from '@/context/UserContext'; // Context for user authentication

// Define the structure of the user metadata to ensure proper typing
interface UserMetadata {
  first_name: string;
  email: string;
  avatar_url: string | null;
}

const Avatar = () => {
  const { user } = useUser(); // Assume 'user' contains the user object from context

  // Initialize state for user metadata
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  
  // Fetch Profile of the verified/authenticated user from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      if (supabaseUser && supabaseUser.user_metadata) {
        const userMetadata = supabaseUser.user_metadata as UserMetadata;
        const { first_name, email, avatar_url } = userMetadata || {};

        setFirstName(first_name || 'Name:');
        setEmail(email || 'Email:');
        setAvatarUrl(avatar_url || '/default-avatar.png'); // Use default avatar if null
      }
    };
    fetchData();
  }, [user]);

  // Ensure to handle loading state and safely access the properties
  if (!user) {
    return <div>Loading...</div>; // Optionally, handle the loading state when user is not available
  }

  return (
    <div className="flex items-center space-x-2 text-gray-700">
      <Image 
        src={user?.avatar_url || '/default-avatar.png' || avatarUrl} // Ensure avatarUrl is available
        width={30}
        height={30}
        alt="Avatar" 
        className="rounded-full cursor-pointer bg-gray-200" 
      />
      <div>
        <h3 className="text-[12px] font-semibold capitalize">{user?.first_name || firstName}</h3>
        <p className="text-[10px]">{user?.email || email}</p> {/* Use email from the user object directly */}
      </div>
    </div>
  );
};

export default Avatar;












// "use client";

// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabase'; // Ensure Supabase is properly configured
// import { useUser } from '@/context/UserContext'; // Context for user authentication

// // Define the structure of the user metadata to ensure proper typing
// interface UserMetadata {
//   first_name: string;
//   email: string;
//   avatar_url: string | null;
// }

// const Avatar = () => {
//   const { user } = useUser();
//   const [first_name, setFirstName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [avatar_url, setAvatarUrl] = useState<string>('');
  
    
//     // Fetch Profile of the verified/authenticated user from Supabase
//     useEffect(() => {
//       const fetchData = async () => {
//         const { data: { user } } = await supabase.auth.getUser();
//         if (user && user.user_metadata && user.user_metadata.first_name && user.user_metadata.last_name && user.user_metadata.avatar_url) {
//           setFirstName(user.user_metadata.first_name);
//           setEmail(user.user_metadata.email);
//           setAvatarUrl(user.user_metadata.avatar_url);
//         }
//       };
//       fetchData();
//     }, [user]);
  

//   return (
//     <div className="flex items-center space-x-2 text-gray-700">
//       <Image 
//         src={user?.avatar_url || '/default-avatar.png'} 
//         width={30}
//         height={30}
//         alt="Avatar" 
//         className="rounded-full cursor-pointer bg-gray-200" 
//       />
//       <div>
//         <h3 className="text-[12px] font-semibold capitalize">{user?.first_name}</h3>
//         <p className='text-[10px]'>{user?.email}</p>
//       </div>
//     </div>
//   );
// };

// export default Avatar;

