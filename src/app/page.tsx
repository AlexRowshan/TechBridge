import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FaLaptopCode, FaHandshake, FaGraduationCap } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Connecting Students with Real-World Tech Projects
              </h1>
              <p className="text-lg text-primary-100">
                TechBridge helps university students gain practical experience while helping small businesses build their tech presence.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <Link href="/signup?type=student" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  Join as Student
                </Link>
                <Link href="/signup?type=business" className="btn-primary bg-primary-700 hover:bg-primary-800">
                  Join as Business
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <div className="h-64 rounded-lg flex items-center justify-center">
                    <img src="/techbridgelogo.png" alt="TechBridge Logo" className="max-h-full max-w-full object-contain" />
                </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How TechBridge Works</h2>
            <p className="mt-4 text-lg text-gray-600">Bridging the gap between education and industry</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-primary-100 text-primary-600 mb-4">
                <FaGraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600">
                Gain real-world experience working on actual projects for small businesses. Build your portfolio and apply your skills.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-primary-100 text-primary-600 mb-4">
                <FaLaptopCode className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">For Businesses</h3>
              <p className="text-gray-600">
                Connect with talented university students to help build your tech solutions at a fraction of the cost of traditional development.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-primary-100 text-primary-600 mb-4">
                <FaHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">The Bridge</h3>
              <p className="text-gray-600">
                Our platform handles everything from matchmaking to payments, ensuring a smooth experience for both parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join TechBridge today and start connecting with opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/projects" className="btn-primary">
              Browse Projects
            </Link>
            <Link href="/signup" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TechBridge</h3>
              <p className="text-gray-400">
                Connecting students with real-world tech projects since 2023.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/projects" className="text-gray-400 hover:text-white">Browse Projects</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TechBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 