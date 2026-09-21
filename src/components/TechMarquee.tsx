import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Layers, 
  Terminal, 
  GitBranch, 
  Workflow, 
  Boxes, 
  Smartphone,
  Shield,
  Server,
  FileCode
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'React.js', category: 'Frontend', icon: Layers, color: 'text-sky-400' },
  { name: 'TypeScript', category: 'Language', icon: FileCode, color: 'text-blue-400' },
  { name: 'Java & Spring Boot', category: 'Backend', icon: Server, color: 'text-amber-400' },
  { name: 'Agentic AI / LangGraph', category: 'AI', icon: Cpu, color: 'text-emerald-400' },
  { name: 'Node.js & Express', category: 'Backend', icon: Terminal, color: 'text-green-400' },
  { name: 'Python', category: 'Language', icon: Code2, color: 'text-yellow-400' },
  { name: 'MySQL & 3NF Schemas', category: 'Database', icon: Database, color: 'text-orange-400' },
  { name: 'Drizzle ORM', category: 'Database', icon: Boxes, color: 'text-lime-400' },
  { name: 'Flutter & Dart', category: 'Mobile', icon: Smartphone, color: 'text-cyan-400' },
  { name: 'Tailwind CSS', category: 'Styling', icon: Layers, color: 'text-teal-400' },
  { name: 'REST APIs & JWT', category: 'Security', icon: Shield, color: 'text-purple-400' },
  { name: 'Git & GitHub', category: 'VCS', icon: GitBranch, color: 'text-rose-400' },
  { name: 'UiPath RPA', category: 'Automation', icon: Workflow, color: 'text-amber-300' }
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-r from-[#0b0d13] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-l from-[#0b0d13] to-transparent z-10" />

      {/* Row 1: Forward Marquee */}
      <div className="flex gap-3 w-max animate-marquee hover:[animation-play-state:paused]">
        {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="group/item flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              <Icon className={`w-4 h-4 ${item.color} group-hover/item:scale-110 transition-transform`} />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
