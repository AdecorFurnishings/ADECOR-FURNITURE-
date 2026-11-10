import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check for elements with data-cursor attributes
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else {
        const clickable = target?.closest('a, button, input, select, textarea, [role="button"]');
        if (clickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Trailing smooth loop
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Tiny sharp center dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E1D1B] transition-opacity duration-150"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          opacity: position.x < 0 ? 0 : 0.8,
        }}
      />

      {/* Trailing follower ring / expanding pill */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          cursorText
            ? 'bg-[#1E1D1B] border-[#1E1D1B] text-[#FAF8F5] px-4 py-2 h-10 min-w-[70px] shadow-lg'
            : isHovered
            ? 'w-14 h-14 border-[#C5A880] bg-[#C5A880]/10 backdrop-blur-[1px]'
            : isPressed
            ? 'w-6 h-6 border-[#8A8782] bg-[#8A8782]/20'
            : 'w-9 h-9 border-[#8A8782]/40 bg-transparent'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          opacity: trailingPos.x < 0 ? 0 : 1,
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
