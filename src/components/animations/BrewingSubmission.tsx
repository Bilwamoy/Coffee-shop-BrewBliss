"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface BrewingSubmissionProps {
  isSubmitting: boolean;
  onComplete?: () => void;
  brewingText?: string;
  successText?: string;
  className?: string;
}

const BrewingSubmission: React.FC<BrewingSubmissionProps> = ({
  isSubmitting,
  onComplete,
  brewingText = "Brewing your message...",
  successText = "Message sent successfully!",
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coffeeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const dripsRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();
  const [brewingStage, setBrewingStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const brewingStages = [
    "Grinding beans...",
    "Heating water...",
    "Brewing coffee...",
    "Adding final touches...",
    "Perfect brew ready!"
  ];

  useEffect(() => {
    if (!isSubmitting || !shouldAnimate) return;

    setIsComplete(false);
    setBrewingStage(0);

    const stageInterval = setInterval(() => {
      setBrewingStage(prev => {
        if (prev < brewingStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stageInterval);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 1000);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(stageInterval);
  }, [isSubmitting, shouldAnimate, onComplete]);

  useEffect(() => {
    if (!containerRef.current || !isSubmitting || !shouldAnimate) return;

    const container = containerRef.current;
    const coffee = coffeeRef.current;
    const steam = steamRef.current;
    const drips = dripsRef.current;

    // Coffee brewing animation
    if (coffee) {
      gsap.fromTo(coffee, 
        { height: '0%' },
        { 
          height: '80%', 
          duration: config.duration * 3,
          ease: "power2.inOut"
        }
      );
    }

    // Steam animation
    const createSteam = () => {
      if (!steam) return;

      const particleCount = config.enableParticles ? config.particleCount : 2;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 3px;
          height: 6px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          left: ${45 + Math.random() * 10}%;
          bottom: 0;
          pointer-events: none;
        `;
        
        steam.appendChild(particle);

        gsap.to(particle, {
          y: -40,
          x: Math.random() * 15 - 7.5,
          opacity: 0,
          scale: Math.random() * 2 + 1,
          duration: 2,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        });
      }
    };

    // Coffee drips animation
    const createDrips = () => {
      if (!drips) return;

      for (let i = 0; i < 3; i++) {
        const drip = document.createElement('div');
        drip.style.cssText = `
          position: absolute;
          width: 2px;
          height: 8px;
          background: linear-gradient(to bottom, #8B4513, #654321);
          border-radius: 50%;
          left: ${40 + Math.random() * 20}%;
          top: 0;
          pointer-events: none;
        `;
        
        drips.appendChild(drip);

        gsap.to(drip, {
          y: 100,
          duration: 1.5,
          delay: i * 0.3,
          ease: "power2.in",
          onComplete: () => drip.remove(),
        });
      }
    };

    // Start animations
    const steamInterval = setInterval(createSteam, 400);
    const dripsInterval = setInterval(createDrips, 600);

    // Cleanup
    setTimeout(() => {
      clearInterval(steamInterval);
      clearInterval(dripsInterval);
    }, config.duration * 3000);

    return () => {
      clearInterval(steamInterval);
      clearInterval(dripsInterval);
    };
  }, [isSubmitting, shouldAnimate, config]);

  if (!isSubmitting && !isComplete) return null;

  return (
    <AnimatePresence>
      {(isSubmitting || isComplete) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-coffee-dark/80 backdrop-blur-sm ${className}`}
        >
          <div ref={containerRef} className="relative">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-morphism p-8 rounded-3xl text-center max-w-md mx-auto"
            >
              {!isComplete ? (
                <>
                  {/* Coffee Brewing Animation */}
                  <div className="relative w-32 h-40 mx-auto mb-6">
                    {/* Coffee Maker */}
                    <div className="absolute inset-0 bg-gradient-to-b from-coffee-light to-coffee-medium rounded-t-2xl border-4 border-coffee-dark">
                      {/* Coffee Drips */}
                      <div ref={dripsRef} className="absolute top-4 left-0 right-0 h-8" />
                      
                      {/* Coffee Fill */}
                      <div
                        ref={coffeeRef}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-coffee-dark to-coffee-medium rounded-b-2xl"
                        style={{ height: '0%' }}
                      >
                        {/* Coffee Surface */}
                        <div className="absolute top-1 left-1 right-1 h-2 bg-coffee-medium/60 rounded-full" />
                      </div>
                    </div>

                    {/* Coffee Maker Handle */}
                    <div className="absolute -right-8 top-1/3 w-8 h-12 border-4 border-coffee-dark rounded-r-full" />

                    {/* Steam */}
                    <div ref={steamRef} className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-8" />

                    {/* Base */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-3 bg-coffee-dark rounded-full opacity-30" />
                  </div>

                  {/* Brewing Text */}
                  <motion.h3
                    key={brewingStage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-heading text-2xl text-cream mb-4"
                  >
                    {brewingStages[brewingStage]}
                  </motion.h3>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-coffee-medium/30 rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${((brewingStage + 1) / brewingStages.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
                    />
                  </div>

                  {/* Brewing Details */}
                  <p className="font-body text-beige-warm text-sm">
                    {brewingText}
                  </p>

                  {/* Animated Coffee Beans */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(4)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          x: Math.random() * 300,
                          y: 400,
                          opacity: 0,
                          rotation: 0,
                        }}
                        animate={{
                          y: -50,
                          opacity: [0, 0.6, 0],
                          rotation: 360,
                          scale: [0.5, 1, 1.5],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.7,
                          ease: "easeOut"
                        }}
                        className="absolute w-2 h-3 bg-gradient-to-br from-coffee-light to-coffee-dark"
                        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
                      >
                        <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                      className="text-4xl text-white"
                    >
                      ✓
                    </motion.span>
                  </div>
                  
                  <h3 className="font-heading text-2xl text-cream mb-4">
                    Perfect Brew!
                  </h3>
                  
                  <p className="font-body text-beige-warm">
                    {successText}
                  </p>

                  {/* Success Confetti */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ 
                          x: '50%',
                          y: '50%',
                          scale: 0,
                          opacity: 1,
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                          rotate: Math.random() * 360,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        className="absolute w-2 h-2 bg-accent rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BrewingSubmission;