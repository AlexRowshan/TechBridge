"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FaArrowLeft, FaBriefcase, FaClock, FaEnvelope, FaUpload, FaFile, FaTimes } from 'react-icons/fa';

// Mock data matching the projects from the browse page
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Build React Website for Food Startup',
    description: 'We need a talented React developer to help rebuild our outdated website. Looking for someone with modern UI/UX skills and experience with responsive design. The current website was built 5 years ago and is not mobile-friendly. We\'re looking to create a modern, responsive website that showcases our products and allows customers to place orders online. We\'re a fast-growing food startup specializing in fusion cuisine meal kits delivered to customers\' doors.',
    skills: ['React', 'JavaScript', 'Responsive Design', 'UI/UX'],
    timeline: '4-6 weeks',
    stage: 'MVP' as const,
    businessId: 'b1',
    businessName: 'Flavor Fusion Foods',
    location: 'Remote',
    postedDate: '2023-11-15',
    about: 'Flavor Fusion Foods is a food startup that delivers innovative fusion cuisine meal kits to customers\' doors. We\'re passionate about bringing diverse flavors to home cooks and making exotic cuisine accessible to everyone.'
  },
  {
    id: '2',
    title: 'Mobile App Development for Bike Repair Service',
    description: 'Create a scheduling system for our mobile bike repair service in Downtown LA. We need real-time booking features with secure payment processing. The app should allow customers to schedule appointments, track the technician\'s arrival, and pay for services seamlessly. We\'re looking for someone familiar with geolocation services, push notifications, and payment gateway integration.',
    skills: ['React Native', 'Node.js', 'Firebase', 'Payment API'],
    timeline: '2-3 months',
    stage: 'Idea' as const,
    businessId: 'b2',
    businessName: 'Cycle Solutions',
    location: 'Los Angeles, CA (Hybrid)',
    postedDate: '2023-11-10',
    about: 'Cycle Solutions is a mobile bike repair service operating in Downtown LA. We bring professional bike mechanics directly to customers, saving them time and hassle. We\'re expanding rapidly and need technology to scale our operations.'
  },
  {
    id: '3',
    title: 'AI-Powered Support Tool Development',
    description: 'Develop a prototype for an AI support tool utilizing voice technology and serverless functions to provide customer support automation. The tool should be able to understand customer queries, provide relevant responses, and escalate complex issues to human support agents. We\'re looking for someone with experience in natural language processing and cloud infrastructure.',
    skills: ['Python', 'AWS Lambda', 'Machine Learning', 'APIs'],
    timeline: '6-8 weeks',
    stage: 'Scaling' as const,
    businessId: 'b3',
    businessName: 'TechSupport AI',
    location: 'Remote',
    postedDate: '2023-11-05',
    about: 'TechSupport AI is a startup building next-generation customer support tools powered by artificial intelligence. Our mission is to make customer support more efficient and accessible for businesses of all sizes.'
  },
  {
    id: '4',
    title: 'E-commerce Data Analytics Dashboard',
    description: 'Build a data visualization dashboard for our online store metrics. Should include sales trends, customer behavior, and inventory analysis. The dashboard will be used by our marketing and product teams to make data-driven decisions. We need someone with experience in data visualization libraries and working with e-commerce data.',
    skills: ['Data Visualization', 'JavaScript', 'SQL', 'Business Intelligence'],
    timeline: '4 weeks',
    stage: 'Established' as const,
    businessId: 'b4',
    businessName: 'ShopSmart Analytics',
    location: 'Remote',
    postedDate: '2023-11-20',
    about: 'ShopSmart Analytics provides data intelligence solutions for e-commerce businesses. We help online retailers understand their data and make better business decisions through powerful analytics tools.'
  },
  {
    id: '5',
    title: 'Social Media Content Calendar Tool',
    description: 'Create a web application that helps small businesses plan and schedule their social media content across multiple platforms. The tool should allow users to create, schedule, and analyze posts for platforms like Instagram, Twitter, and Facebook from a single interface. We\'re looking for someone familiar with social media APIs and content management systems.',
    skills: ['Full Stack', 'Social Media APIs', 'Calendar UI', 'React'],
    timeline: '6 weeks',
    stage: 'MVP' as const,
    businessId: 'b5',
    businessName: 'Social Planner Pro',
    location: 'Remote',
    postedDate: '2023-11-08',
    about: 'Social Planner Pro helps small businesses streamline their social media marketing efforts through intuitive planning and scheduling tools. We\'re focused on making social media management accessible and effective for companies with limited resources.'
  },
  {
    id: '6',
    title: 'Local Business Directory Mobile App',
    description: 'Develop a mobile application that showcases local businesses with search, filtering, and map integration features. The app will help users discover and connect with local businesses in their area. Features should include business profiles, ratings and reviews, search by category, and map-based browsing.',
    skills: ['iOS', 'Android', 'Maps API', 'Location Services'],
    timeline: '8 weeks',
    stage: 'Idea' as const,
    businessId: 'b6',
    businessName: 'LocalHub Connect',
    location: 'San Francisco, CA (Remote OK)',
    postedDate: '2023-11-12',
    about: 'LocalHub Connect is a startup focused on strengthening local economies by connecting consumers with small businesses in their communities. We believe in the power of local commerce and technology\'s ability to foster those connections.'
  }
];

