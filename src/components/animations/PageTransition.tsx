"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const steamTrailRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Coffee beans falling animation for page load
  useEffect(() => {
    if (!containerRef.current) return;

    const createFallingBeans = () => {
      const container = containerRef.current;
      if (!container) return;

      // Create coffee beans
      for (let i = 0; i < 12; i++) {
        const bean = document.createElement('div');
        bean.className = 'coffee-bean-fall';
        bean.style.cssText = `
          position: fixed;
          width: 12px;
          height: 16px;
          background: linear-gradient(45deg, #8B4513, #654321);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          z-index: 9999;
          pointer-events: none;
          left: ${Math.random() * window.innerWidth}px;
          top: -20px;
        `;
        
        // Add coffee bean line
        const line = document.createElement('div');
        line.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 10px;
          background: #654321;
          border-radius: 2px;
          transform: translate(-50%, -50%);
        `;
        bean.appendChild(line);
        container.appendChild(bean);

        // Animate bean falling
        gsap.to(bean, {
          y: window.innerHeight + 50,
          rotation: 360 * 3,
          duration: 2 + Math.random() * 2,
          delay: i * 0.1,
          ease: "power2.in",
          onComplete: () => {
            // Form logo effect
            gsap.to(bean, {
              x: window.innerWidth / 2 - 6,
              y: window.innerHeight / 2 - 8,
              scale: 0.5,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(bean, {
                  opacity: 0,
                  scale: 0,
                  duration: 0.5,
                  onComplete: () => bean.remove()
                });
              }
            });
          }
        });
      }
    };

    // Trigger on initial load
    const timer = setTimeout(createFallingBeans, 500);
    return () => clearTimeout(timer);
  }, []);

  // Steam trail effect for route transitions
  const createSteamTrail = () => {
    if (!steamTrailRef.current) return;

    const steam = steamTrailRef.current;
    steam.innerHTML = '';

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
      `;
      steam.appendChild(particle);

      gsap.fromTo(particle, 
        {
          y: 0,
          opacity: 0.6,
          scale: 1,
        },
        {
          y: -100,
          opacity: 0,
          scale: 2,
          duration: 1.5,
          delay: i * 0.1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        }
      );
    }
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: pathname.includes('products') ? 100 : pathname.includes('about') ? -100 : 0,
      y: pathname.includes('contact') ? 50 : 0,
      scale: 0.95,
    },
    in: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: pathname.includes('products') ? -100 : pathname.includes('about') ? 100 : 0,
      y: pathname.includes('contact') ? -50 : 0,
      scale: 1.05,
    }
  };

  const pageTransition = {
    duration: 0.8
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Steam Trail Effect */}
      <div 
        ref={steamTrailRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ display: isTransitioning ? 'block' : 'none' }}
      />

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => {
          setIsTransitioning(false);
          createSteamTrail();
        }}
      >
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          onAnimationStart={() => setIsTransitioning(true)}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;