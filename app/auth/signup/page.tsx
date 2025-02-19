'use client';

import { useState } from 'react';
import { registerAction } from './actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';


export default function RegisterPage() {
  const router = useRouter(); // initialize router for navigation
  // show and hide password
  const [showP, setShowP] = useState(false);
  const [showCP, setShowCP] = useState(false);
  // Form auth, loading and error state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // Spinner state
  const [error, setError] = useState('');

  const validateForm = () => {
    const { first_name, last_name, email, password, confirmPassword } = formData;

    if (!first_name  || !last_name || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      setError('All fields are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      setError('Please enter a valid email address.');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setError('Passwords do not match.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Start spinner
    setError('');

    try {
      const result = await registerAction(
        formData.email, 
        formData.password, 
        formData.first_name, 
        formData.last_name
      );

      if (result?.success) {
        toast.success('Registration successful! Please verify your email.');
        // Redirect to verification page
        router.push(`/auth/verifyEmail?email=${encodeURIComponent(formData.email)}`);
      }
  
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        toast.error('An unexpected error occurred.');
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container m-4 w-full max-w-md bg-white px-6 py-4 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <Link href="/">
            <Image
              src="/courier-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto mt-2 mb-4 cursor-pointer"
            />
          </Link>
          <h1 className="capitalize mb-2 text-2xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className='text-gray-600 text-justify text-[11px]'>
            We are excited to have you on board! Let’s create an account for you for your easy pickups and safe deliveries.
          </p>
        </div>

        {/* Error Message */}
        {error && 
          <p className="text-sm text-red-500 text-center mb-4">
            {error}
          </p>
        }

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
            />
            <FaUser className='absolute top-[42%] right-[55%] text-gray-700' />
            
            <input
              type="text"
              id='last_name'
              name='last_name'
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
            />
            <FaEnvelope className='absolute top-[56%] right-3 text-gray-700' />
          </div>

          {/* Password Field */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <div className="relative">
              <input
                type={!showP ? "password" : "text"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
              />
              {showP ? (
                <FaEye onClick={() => setShowP(!showP)} className="absolute top-[40%] right-3 text-gray-700" />
              ) : (
                <FaEyeSlash onClick={() => setShowP(!showP)} className="absolute top-[40%] right-3 text-gray-700" />
              )}
              {/* {showP && <FaEye onClick={() => setShowP(!showP)} className='absolute top-[40%] right-3 text-gray-700' />} 
              {!showP && <FaEyeSlash onClick={() => setShowP(!showP)} className='absolute top-[40%] right-3 text-gray-700' />}  */}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="w-full relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <div className="relative">
              <input
                type={!showCP ? "password" : "text"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
              />
              {showCP ? (
                <FaEye onClick={() => setShowCP(!showCP)} className="absolute top-[40%] right-3 text-gray-700" />
              ) : (
                <FaEyeSlash onClick={() => setShowCP(!showCP)} className="absolute top-[40%] right-3 text-gray-700" />
              )}
              {/* {showCP && <FaEye onClick={() => setShowCP(!showCP)} className='absolute top-[40%] right-3 text-gray-700' />} 
              {!showCP && <FaEyeSlash onClick={() => setShowCP(!showCP)} className='absolute top-[40%] right-3 text-gray-700' />}  */}
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className='text-[14px] flex gap-2 text-gray-700'>
            <input type="checkbox" name='' id='' className='' />
            <label htmlFor="">
              I agree to the{' '}
              <span className='text-red-500 cursor-pointer hover:underline'>
                Terms & Conditions
              </span>.
            </label>
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
              'Sign Up'
            )}
          </button>
        </form>

        <p className="m-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="capitalize font-bold text-red-500 hover:underline cursor-pointer"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

