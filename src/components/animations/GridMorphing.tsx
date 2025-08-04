"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface GridMorphingProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  morphType?: 'splash' | 'wave' | 'spiral' | 'cascade';
  triggerAnimation?: boolean;
}

const GridMorphing: React.FC<GridMorphingProps> = ({
  children,
  columns = 4,
  gap = 8,
  morphType = 'splash',
  triggerAnimation = false
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!gridRef.current || !shouldAnimate || !triggerAnimation) return;

    const grid = gridRef.current;
    const items = Array.from(grid.children) as HTMLElement[];
    
    setIsAnimating(true);

    // Create coffee splash effect
    const createCoffeeSplash = () => {
      if (!splashRef.current) return;

      const splash = splashRef.current;
      const splashCount = config.enableComplexAnimations ? 12 : 6;

      for (let i = 0; i < splashCount; i++) {
        const drop = document.createElement('div');
        drop.style.cssText = `
          position: absolute;
          width: ${4 + Math.random() * 8}px;
          height: ${4 + Math.random() * 8}px;
          background: radial-gradient(circle, #8B4513, #654321);
          border-radius: 50%;
          left: 50%;
          top: 50%;
          pointer-events: none;
          z-index: 10;
        `;
        
        splash.appendChild(drop);

        const angle = (i / splashCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;

        gsap.fromTo(drop, 
          {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
          },
          {
            x: targetX,
            y: targetY,
            scale: Math.random() * 2 + 0.5,
            opacity: 0,
            duration: config.duration * 1.5,
            ease: "power2.out",
            delay: i * 0.05,
            onComplete: () => drop.remove()
          }
        );
      }
    };

    // Grid morphing animations based on type
    const animateGrid = () => {
      switch (morphType) {
        case 'splash':
          // Center-out splash animation
          const centerIndex = Math.floor(items.length / 2);
          items.forEach((item, index) => {
            const distance = Math.abs(index - centerIndex);
            gsap.fromTo(item,
              {
                scale: 0,
                opacity: 0,
                rotation: -180,
                filter: 'blur(10px)',
              },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                filter: 'blur(0px)',
                duration: config.duration,
                delay: distance * config.staggerDelay,
                ease: "back.out(1.7)",
              }
            );
          });
          break;

        case 'wave':
          // Wave-like animation from left to right
          items.forEach((item, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            const delay = (row + col) * config.staggerDelay;
            
            gsap.fromTo(item,
              {
                y: 100,
                opacity: 0,
                rotationX: -90,
              },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: config.duration,
                delay: delay,
                ease: "power3.out",
              }
            );
          });
          break;

        case 'spiral':
          // Spiral animation from center outward
          const centerRow = Math.floor(Math.sqrt(items.length) / 2);
          const centerCol = Math.floor(Math.sqrt(items.length) / 2);
          
          items.forEach((item, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            const distance = Math.sqrt(
              Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
            );
            
            gsap.fromTo(item,
              {
                scale: 0,
                rotation: 360,
                opacity: 0,
              },
              {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: config.duration,
                delay: distance * config.staggerDelay,
                ease: "elastic.out(1, 0.5)",
              }
            );
          });
          break;

        case 'cascade':
        default:
          // Cascade animation from top-left to bottom-right
          items.forEach((item, index) => {
            gsap.fromTo(item,
              {
                y: -50,
                opacity: 0,
                scale: 0.8,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: config.duration,
                delay: index * config.staggerDelay,
                ease: "power2.out",
              }
            );
          });
          break;
      }
    };

    // Start animations
    createCoffeeSplash();
    setTimeout(() => {
      animateGrid();
      setTimeout(() => setIsAnimating(false), config.duration * 1000 + 500);
    }, 200);

  }, [triggerAnimation, morphType, columns, config, shouldAnimate]);

  const gridClasses = `
    grid gap-${gap} 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-${Math.min(columns, 3)} 
    lg:grid-cols-${columns}
  `;

  return (
    <div className="relative">
      {/* Coffee Splash Effect */}
      <div 
        ref={splashRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ 
          display: isAnimating ? 'block' : 'none',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%'
        }}
      />

      {/* Morphing Grid */}
      <motion.div
        ref={gridRef}
        className={gridClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Background Ripple Effect */}
      {isAnimating && morphType === 'splash' && (
        <motion.div
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: config.duration * 2, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 44, 42, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
};

export default GridMorphing;