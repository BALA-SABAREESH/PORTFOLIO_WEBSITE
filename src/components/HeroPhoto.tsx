import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroPhotoProps {
  photoUrl: string;
  name: string;
}

export const HeroPhoto: React.FC<HeroPhotoProps> = ({ photoUrl, name }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Motion target & current interpolated values for gentle 3D hover physics
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (touch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetX.current = Math.max(-1, Math.min(1, x)) * 8;
      targetY.current = Math.max(-1, Math.min(1, y)) * 8;
    };

    const handleMouseLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
    };

    const updateMotion = () => {
      const ease = 0.12;
      currentX.current += (targetX.current - currentX.current) * ease;
      currentY.current += (targetY.current - currentY.current) * ease;

      if (ringRef.current) {
        const rotY = currentX.current;
        const rotX = -currentY.current;
        ringRef.current.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }

      rafId.current = requestAnimationFrame(updateMotion);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    rafId.current = requestAnimationFrame(updateMotion);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center select-none py-2"
      data-cursor="Portrait"
    >
      {/* Outer vibrant ambient glow halo */}
      <div 
        className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full bg-gradient-to-tr from-[#ec4899]/30 via-[#8b5cf6]/35 to-[#00f0ff]/35 blur-3xl pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: '6s' }}
        aria-hidden="true"
      />

      {/* Main Interactive Circular Frame */}
      <div
        ref={ringRef}
        className="relative transition-transform duration-200 ease-out will-change-transform"
      >
        {/* Multi-Color Gradient Glowing Ring Border (Matching Reference Style) */}
        <div className="relative p-[3.5px] sm:p-[4.5px] rounded-full bg-gradient-to-tr from-[#ff5e7e] via-[#9d4edd] via-[#00d2ff] to-[#00f0ff] shadow-[0_0_35px_rgba(157,78,221,0.35)] hover:shadow-[0_0_50px_rgba(0,210,255,0.5)] transition-shadow duration-500">
          
          {/* Inner dark gap ring separating the gradient border from the image */}
          <div className="p-1 sm:p-1.5 rounded-full bg-[#080b13]">
            
            {/* Circular Image Container (Neatly sized & fully circular) */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-slate-950 shadow-inner">
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-transform duration-700 ease-out hover:scale-105"
                loading="eager"
              />

              {/* Gentle inner radial vignette */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Delicate floating verified badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 right-2 sm:right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border border-cyan-500/40 shadow-xl shadow-black/60 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-semibold text-cyan-300">
            Open for Roles
          </span>
        </motion.div>
      </div>
    </div>
  );
};
