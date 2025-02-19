'use client';

import { useState, ReactNode } from 'react';
import { useUser } from '@/context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correctly use this hook to get the current path
import Image from 'next/image';
import { LuMenu, LuMessageSquareMore, LuX } from 'react-icons/lu';
import { MdOutlineDashboard, MdOutlineSettings } from 'react-icons/md';
import { IoNotificationsOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FaShippingFast } from 'react-icons/fa';
import { TbLogout, TbStatusChange } from 'react-icons/tb';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const { logout } = useUser();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route path

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <MdOutlineDashboard /> },
    { name: 'Profile', href: '/dashboard/profile', icon: <CgProfile /> },
    { name: 'Orders', href: '/dashboard/orders', icon: <FaShippingFast /> },
    { name: 'Status', href: '/dashboard/status', icon: <TbStatusChange /> },
    { name: 'Notifications', href: '/dashboard/notifications', icon: <IoNotificationsOutline /> },
    { name: 'Messages', href: '/dashboard/messages', icon: <LuMessageSquareMore /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <MdOutlineSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-white border border-gray-300">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-52 bg-white border-r border-gray-300 p-4 space-y-6 z-50 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block`}
      >
        {/* Close Button for Mobile */}
        <button
          className="block md:hidden text-xl text-gray-500 mb-4"
          onClick={() => setMenuOpen(false)}
        >
          {/* ✕ */}
          <LuX />
        </button>

        {/* Logo */}
        <div className="text-center mb-4">
          <Image
            src="/courier-logo.png" // Replace with your actual logo path
            alt="Company Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>

        {/* Menu Items */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-start font-semibold gap-8 px-4 py-2 rounded ${
                pathname === item.href
                  ? 'bg-red-100 text-black/80 font-bold' // Active menu item
                  : 'text-gray-700 hover:bg-red-500 hover:text-white' // Hover styles
              }`}
              onClick={() => setMenuOpen(false)} // Close menu on mobile
            >
                {item.icon} {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={logout}
          className={`capitalize w-full flex items-center justify-start gap-8 py-2 px-4 rounded bg-red-500 text-white font-bold hover:bg-red-600`}
        >
          <TbLogout />
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="flex items-center p-4 border-b border-gray-300 md:hidden">
          <button className="text-xl text-gray-700" onClick={() => setMenuOpen(true)}>
            {/* ☰ */}
            <LuMenu />
          </button>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

