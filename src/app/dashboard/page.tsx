"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FaPlus, FaEdit, FaEye, FaTrash, FaUser, FaFilter } from 'react-icons/fa';

// Mock data for business projects
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Build React Website for Food Startup',
    description: 'We need a talented React developer to help rebuild our outdated website.',
    skills: ['React', 'JavaScript', 'Responsive Design', 'UI/UX'],
    timeline: '4-6 weeks',
    stage: 'MVP' as const,
    postedDate: '2023-11-15',
    status: 'Active' as const,
    applicationsCount: 4
  },
  {
    id: '2',
    title: 'Email Marketing Automation Setup',
    description: 'Set up automated email campaigns for customer onboarding and retention.',
    skills: ['Email Marketing', 'Automation', 'Copywriting'],
    timeline: '2 weeks',
    stage: 'Scaling' as const,
    postedDate: '2023-11-08',
    status: 'Active' as const,
    applicationsCount: 2
  },
  {
    id: '3',
    title: 'SEO Optimization for Online Store',
    description: 'Improve our website SEO to increase organic traffic and sales.',
    skills: ['SEO', 'Content Strategy', 'Analytics'],
    timeline: '1 month',
    stage: 'Established' as const,
    postedDate: '2023-10-25',
    status: 'Closed' as const,
    applicationsCount: 7
  }
];

// Mock data for project applications
const MOCK_APPLICATIONS = [
  {
    id: 'a1',
    projectId: '1',
    projectTitle: 'Build React Website for Food Startup',
    studentName: 'Alex Johnson',
    studentEmail: 'alex.johnson@university.edu',
    studentCollege: 'University of California, Berkeley',
    submittedDate: '2023-11-16',
    status: 'Pending' as const
  },
  {
    id: 'a2',
    projectId: '1',
    projectTitle: 'Build React Website for Food Startup',
    studentName: 'Maria Garcia',
    studentEmail: 'maria.garcia@university.edu',
    studentCollege: 'Stanford University',
    submittedDate: '2023-11-17',
    status: 'Pending' as const
  },
  {
    id: 'a3',
    projectId: '1',
    projectTitle: 'Build React Website for Food Startup',
    studentName: 'David Kim',
    studentEmail: 'david.kim@university.edu',
    studentCollege: 'MIT',
    submittedDate: '2023-11-18',
    status: 'Pending' as const
  },
  {
    id: 'a4',
    projectId: '2',
    projectTitle: 'Email Marketing Automation Setup',
    studentName: 'Sarah Chen',
    studentEmail: 'sarah.chen@university.edu',
    studentCollege: 'UCLA',
    submittedDate: '2023-11-10',
    status: 'Reviewing' as const
  },
  {
    id: 'a5',
    projectId: '2',
    projectTitle: 'Email Marketing Automation Setup',
    studentName: 'Michael Brown',
    studentEmail: 'michael.brown@university.edu',
    studentCollege: 'University of Washington',
    submittedDate: '2023-11-12',
    status: 'Accepted' as const
  },
  {
    id: 'a6',
    projectId: '3',
    projectTitle: 'SEO Optimization for Online Store',
    studentName: 'Emily Wilson',
    studentEmail: 'emily.wilson@university.edu',
    studentCollege: 'NYU',
    submittedDate: '2023-10-27',
    status: 'Accepted' as const
  }
];

type Tab = 'projects' | 'applications';
type ProjectStatus = 'Active' | 'Closed';
type ApplicationStatus = 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected';

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projectFilter, setProjectFilter] = useState<ProjectStatus | 'All'>('All');
  const [applicationFilter, setApplicationFilter] = useState<ApplicationStatus | 'All'>('All');
  
  // Filter projects based on status
  const filteredProjects = MOCK_PROJECTS.filter(project => 
    projectFilter === 'All' || project.status === projectFilter
  );
  
  // Filter applications based on status
  const filteredApplications = MOCK_APPLICATIONS.filter(application => 
    applicationFilter === 'All' || application.status === applicationFilter
  );
  
  const handleDeleteProject = (projectId: string) => {
    // In a real app, you would call an API to delete the project
    alert(`Project ${projectId} would be deleted in a real app`);
  };
  
  const handleChangeApplicationStatus = (applicationId: string, newStatus: ApplicationStatus) => {
    // In a real app, you would call an API to update the application status
    alert(`Application ${applicationId} status would be updated to ${newStatus} in a real app`);
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
  
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Reviewing: 'bg-blue-100 text-blue-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <main>
      <Navbar userType="business" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          
          <Link href="/projects/create" className="btn-primary">
            <FaPlus className="h-4 w-4 mr-2" />
            Create New Project
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === 'projects'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Projects
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Student Applications
            </button>
          </nav>
        </div>
        
        {/* Filter and Content */}
        {activeTab === 'projects' ? (
          <>
            <div className="flex items-center mb-6">
              <FaFilter className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 mr-3">Filter:</span>
              <select
                className="input-field py-1 pl-3 pr-8 text-sm rounded-md"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value as ProjectStatus | 'All')}
              >
                <option value="All">All Projects</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            {/* Projects Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stageColors[project.stage]}`}>
                            {project.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{project.timeline}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(project.postedDate)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{project.applicationsCount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2 flex">
                          <Link 
                            href={`/projects/${project.id}/edit`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <FaEdit className="h-4 w-4" />
                          </Link>
                          <Link 
                            href={`/projects/${project.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEye className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                        No projects found. <Link href="/projects/create" className="text-primary-600 hover:text-primary-500">Create a new project</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-6">
              <FaFilter className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700 mr-3">Filter:</span>
              <select
                className="input-field py-1 pl-3 pr-8 text-sm rounded-md"
                value={applicationFilter}
                onChange={(e) => setApplicationFilter(e.target.value as ApplicationStatus | 'All')}
              >
                <option value="All">All Applications</option>
                <option value="Pending">Pending Review</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            {/* Applications Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                              <FaUser className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                              <div className="text-sm text-gray-500">{application.studentCollege}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{application.projectTitle}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(application.submittedDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[application.status]}`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link 
                              href={`/applications/${application.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View Details
                            </Link>
                            
                            {application.status === 'Pending' && (
                              <button 
                                onClick={() => handleChangeApplicationStatus(application.id, 'Reviewing')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Start Review
                              </button>
                            )}
                            
                            {application.status === 'Reviewing' && (
                              <>
                                <button 
                                  onClick={() => handleChangeApplicationStatus(application.id, 'Accepted')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={() => handleChangeApplicationStatus(application.id, 'Rejected')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No applications found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 