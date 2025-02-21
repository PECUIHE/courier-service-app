"use client";

import { useState } from "react";
import { resetPassword } from "./actions"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [loading, setLoading] = useState(false); // For spinner
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const result = await resetPassword(formData.email);
      if (result?.success) {
        toast.success('Check your email inbox for the reset link!');
        router.push(`/auth/resetPassword?email=${encodeURIComponent(formData.email)}`);
        setFormData({ email: '' }); // Clear the form after successful submission
      } else {
        toast.error("Enter your verified email.");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error('Enter your verified email.');
        setError(err.message);
        // setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      } else {
        toast.error('An unexpected error occurred. Please try again.');
        setError('An unexpected error occurred. Please try again.');
        // setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full container max-w-md m-4 p-6 bg-white rounded-lg shadow-lg">
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
            Forgot Password
          </h1>
          <p className='text-gray-600 text-sm'>
            Enter your email to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md outline-red-800 caret-red-700 placeholder:text-sm text-gray-900"
              placeholder="Enter your email"
            />
            <FaEnvelope className='absolute top-[60%] right-3 text-gray-700' />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center mb-4">
              {error}
            </p>
          )}

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 px-4 text-center font-semibold rounded-md ${
              loading
                ? 'bg-red-400 text-white cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Submitting...</span>
                </span>
              ) : (
               "Submit"
              )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{' '}
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

export default ForgotPassword;

