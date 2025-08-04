"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface SteamDissolveTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  direction?: 'up' | 'down' | 'center-out';
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

const SteamDissolveTransition: React.FC<SteamDissolveTransitionProps> = ({
  isActive,
  onComplete,
  direction = 'up',
  intensity = 'medium',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();

  const getIntensitySettings = () => {
    switch (intensity) {
      case 'light':
        return { particleCount: 15, duration: 2, opacity: 0.4 };
      case 'heavy':
        return { particleCount: 40, duration: 4, opacity: 0.8 };
      default: // medium
        return { particleCount: 25, duration: 3, opacity: 0.6 };
    }
  };

  useEffect(() => {
    if (!containerRef.current || !isActive || !shouldAnimate) return;

    const container = containerRef.current;
    const settings = getIntensitySettings();
    const particleCount = Math.min(settings.particleCount, config.particleCount * 3);

    // Create steam particles
    const createSteamParticles = () => {
      const particles: HTMLElement[] = [];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = 2 + Math.random() * 6;
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size * 1.5}px;
          background: radial-gradient(circle, rgba(255, 255, 255, ${settings.opacity}) 0%, rgba(255, 255, 255, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          filter: blur(${Math.random() * 2 + 1}px);
        `;

        // Position based on direction
        switch (direction) {
          case 'up':
            particle.style.left = Math.random() * 100 + '%';
            particle.style.bottom = '0%';
            break;
          case 'down':
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '0%';
            break;
          case 'center-out':
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = 'translate(-50%, -50%)';
            break;
        }

        container.appendChild(particle);
        particles.push(particle);
      }

      return particles;
    };

    // Animate steam particles
    const animateParticles = (particles: HTMLElement[]) => {
      particles.forEach((particle, index) => {
        const delay = (index / particles.length) * 0.5;
        
        switch (direction) {
          case 'up':
            gsap.fromTo(particle,
              {
                y: 0,
                opacity: 0,
                scale: 0.5,
              },
              {
                y: -window.innerHeight * 1.2,
                x: (Math.random() - 0.5) * 200,
                opacity: settings.opacity,
                scale: Math.random() * 3 + 1,
                duration: settings.duration,
                delay: delay,
                ease: "power2.out",
                onComplete: () => particle.remove()
              }
            );
            break;

          case 'down':
            gsap.fromTo(particle,
              {
                y: 0,
                opacity: 0,
                scale: 0.5,
              },
              {
                y: window.innerHeight * 1.2,
                x: (Math.random() - 0.5) * 200,
                opacity: settings.opacity,
                scale: Math.random() * 3 + 1,
                duration: settings.duration,
                delay: delay,
                ease: "power2.out",
                onComplete: () => particle.remove()
              }
            );
            break;

          case 'center-out':
            const angle = (index / particles.length) * Math.PI * 2;
            const distance = 300 + Math.random() * 200;
            
            gsap.fromTo(particle,
              {
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              },
              {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: settings.opacity,
                scale: Math.random() * 4 + 1,
                duration: settings.duration,
                delay: delay,
                ease: "power2.out",
                onComplete: () => particle.remove()
              }
            );
            break;
        }
      });
    };

    // Create overlay dissolve effect
    const createOverlayDissolve = () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: radial-gradient(circle, transparent 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.3) 100%);
        pointer-events: none;
      `;
      
      container.appendChild(overlay);

      gsap.fromTo(overlay,
        { opacity: 0 },
        {
          opacity: 1,
          duration: settings.duration * 0.3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onComplete: () => overlay.remove()
        }
      );
    };

    // Start the animation sequence
    const particles = createSteamParticles();
    animateParticles(particles);
    createOverlayDissolve();

    // Complete callback
    setTimeout(() => {
      onComplete?.();
    }, settings.duration * 1000);

  }, [isActive, direction, intensity, shouldAnimate, config, onComplete]);

  if (!isActive) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 pointer-events-none z-40 overflow-hidden ${className}`}
      style={{
        background: direction === 'center-out' 
          ? 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'
          : 'linear-gradient(to top, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
      }}
    >
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0">
        {/* Floating coffee aroma lines */}
        {shouldAnimate && [...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              pathLength: 0,
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              pathLength: 1,
            }}
            transition={{
              duration: 3,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + Math.random() * 60}%`,
              width: '2px',
              height: '40px',
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)',
              borderRadius: '1px',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
          />
        ))}
      </div>

      {/* Subtle glow effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: 0.1 }}
        exit={{ scale: 3, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

export default SteamDissolveTransition;