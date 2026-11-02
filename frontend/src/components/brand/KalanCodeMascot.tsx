import React from 'react';

interface KalanCodeMascotProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  title?: string;
}

export const KalanCodeMascot: React.FC<KalanCodeMascotProps> = ({
  size = 42,
  className = '',
  style,
  onClick,
  title = 'KalanCode',
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`kc-mascot-container ${className}`}
      onClick={onClick}
      title={title}
      style={{
        position: 'relative',
        width: dimension,
        height: dimension,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* 1. Base Mascot PNG (1254x1254) */}
      <img
        src="/assets/brand/kalancode-icon.png"
        alt="KalanCode"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2))',
        }}
      />

      {/* 2. Blinking Eyes Overlay */}
      {/* Left Eye Eyelid */}
      <div
        className="kc-mascot-eyelid kc-eyelid-left"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '34.2%',
          top: '32.1%',
          width: '13.6%',
          height: '14.2%',
          pointerEvents: 'none',
          overflow: 'hidden',
          borderRadius: '50%',
        }}
      >
        <div className="kc-eyelid-cover" />
      </div>

      {/* Right Eye Eyelid */}
      <div
        className="kc-mascot-eyelid kc-eyelid-right"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '56.0%',
          top: '33.6%',
          width: '13.4%',
          height: '12.8%',
          pointerEvents: 'none',
          overflow: 'hidden',
          borderRadius: '50%',
        }}
      >
        <div className="kc-eyelid-cover" />
      </div>

      {/* 3. Three Yellow Rays Light & Glow Overlay */}
      <div
        className="kc-mascot-rays-glow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '67.0%',
          top: '14.0%',
          width: '23.0%',
          height: '26.5%',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 100 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <defs>
            {/* Golden luminous gradient */}
            <linearGradient id="rayLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff8b3" />
              <stop offset="40%" stopColor="#ffea00" />
              <stop offset="100%" stopColor="#ffb300" />
            </linearGradient>

            {/* Shimmer light sweep filter */}
            <filter id="rayGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ray 1: Top (Angled ~45deg) */}
          <rect
            className="kc-ray kc-ray-1"
            x="20"
            y="2"
            width="22"
            height="55"
            rx="11"
            transform="rotate(28 20 2)"
            fill="url(#rayLightGrad)"
            filter="url(#rayGlowFilter)"
          />

          {/* Ray 2: Middle (Angled ~60deg) */}
          <rect
            className="kc-ray kc-ray-2"
            x="38"
            y="35"
            width="20"
            height="50"
            rx="10"
            transform="rotate(52 38 35)"
            fill="url(#rayLightGrad)"
            filter="url(#rayGlowFilter)"
          />

          {/* Ray 3: Bottom (Angled ~80deg) */}
          <rect
            className="kc-ray kc-ray-3"
            x="48"
            y="72"
            width="19"
            height="46"
            rx="9.5"
            transform="rotate(80 48 72)"
            fill="url(#rayLightGrad)"
            filter="url(#rayGlowFilter)"
          />

          {/* Golden Sparkle Star flare at the tip of Ray 2 */}
          <g className="kc-ray-sparkle" transform="translate(85, 38)">
            <path
              d="M0,-8 Q1,-1 8,0 Q1,1 0,8 Q-1,1 -8,0 Q-1,-1 0,-8 Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
