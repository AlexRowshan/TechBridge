import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FaGraduationCap, FaBuilding } from 'react-icons/fa';

function UserTypeSelection() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Link 
        href="/signup/student" 
        className="relative group block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-primary-500 hover:ring-1 hover:ring-primary-500"
      >
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary-600 group-hover:bg-primary-200">
            <FaGraduationCap className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Student</h3>
            <p className="mt-1 text-sm text-gray-500">
              University students looking for real-world tech projects
            </p>
          </div>
        </div>
      </Link>

      <Link 
        href="/signup/business" 
        className="relative group block rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:border-primary-500 hover:ring-1 hover:ring-primary-500"
      >
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary-600 group-hover:bg-primary-200">
            <FaBuilding className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Business</h3>
            <p className="mt-1 text-sm text-gray-500">
              SMBs looking for student talent to build tech projects
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function SignupPage({
  searchParams
}: {
  searchParams?: { type?: string }
}) {
  const userType = searchParams?.type || null;

  return (
    <main>
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your TechBridge Account</h1>
          <p className="mt-2 text-lg text-gray-600">
            Join our community and start connecting with opportunities
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Choose Account Type</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <UserTypeSelection />
            </Suspense>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 