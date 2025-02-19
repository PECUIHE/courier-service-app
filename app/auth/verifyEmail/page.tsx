'use client';

import { Suspense, useState } from 'react';
import { verifyAction } from './actions';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';


function CodeInput({ length = 6, onChange }: { length?: number; onChange: (code: string) => void }) {
  const [values, setValues] = useState(Array(length).fill(''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValues = [...values];
    newValues[index] = e.target.value;

    // Move focus to the next input if a digit is entered
    if (e.target.value && index < length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }

    setValues(newValues);
    onChange(newValues.join('')); // Send updated code to parent
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };


  return (
    <div className="flex space-x-2 justify-center">
      {values.map((value, index) => (
        <input
          key={index}
          id={`code-input-${index}`}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 ring-2 ring-gray-500 text-center rounded-md text-lg text-gray-700 font-semibold outline-red-700 caret-red-800"
        />
      ))}
    </div>
  );
}

// Component to handle the verification form
function VerifyComponent() {
  const router = useRouter();
  const { setUser } = useUser();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false); // Spinner state
  const [error, setError] = useState('');
  const searchParams = useSearchParams(); // Use inside a Suspense boundary
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Verification code entered:', code);

    if (!email) {
      setError('Email is required for verification.');
      return;
    }

    setLoading(true); // Start spinner
    setError('');

    try {
      const user = await verifyAction(email, code);
      setUser(user); // Update the user context
      toast.success('Verification successful!');
      router.push('/auth/login'); // Redirect after a successfull verification
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        toast.error('An error occurred while verifying the code.');
        setError('An error occurred while verifying the code.');
      }
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full container m-4 max-w-md bg-white p-6 rounded-lg shadow-lg">
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
          <h1 className="text-2xl font-bold mt-2 text-gray-900">
            Verify Your Account
          </h1>
        </div>

        {/* Instructions */}
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter the verification code sent to <strong>{email || 'your email'}</strong>.
        </p>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Verification Code Field */}
          <CodeInput length={6} onChange={(newCode) => setCode(newCode)} />

          {/* <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500 text-gray-700"
          /> */}

          {/* Error Message */}
          {error && 
            <p className="text-sm text-red-500 text-center mb-4">
              {error}
            </p>
          }

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
                <span>Verifying...</span>
              </span>
            ) : (
              'Verify'
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
}

// Main component with Suspense boundary
export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyComponent />
    </Suspense>
  );
}


