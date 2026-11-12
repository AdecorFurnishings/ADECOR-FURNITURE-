import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailingRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const stateRef = useRef({ text: '', hovered: false, pressed: false });

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const startLoop = () => {
      if (rafRef.current !== null) return;
      const tick = () => {
        const dx = mouseRef.current.x - trailingRef.current.x;
        const dy = mouseRef.current.y - trailingRef.current.y;
        trailingRef.current.x += dx * 0.22;
        trailingRef.current.y += dy * 0.22;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${trailingRef.current.x}px, ${trailingRef.current.y}px, 0) translate(-50%, -50%)`;
          if (!visibleRef.current) ringRef.current.style.opacity = '1';
        }
        visibleRef.current = true;

        if (Math.abs(dx) > 0.12 || Math.abs(dy) > 0.12) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          trailingRef.current.x = mouseRef.current.x;
          trailingRef.current.y = mouseRef.current.y;
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
          }
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      if (!visibleRef.current) {
        trailingRef.current.x = x;
        trailingRef.current.y = y;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = '0.85';
      }

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      let nextText = '';
      let nextHovered = false;
      if (cursorTarget) {
        nextText = cursorTarget.getAttribute('data-cursor') || '';
        nextHovered = true;
      } else if (target?.closest('a, button, input, select, textarea, [role="button"]')) {
        nextHovered = true;
      }

      if (stateRef.current.text !== nextText) {
        stateRef.current.text = nextText;
        setCursorText(nextText);
      }
      if (stateRef.current.hovered !== nextHovered) {
        stateRef.current.hovered = nextHovered;
        setIsHovered(nextHovered);
      }

      startLoop();
    };

    const onMouseDown = () => {
      if (!stateRef.current.pressed) {
        stateRef.current.pressed = true;
        setIsPressed(true);
      }
    };

    const onMouseUp = () => {
      if (stateRef.current.pressed) {
        stateRef.current.pressed = false;
        setIsPressed(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Tiny sharp center dot (GPU-composited) */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full bg-[#1E1D1B] will-change-transform transition-[width,height,opacity] duration-150"
        style={{
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />

      {/* Trailing follower ring / expanding pill (GPU-composited) */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border will-change-transform transition-[width,height,background-color,border-color,padding] duration-200 ease-out ${
          cursorText
            ? 'bg-[#1E1D1B] border-[#1E1D1B] text-[#FAF8F5] px-4 py-2 h-10 min-w-[70px] shadow-lg'
            : isHovered
            ? 'w-14 h-14 border-[#C5A880] bg-[#C5A880]/10 backdrop-blur-[1px]'
            : isPressed
            ? 'w-6 h-6 border-[#8A8782] bg-[#8A8782]/20'
            : 'w-9 h-9 border-[#8A8782]/40 bg-transparent'
        }`}
        style={{
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        {cursorText && (
          <span className="text-[10px] tracking-widest font-semibold uppercase whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
