'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

const Dashboard = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);


  // Fetch verified/authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        console.warn('User is not available; skipping data fetch.');
        return;
      }
    }
    fetchUser();
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

    // Optionally update the time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      setProfile(data?.user || null);
    };

    fetchProfile();
  }, []);


  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile?.id) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', profile.id); // Filter orders by user

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    };

    fetchOrders();
  }, [profile?.id]);


  if (!user) {
    return <p>Loading user...</p>;
  }


  return (
    <div className="space-y-8 text-gray-800">
      {/* Welcome Message */}
      <div className="p-4 flex items-center justify-between border border-gray-300 rounded bg-white">
        <div>
          <h2 className="uppercase text-xl font-bold text-gray-800">Hello, {user?.first_name + '.' || 'User'}</h2>
          <p className="text-sm font-bold text-gray-800">{user?.email}</p>
          <p className="text-sm text-gray-600">
            {currentDate} {' '} {currentTime}
          </p>
        </div>
        <div>
          <Image
            src=''
            alt="User Avatar"
            className="size-16 rounded-full border border-gray-300"
          />
        </div>
      </div>

      <div className=''>
          <h2>Your Orders:</h2>

          {orders.length > 0 ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  Order #{order.id}: {order.order_details} - {order.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
    </div>
  );
};

export default Dashboard;

