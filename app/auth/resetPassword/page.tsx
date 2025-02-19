'use client';

import React, { Suspense, useState } from 'react';
import { updateUser } from './actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function ResetPassword() {
  const router = useRouter();
  const { setUser } = useUser();

  // Show/hide password logic
  const [showP, setShowP] = useState(false);
  const [showCP, setShowCP] = useState(false);

  // Form data and state
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Assuming updateUser accepts password for reset (adjust accordingly)
      const user = await updateUser(formData.password);
      setUser(user); // Update the user context

      toast.success('Password updated successfully! You can now log in.');
      router.push('/auth/login'); // Redirect after successful reset
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        toast.error('Error resetting password.');
        setError('Error resetting password.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white container w-full m-4 p-8 rounded-lg shadow-lg max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <Link href="/">
            <Image
              src="/courier-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto w-20 mb-6 cursor-pointer"
            />
          </Link>
          <h1 className="capitalize text-2xl font-bold mt-2 text-gray-900">
            Reset Password
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-gray-600 text-sm text-justify mb-4">
          Your new password must not be the same as your previously used password.
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-4">
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
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="mt-1 w-full p-2 border border-gray-300 rounded text-gray-900 outline-red-800 caret-red-700 placeholder:text-sm"
              />
              {showCP ? (
                <FaEye onClick={() => setShowCP(!showCP)} className="absolute top-[40%] right-3 text-gray-700" />
              ) : (
                <FaEyeSlash onClick={() => setShowCP(!showCP)} className="absolute top-[40%] right-3 text-gray-700" />
              )}
            </div>
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full block py-2 px-4 rounded-md font-semibold text-center ${
              loading
                ? 'bg-red-400 text-white cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Resetting...</span>
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
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
};

export default function ResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}

