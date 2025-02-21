'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase'; // Ensure Supabase is properly configured
import { useUser } from '@/context/UserContext'; // Context for user authentication
import Image from 'next/image';
import Loading from '../loading';
// import LocationTracker from '../components/LocationTracker';

// Define types for profile and orders
interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  avatar_url?: string;
}

interface Order {
  id: string;
  user_id: string;
  order_details: string;
  status: string;
  date: string;
  tracking_number: string;
}

const UserDashboard = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  // Fetch Profile of the verified/authenticated user from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        console.warn('User is not available; skipping data fetch.');
        return;
      }

      // Map user details to UserProfile
      const userProfile: UserProfile = {
        id: user.uid,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar_url: user.avatar_url || '',
      };
      setProfile(userProfile);

    };

    fetchProfile();
  }, [user]);

  // Set current date
  useEffect(() => {
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(today);
    setCurrentDate(formattedDate);
  }, []);

  // Set current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }).format(now);
      setCurrentTime(formattedTime);
    };

    // Update the time immediately when the component mounts
    updateTime();

    // Update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Fetch Orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile?.id) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', profile.id); // Filter orders by the authenticated user's ID

      if (error) {
        console.error('Error fetching orders:', error);
        // return;
      } else {
        setOrders(data as Order[]);
      }

      // setOrders(data as Order[] || []);
      setLoading(false); // Loading finished
    };

    fetchOrders();
  }, [profile?.id]);

  if (loading) return <Loading />
  // <p className='text-gray-600 bg-gray-100'>Loading! Please wait...</p>;

  // if (!user) {
  //   return <Loading />
  //   // <p className='text-gray-600 bg-gray-100'>Loading! Please wait...</p>;
  // }

  
  return (
    <div className="space-y-8 text-gray-800">
      {/* User Profile Section */}
      <div className="p-4 flex items-center justify-between gap-2 border border-gray-300 rounded bg-white">
        <div>
          <h2 className="capitalize text-xl font-bold text-gray-800">Hello, {profile?.first_name + ' ' + profile?.last_name || 'User'}!</h2>
          <p className="text-sm font-bold text-gray-800">{profile?.email}</p>
          <p className="text-sm text-gray-600">
            {currentDate} {' '} {currentTime}
          </p>
        </div>
        <div>
          <Image
            src={profile?.avatar_url || '/default-avatar.png'} // Fallback avatar image
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-full border border-gray-300 bg-gray-200"
          />
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <h2 className="text-xl font-bold">Your Orders:</h2>

        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="p-4 border border-gray-200 rounded bg-gray-50 shadow-sm">
                <p className="text-lg font-bold">Order #{order.id}</p>
                <p>Details: {order.order_details}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Tracking_id: {order.tracking_number}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='mt-4 mb-2'>No orders found.</p>
        )}
      </div>

      {/* <div> */}
        {/* <LocationTracker /> */}
      {/* </div> */}
    </div>
  );
};

export default UserDashboard;

