import React, { useState, useEffect } from 'react';
import { PageId, Project, Certificate } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticleBackground } from './components/ParticleBackground';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ResumePage } from './pages/ResumePage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { AnimatePresence, motion } from 'motion/react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Sync with URL hash for navigation & bookmarking support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'projects', 'resume', 'blog', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    if (page === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Ultra-sleek reading scroll progress indicator */}
      <ScrollProgress />

      {/* Interactive Custom Cursor (desktop fine pointers only) */}
      <CustomCursor />

      {/* Interactive reactive particle constellation background */}
      <ParticleBackground />

      {/* Ambient background visual layers with aurora gradients */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 -z-20" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none -z-10" />

      {/* Ambient decorative glowing orbs */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="fixed top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 rounded-full bg-rose-500/10 blur-[130px] pointer-events-none -z-10 animate-pulse-subtle" />

      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Viewport with Smooth Page Transitions */}
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(5px)' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Top route sweep accent bar on page entry */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.9 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-400 origin-left z-50 pointer-events-none"
            />

            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenProject={(proj) => setSelectedProject(proj)}
                onOpenCertificate={(cert) => setSelectedCertificate(cert)}
              />
            )}
            {currentPage === 'projects' && (
              <ProjectsPage
                onOpenProject={(proj) => setSelectedProject(proj)}
              />
            )}
            {currentPage === 'resume' && <ResumePage />}
            {currentPage === 'blog' && <BlogPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Architecture & Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Verified Certificate Preview Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}

export default App;
