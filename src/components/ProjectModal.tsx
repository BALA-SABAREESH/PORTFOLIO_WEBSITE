import React from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0e121a] border border-slate-700/80 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/40">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {project.category}
                </span>
                {project.badge && (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {project.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-500">· {project.period}</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{project.title}</h2>
              <p className="text-xs font-medium text-slate-400 mt-1">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 transition-colors"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 text-sm">
            {/* Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">
                Project Overview
              </h4>
              <p className="leading-relaxed text-slate-200">{project.description}</p>
            </div>

            {/* Problem Solved */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider mb-1.5 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Problem Solved & Strategic Value
              </h4>
              <p className="leading-relaxed text-slate-300">{project.problemSolved}</p>
            </div>

            {/* Key Engineering Features */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Key Engineering Deliverables
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                System Architecture & Design Decisions
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.architectureHighlights.map((arch, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="font-mono text-slate-500 mr-1.5">0{idx + 1}.</span>
                    <span className="text-slate-300 leading-relaxed">{arch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">
                Applied Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="p-6 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Source: Bala Sabareesh P Portfolio</span>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
