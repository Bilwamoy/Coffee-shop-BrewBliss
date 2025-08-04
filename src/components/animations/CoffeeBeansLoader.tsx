"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface CoffeeBeansLoaderProps {
  onComplete: () => void;
  logoText?: string;
}

const CoffeeBeansLoader: React.FC<CoffeeBeansLoaderProps> = ({ 
  onComplete, 
  logoText = "Brew & Bliss" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [beansAnimationComplete, setBeansAnimationComplete] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const container = containerRef.current;
    const logo = logoRef.current;

    // Create coffee beans that will fall and form the logo
    const createCoffeeBeans = () => {
      const beanCount = 25;
      const beans: HTMLElement[] = [];
      
      // Logo formation positions (rough letter shapes)
      const logoPositions = [
        // B
        { x: 200, y: 300 }, { x: 200, y: 320 }, { x: 200, y: 340 }, { x: 200, y: 360 }, { x: 200, y: 380 },
        { x: 220, y: 300 }, { x: 240, y: 300 }, { x: 220, y: 340 }, { x: 240, y: 340 }, { x: 220, y: 380 }, { x: 240, y: 380 },
        // &
        { x: 280, y: 320 }, { x: 300, y: 300 }, { x: 320, y: 320 }, { x: 300, y: 340 }, { x: 280, y: 360 }, { x: 320, y: 360 },
        // B
        { x: 360, y: 300 }, { x: 360, y: 320 }, { x: 360, y: 340 }, { x: 360, y: 360 }, { x: 360, y: 380 },
        { x: 380, y: 300 }, { x: 400, y: 300 }, { x: 380, y: 340 }, { x: 400, y: 340 }, { x: 380, y: 380 }
      ];

      for (let i = 0; i < beanCount; i++) {
        const bean = document.createElement('div');
        bean.className = 'coffee-bean-fall';
        
        // Coffee bean styling
        bean.style.cssText = `
          position: absolute;
          width: 8px;
          height: 12px;
          background: linear-gradient(45deg, #8B4513, #654321, #4A2C2A);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          left: ${Math.random() * window.innerWidth}px;
          top: -20px;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        
        // Add coffee bean crack line
        const crack = document.createElement('div');
        crack.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 8px;
          background: #2D1810;
          border-radius: 1px;
          transform: translate(-50%, -50%);
        `;
        bean.appendChild(crack);
        
        container.appendChild(bean);
        beans.push(bean);
      }

      return beans;
    };

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setBeansAnimationComplete(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    });

    // Create and animate coffee beans
    const beans = createCoffeeBeans();
    const logoPositions = [
      // Simplified positions for logo formation
      { x: 250, y: 350 }, { x: 270, y: 350 }, { x: 290, y: 350 }, { x: 310, y: 350 }, { x: 330, y: 350 },
      { x: 350, y: 350 }, { x: 370, y: 350 }, { x: 390, y: 350 }, { x: 410, y: 350 }, { x: 430, y: 350 },
      { x: 240, y: 330 }, { x: 260, y: 330 }, { x: 280, y: 330 }, { x: 300, y: 330 }, { x: 320, y: 330 },
      { x: 340, y: 330 }, { x: 360, y: 330 }, { x: 380, y: 330 }, { x: 400, y: 330 }, { x: 420, y: 330 },
      { x: 260, y: 370 }, { x: 280, y: 370 }, { x: 300, y: 370 }, { x: 320, y: 370 }, { x: 340, y: 370 }
    ];

    // Phase 1: Beans fall from top
    tl.to(beans, {
      y: window.innerHeight * 0.6,
      rotation: 720,
      duration: 2,
      ease: "bounce.out",
      stagger: 0.1,
    })
    // Phase 2: Beans move to form logo shape
    .to(beans, {
      x: (index) => logoPositions[index % logoPositions.length]?.x || 300,
      y: (index) => logoPositions[index % logoPositions.length]?.y || 350,
      scale: 1.5,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.05,
    }, "-=0.5")
    // Phase 3: Beans glow and form text
    .to(beans, {
      boxShadow: "0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.6)",
      scale: 2,
      duration: 0.8,
      ease: "power2.out",
    })
    // Phase 4: Fade out beans and show logo text
    .to(beans, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.in",
    })
    .to(logo, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=0.3");

    return () => {
      // Cleanup
      beans.forEach(bean => bean.remove());
    };
  }, [onComplete, logoText]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm overflow-hidden"
    >
      {/* Logo Text */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 scale-0"
      >
        <div className="text-center">
          <h1 className="font-heading text-6xl md:text-8xl text-cream mb-4 drop-shadow-2xl">
            {logoText}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
          <p className="font-body text-beige-warm text-xl mt-4">Premium Coffee Experience</p>
        </div>
      </div>

      {/* Steam effect */}
      {beansAnimationComplete && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: [50, -100, -200],
                scale: [1, 2, 3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
              className="absolute w-2 h-8 bg-white/30 rounded-full blur-sm"
              style={{ 
                left: `${45 + index * 2}%`,
                bottom: '40%'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CoffeeBeansLoader;