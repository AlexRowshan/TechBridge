"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { FaArrowLeft, FaPlus, FaTimes } from 'react-icons/fa';

type ProjectStage = 'Idea' | 'MVP' | 'Scaling' | 'Established';

export default function CreateProjectPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeline: '',
    stage: 'Idea' as ProjectStage,
    location: '',
    skills: [] as string[],
    currentSkill: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSkill = () => {
    if (formData.currentSkill.trim() === '') return;
    
    if (!formData.skills.includes(formData.currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.currentSkill.trim()],
        currentSkill: '',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.skills.length === 0) {
      alert('Please add at least one required skill');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      alert('Project created successfully!');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main>
      <Navbar userType="business" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.push('/dashboard')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="input-field mt-1"
                  placeholder="e.g. Build E-commerce Website"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  required
                  className="input-field mt-1"
                  placeholder="Describe your project in detail. Include what you need, the project's goals, and any specific requirements."
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                    Project Stage
                  </label>
                  <select
                    name="stage"
                    id="stage"
                    required
                    className="input-field mt-1"
                    value={formData.stage}
                    onChange={handleInputChange}
                  >
                    <option value="Idea">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="Scaling">Scaling</option>
                    <option value="Established">Established</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    id="timeline"
                    required
                    className="input-field mt-1"
                    placeholder="e.g. 2-4 weeks, 1-2 months"
                    value={formData.timeline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  className="input-field mt-1"
                  placeholder="e.g. Remote, New York, NY (Hybrid)"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="currentSkill" className="block text-sm font-medium text-gray-700">
                  Required Skills
                </label>
                <div className="mt-1 flex">
                  <input
                    type="text"
                    name="currentSkill"
                    id="currentSkill"
                    className="input-field mr-2 flex-1"
                    placeholder="e.g. React, Python, Graphic Design"
                    value={formData.currentSkill}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn-secondary"
                  >
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
                
                {formData.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <button 
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-gray-200 flex justify-end space-x-3">
                <Link 
                  href="/dashboard"
                  className="btn-secondary"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 