import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Github, 
  Linkedin, 
  Code2, 
  Menu, 
  X, 
  FileText, 
  ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { playUiSound } from '../utils/audio';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    playUiSound('click');
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0d13]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            data-cursor="Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-slate-800 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm group-hover:border-cyan-400 transition-colors shadow-[0_0_12px_rgba(0,210,255,0.25)]">
              BS
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                Portfolio
              </span>
              <span className="hidden sm:block text-[10px] font-mono text-slate-400 leading-none">
                Bala Sabareesh P
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  data-cursor={item.label}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-slate-800/95 border border-cyan-400/50 -z-10 shadow-[0_0_15px_rgba(0,210,255,0.25)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Social Links & Resume Quick Action */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="GitHub"
              data-cursor="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="LinkedIn"
              data-cursor="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="LeetCode"
              data-cursor="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <div className="h-4 w-[1px] bg-slate-800 mx-1" />

            <ThemeSwitcher />

            <a
              href={PERSONAL_INFO.resumePath}
              download="Bala_Sabareesh_P_Resume.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all hover:border-amber-400/50"
              data-cursor="Download"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              download="Bala_Sabareesh_P_Resume.pdf"
              className="p-2 rounded-lg text-amber-400 bg-amber-400/10 border border-amber-400/20 text-xs font-mono flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#0c0f17]/95 border-b border-slate-800 backdrop-blur-xl px-6 py-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                        : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  <Code2 className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <a
                  href={PERSONAL_INFO.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <span>View PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
