"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student' as 'student' | 'business',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (userType: 'student' | 'business') => {
    setFormData({ ...formData, userType });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      // Redirect based on user type
      if (formData.userType === 'student') {
        router.push('/projects');
      } else {
        router.push('/dashboard');
      }
    }, 1500);
  };

  return (
    <main>
      <Navbar />
      
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Log in to TechBridge</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input-field"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-right mt-2">
                  <Link href="/reset-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`py-2 px-4 border rounded-md flex justify-center items-center ${
                      formData.userType === 'student'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleUserTypeChange('student')}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-4 border rounded-md flex justify-center items-center ${
                      formData.userType === 'business'
                        ? 'bg-primary-50 border-primary-500 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleUserTypeChange('business')}
                  >
                    Business
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Logging in...' : 'Log in'}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/signup" className="btn-secondary w-full flex justify-center">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 