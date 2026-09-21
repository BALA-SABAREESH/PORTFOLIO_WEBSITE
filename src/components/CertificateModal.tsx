import React, { useState, useEffect, useRef } from 'react';
import { Certificate } from '../types';
import { 
  X, 
  ShieldCheck, 
  Calendar, 
  Hash, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Download,
  Copy,
  Check,
  Award,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playUiSound } from '../utils/audio';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'document' | 'details'>('document');
  const [copiedId, setCopiedId] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & fullscreen when certificate changes
  useEffect(() => {
    if (certificate) {
      setZoom(1);
      setIsFullscreen(false);
      setActiveTab('document');
    }
  }, [certificate]);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!certificate) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, isFullscreen, zoom]);

  if (!certificate) return null;

  const handleZoomIn = () => {
    playUiSound('click');
    setZoom((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    playUiSound('click');
    setZoom((prev) => Math.max(prev - 0.25, 0.6));
  };

  const handleResetZoom = () => {
    playUiSound('click');
    setZoom(1);
  };

  const toggleFullscreen = () => {
    playUiSound('click');
    setIsFullscreen((prev) => !prev);
  };

  const handleCopyId = () => {
    if (!certificate.credentialId) return;
    navigator.clipboard.writeText(certificate.credentialId);
    playUiSound('success');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleOpenOriginal = () => {
    playUiSound('click');
    window.open(certificate.image, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Darkened Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md -z-10 cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`relative w-full rounded-2xl bg-[#080b11] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-2 sm:inset-4 max-w-none max-h-none h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]'
              : 'max-w-5xl h-[88vh] my-auto'
          }`}
        >
          {/* Top Bar: Title & Primary Controls */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/90 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_12px_rgba(0,210,255,0.25)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white truncate">{certificate.title}</h3>
                <p className="text-[11px] font-mono text-cyan-400/90 truncate">
                  {certificate.issuer} · {certificate.category}
                </p>
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Tab Selector on desktop */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono mr-2">
                <button
                  type="button"
                  onClick={() => { setActiveTab('document'); playUiSound('click'); }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'document'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Certificate Document
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('details'); playUiSound('click'); }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'details'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,210,255,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Verification Details
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Open in New Window */}
              <button
                type="button"
                onClick={handleOpenOriginal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 transition-colors hidden sm:inline-flex"
                title="Open Original Image in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => { playUiSound('click'); onClose(); }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 transition-colors"
                aria-label="Close certificate modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Zoom & Pan Controls Bar */}
          <div className="px-4 py-2 bg-slate-900/95 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] mr-1">Zoom:</span>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.6}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center text-[11px] font-semibold text-cyan-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors flex items-center gap-1 ml-1"
                title="Fit to Window (0)"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Fit</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {certificate.credentialId && (
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] border border-slate-700/60 transition-colors flex items-center gap-1.5"
                >
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId ? 'Copied ID' : 'Copy Credential ID'}</span>
                </button>
              )}

              <a
                href={certificate.image}
                download={`${certificate.id}.jpeg`}
                onClick={() => playUiSound('click')}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 text-[11px] transition-colors flex items-center gap-1.5 font-medium"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Main Inspection Body */}
          <div className="flex-1 min-h-0 overflow-auto bg-[#06080d] p-3 sm:p-4 flex flex-col items-center justify-center">
            {activeTab === 'document' ? (
              <div 
                ref={imageContainerRef}
                className="w-full h-full flex flex-col items-center justify-center overflow-auto p-1 min-h-0"
              >
                {/* Fully visible, perfectly proportioned certificate canvas */}
                <div 
                  className="transition-transform duration-200 ease-out origin-center select-none flex items-center justify-center max-w-full max-h-full"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="max-h-[calc(88vh-160px)] w-auto max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl shadow-cyan-950/30"
                    loading="eager"
                  />
                </div>
              </div>
            ) : (
              /* Verification Details View */
              <div className="w-full max-w-3xl space-y-5 my-auto overflow-y-auto max-h-full p-2">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">{certificate.title}</h4>
                      <p className="text-xs font-mono text-cyan-400">{certificate.issuer}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {certificate.summary}
                  </p>
                </div>

                {/* Structured Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Issue Date</p>
                      <p className="text-xs font-semibold text-slate-200">{certificate.issueDate}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <Hash className="w-5 h-5 text-purple-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Credential ID</p>
                      <p className="text-xs font-mono font-semibold text-slate-200 truncate">
                        {certificate.credentialId || 'Verified Authority Record'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Issuing Authority</p>
                      <p className="text-xs font-medium text-slate-200 truncate">
                        {certificate.verifiedSigner || 'Official Certification'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setActiveTab('document'); playUiSound('click'); }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs font-mono transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    View Certificate Document
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Info Strip */}
          <div className="px-4 py-2.5 sm:px-6 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Credential Record</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-slate-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">Esc</kbd> to close
              </span>
              <button
                onClick={() => { playUiSound('click'); onClose(); }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
