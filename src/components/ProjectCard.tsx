import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { Github, ExternalLink, ArrowRight, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCardClick = () => {
    playUiSound('click');
    onOpenDetails(project);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playUiSound('hover');
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0e111a] to-[#090b10] border border-slate-800/90 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 p-6 flex flex-col justify-between overflow-hidden"
      data-cursor="Project"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.14), transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Top subtle highlight shimmer */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header & Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
              project.category === 'Agentic AI' 
                ? 'bg-purple-500/10 border-purple-400/40 text-purple-300' 
                : project.category === 'Mobile'
                ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300'
                : project.category === 'UI/UX'
                ? 'bg-rose-500/10 border-rose-400/40 text-rose-300'
                : 'bg-sky-500/10 border-sky-400/40 text-sky-300'
            }`}>
              {project.category}
            </span>
            {project.badge && (
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/60 text-slate-300 font-medium">
                {project.badge}
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-500">{project.period}</span>
        </div>

        {/* Title & Subtitle */}
        <h3
          onClick={handleCardClick}
          className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-2 cursor-pointer"
        >
          {project.title}
        </h3>
        <p className="text-xs font-medium text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {project.subtitle}
        </p>

        {/* Problem Solved Highlight */}
        <div className="mb-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
          <span className="font-semibold text-cyan-400 block mb-1">Problem Solved:</span>
          <p className="line-clamp-2 text-slate-300 leading-relaxed">{project.problemSolved}</p>
        </div>

        {/* Features Preview */}
        <div className="space-y-2 mb-5">
          {project.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5 pt-3.5 border-t border-slate-800/80">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/40 group-hover:border-slate-600 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
            data-cursor="Details"
          >
            <span>Architecture & Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-cyan-400/50 transition-colors"
                title="View Source on GitHub"
                data-cursor="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 hover:border-cyan-400/50 transition-colors"
                title="Live Demo"
                data-cursor="Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
