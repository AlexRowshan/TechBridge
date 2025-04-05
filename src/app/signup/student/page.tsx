"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';

export default function StudentSignup() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    graduationDate: '',
    summary: '',
    resume: null as File | null,
    transcript: null as File | null,
    linkedIn: '',
    github: '',
    portfolio: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'transcript') => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [type]: e.target.files[0] });
    }
  };

  const validateEmail = (email: string) => {
    // Check if email ends with .edu
    return email.endsWith('.edu') && email.includes('@');
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields');
      return false;
    }
    
    if (!validateEmail(formData.email)) {
      alert('Please use a valid .edu email address');
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

  const validateStep2 = () => {
    if (!formData.college || !formData.graduationDate) {
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
    // In a real app, you would submit the form data to your API here
    console.log('Form submitted:', formData);
    // Redirect to login page or dashboard
    alert('Account created successfully! Please log in.');
    router.push('/login');
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
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
                <p className="text-sm text-gray-600">Create your student account with your school email</p>
                
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
                    School Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="input-field"
                      placeholder="yourname@school.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Must be a valid .edu email address.</p>
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
                <h2 className="text-xl font-medium text-gray-900">Educational Information</h2>
                <p className="text-sm text-gray-600">Tell us about your educational background</p>
                
                <div>
                  <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                    College/University
                  </label>
                  <input
                    type="text"
                    name="college"
                    id="college"
                    required
                    className="input-field mt-1"
                    value={formData.college}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700">
                    Expected Graduation Date
                  </label>
                  <input
                    type="month"
                    name="graduationDate"
                    id="graduationDate"
                    required
                    className="input-field mt-1"
                    value={formData.graduationDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Resume (Optional)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="btn-secondary flex items-center cursor-pointer">
                      <FaUpload className="h-4 w-4 mr-2" />
                      Upload Resume
                      <input 
                        type="file" 
                        name="resume" 
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, 'resume')}
                      />
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      {formData.resume ? formData.resume.name : 'No file chosen'}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="transcript" className="block text-sm font-medium text-gray-700">
                    Transcript (Optional)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="btn-secondary flex items-center cursor-pointer">
                      <FaUpload className="h-4 w-4 mr-2" />
                      Upload Transcript
                      <input 
                        type="file" 
                        name="transcript" 
                        id="transcript"
                        accept=".pdf,.doc,.docx"
                        className="sr-only" 
                        onChange={(e) => handleFileChange(e, 'transcript')}
                      />
                    </label>
                    <span className="ml-3 text-sm text-gray-500">
                      {formData.transcript ? formData.transcript.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-600">Complete your profile to help businesses find you</p>
                
                <div>
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                    Personal Summary (max 250 characters)
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="summary"
                      id="summary"
                      rows={3}
                      className="input-field"
                      maxLength={250}
                      placeholder="Briefly describe yourself, your skills, and your interests"
                      value={formData.summary}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Characters: {formData.summary.length}/250
                  </p>
                </div>

                <div>
                  <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">
                    LinkedIn URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    id="linkedIn"
                    className="input-field mt-1"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="github"
                    id="github"
                    className="input-field mt-1"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                    Portfolio URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    id="portfolio"
                    className="input-field mt-1"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
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
                  type="button"
                  onClick={handleNextStep}
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