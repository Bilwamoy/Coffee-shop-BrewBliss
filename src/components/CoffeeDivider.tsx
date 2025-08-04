"use client";

import React from 'react';

interface CoffeeDividerProps {
  variant?: 'beans' | 'steam' | 'drip' | 'wave';
  className?: string;
}

const CoffeeDivider: React.FC<CoffeeDividerProps> = ({ variant = 'beans', className = '' }) => {
  const renderDivider = () => {
    switch (variant) {
      case 'beans':
        return (
          <div className={`relative h-16 overflow-hidden ${className}`}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="coffeeBeansPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <ellipse cx="20" cy="20" rx="8" ry="12" fill="#8B4513" opacity="0.6" transform="rotate(45 20 20)" />
                  <ellipse cx="20" cy="20" rx="2" ry="8" fill="#654321" opacity="0.8" transform="rotate(45 20 20)" />
                </pattern>
              </defs>
              <path
                d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                fill="url(#coffeeBeansPattern)"
              />
            </svg>
          </div>
        );

      case 'steam':
        return (
          <div className={`relative h-20 overflow-hidden ${className}`}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="steamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
                fill="url(#steamGradient)"
              >
                <animate
                  attributeName="d"
                  values="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z;
                          M0,60 Q150,40 300,60 T600,40 T900,60 T1200,40 L1200,120 L0,120 Z;
                          M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        );

      case 'drip':
        return (
          <div className={`relative h-12 overflow-hidden ${className}`}>
            <div className="absolute inset-0 flex justify-center items-start space-x-8">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-b from-amber-800 to-transparent rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 20}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'wave':
        return (
          <div className={`relative h-16 overflow-hidden ${className}`}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B4513" />
                  <stop offset="50%" stopColor="#A0522D" />
                  <stop offset="100%" stopColor="#8B4513" />
                </linearGradient>
              </defs>
              <path
                d="M0,0 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
                fill="url(#waveGradient)"
                opacity="0.7"
              />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return renderDivider();
};

export default CoffeeDivider;