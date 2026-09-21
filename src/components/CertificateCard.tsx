import React from 'react';
import { Certificate } from '../types';
import { Award, CheckCircle, ExternalLink, Eye, ShieldCheck, Maximize2 } from 'lucide-react';
import { playUiSound } from '../utils/audio';

interface CertificateCardProps {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onPreview }) => {
  const handleClick = () => {
    playUiSound('click');
    onPreview(certificate);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#0c0f17] to-[#07090e] border border-slate-800/80 hover:border-cyan-400/50 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
      data-cursor="Preview"
    >
      {/* Top subtle cyan/purple shimmer border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Unclipped Certificate Frame Thumbnail */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950/90 border border-slate-800/90 mb-4 group-hover:border-cyan-500/40 transition-colors p-2 flex items-center justify-center">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 rounded-sm select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-transparent transition-colors pointer-events-none" />

          {/* Hover overlay button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/70 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 shadow-xl shadow-cyan-400/25">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full View</span>
            </span>
          </div>
        </div>

        {/* Category & Date */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-400/20">
            {certificate.category}
          </span>
          <span className="text-[11px] font-mono text-slate-400">{certificate.issueDate}</span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-1.5">
          {certificate.title}
        </h4>

        {/* Issuer */}
        <p className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{certificate.issuer}</span>
        </p>

        {/* Summary */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {certificate.summary}
        </p>
      </div>

      {/* Footer Credential ID */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="truncate max-w-[180px]">{certificate.credentialId || 'Verified Record'}</span>
        <span className="text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 font-medium shrink-0">
          Inspect
          <Eye className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
