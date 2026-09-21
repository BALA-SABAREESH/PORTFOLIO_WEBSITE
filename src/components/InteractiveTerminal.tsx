import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, Activity } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
}

const QUICK_COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'sudo hire'];

export const InteractiveTerminal: React.FC<{ onNavigate?: (page: any) => void }> = ({ onNavigate }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'neofetch --portfolio',
      response: (
        <div className="space-y-1.5 text-xs font-mono text-slate-300">
          <div className="text-cyan-400 font-bold">
            <span>bala@engineer:~$ Software & Agentic AI Developer</span>
          </div>
          <div className="text-slate-400">
            • Degree: B.E. Computer Science & Eng. (<span className="text-cyan-300 font-semibold">CGPA: 8.1/10</span>)
          </div>
          <div className="text-slate-400">
            • Core Stack: Java, Spring Boot, React, Node.js, Flutter, LangGraph, MySQL
          </div>
          <div className="text-slate-400">
            • Type <span className="text-cyan-300 font-semibold">'help'</span> or click the suggestion buttons below to explore.
          </div>
        </div>
      )
    }
  ]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'system'>('terminal');
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmdText: string) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    playUiSound('command');

    let responseNode: React.ReactNode = null;

    switch (cleanCmd) {
      case 'help':
        responseNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-semibold">Available Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block">about</span> — Background, College & CGPA</p>
            <p><span className="text-emerald-400 w-24 inline-block">skills</span> — Verified technical proficiencies</p>
            <p><span className="text-emerald-400 w-24 inline-block">projects</span> — Shipped engineering systems</p>
            <p><span className="text-emerald-400 w-24 inline-block">contact</span> — Recruiter direct contact points</p>
            <p><span className="text-emerald-400 w-24 inline-block">certs</span> — Official verified certifications</p>
            <p><span className="text-emerald-400 w-24 inline-block">socials</span> — GitHub, LinkedIn & LeetCode</p>
            <p><span className="text-emerald-400 w-24 inline-block">sudo hire</span> — Immediate fast-track interview invitation</p>
            <p><span className="text-emerald-400 w-24 inline-block">clear</span> — Reset terminal console</p>
          </div>
        );
        break;

      case 'about':
        responseNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-amber-300 font-semibold">{PERSONAL_INFO.name}</p>
            <p className="text-slate-400">{PERSONAL_INFO.title} · {PERSONAL_INFO.college}</p>
            <p className="text-slate-300">CGPA: <span className="text-amber-400 font-bold">{PERSONAL_INFO.cgpa}</span> · Expected Graduation: {PERSONAL_INFO.expectedGraduation}</p>
            <p className="text-slate-400 mt-1 leading-relaxed">{PERSONAL_INFO.careerDirection}</p>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">Backend & Languages</span>
              <span>Java, Spring Boot, Python, Node.js, Express.js, TypeScript</span>
            </div>
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-sky-400 font-bold block mb-1">AI & Full-Stack</span>
              <span>LangChain, LangGraph, React.js, Tailwind, REST APIs</span>
            </div>
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">Data & Systems</span>
              <span>MySQL 3NF, Drizzle ORM, JWT, Git/GitHub, Docker Basics</span>
            </div>
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">Mobile & Automation</span>
              <span>Flutter, Dart, UiPath RPA Developer Certified</span>
            </div>
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-amber-300 font-bold">[{idx + 1}] {p.title}</span>
                <span className="text-slate-500 text-[10px] ml-2">({p.category})</span>
                <p className="text-slate-400 mt-0.5 text-[11px]">{p.subtitle}</p>
                <p className="text-slate-500 text-[10px] mt-1">Stack: {p.techStack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-amber-300 font-semibold">Direct Recruiter Channels:</p>
            <p>• Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-400 hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>• Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-amber-400 hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p>• Location: {PERSONAL_INFO.location}</p>
            <p>• Status: <span className="text-emerald-400 font-semibold">Open for 2026/27 Full-Time Roles</span></p>
          </div>
        );
        break;

      case 'certs':
        responseNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-amber-300 font-semibold">Accredited Certifications:</p>
            <p>1. <span className="text-white">UiPath</span> — Automation Developer Associate (RPA)</p>
            <p>2. <span className="text-white">Oracle</span> — Oracle Cloud Infrastructure 2025 Certified Generative AI Professional</p>
            <p>3. <span className="text-white">IBM</span> — Web Development Fundamentals</p>
            <p>4. <span className="text-white">Google</span> — Machine Learning Foundation</p>
          </div>
        );
        break;

      case 'socials':
        responseNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p>• GitHub: <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">{PERSONAL_INFO.socials.github}</a></p>
            <p>• LinkedIn: <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">{PERSONAL_INFO.socials.linkedin}</a></p>
            <p>• LeetCode: <a href={PERSONAL_INFO.socials.leetcode} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">{PERSONAL_INFO.socials.leetcode}</a></p>
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        playUiSound('success');
        responseNode = (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs font-mono text-emerald-300 space-y-1 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <p className="font-bold text-emerald-400">
              PRIORITY RECRUITER ACCESS GRANTED!
            </p>
            <p>Thank you for considering Bala Sabareesh P for your team.</p>
            <p className="text-slate-300">• Availability: Immediate 2026/27 hiring cycles</p>
            <p className="text-slate-300">• Direct Email: <span className="text-cyan-300 font-bold">{PERSONAL_INFO.email}</span></p>
            <p className="text-slate-300">• Phone: <span className="text-cyan-300 font-bold">{PERSONAL_INFO.phone}</span></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        responseNode = (
          <p className="text-xs font-mono text-rose-400">
            Command not recognized: '{cleanCmd}'. Type <span className="text-cyan-300 font-semibold">'help'</span> for a list of valid commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cleanCmd,
        response: responseNode
      }
    ]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  // Keep page still - scroll ONLY the terminal internal viewport without shifting the parent window
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    playUiSound('click');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#0e111a] to-[#090b10] border border-slate-800/90 shadow-2xl overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 font-medium flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>bala@portfolio: ~ (zsh)</span>
          </span>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'terminal'
                ? 'bg-slate-800 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(0,210,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Terminal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'system'
                ? 'bg-slate-800 text-cyan-300 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>System Status</span>
          </button>
        </div>
      </div>

      {activeTab === 'terminal' ? (
        <div 
          ref={terminalContainerRef}
          className="p-4 sm:p-5 flex flex-col justify-between min-h-[320px] max-h-[420px] overflow-y-auto"
        >
          {/* Terminal History */}
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium">
                  <span className="text-slate-500">❯</span>
                  <span>{item.command}</span>
                </div>
                <div className="pl-4 border-l border-slate-800/80">{item.response}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Bottom input area */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            {/* Quick command buttons */}
            <div className="flex items-center gap-1.5 flex-wrap mb-3">
              <span className="text-[10px] font-mono text-slate-500 mr-1">Try:</span>
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCommand(cmd);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900/90 hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-400/40 text-slate-400 border border-slate-800 text-[11px] font-mono transition-all"
                >
                  {cmd}
                </button>
              ))}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCommand('clear');
                }}
                title="Clear console"
                className="p-1 rounded bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-xs font-bold">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'projects', 'sudo hire')..."
                className="flex-grow bg-transparent text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors shadow-sm shadow-cyan-400/30 font-bold"
                title="Execute Command"
              >
                <Play className="w-3 h-3 fill-current" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* System Telemetry Tab */
        <div className="p-5 space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Runtime Pipeline</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-white font-bold text-sm">Java 21 · Node.js 20 · Flutter 3</p>
              <p className="text-slate-500 text-[10px] mt-1">Full-stack & Mobile App Architecture</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                  Relational 3NF
                </span>
              </div>
              <p className="text-white font-bold text-sm">MySQL + Drizzle ORM</p>
              <p className="text-slate-500 text-[10px] mt-1">Normalized schema design & indexed queries</p>
            </div>
          </div>

          {/* Quick Copy Contact Bar */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-slate-400 text-[11px] block">Primary Recruiter Endpoint:</span>
              <span className="text-white font-bold text-xs">{PERSONAL_INFO.email}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
