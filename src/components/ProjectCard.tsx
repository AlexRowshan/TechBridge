import Link from 'next/link';

type ProjectStage = 'Idea' | 'MVP' | 'Scaling' | 'Established';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  skills: string[];
  timeline: string;
  stage: ProjectStage;
  businessId: string;
  businessName?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  skills,
  timeline,
  stage,
  businessId,
  businessName,
}: ProjectCardProps) {
  const stageColors = {
    Idea: 'bg-yellow-100 text-yellow-800',
    MVP: 'bg-blue-100 text-blue-800',
    Scaling: 'bg-green-100 text-green-800',
    Established: 'bg-purple-100 text-purple-800',
  };

  const stageColor = stageColors[stage];

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${stageColor}`}>
          {stage}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Timeline:</span> {timeline}
        </div>
        <Link href={`/projects/${id}`} className="btn-primary text-sm py-1.5">
          View Details
        </Link>
      </div>
    </div>
  );
} 