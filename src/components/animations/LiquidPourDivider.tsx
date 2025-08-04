"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LiquidPourDividerProps {
  className?: string;
  color?: 'coffee' | 'cream' | 'accent';
  height?: number;
}

const LiquidPourDivider: React.FC<LiquidPourDividerProps> = ({ 
  className = '',
  color = 'coffee',
  height = 120
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set initial state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate the liquid pour
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(path, {
      fill: getColorValue(color),
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.5");

  }, [color]);

  const getColorValue = (colorType: string) => {
    switch (colorType) {
      case 'coffee':
        return '#8B4513';
      case 'cream':
        return '#F5F5DC';
      case 'accent':
        return '#D2691E';
      default:
        return '#8B4513';
    }
  };

  const getGradientId = () => `liquidGradient-${color}`;

  return (
    <div className={`liquid-pour relative overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 1200 ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getColorValue(color)} stopOpacity="0.8" />
            <stop offset="50%" stopColor={getColorValue(color)} stopOpacity="0.6" />
            <stop offset="100%" stopColor={getColorValue(color)} stopOpacity="0.4" />
          </linearGradient>
          
          {/* Coffee texture pattern */}
          <pattern id="coffeeTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill={getColorValue(color)} opacity="0.3" />
            <circle cx="5" cy="5" r="0.5" fill={getColorValue(color)} opacity="0.2" />
            <circle cx="15" cy="15" r="0.5" fill={getColorValue(color)} opacity="0.2" />
          </pattern>
        </defs>

        {/* Main liquid pour path */}
        <path
          ref={pathRef}
          className="liquid-path"
          d={`M0,${height/2} 
             Q150,${height/4} 300,${height/2} 
             T600,${height/2} 
             T900,${height/2} 
             T1200,${height/2} 
             L1200,${height} 
             L0,${height} Z`}
          fill="none"
          stroke={`url(#${getGradientId()})`}
          strokeWidth="3"
        />

        {/* Background fill */}
        <path
          d={`M0,${height/2} 
             Q150,${height/4} 300,${height/2} 
             T600,${height/2} 
             T900,${height/2} 
             T1200,${height/2} 
             L1200,${height} 
             L0,${height} Z`}
          fill={`url(#${getGradientId()})`}
          opacity="0.3"
        />

        {/* Coffee texture overlay */}
        <path
          d={`M0,${height/2} 
             Q150,${height/4} 300,${height/2} 
             T600,${height/2} 
             T900,${height/2} 
             T1200,${height/2} 
             L1200,${height} 
             L0,${height} Z`}
          fill="url(#coffeeTexture)"
          opacity="0.4"
        />

        {/* Animated coffee drops */}
        {[...Array(5)].map((_, index) => (
          <g key={index}>
            <circle
              cx={200 + index * 200}
              cy={height/2 - 10}
              r="2"
              fill={getColorValue(color)}
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur="2s"
                begin={`${index * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${height/2 - 10};${height/2 + 20};${height/2 + 40}`}
                dur="2s"
                begin={`${index * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Splash effects */}
        {[...Array(3)].map((_, index) => (
          <g key={`splash-${index}`}>
            <ellipse
              cx={300 + index * 300}
              cy={height/2 + 10}
              rx="8"
              ry="3"
              fill={getColorValue(color)}
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.6;0"
                dur="1.5s"
                begin={`${index * 0.6 + 1}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="rx"
                values="8;15;20"
                dur="1.5s"
                begin={`${index * 0.6 + 1}s`}
                repeatCount="indefinite"
              />
            </ellipse>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default LiquidPourDivider;