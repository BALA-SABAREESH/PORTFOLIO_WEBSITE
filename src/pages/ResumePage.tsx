import React from 'react';
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  EDUCATION, 
  PROJECTS, 
  SKILL_GROUPS, 
  CERTIFICATIONS 
} from '../data/portfolioData';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Code,
  Github,
  Linkedin
} from 'lucide-react';

export const ResumePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.15)] mb-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                Curriculum Vitae
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional{' '}
              <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff5e7e] bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={PERSONAL_INFO.resumePath}
              download="Bala_Sabareesh_P_Resume.pdf"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono tracking-tight transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
              data-cursor="Download"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs font-mono border border-slate-700/80 hover:border-cyan-400/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              data-cursor="Open"
            >
              <span>View PDF</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>

        {/* Resume Sheet Presentation */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0e121b] via-[#0b0e17] to-[#080a10] border border-slate-700/70 p-6 sm:p-10 shadow-2xl space-y-10 relative overflow-hidden">
          
          {/* Subtle ambient light splash in top right */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Header & Contact Details */}
          <div className="pb-8 border-b border-slate-800/80 text-center sm:text-left space-y-4 relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mt-1">
                {PERSONAL_INFO.role}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-5 text-xs font-mono text-slate-400">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span className="hidden sm:inline text-slate-700">|</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span className="hidden sm:inline text-slate-700">|</span>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <span className="hidden sm:inline text-slate-700">|</span>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="space-y-3 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">01.</span>
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Section: Experience & Internships */}
          <div className="space-y-6 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">02.</span>
              Experience / Internships
            </h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-base font-bold text-white tracking-tight">{exp.company}</span>
                      <span className="text-xs font-semibold text-cyan-400 ml-2">— {exp.role}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="text-cyan-400 mt-1 shrink-0">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Projects */}
          <div className="space-y-6 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">03.</span>
              Key Projects
            </h3>
            <div className="space-y-6">
              {PROJECTS.slice(0, 4).map((proj) => (
                <div key={proj.id} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-base font-bold text-white tracking-tight">{proj.title}</span>
                      <span className="text-xs font-mono text-cyan-400/90 ml-2">| {proj.techStack.join(', ')}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">{proj.period}</span>
                  </div>

                  <ul className="space-y-1.5">
                    {proj.features.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="text-cyan-400 mt-1 shrink-0">•</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">04.</span>
              Education
            </h3>
            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{edu.institution}</h4>
                    <p className="text-xs text-slate-400">
                      {edu.degree} · <span className="text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">{edu.gradeLabel}: {edu.grade}</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Core Skills */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">05.</span>
              Core Technical Skills
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Programming Languages:
                </span>
                <span className="sm:col-span-8 text-slate-300">Java, Python, C, JavaScript</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Web Technologies:
                </span>
                <span className="sm:col-span-8 text-slate-300">HTML, CSS, React.js, Node.js, Express.js, Bootstrap, Tailwind CSS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Databases:
                </span>
                <span className="sm:col-span-8 text-slate-300">SQL, MySQL, Drizzle ORM</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  AI / ML:
                </span>
                <span className="sm:col-span-8 text-slate-300">Machine Learning Fundamentals, Agentic AI, LangChain, LangGraph</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Tools & Platforms:
                </span>
                <span className="sm:col-span-8 text-slate-300">Git, GitHub, VS Code, IntelliJ IDEA, Figma, Netlify, Power BI, Flutter/Dart</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
                <span className="sm:col-span-4 font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Soft Skills:
                </span>
                <span className="sm:col-span-8 text-slate-300">Problem Solving, Communication, Team Collaboration, Fast Learning</span>
              </div>
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="space-y-3 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-800">
              <span className="text-cyan-400 font-extrabold">06.</span>
              Official Certifications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">{cert.title}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{cert.issuer}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Areas of Interest */}
          <div className="space-y-2 pt-4 border-t border-slate-800 relative z-10">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">
              Activities & Areas of Interest
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              UI & UX Design · Web Development · Software Development · App Development · Software Testing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