// Get project by ID
const getProjectById = (id: string) => {
  return MOCK_PROJECTS.find(project => project.id === id);
};

interface ProjectParams {
  params: {
    id: string;
  };
}

type FileUpload = {
  file: File;
  type: string;
};

export default function ProjectDetailsPage({ params }: ProjectParams) {
  const router = useRouter();
  const project = getProjectById(params.id);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    availability: '',
    relevantExperience: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (!project) {
    return (
      <main>
        <Navbar userType="student" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects" className="btn-primary">
              Browse Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileType = e.target.getAttribute('data-filetype') || 'Other';
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        type: fileType
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert('Application submitted successfully!');
      setShowApplicationForm(false);
      // Redirect to applications page in a real app
      // router.push('/applications');
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const stageColors = {
    Idea: 'bg-yellow-100 text-yellow-800',
    MVP: 'bg-blue-100 text-blue-800',
    Scaling: 'bg-green-100 text-green-800',
    Established: 'bg-purple-100 text-purple-800',
  };

  const fileTypeOptions = [
    { value: 'Resume', label: 'Resume' },
    { value: 'Cover Letter', label: 'Cover Letter' },
    { value: 'Portfolio', label: 'Portfolio Sample' },
    { value: 'Recommendation', label: 'Recommendation Letter' },
    { value: 'Past Work', label: 'Past Work Sample' },
    { value: 'Other', label: 'Other Document' },
  ];

  return (
    <main>
      <Navbar userType="student" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/projects')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Project Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${stageColors[project.stage]}`}>
                {project.stage}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              Posted by {project.businessName} on {formatDate(project.postedDate)}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <FaBriefcase className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">{project.location}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">Timeline: {project.timeline}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">About {project.businessName}</h3>
              <p className="text-gray-700">{project.about}</p>
            </div>
            
            <div className="flex justify-between">
              <Link href={`/businesses/${project.businessId}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                View Business Profile
              </Link>
              
              <button
                onClick={() => setShowApplicationForm(true)}
                className="btn-primary"
                disabled={showApplicationForm}
              >
                Apply for Project
              </button>
            </div>
          </div>
        </div>
        
        {/* Application Form */}
        {showApplicationForm && (
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Application</h2>
              
              <form onSubmit={handleSubmitApplication}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter / Introduction
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      required
                      className="input-field"
                      placeholder="Introduce yourself and explain why you're interested in this project..."
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="relevantExperience" className="block text-sm font-medium text-gray-700 mb-1">
                      Relevant Experience
                    </label>
                    <textarea
                      id="relevantExperience"
                      name="relevantExperience"
                      rows={3}
                      required
                      className="input-field"
                      placeholder="Describe your experience with the required skills and similar projects..."
                      value={applicationData.relevantExperience}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      required
                      className="input-field"
                      placeholder="When can you start? How many hours per week are you available?"
                      value={applicationData.availability}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Additional Documents
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="relative">
                        <select
                          id="documentType"
                          className="input-field pr-8"
                          defaultValue=""
                          onChange={(e) => {
                            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                            fileInput.setAttribute('data-filetype', e.target.value);
                          }}
                        >
                          <option value="" disabled>Select document type</option>
                          {fileTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <label className="btn-secondary flex items-center cursor-pointer">
                        <FaUpload className="h-4 w-4 mr-2" />
                        Upload File
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          data-filetype="Other"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                    
                    {/* Display uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-600 mb-2">Uploaded files:</p>
                        <ul className="space-y-2">
                          {uploadedFiles.map((fileUpload, index) => (
                            <li 
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm"
                            >
                              <div className="flex items-center">
                                <FaFile className="h-4 w-4 text-primary-500 mr-2" />
                                <div>
                                  <span className="font-medium">{fileUpload.type}: </span>
                                  <span className="text-gray-600">{fileUpload.file.name}</span>
                                </div>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <FaTimes className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Upload your resume, portfolio samples, or any other relevant documents to strengthen your application. 
                      Max file size: 10MB per file.
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="btn-secondary"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 