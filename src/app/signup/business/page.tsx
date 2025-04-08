"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FaArrowLeft, FaUpload, FaCheck, FaBuilding, FaIdCard, FaGlobe } from 'react-icons/fa';

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
    verificationMethod: '',
    businessRegistration: null as File | null,
    ein: '',
    businessAddress: '',
    agreeToVerification: false,
  });
  
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'verified'>('none');
  const [verifying, setVerifying] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'businessRegistration') => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const verifyBusiness = () => {
    if (!formData.verificationMethod) {
      alert('Please select a verification method');
      return;
    }
    
    if (formData.verificationMethod === 'document' && !formData.businessRegistration) {
      alert('Please upload your business registration document');
      return;
    }
    
    if (formData.verificationMethod === 'ein' && !formData.ein) {
      alert('Please enter your EIN');
      return;
    }
    
    if (!formData.agreeToVerification) {
      alert('Please agree to the verification process');
      return;
    }
    
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerificationStatus('verified');
    }, 2000);
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

  const validateStep3 = () => {
    if (verificationStatus !== 'verified') {
      alert('Please complete business verification before proceeding');
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
    
    if (formStep !== 3) {
      handleNextStep();
      return;
    }
    
    if (!validateStep3()) {
      return;
    }
    
    console.log('Form submitted:', formData);
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

  const verificationMethods = [
    { value: 'document', label: 'Upload business registration document (LLC, Inc, etc.)' },
    { value: 'ein', label: 'Verify with EIN (Employer Identification Number)' },
    { value: 'domain', label: 'Verify with business email domain' }
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
                <h2 className="text-xl font-medium text-gray-900">Company Profile & Verification</h2>
                <p className="text-sm text-gray-600">Complete your profile and verify your business</p>
                
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
                        onChange={(e) => handleFileChange(e, 'logo')}
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
                      rows={3}
                      className="input-field"
                      placeholder="Describe your company, its mission, and the types of projects you're looking to post..."
                      value={formData.aboutCompany}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Business Verification</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    To ensure the quality of our platform, we need to verify your business. This helps build trust with potential student applicants.
                  </p>
                  
                  {verificationStatus === 'verified' ? (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                      <FaCheck className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-green-700 font-medium">Business Verified</p>
                        <p className="text-green-600 text-sm">Your business has been successfully verified.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 space-y-4">
                        <p className="text-sm font-medium text-gray-700">Select a verification method:</p>
                        
                        <div className="space-y-3">
                          {verificationMethods.map((method) => (
                            <label key={method.value} className="flex items-start">
                              <input
                                type="radio"
                                name="verificationMethod"
                                value={method.value}
                                checked={formData.verificationMethod === method.value}
                                onChange={handleInputChange}
                                className="h-4 w-4 mt-1 text-primary-600 border-gray-300 focus:ring-primary-500"
                              />
                              <span className="ml-3 text-sm text-gray-700">{method.label}</span>
                            </label>
                          ))}
                        </div>
                        
                        {formData.verificationMethod === 'document' && (
                          <div className="mt-3 ml-7">
                            <div className="flex items-center">
                              <label className="btn-secondary flex items-center cursor-pointer text-sm">
                                <FaIdCard className="h-4 w-4 mr-2" />
                                Upload Document
                                <input 
                                  type="file" 
                                  name="businessRegistration" 
                                  accept=".pdf,.doc,.docx,.jpg,.png"
                                  className="sr-only"
                                  onChange={(e) => handleFileChange(e, 'businessRegistration')}
                                />
                              </label>
                              <span className="ml-3 text-sm text-gray-500">
                                {formData.businessRegistration ? formData.businessRegistration.name : 'No file chosen'}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Upload your LLC/Corporation papers, business license, or other official registration.
                            </p>
                          </div>
                        )}
                        
                        {formData.verificationMethod === 'ein' && (
                          <div className="mt-3 ml-7">
                            <label htmlFor="ein" className="block text-sm font-medium text-gray-700">
                              EIN (Employer Identification Number)
                            </label>
                            <input
                              type="text"
                              name="ein"
                              id="ein"
                              placeholder="XX-XXXXXXX"
                              className="input-field mt-1"
                              value={formData.ein}
                              onChange={handleInputChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Your EIN will be used to verify your business with government records.
                            </p>
                          </div>
                        )}
                        
                        {formData.verificationMethod === 'domain' && (
                          <div className="mt-3 ml-7">
                            <p className="text-sm text-gray-700">
                              We'll send a verification email to your business email address to confirm domain ownership.
                            </p>
                            <div className="mt-2 flex items-center">
                              <FaGlobe className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-gray-700">{formData.email}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              name="agreeToVerification"
                              checked={formData.agreeToVerification}
                              onChange={handleCheckboxChange}
                              className="h-4 w-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">
                              I agree to the verification process and confirm that all information provided is accurate and complete.
                            </span>
                          </label>
                        </div>
                        
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={verifyBusiness}
                            className="btn-primary w-full sm:w-auto"
                            disabled={verifying || !formData.verificationMethod || !formData.agreeToVerification}
                          >
                            {verifying ? 'Verifying...' : 'Verify Business'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
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
                  disabled={verificationStatus !== 'verified'}
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