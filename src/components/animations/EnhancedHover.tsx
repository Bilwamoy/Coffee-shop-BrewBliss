"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface EnhancedHoverProps {
  children: React.ReactNode;
  hoverType?: 'lift' | 'glow' | 'tilt' | 'coffee-steam' | 'package-flip';
  intensity?: 'subtle' | 'medium' | 'strong';
  glowColor?: string;
  className?: string;
}

const EnhancedHover: React.FC<EnhancedHoverProps> = ({
  children,
  hoverType = 'lift',
  intensity = 'medium',
  glowColor = '#D4AF37',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();

  const getIntensityValues = () => {
    switch (intensity) {
      case 'subtle':
        return { lift: 5, glow: 0.3, scale: 1.02, rotation: 2 };
      case 'strong':
        return { lift: 25, glow: 0.8, scale: 1.08, rotation: 8 };
      default: // medium
        return { lift: 15, glow: 0.5, scale: 1.05, rotation: 5 };
    }
  };

  const intensityValues = getIntensityValues();

  const createSteamEffect = () => {
    if (!steamRef.current || !config.enableParticles) return;

    const steam = steamRef.current;
    const particleCount = Math.min(config.particleCount, 4);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${45 + Math.random() * 10}%;
        bottom: 10px;
        pointer-events: none;
      `;
      
      steam.appendChild(particle);

      gsap.to(particle, {
        y: -30,
        x: Math.random() * 10 - 5,
        opacity: 0,
        scale: 2,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const getHoverVariants = () => {
    switch (hoverType) {
      case 'lift':
        return {
          rest: { 
            y: 0, 
            scale: 1,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            filter: 'brightness(1)'
          },
          hover: { 
            y: -intensityValues.lift, 
            scale: intensityValues.scale,
            boxShadow: `0 ${intensityValues.lift * 2}px ${intensityValues.lift * 3}px rgba(0,0,0,0.2)`,
            filter: 'brightness(1.1)'
          }
        };

      case 'glow':
        return {
          rest: { 
            scale: 1,
            filter: 'brightness(1)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          },
          hover: { 
            scale: intensityValues.scale,
            filter: 'brightness(1.2)',
            boxShadow: `0 0 ${intensityValues.lift}px ${glowColor}${Math.floor(intensityValues.glow * 255).toString(16)}, 0 0 ${intensityValues.lift * 2}px ${glowColor}${Math.floor(intensityValues.glow * 128).toString(16)}`
          }
        };

      case 'tilt':
        return {
          rest: { 
            rotateX: 0, 
            rotateY: 0, 
            scale: 1,
            transformPerspective: 1000
          },
          hover: { 
            rotateX: intensityValues.rotation, 
            rotateY: intensityValues.rotation, 
            scale: intensityValues.scale,
            transformPerspective: 1000
          }
        };

      case 'package-flip':
        return {
          rest: { 
            rotateY: 0, 
            scale: 1,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d'
          },
          hover: { 
            rotateY: 180, 
            scale: intensityValues.scale,
            transformPerspective: 1000,
            transformStyle: 'preserve-3d'
          }
        };

      case 'coffee-steam':
      default:
        return {
          rest: { 
            y: 0, 
            scale: 1,
            filter: 'brightness(1)'
          },
          hover: { 
            y: -intensityValues.lift, 
            scale: intensityValues.scale,
            filter: 'brightness(1.1)'
          }
        };
    }
  };

  const variants = getHoverVariants();

  const handleHoverStart = () => {
    if (!shouldAnimate) return;

    if (hoverType === 'coffee-steam') {
      createSteamEffect();
    }

    if (hoverType === 'glow' && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: intensityValues.glow,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleHoverEnd = () => {
    if (!shouldAnimate) return;

    if (hoverType === 'glow' && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={`relative ${className}`}
      variants={variants}
      initial="rest"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      transition={{
        duration: config.duration * 0.5,
        ease: "easeOut"
      }}
    >
      {/* Glow Effect */}
      {hoverType === 'glow' && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)`,
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />
      )}

      {/* Steam Effect Container */}
      {hoverType === 'coffee-steam' && (
        <div
          ref={steamRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        />
      )}

      {/* Package Flip Back Side */}
      {hoverType === 'package-flip' && (
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-coffee-warm to-coffee-light rounded-lg flex items-center justify-center">
          <div className="text-center text-cream p-4">
            <div className="text-2xl mb-2">☕</div>
            <div className="text-sm font-semibold">Premium Quality</div>
            <div className="text-xs opacity-80">Ethically Sourced</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={hoverType === 'package-flip' ? 'backface-hidden' : ''}>
        {children}
      </div>

      {/* Ripple Effect on Hover */}
      {(hoverType === 'lift' || hoverType === 'coffee-steam') && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: [0, 1.2, 1.5], 
            opacity: [0, 0.1, 0] 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default EnhancedHover;