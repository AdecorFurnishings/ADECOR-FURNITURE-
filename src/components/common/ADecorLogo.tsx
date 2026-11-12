import React from 'react';
import { motion } from 'framer-motion';

export interface ADecorLogoProps {
  /** 'crimson' = faithful red mark on light surfaces; 'obsidian' = white/ivory DECOR + crimson [A] block & frame on dark surfaces; 'monochrome' = warm ivory/gold minimal */
  variant?: 'crimson' | 'obsidian' | 'monochrome';
  /** Animate perimeter stroke drawing & block entrance (used in IntroBoomLoader) */
  animated?: boolean;
  /** Render outer open-bottom architectural perimeter frame */
  showFrame?: boolean;
  className?: string;
}

const CRIMSON = '#D90B0B';

export const ADecorLogo: React.FC<ADecorLogoProps> = ({
  variant = 'obsidian',
  animated = false,
  showFrame = true,
  className = 'h-10 w-auto',
}) => {
  const isCrimson = variant === 'crimson';
  const isMono = variant === 'monochrome';

  const blockColor = isMono ? '#C5A880' : CRIMSON;
  const letterInBlockColor = isMono ? '#141312' : '#FFFFFF';
  const frameColor = isMono ? '#C5A880' : CRIMSON;
  const decorColor = isCrimson ? CRIMSON : isMono ? '#FAF8F5' : '#FAF8F5';
  const furnishingsColor = isCrimson ? CRIMSON : isMono ? '#DEC8AA' : '#FAF8F5';

  // Single continuous path for the open-bottom architectural perimeter frame:
  // Starts at bottom-left cutout before FURNISHINGS (x=96, y=97) -> left corner (8,97) -> up (8,10) -> across top (352,10) -> down (352,97) -> inward to right of FURNISHINGS (338,97)
  const framePath = 'M 96 97 L 8 97 L 8 10 L 352 10 L 352 97 L 336 97';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 116"
      role="img"
      aria-label="A DECOR FURNISHINGS"
      className={className}
    >
      {/* Architectural Open-Bottom Perimeter Frame */}
      {showFrame &&
        (animated ? (
          <motion.path
            d={framePath}
            fill="none"
            stroke={frameColor}
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            initial={{ pathLength: 0, opacity: 0.35 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <path
            d={framePath}
            fill="none"
            stroke={frameColor}
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        ))}

      {/* Solid Crimson [A] Keystone Rectangle */}
      {animated ? (
        <motion.g
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '54px 53px' }}
        >
          <rect x="22" y="25" width="64" height="56" fill={blockColor} />
          {/* Geometric Heavy 'A' */}
          <path
            d="M 54 33 L 73 73 L 62.5 73 L 59 64.5 L 49 64.5 L 45.5 73 L 35 73 Z M 54 45.5 L 50.8 56.5 L 57.2 56.5 Z"
            fill={letterInBlockColor}
            fillRule="evenodd"
          />
        </motion.g>
      ) : (
        <g>
          <rect x="22" y="25" width="64" height="56" fill={blockColor} />
          <path
            d="M 54 33 L 73 73 L 62.5 73 L 59 64.5 L 49 64.5 L 45.5 73 L 35 73 Z M 54 45.5 L 50.8 56.5 L 57.2 56.5 Z"
            fill={letterInBlockColor}
            fillRule="evenodd"
          />
        </g>
      )}

      {/* Primary Wordmark: D E C O R */}
      {animated ? (
        <motion.text
          x="104"
          y="74"
          textLength="226"
          lengthAdjust="spacing"
          fill={decorColor}
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontSize="55"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          DECOR
        </motion.text>
      ) : (
        <text
          x="104"
          y="74"
          textLength="226"
          lengthAdjust="spacing"
          fill={decorColor}
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontSize="55"
        >
          DECOR
        </text>
      )}

      {/* Centered Bottom Cutout Sub-label: F U R N I S H I N G S */}
      {animated ? (
        <motion.text
          x="104"
          y="102.5"
          textLength="226"
          lengthAdjust="spacing"
          fill={furnishingsColor}
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
        >
          FURNISHINGS
        </motion.text>
      ) : (
        <text
          x="104"
          y="102.5"
          textLength="226"
          lengthAdjust="spacing"
          fill={furnishingsColor}
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="16"
        >
          FURNISHINGS
        </text>
      )}
    </svg>
  );
};

export interface AtelierFrameBoxProps {
  /** Text rendered inside the bottom-center architectural frame gap */
  bottomLabel?: string;
  /** Surface theme */
  variant?: 'dark' | 'light';
  /** Show the miniature Crimson [A] keystone badge in top-left corner */
  showKeystone?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Architectural perimeter frame directly inspired by the A DECOR FURNISHINGS logo:
 * crisp open-bottom border with a typographic cutout centered along the bottom edge.
 */
export const AtelierFrameBox: React.FC<AtelierFrameBoxProps> = ({
  bottomLabel = 'A DECOR FURNISHINGS • EST. 2004',
  variant = 'dark',
  showKeystone = true,
  className = '',
  children,
}) => {
  const isDark = variant === 'dark';
  const borderColor = isDark ? 'border-[#D90B0B]/60' : 'border-[#D90B0B]/45';
  const innerAccent = isDark ? 'border-[#C5A880]/20' : 'border-[#1E1D1B]/10';
  const labelTextColor = isDark ? 'text-[#FAF8F5]/85' : 'text-[#1E1D1B]/80';

  return (
    <div className={`relative ${className}`}>
      {/* Top / Left / Right continuous sharp architectural border */}
      <div
        className={`relative border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] ${borderColor} px-5 sm:px-10 pt-8 sm:pt-12 pb-10 sm:pb-12`}
      >
        {/* Subtle secondary inner hairline echo */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-2.5 border ${innerAccent}`}
        />

        {/* Miniature Crimson [A] Atelier Keystone */}
        {showKeystone && (
          <div
            aria-hidden="true"
            className="absolute -top-3.5 left-6 sm:left-10 w-7 h-6 bg-[#D90B0B] flex items-center justify-center shadow-md"
          >
            <span className="font-sans font-extrabold text-[13px] text-white leading-none tracking-tight">
              A
            </span>
          </div>
        )}

        <div className="relative z-10">{children}</div>

        {/* Bottom split legs creating the signature open cutout */}
        <div className="flex items-center gap-3 sm:gap-5 absolute -bottom-[9px] inset-x-0 pointer-events-none">
          <div className={`flex-1 h-[1.5px] ${isDark ? 'bg-[#D90B0B]/60' : 'bg-[#D90B0B]/45'}`} />
          <span
            className={`text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.34em] whitespace-nowrap select-none ${labelTextColor}`}
          >
            {bottomLabel}
          </span>
          <div className={`flex-1 h-[1.5px] ${isDark ? 'bg-[#D90B0B]/60' : 'bg-[#D90B0B]/45'}`} />
        </div>
      </div>
    </div>
  );
};
