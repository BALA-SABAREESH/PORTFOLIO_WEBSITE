import React, { useState, useEffect } from 'react';
import { PageId, Project, Certificate } from '../types';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, SKILL_GROUPS } from '../data/portfolioData';
import { HeroPhoto } from '../components/HeroPhoto';
import { ProjectCard } from '../components/ProjectCard';
import { CertificateCard } from '../components/CertificateCard';
import { TechMarquee } from '../components/TechMarquee';
import { InteractiveTerminal } from '../components/InteractiveTerminal';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SpotlightCard } from '../components/SpotlightCard';
import { playUiSound } from '../utils/audio';
import { 
  FileText, 
  Mail, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Code2, 
  ExternalLink,
  Cpu, 
  Layers, 
  Terminal, 
  Database, 
  CheckCircle2, 
  GraduationCap,
  Award,
  Briefcase,
  Copy,
  Check,
  Zap,
  Clock,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenProject: (project: Project) => void;
  onOpenCertificate: (certificate: Certificate) => void;
}

const ROLES = [
  'Full Stack Software Developer',
  'Agentic AI & LangGraph Engineer',
  'Java & Spring Boot Specialist',
  'Computer Science Engineer (8.1 CGPA)'
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenProject,
  onOpenCertificate,
}) => {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Cycle role titles every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    playUiSound('success');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleNavClick = (page: PageId) => {
    playUiSound('click');
    onNavigate(page);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* PHOTO PRESENTATION - Sleek Circular Avatar with Vibrant Gradient Ring */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <HeroPhoto
              photoUrl={PERSONAL_INFO.photoPath}
              name={PERSONAL_INFO.name}
            />
          </div>

          {/* HERO CONTENT - Styled after the reference design with attractive gradients */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7 space-y-6 text-left">
            
            {/* High-Impact Display Heading matching reference layout */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                <span className="text-white block">Bala</span>
                <span className="block bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff5e7e] bg-clip-text text-transparent">
                  Sabareesh P
                </span>
              </h1>
              
              <div className="h-8 sm:h-9 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-lg sm:text-xl font-semibold text-cyan-300 tracking-tight"
                  >
                    {ROLES[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
              Computer Science undergraduate with strong fundamentals in Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), and REST API design. Shipped 3+ full-stack and Agentic AI applications with certified internship experience in Java/Spring Boot and Flutter.
            </p>

            {/* Academic & Target Direction Pill */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                  Education & Score
                </span>
                <span className="text-white font-medium">{PERSONAL_INFO.college} · {PERSONAL_INFO.cgpa} CGPA</span>
              </div>
              <div className="sm:border-l sm:border-slate-800 sm:pl-4">
                <span className="text-[11px] font-mono text-purple-400 font-semibold uppercase tracking-wider block">
                  Target Role
                </span>
                <span className="text-white font-medium">{PERSONAL_INFO.targetRole}</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm tracking-tight transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor="Contact"
              >
                <span>Get In Touch</span>
              </button>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Bala_Sabareesh_P_Resume.pdf"
                onClick={() => playUiSound('click')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 transition-all hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor="Download"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Download CV</span>
              </a>

              <button
                onClick={() => handleNavClick('projects')}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-slate-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                data-cursor="Explore"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Recruiter Profiles & Quick Copy Icons */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-sm flex-wrap">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-1">
                Connect:
              </span>
              
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/70 hover:border-cyan-400/60 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                title="LinkedIn Profile"
                data-cursor="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/70 hover:border-cyan-400/60 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                title="GitHub Profile"
                data-cursor="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="w-9 h-9 rounded-full bg-slate-900/80 border border-slate-700/70 hover:border-cyan-400/60 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                title="LeetCode Profile"
                data-cursor="LeetCode"
              >
                <Code2 className="w-4 h-4" />
              </a>

              <div className="h-4 w-[1px] bg-slate-800 mx-1" />

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                title="Copy Email Address"
                data-cursor="Copy"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedEmail ? 'Copied Email!' : 'balasabareeshp@gmail.com'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE BENTO STATS & METRICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SpotlightCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Academics</span>
              <GraduationCap className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={8.1} decimals={1} suffix=" / 10" />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">CGPA · Computer Science B.E.</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Production Apps</span>
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={3} suffix="+" />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Shipped Full-Stack & AI Systems</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Industry Internships</span>
              <Briefcase className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={2} />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Java Full Stack & Flutter Mobile</p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Accreditations</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={4} suffix="+" />
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">UiPath · Oracle · IBM · Google</p>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 3. INFINITE TECH STACK MARQUEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-3">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Verified Stack & Tools Shipped in Production
          </span>
        </div>
        <TechMarquee />
      </section>

      {/* 4. INTERACTIVE REEL FEATURE: DEVELOPER TERMINAL & ARCHITECTURE DIAGNOSTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Developer Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Test-Drive My Engineering Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Run real terminal commands to explore code architectures, verify project specs, or unlock priority contact channels.
            </p>
          </div>
        </div>

        <InteractiveTerminal onNavigate={onNavigate} />
      </section>

      {/* 5. CORE ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Agentic AI & LLMs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              LangChain & LangGraph state graphs, cyclic orchestrations, tool invocation, and human-in-the-loop workflows.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Full-Stack Web</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              React, Node.js, Express, and REST APIs built with secure JWT authentication and role-based access control.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Java & Spring Boot</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certified full-stack coursework, object-oriented design patterns, backend micro-modules, and unit testing.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-400 mb-3 shadow-[0_0_15px_rgba(255,94,126,0.15)]">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Databases & Mobile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Relational MySQL 3NF schemas with Drizzle ORM and 10+ production mobile UI screens built with Flutter.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-1">
              <span>Production Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Software Projects
            </h2>
          </div>

          <button
            onClick={() => handleNavClick('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            data-cursor="All Projects"
          >
            <span>View all {PROJECTS.length} projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={onOpenProject}
            />
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE EXPERIENCE & CAREER ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Engineering Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Work Experience & Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Hands-on internships building enterprise Java and cross-platform Flutter solutions alongside academic milestones.
          </p>
        </div>

        <ExperienceTimeline />
      </section>

      {/* 8. TECHNICAL SKILLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Verified Tech Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Technical Competencies & Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Technologies actively utilized in production projects, certified internships, and computer science coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <SpotlightCard
              key={group.category}
              className="p-5 space-y-4"
            >
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">{group.category}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{group.description}</p>
              </div>

              <div className="space-y-2">
                {group.skills.map((skill) => {
                  const levelColors = {
                    Strong: 'text-cyan-300 bg-cyan-950/60 border-cyan-400/30',
                    'Working Knowledge': 'text-sky-300 bg-sky-400/10 border-sky-400/20',
                    Intermediate: 'text-purple-300 bg-purple-400/10 border-purple-400/20',
                    Familiar: 'text-slate-300 bg-slate-800 border-slate-700'
                  };

                  return (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800/50 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {skill.highlight && (
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
                        )}
                        <span className="text-xs font-medium text-slate-200">{skill.name}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          levelColors[skill.level]
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 9. VERIFIED CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold mb-1">
              <span>Accredited Credentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Professional Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Official industry certifications in Automation (UiPath), Artificial Intelligence (Oracle, Google), and Web Engineering (IBM).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onPreview={onOpenCertificate}
            />
          ))}
        </div>
      </section>

      {/* 10. RECRUITER CONTACT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#0e121a] to-slate-900 border border-slate-700/80 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Recruitment & Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Discuss Software Engineering Roles
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Seeking an entry-level Software Engineer or Associate Software Engineer position. I bring hands-on experience shipping full-stack applications, Agentic AI pipelines, and certified internship work.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25"
                data-cursor="Contact"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 hover:border-cyan-400/40 transition-colors"
                data-cursor="Copy"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copiedEmail ? 'Copied balasabareeshp@gmail.com!' : 'Copy Direct Email'}</span>
              </button>

              <a
                href={PERSONAL_INFO.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiSound('click')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                data-cursor="View"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Resume PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
