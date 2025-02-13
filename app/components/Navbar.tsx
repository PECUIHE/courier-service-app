'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '/public/courier-logo.png';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto pr-4 lg:pr-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 p-4">
            <Link href="#">
              <Image
                src={Logo}
                alt="Logo"
                width={60}
                height={80}
                className=" cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link href="#" className="text-black hover:text-gray-600 capitalize">
                home
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-black hover:text-gray-600 capitalize">
                about
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-black hover:text-gray-600 capitalize">
                services
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-black hover:text-gray-600 capitalize">
                contact
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-black hover:text-gray-600 capitalize">
                FAQs
              </Link>
            </li>
            
            <Link
              href="/login"
              className="border-2 border-red-500 text-red-600 px-4 py-2 rounded-md capitalize hover:bg-red-100"
            >
              login
            </Link>

            <Link
              href="/signup"
              className="bg-red-500 text-white px-4 py-2 rounded-md capitalize hover:bg-red-600"
            >
              sign up
            </Link>
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden p-4">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg pl-2 pr-4">
          <ul className="p-3 space-y-4">
            <li>
              <Link
                href="#"
                className="block text-black hover:text-gray-600 capitalize"
                onClick={() => setIsOpen(false)}  // Close the menu
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block text-black hover:text-gray-600 capitalize"
                onClick={() => setIsOpen(false)}  // Close the menu
              >
                about
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="block text-black hover:text-gray-600 capitalize"
                onClick={() => setIsOpen(false)}  // Close the menu
              >
                services
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block text-black hover:text-gray-600 capitalize"
                onClick={() => setIsOpen(false)}  // Close the menu
              >
                contact
              </Link>
            </li>
            <li>
              <Link
                href="#faq"
                className="block text-black hover:text-gray-600 capitalize"
                onClick={() => setIsOpen(false)}  // Close the menu
              >
                FAQs
              </Link>
            </li>

            <Link
              href="/login"
              className="block border-2 border-red-500 text-red-600 text-center px-4 py-2 rounded-md hover:bg-red-100 capitalize"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="block bg-red-500 text-white text-center px-4 py-2 rounded-md hover:bg-red-600 capitalize"
            >
              sign up
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

