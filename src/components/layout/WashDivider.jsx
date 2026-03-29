import React from 'react';

/**
 * Watercolor wash SVG divider with 5 organic wave variants.
 * Props:
 *   variant: 1-5 (default 1)
 *   flip: boolean - vertically flip the divider
 *   className: optional extra class
 */

const PALETTE = {
  sage: '#8faa8c',
  blush: '#d4a9a9',
  blue: '#7ba7c2',
  cream: '#f5edd6',
  lavender: '#b8a9c9',
  gold: '#c9b77e',
};

const variantPaths = {
  1: [
    {
      d: 'M0,64 C120,92 240,28 360,56 C480,84 600,20 720,48 C840,76 960,16 1080,44 C1200,72 1320,24 1440,52 L1440,120 L0,120 Z',
      fill: PALETTE.sage,
      opacity: 0.08,
    },
    {
      d: 'M0,72 C160,40 280,96 440,60 C600,24 720,88 880,56 C1040,24 1200,80 1440,64 L1440,120 L0,120 Z',
      fill: PALETTE.blue,
      opacity: 0.06,
    },
    {
      d: 'M0,84 C200,68 360,100 540,78 C720,56 900,98 1080,82 C1260,66 1380,94 1440,88 L1440,120 L0,120 Z',
      fill: PALETTE.blush,
      opacity: 0.05,
    },
  ],
  2: [
    {
      d: 'M0,48 C180,88 300,16 480,56 C660,96 780,24 960,64 C1140,104 1260,32 1440,72 L1440,120 L0,120 Z',
      fill: PALETTE.lavender,
      opacity: 0.09,
    },
    {
      d: 'M0,56 C140,80 320,32 500,68 C680,104 840,36 1020,72 C1200,108 1340,44 1440,60 L1440,120 L0,120 Z',
      fill: PALETTE.sage,
      opacity: 0.06,
    },
    {
      d: 'M0,76 C240,56 420,96 600,72 C780,48 960,92 1140,76 C1320,60 1400,88 1440,84 L1440,120 L0,120 Z',
      fill: PALETTE.cream,
      opacity: 0.1,
    },
  ],
  3: [
    {
      d: 'M0,40 C100,76 260,12 400,52 C540,92 680,28 820,68 C960,108 1100,40 1240,72 C1380,104 1440,56 1440,56 L1440,120 L0,120 Z',
      fill: PALETTE.blue,
      opacity: 0.07,
    },
    {
      d: 'M0,60 C200,36 340,84 520,52 C700,20 880,76 1060,48 C1240,20 1360,72 1440,68 L1440,120 L0,120 Z',
      fill: PALETTE.blush,
      opacity: 0.08,
    },
    {
      d: 'M0,88 C160,72 320,100 500,84 C680,68 860,96 1040,80 C1220,64 1380,92 1440,86 L1440,120 L0,120 Z',
      fill: PALETTE.gold,
      opacity: 0.06,
    },
  ],
  4: [
    {
      d: 'M0,52 C80,80 200,20 340,60 C480,100 600,36 740,76 C880,116 1000,44 1140,80 C1280,116 1380,48 1440,64 L1440,120 L0,120 Z',
      fill: PALETTE.sage,
      opacity: 0.1,
    },
    {
      d: 'M0,68 C180,44 320,92 500,64 C680,36 840,88 1020,60 C1200,32 1340,84 1440,76 L1440,120 L0,120 Z',
      fill: PALETTE.lavender,
      opacity: 0.07,
    },
    {
      d: 'M0,92 C120,80 280,104 440,88 C600,72 780,100 960,84 C1140,68 1300,96 1440,90 L1440,120 L0,120 Z',
      fill: PALETTE.blue,
      opacity: 0.05,
    },
  ],
  5: [
    {
      d: 'M0,36 C160,72 280,8 440,48 C600,88 720,24 880,64 C1040,104 1160,36 1320,68 C1400,84 1440,52 1440,52 L1440,120 L0,120 Z',
      fill: PALETTE.blush,
      opacity: 0.09,
    },
    {
      d: 'M0,64 C120,48 280,84 460,56 C640,28 820,72 1000,52 C1180,32 1320,76 1440,68 L1440,120 L0,120 Z',
      fill: PALETTE.sage,
      opacity: 0.07,
    },
    {
      d: 'M0,80 C200,96 380,72 560,88 C740,104 920,76 1100,92 C1280,108 1400,80 1440,84 L1440,120 L0,120 Z',
      fill: PALETTE.gold,
      opacity: 0.12,
    },
    {
      d: 'M0,96 C160,88 340,104 520,92 C700,80 880,100 1060,88 C1240,76 1380,96 1440,92 L1440,120 L0,120 Z',
      fill: PALETTE.lavender,
      opacity: 0.05,
    },
  ],
};

const WashDivider = ({ variant = 1, flip = false, className = '' }) => {
  const paths = variantPaths[variant] || variantPaths[1];

  const containerStyle = {
    width: '100%',
    lineHeight: 0,
    fontSize: 0,
    overflow: 'hidden',
    transform: flip ? 'scaleY(-1)' : 'none',
    marginTop: flip ? '-1px' : 0,
    marginBottom: flip ? 0 : '-1px',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  return (
    <div style={containerStyle} className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 'clamp(60px, 8vw, 120px)',
          display: 'block',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {paths.map((p, i) => (
            <linearGradient
              key={`grad-${variant}-${i}`}
              id={`wash-grad-${variant}-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={p.fill} stopOpacity={p.opacity * 0.5} />
              <stop offset="50%" stopColor={p.fill} stopOpacity={p.opacity} />
              <stop offset="100%" stopColor={p.fill} stopOpacity={p.opacity * 0.7} />
            </linearGradient>
          ))}
          {/* Soft feather filter for watercolor feel */}
          <filter id={`wash-blur-${variant}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={`url(#wash-grad-${variant}-${i})`}
            filter={`url(#wash-blur-${variant})`}
          />
        ))}
      </svg>
    </div>
  );
};

export default WashDivider;
