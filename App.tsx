
import React, { useState } from 'react';
import { AppView, Project } from './types';
import { ICONS, COLORS } from './constants';
import ProjectCard from './components/ProjectCard';
import ChatInterface from './components/ChatInterface';
import Roadmap from './components/Roadmap';

const PROJECTS: Project[] = [
  {
    id: 'multimodal',
    name: 'Multimodal Starter',
    description: 'The foundation for text+image chat apps using Ollama Llama 3.2 Vision and Gemini cloud bridge.',
    status: 'beta',
    stars: 124,
    repoUrl: '#',
    icon: <ICONS.Code />
  },
  {
    id: 'ollama-setup',
    name: 'Ollama Setup',
    description: 'A single command tool to detect OS, install Ollama, and pull required models automatically.',
    status: 'alpha',
    stars: 82,
    repoUrl: '#',
    icon: <ICONS.Terminal />
  },
  {
    id: 'docs',
    name: 'HeavenzFire Docs',
    description: 'Central vision, mission, and technical documentation repository for the ecosystem.',
    status: 'stable',
    stars: 210,
    repoUrl: '#',
    icon: <ICONS.Box />
  }
];

function App() {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                Empowering <span className="text-orange-500">Builders</span> with Multimodal AI.
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Zero-setup starters for local LLMs. Deploy high-performance vision and text tools in minutes, not months.
              </p>
            </header>

            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <ICONS.Box /> Core Repositories
                </h2>
                <button className="text-sm text-orange-500 hover:text-orange-400 font-medium">View all on GitHub →</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map(p => (
                  <ProjectCard 
                    key={p.id} 
                    project={p} 
                    onClick={() => {
                      if (p.id === 'multimodal') setActiveView(AppView.MULTIMODAL_STARTER);
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="bg-slate-900/30 rounded-3xl p-8 border border-slate-800">
               <div className="max-w-4xl mx-auto">
                 <h2 className="text-2xl font-bold text-center mb-12">90-Day Execution Roadmap</h2>
                 <Roadmap />
               </div>
            </section>
          </div>
        );
      case AppView.MULTIMODAL_STARTER:
        return (
          <div className="space-y-6 animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <button 
                  onClick={() => setActiveView(AppView.DASHBOARD)}
                  className="text-slate-500 hover:text-slate-300 mb-2 flex items-center gap-2 text-sm"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-white">Multimodal Starter Sandbox</h1>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
                 <span className="text-xs text-slate-500 uppercase font-mono">Backend:</span>
                 <span className="text-xs text-green-500 font-bold font-mono">GEMINI CLOUD</span>
              </div>
            </div>
            <ChatInterface />
          </div>
        );
      default:
        return <div className="text-white">Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 hidden lg:flex flex-col bg-[#020617] shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveView(AppView.DASHBOARD)}>
            <div className="relative">
              <div className="p-2 bg-orange-600 rounded-lg shadow-[0_0_20px_rgba(234,88,12,0.5)] group-hover:scale-110 transition-transform">
                <ICONS.Fire />
              </div>
              <div className="absolute -top-1 -right-1 text-blue-400">
                <ICONS.Halo />
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-white">HeavenzFire</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem 
            active={activeView === AppView.DASHBOARD} 
            onClick={() => setActiveView(AppView.DASHBOARD)}
            label="Dashboard" 
            icon={<ICONS.Box />} 
          />
          <NavItem 
            active={activeView === AppView.MULTIMODAL_STARTER} 
            onClick={() => setActiveView(AppView.MULTIMODAL_STARTER)}
            label="Code Sandbox" 
            icon={<ICONS.Code />} 
          />
          <NavItem 
            active={activeView === AppView.ROADMAP} 
            onClick={() => setActiveView(AppView.DASHBOARD)} // Simulating scroll
            label="Roadmap" 
            icon={<ICONS.Terminal />} 
          />
        </nav>

        <div className="p-8">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Community Status</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Stars</span>
                <span className="text-orange-500 font-bold">416</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Contributors</span>
                <span className="text-blue-500 font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 px-6 py-8 md:px-12 md:py-12 relative">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>

        {/* Floating gradient circles for aesthetics */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
      </main>
    </div>
  );
}

const NavItem = ({ active, label, icon, onClick }: { active: boolean, label: string, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-slate-800 text-white shadow-lg' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
    }`}
  >
    <div className={active ? 'text-orange-500' : ''}>{icon}</div>
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

export default App;
