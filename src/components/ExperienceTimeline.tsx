import React, { useState } from 'react';
import { EXPERIENCES, EDUCATION } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playUiSound } from '../utils/audio';

export const ExperienceTimeline: React.FC = () => {
  const [activeType, setActiveType] = useState<'experience' | 'education'>('experience');
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0]?.id || '');

  const toggleExpand = (id: string) => {
    playUiSound('click');
    setExpandedId(prev => prev === id ? '' : id);
  };

  return (
    <div className="w-full space-y-6">
      {/* Type Toggle Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
        <button
          onClick={() => {
            setActiveType('experience');
            setExpandedId(EXPERIENCES[0]?.id || '');
            playUiSound('click');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
            activeType === 'experience'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work Experience ({EXPERIENCES.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveType('education');
            setExpandedId(EDUCATION[0]?.id || '');
            playUiSound('click');
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
            activeType === 'education'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education & Academics</span>
        </button>
      </div>

      {/* Timeline items list */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-6 sm:space-y-8">
        {activeType === 'experience'
          ? EXPERIENCES.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;
              return (
                <div key={exp.id} className="relative group">
                  {/* Glowing Node on the timeline */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-110'
                        : 'bg-slate-900 border-slate-700 group-hover:border-amber-400/70'
                    }`}
                  />

                  {/* Card Content */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0e111a] border border-slate-800/80 hover:border-amber-400/40 transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                            {exp.type}
                          </span>
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {exp.period}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <button
                        className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 group-hover:text-white self-end sm:self-center transition-colors"
                        aria-label="Toggle details"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-amber-400' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pt-4 mt-4 border-t border-slate-800/80 space-y-4"
                        >
                          <div className="space-y-2">
                            {exp.highlights.map((h, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{h}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.technologies.map(tech => (
                              <span
                                key={tech}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })
          : EDUCATION.map(edu => {
              const isExpanded = expandedId === edu.id;
              return (
                <div key={edu.id} className="relative group">
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isExpanded
                        ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-110'
                        : 'bg-slate-900 border-slate-700 group-hover:border-amber-400/70'
                    }`}
                  />

                  <div
                    onClick={() => toggleExpand(edu.id)}
                    className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0e111a] border border-slate-800/80 hover:border-amber-400/40 transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 font-bold">
                            {edu.gradeLabel}: {edu.grade}
                          </span>
                          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {edu.period}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                          {edu.institution}
                        </p>
                      </div>

                      <button
                        className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 group-hover:text-white self-end sm:self-center transition-colors"
                        aria-label="Toggle details"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-amber-400' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && edu.details && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pt-4 mt-4 border-t border-slate-800/80"
                        >
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {edu.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
