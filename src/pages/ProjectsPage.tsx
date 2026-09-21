import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { Filter, Github, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playUiSound } from '../utils/audio';

interface ProjectsPageProps {
  onOpenProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Full Stack', 'Agentic AI', 'Mobile', 'UI/UX'] as const;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCategorySelect = (cat: string) => {
    playUiSound('click');
    setSelectedCategory(cat);
  };

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">Engineering Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Software Projects &{' '}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff5e7e] bg-clip-text text-transparent">
              Systems
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Full-stack platforms, autonomous Agentic AI orchestrations, mobile applications, and interactive UI/UX prototypes engineered with production-grade reliability.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-8 border-b border-slate-800/80">
          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(0,210,255,0.25)] border border-cyan-400/40'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                  data-cursor="Filter"
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-slate-950/40 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack (e.g., Flutter, AI, React)..."
              className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid with Motion Transitions */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-3">
            <p className="text-sm font-semibold text-white">No projects found matching your query</p>
            <p className="text-xs">Try searching for keywords like "Flutter", "Figma", "React", or "LangChain"</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs font-mono shadow-md shadow-cyan-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDetails={onOpenProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* GitHub Repositories Note */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Looking for complete source code?</h4>
            <p className="text-xs text-slate-400">
              All project repositories, commit histories, architectural diagrams, and codebases are hosted on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/BALA-SABAREESH"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playUiSound('click')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-medium border border-slate-700 transition-colors shrink-0"
            data-cursor="GitHub"
          >
            <Github className="w-4 h-4" />
            <span>github.com/BALA-SABAREESH</span>
          </a>
        </div>
      </div>
    </div>
  );
};
