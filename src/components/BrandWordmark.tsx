import React from 'react';

interface BrandWordmarkProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const isLight = variant === 'light';

  // Responsive dimensions designed for distance visibility
  // sm: mobile headers, compact screens
  // md: desktop header (bold & visible across room)
  // lg: footer and featured display
  // xl: hero, TV display, banners
  const dimensions = {
    sm: { height: 44, mobileHeight: 38 },
    md: { height: 60, mobileHeight: 48 },
    lg: { height: 78, mobileHeight: 64 },
    xl: { height: 100, mobileHeight: 80 },
  }[size];

  // High-contrast colors
  const textColor = isLight ? '#FFFFFF' : '#061D4A';
  const leftGradId = `ss-left-grad-${variant}-${size}`;
  const rightGradId = `ss-right-grad-${variant}-${size}`;
  const shadowId = `ss-shadow-${variant}-${size}`;

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* Official SS Solar Solutions Brand Logo
          Tight viewBox (190 12 420 172) ensures zero wasted margins
          so the monogram and brand name render large and prominent */}
      <svg
        viewBox="190 12 420 172"
        className="block transition-transform duration-200 hover:scale-102"
        style={{
          height: `var(--logo-height, ${dimensions.height}px)`,
          width: 'auto',
          aspectRatio: '420 / 172',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SS Solar Solutions Logo"
      >
        <defs>
          {/* Left S Gradient: Vibrant Electric Sky Blue to Rich Cobalt */}
          <linearGradient id={leftGradId} x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#00BAFF" />
            <stop offset="45%" stopColor="#008BE8" />
            <stop offset="100%" stopColor="#005EC4" />
          </linearGradient>

          {/* Right S Gradient: Cobalt to Deep Royal Sapphire */}
          <linearGradient id={rightGradId} x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor={isLight ? '#38BDF8' : '#0072EC'} />
            <stop offset="50%" stopColor={isLight ? '#2563EB' : '#0B42B8'} />
            <stop offset="100%" stopColor={isLight ? '#1D4ED8' : '#0E2270'} />
          </linearGradient>

          {/* Subtle drop shadow for depth and 3D intertwining */}
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#061226" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* SS Intertwined Monogram - Centered precisely on X=400 */}
        <g id="ss-monogram">
          {/* Left S */}
          <path
            d="M 402.25 32
               C 404.25 28, 398.25 25, 389.25 24
               C 370.25 22, 350.25 33, 346.25 50
               C 342.25 63, 354.25 74, 367.25 81
               L 379.25 87
               C 395.25 95, 405.25 105, 403.25 119
               C 401.25 132, 385.25 140, 368.25 138
               C 356.25 136, 346.25 131, 341.25 125
               C 340.25 124, 341.25 126, 344.25 132
               C 345.25 135, 340.25 134, 338.25 132
               C 336.25 130, 338.25 120, 343.25 113
               C 344.25 112, 346.25 114, 348.25 119
               C 353.25 128, 364.25 132, 374.25 131
               C 386.25 130, 394.25 121, 394.25 111
               C 394.25 99, 382.25 89, 368.25 82
               L 357.25 76
               C 343.25 69, 334.25 57, 337.25 43
               C 341.25 27, 359.25 18, 380.25 20
               C 392.25 21, 400.25 25, 402.25 32
               Z"
            fill={`url(#${leftGradId})`}
            filter={`url(#${shadowId})`}
          />

          {/* Right S */}
          <path
            d="M 460.25 32
               C 462.25 28, 456.25 25, 447.25 24
               C 428.25 22, 408.25 33, 404.25 50
               C 400.25 63, 412.25 74, 425.25 81
               L 437.25 87
               C 453.25 95, 463.25 105, 461.25 119
               C 459.25 132, 443.25 140, 426.25 138
               C 414.25 136, 404.25 131, 399.25 125
               C 398.25 124, 399.25 126, 402.25 132
               C 403.25 135, 398.25 134, 396.25 132
               C 394.25 130, 396.25 120, 401.25 113
               C 402.25 112, 404.25 114, 406.25 119
               C 411.25 128, 422.25 132, 432.25 131
               C 444.25 130, 452.25 121, 452.25 111
               C 452.25 99, 440.25 89, 426.25 82
               L 415.25 76
               C 401.25 69, 392.25 57, 395.25 43
               C 399.25 27, 417.25 18, 438.25 20
               C 450.25 21, 458.25 25, 460.25 32
               Z"
            fill={`url(#${rightGradId})`}
          />
        </g>

        {/* SOLAR SOLUTIONS Text - Bold, prominent, ultra-legible from distance */}
        <text
          x="400"
          y="172"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="0.32em"
          fill={textColor}
        >
          SOLAR SOLUTIONS
        </text>
      </svg>

      {showTagline && (
        <span
          className={`font-semibold uppercase tracking-[0.22em] text-[11px] pl-1 pt-1 ${
            isLight ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Clean Energy Systems
        </span>
      )}
    </div>
  );
};
