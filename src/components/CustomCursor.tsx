import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for interactive targets under cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor], .interactive'
        ) as HTMLElement | null;

        if (interactiveEl) {
          setIsHovered(true);
          const label = interactiveEl.getAttribute('data-cursor');
          setHoveredLabel(label);
        } else {
          setIsHovered(false);
          setHoveredLabel(null);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Smooth animation loop for trailing ring
    const animate = () => {
      const speed = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * speed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * speed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-amber-400 pointer-events-none transition-opacity duration-200 will-change-transform"
        style={{
          opacity: isHovered ? 0.9 : 0.75,
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />

      {/* Trailing interactive ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none transition-all duration-200 ease-out will-change-transform flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 rounded-full border border-amber-400/60 bg-amber-400/10 backdrop-blur-[1px]'
            : 'w-6 h-6 -ml-3 -mt-3 rounded-full border border-slate-500/40 bg-transparent'
        } ${isClicking ? 'scale-75 opacity-70' : 'scale-100'}`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      >
        {hoveredLabel && (
          <span className="text-[9px] font-mono tracking-wider font-semibold text-amber-300 uppercase select-none px-1">
            {hoveredLabel}
          </span>
        )}
      </div>
    </div>
  );
};
