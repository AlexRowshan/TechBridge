"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';

export default function BusinessSignup() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    logo: null as File | null,
    aboutCompany: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields');
      return false;
    }
    
    if (!validateEmail(formData.email)) {
      alert('Please use a valid email address');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep2 = () => {
    if (!formData.companyName || !formData.industry || !formData.companySize) {
      alert('Please fill in all required fields');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const handlePrevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only submit if we're on the last step
    if (formStep !== 3) {
      handleNextStep();
      return;
    }
    
    // In a real app, you would submit the form data to your API here
    console.log('Form submitted:', formData);
    // Redirect to login page or dashboard
    alert('Account created successfully! Please log in.');
    router.push('/login');
  };

  const industryOptions = [
    'Technology',
    'E-Commerce',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing & Advertising',
    'Food & Beverage',
    'Non-Profit',
    'Travel & Hospitality',
    'Real Estate',
    'Other'
  ];

  const companySizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  return (
    <main>
      <Navbar />
      
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => formStep === 1 ? router.push('/signup') : handlePrevStep()}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Business Registration</h1>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <div>
                  <span className={`bg-white px-3 py-1.5 rounded-full text-sm font-medium ${formStep >= 1 ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>
                    1
                  </span>
                </div>
                <div>
                  <span className={`bg-white px-3 py-1.5 rounded-full text-sm font-medium ${formStep >= 2 ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>
                    2
                  </span>
                </div>
                <div>
                  <span className={`bg-white px-3 py-1.5 rounded-full text-sm font-medium ${formStep >= 3 ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {formStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Account Information</h2>
                <p className="text-sm text-gray-600">Create your business account</p>
                
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      className="input-field mt-1"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      className="input-field mt-1"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Business Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="input-field"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="input-field mt-1"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      required
                      className="input-field mt-1"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Company Information</h2>
                <p className="text-sm text-gray-600">Tell us about your business</p>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="input-field mt-1"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    name="industry"
                    id="industry"
                    required
                    className="input-field mt-1"
                    value={formData.industry}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select your industry</option>
                    {industryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                    Company Size
                  </label>
                  <select
                    name="companySize"
                    id="companySize"
                    required
                    className="input-field mt-1"
                    value={formData.companySize}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select company size</option>
                    {companySizeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Company Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    className="input-field mt-1"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Company Profile</h2>
                <p className="text-sm text-gray-600">Complete your company profile to help students find you</p>
                
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Company Logo (Optional)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="btn-secondary flex items-center cursor-pointer">
                      <FaUpload className="h-4 w-4 mr-2" />
                      Upload Logo
                      <input 
                        type="file" 
                        name="logo" 
                        id="logo"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      {formData.logo ? formData.logo.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Recommended size: 200x200px. Max size: 2MB.</p>
                </div>

                <div>
                  <label htmlFor="aboutCompany" className="block text-sm font-medium text-gray-700">
                    About Your Company
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="aboutCompany"
                      id="aboutCompany"
                      rows={5}
                      className="input-field"
                      placeholder="Describe your company, its mission, and the types of projects you're looking to post..."
                      value={formData.aboutCompany}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {formStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              
              {formStep < 3 ? (
                <button
                  type="submit"
                  className="btn-primary ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary ml-auto"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>

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