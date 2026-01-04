
import React from 'react';
import { RoadmapMilestone } from '../types';

const MILESTONES: RoadmapMilestone[] = [
  { day: 1, title: 'Foundation', description: 'Vision Doc & HeavenzFire Org setup.', status: 'completed' },
  { day: 15, title: 'Multimodal Starter', description: 'Llama 3.2 Vision + Gemini hybrid bridge.', status: 'in-progress' },
  { day: 45, title: 'Ollama CLI', description: 'Zero-setup local LLM installer script.', status: 'upcoming' },
  { day: 70, title: 'Extension v1', description: 'Browser assistant for code-gen tasks.', status: 'upcoming' },
  { day: 90, title: 'Launch', description: 'Community growth & 500+ stars goal.', status: 'upcoming' },
];

const Roadmap: React.FC = () => {
  return (
    <div className="relative py-12">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800 hidden md:block" />
      
      <div className="space-y-12">
        {MILESTONES.map((m, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start">
            <div className="absolute left-8 w-4 h-4 rounded-full bg-slate-900 border-2 border-orange-500 -ml-2 hidden md:block z-10" 
                 style={{ 
                   backgroundColor: m.status === 'completed' ? '#FF6B35' : m.status === 'in-progress' ? '#1E3A8A' : '#0f172a' 
                 }} />
            
            <div className="flex-none w-24 pt-1 hidden md:block">
              <span className="text-orange-500 font-bold font-mono">DAY {m.day}</span>
            </div>

            <div className="flex-1 bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all w-full">
               <div className="flex justify-between items-center mb-2">
                 <h4 className="text-lg font-bold text-white">{m.title}</h4>
                 <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                   m.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                   m.status === 'in-progress' ? 'bg-blue-500/10 text-blue-500 animate-pulse' :
                   'bg-slate-800 text-slate-500'
                 }`}>
                   {m.status.replace('-', ' ')}
                 </span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed">
                 {m.description}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
