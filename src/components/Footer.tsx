import React from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Code2, ExternalLink, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080a0f] border-t border-slate-800/80 text-slate-400 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Identity & Bio */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shadow-[0_0_12px_rgba(0,210,255,0.2)]">
                BS
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Computer Science undergraduate and Full Stack / Mobile Developer focused on building high-performance applications, Flutter mobile experiences, and modern software architectures.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Tamil Nadu, India
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                balasabareeshp@gmail.com
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {(['home', 'projects', 'resume', 'blog', 'contact'] as PageId[]).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => {
                      onNavigate(page);
                      scrollToTop();
                    }}
                    className="capitalize text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles & Repositories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold tracking-wider">
              Connect & Verify
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <span>LinkedIn Network</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Code2 className="w-4 h-4 text-slate-400" />
                  <span>LeetCode Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.socials.oldPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-xs text-slate-500 hover:text-slate-300"
                >
                  <span>Previous Portfolio (Archive)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 ml-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 Bala Sabareesh P. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
