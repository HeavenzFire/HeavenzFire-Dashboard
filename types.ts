
export enum AppView {
  DASHBOARD = 'dashboard',
  MULTIMODAL_STARTER = 'multimodal-starter',
  OLLAMA_SETUP = 'ollama-setup',
  DOCS = 'docs',
  ROADMAP = 'roadmap'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stars: number;
  status: 'stable' | 'beta' | 'alpha' | 'planning';
  repoUrl: string;
  icon: React.ReactNode;
}

export interface RoadmapMilestone {
  day: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}
