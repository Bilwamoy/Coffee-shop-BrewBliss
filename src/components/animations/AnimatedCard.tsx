"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'flip' | 'lift' | 'brew' | 'splash';
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  animationType = 'lift',
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const glow = glowRef.current;

    // Enhanced hover animations based on type
    const handleMouseEnter = () => {
      switch (animationType) {
        case 'flip':
          gsap.to(card, {
            rotationY: 10,
            rotationX: 5,
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out",
            transformOrigin: "center center",
          });
          break;

        case 'lift':
          gsap.to(card, {
            y: -15,
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          });
          if (glow) {
            gsap.to(glow, {
              opacity: 0.6,
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
          break;

        case 'brew':
          gsap.to(card, {
            scale: 1.05,
            filter: 'brightness(1.1) saturate(1.2)',
            duration: 0.5,
            ease: "power2.out",
          });
          // Create brewing bubbles
          for (let i = 0; i < 3; i++) {
            const bubble = document.createElement('div');
            bubble.style.cssText = `
              position: absolute;
              width: 4px;
              height: 4px;
              background: rgba(139, 69, 19, 0.6);
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              bottom: 0;
              pointer-events: none;
            `;
            card.appendChild(bubble);

            gsap.to(bubble, {
              y: -50,
              opacity: 0,
              scale: 2,
              duration: 1.5,
              delay: i * 0.2,
              ease: "power2.out",
              onComplete: () => bubble.remove(),
            });
          }
          break;

        case 'splash':
          gsap.to(card, {
            scale: 1.08,
            rotation: 2,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
          // Create splash effect
          const splash = document.createElement('div');
          splash.style.cssText = `
            position: absolute;
            inset: -10px;
            background: radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
          `;
          card.appendChild(splash);
          
          gsap.to(splash, {
            opacity: 1,
            scale: 1.5,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(splash, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => splash.remove(),
              });
            }
          });
          break;
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotation: 0,
        rotationY: 0,
        rotationX: 0,
        filter: 'brightness(1) saturate(1)',
        duration: 0.4,
        ease: "power2.out",
      });
      
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animationType]);

  // Card variants for different animation types
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: animationType === 'flip' ? 0 : 50,
      rotationY: animationType === 'flip' ? -90 : 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotationY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`relative ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Glow effect for lift animation */}
      {animationType === 'lift' && (
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-coffee-warm/20 to-accent/20 rounded-2xl blur-xl opacity-0 -z-10"
          style={{ transform: 'translateZ(-1px)' }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export default AnimatedCard;