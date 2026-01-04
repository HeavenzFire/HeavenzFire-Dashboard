
import React from 'react';
import { Project } from '../types';
import { COLORS } from '../constants';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const statusColors = {
    stable: 'bg-green-500/10 text-green-500',
    beta: 'bg-yellow-500/10 text-yellow-500',
    alpha: 'bg-red-500/10 text-red-500',
    planning: 'bg-blue-500/10 text-blue-500'
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-orange-500/10 transition-colors">
          <div className="text-slate-400 group-hover:text-orange-500 transition-colors">
            {project.icon}
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wider ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{project.name}</h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">
        {project.description}
      </p>
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          {project.stars} stars
        </span>
        <span className="flex items-center gap-1 hover:text-white transition-colors">
          Repo →
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
