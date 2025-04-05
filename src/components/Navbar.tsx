import Link from 'next/link';
import Image from 'next/image';
import { FaUserCircle, FaBell, FaComments } from 'react-icons/fa';

export default function Navbar({ userType }: { userType?: 'student' | 'business' | null }) {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">TechBridge</span>
            </Link>
            
            {userType && (
              <div className="ml-10 hidden md:flex space-x-6">
                <Link href="/projects" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Browse Projects
                </Link>
                
                {userType === 'business' && (
                  <Link href="/projects/create" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Create Project
                  </Link>
                )}
                
                {userType === 'student' && (
                  <Link href="/applications" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    My Applications
                  </Link>
                )}
                
                {userType === 'business' && (
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {userType ? (
              <>
                <button className="text-gray-500 hover:text-primary-600">
                  <FaBell className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-primary-600">
                  <FaComments className="h-5 w-5" />
                </button>
                <Link href="/profile" className="text-gray-500 hover:text-primary-600">
                  <FaUserCircle className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="btn-secondary">
                  Log in
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 