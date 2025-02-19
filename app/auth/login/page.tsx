'use client'; // Ensures the use of client-side hooks

import { useEffect, useState } from 'react';
import { loginAction } from './actions';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase'; // Import Supabase client
import Image from 'next/image';
import Link from 'next/link';
import { toast } from "react-toastify";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
  // show and hide password
  const [showP, setShowP] = useState(false);
  // Form auth, loading and error state
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // For spinner
  const [error, setError] = useState('');
  // User name details
  const [first_name, setFirstName] = useState('');
  const { user, setUser } = useUser();
  // Next.js router/redirect
  const router = useRouter();

  // Check for an authenticated user when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata && user.user_metadata.first_name) {
        setFirstName(user.user_metadata.first_name);
      }
    };
    fetchData();
  }, [user]);

  const validateForm = () => {
    const { email, password } = formData;

    if (!email && !password) {
      toast.error('All fields are required.');
      setError('All fields are required.');
      return false;
    }

    if (!email) {
      toast.error('Please enter a valid email address');
      setError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      toast.error('Password is required.')
      setError('Password is required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      setError('Please enter a valid email address.');
      return false;
    }

    setError('');
    return true;
  };

    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
    const user = await loginAction(formData.email, formData.password);
    setUser(user); // Set the user data in the context
    toast.success('Logged in successfully!');
    router.push('/dashboard'); // Redirect on the client
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Invalid email or password. Please try again.');
        setError(err.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
    setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container m-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <Link href="/">
            <Image
              src="/courier-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto mb-4 cursor-pointer"
            />
          </Link>
          <h1 className="capitalize text-2xl font-bold mb-2 text-gray-900">
            Welcome Back {user?.first_name ? user?.first_name : 'Guest'}!
          </h1>
          <p className='text-gray-600 text-sm'>
              To contiune, please complete the form below.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="w-full relative">
            <label htmlFor='email' className="block text-sm font-medium text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded outline-red-800 caret-red-700 placeholder:text-sm text-gray-900"
            />
            <FaEnvelope className='absolute top-[56%] right-3 text-gray-700' />
          </div>

          {/* Password Field */}
          <div className="w-full relative pb-4">
            <label htmlFor='password' className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type={!showP ? "password" : "text"}
              id='password'
              name='password'
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded outline-red-800 caret-red-700 text-gray-900 placeholder:text-sm"
            />
            {showP ? (
              <FaEye onClick={() => setShowP(!showP)} className="absolute top-[45%] right-3 text-gray-700" />
            ) : (
              <FaEyeSlash onClick={() => setShowP(!showP)} className="absolute top-[45%] right-3 text-gray-700" />
            )}
            {/* {showP && <FaEye onClick={() => setShowP(!showP)} className='absolute top-[45%] right-3 text-gray-700' />} 
            {!showP && <FaEyeSlash onClick={() => setShowP(!showP)} className='absolute top-[45%] right-3 text-gray-700' />}  */}
          </div>

          <div className='mt-4 mb-2 w-full flex items-end justify-end gap-2'>
          {/* Forget Password Link */}
            <p className='text-sm text-gray-600 '>
              Forgot Password?{' '}
              <Link 
                href="/auth/forgotPassword"
                className="capitalize font-bold text-red-500 hover:underline cursor-pointer"
              >
                Retrieve it
              </Link>
            </p>
          </div>

          {/* Submit Button with Spinner */}
          {!first_name && (
          <button
            type="submit"
            disabled={loading}
            className={`w-full block py-2 px-4 rounded-md text-center font-semibold ${
              loading
                ? 'bg-red-400 text-white cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Logging in...</span>
              </span>
            ) : (
              'Log In'
            )}
          </button>
          )}
        </form>

        <div className='mt-4 mb-2 w-full flex flex-col items-center justify-center gap-2'>
          {/* Register Link */}
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              href="/auth/signup"
              className="capitalize font-bold text-red-500 hover:underline cursor-pointer"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

