"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Mock data for projects
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Build React Website for Food Startup',
    description: 'We need a talented React developer to help rebuild our outdated website. Looking for someone with modern UI/UX skills and experience with responsive design.',
    skills: ['React', 'JavaScript', 'Responsive Design', 'UI/UX'],
    timeline: '4-6 weeks',
    stage: 'MVP' as const,
    businessId: 'b1',
    businessName: 'Flavor Fusion Foods'
  },
  {
    id: '2',
    title: 'Mobile App Development for Bike Repair Service',
    description: 'Create a scheduling system for our mobile bike repair service in Downtown LA. We need real-time booking features with secure payment processing.',
    skills: ['React Native', 'Node.js', 'Firebase', 'Payment API'],
    timeline: '2-3 months',
    stage: 'Idea' as const,
    businessId: 'b2',
    businessName: 'Cycle Solutions'
  },
  {
    id: '3',
    title: 'AI-Powered Support Tool Development',
    description: 'Develop a prototype for an AI support tool utilizing voice technology and serverless functions to provide customer support automation.',
    skills: ['Python', 'AWS Lambda', 'Machine Learning', 'APIs'],
    timeline: '6-8 weeks',
    stage: 'Scaling' as const,
    businessId: 'b3',
    businessName: 'TechSupport AI'
  },
  {
    id: '4',
    title: 'E-commerce Data Analytics Dashboard',
    description: 'Build a data visualization dashboard for our online store metrics. Should include sales trends, customer behavior, and inventory analysis.',
    skills: ['Data Visualization', 'JavaScript', 'SQL', 'Business Intelligence'],
    timeline: '4 weeks',
    stage: 'Established' as const,
    businessId: 'b4',
    businessName: 'ShopSmart Analytics'
  },
  {
    id: '5',
    title: 'Social Media Content Calendar Tool',
    description: 'Create a web application that helps small businesses plan and schedule their social media content across multiple platforms.',
    skills: ['Full Stack', 'Social Media APIs', 'Calendar UI', 'React'],
    timeline: '6 weeks',
    stage: 'MVP' as const,
    businessId: 'b5',
    businessName: 'Social Planner Pro'
  },
  {
    id: '6',
    title: 'Local Business Directory Mobile App',
    description: 'Develop a mobile application that showcases local businesses with search, filtering, and map integration features.',
    skills: ['iOS', 'Android', 'Maps API', 'Location Services'],
    timeline: '8 weeks',
    stage: 'Idea' as const,
    businessId: 'b6',
    businessName: 'LocalHub Connect'
  }
];

// Filter options
type FilterOptions = {
  stage: string[];
  skills: string[];
  timeline: string[];
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    stage: [],
    skills: [],
    timeline: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filter options
  const stageOptions = Array.from(new Set(MOCK_PROJECTS.map(project => project.stage)));
  const skillOptions = Array.from(
    new Set(MOCK_PROJECTS.flatMap(project => project.skills))
  ).sort();
  const timelineOptions = Array.from(new Set(MOCK_PROJECTS.map(project => project.timeline)));

  // Filter projects based on search query and filters
  const filteredProjects = MOCK_PROJECTS.filter(project => {
    // Search query filter
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    // Stage filter
    const matchesStage = filters.stage.length === 0 || filters.stage.includes(project.stage);

    // Skills filter
    const matchesSkills = filters.skills.length === 0 ||
      filters.skills.some(skill => project.skills.includes(skill));

    // Timeline filter
    const matchesTimeline = filters.timeline.length === 0 || filters.timeline.includes(project.timeline);

    return matchesSearch && matchesStage && matchesSkills && matchesTimeline;
  });

  // Handle filter changes
  const handleFilterChange = (category: keyof FilterOptions, value: string) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      stage: [],
      skills: [],
      timeline: []
    });
    setSearchQuery('');
  };

  return (
    <main>
      <Navbar userType="student" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Browse Projects</h1>
          
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <FaFilter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Project Stage</h3>
                <div className="space-y-2">
                  {stageOptions.map(stage => (
                    <label key={stage} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.stage.includes(stage)}
                        onChange={() => handleFilterChange('stage', stage)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{stage}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {skillOptions.map(skill => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={() => handleFilterChange('skills', skill)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Timeline</h3>
                <div className="space-y-2">
                  {timelineOptions.map(timeline => (
                    <label key={timeline} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.timeline.includes(timeline)}
                        onChange={() => handleFilterChange('timeline', timeline)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{timeline}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                skills={project.skills}
                timeline={project.timeline}
                stage={project.stage}
                businessId={project.businessId}
                businessName={project.businessName}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 