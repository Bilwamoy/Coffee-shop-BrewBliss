"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface BrewingLoaderProps {
  isVisible: boolean;
  progress?: number;
  message?: string;
  onComplete?: () => void;
}

const BrewingLoader: React.FC<BrewingLoaderProps> = ({ 
  isVisible, 
  progress = 0, 
  message = "Brewing your request...",
  onComplete 
}) => {
  const coffeeRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const dripsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !coffeeRef.current || !steamRef.current || !dripsRef.current) return;

    const coffee = coffeeRef.current;
    const steam = steamRef.current;
    const drips = dripsRef.current;

    // Coffee brewing animation
    gsap.to(coffee, {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Steam animation
    const createSteam = () => {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        left: ${45 + Math.random() * 10}%;
        bottom: 0;
        pointer-events: none;
      `;
      steam.appendChild(particle);

      gsap.to(particle, {
        y: -60,
        x: Math.random() * 20 - 10,
        opacity: 0,
        scale: 2,
        duration: 2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    };

    const steamInterval = setInterval(createSteam, 300);

    // Coffee drips animation
    const createDrip = () => {
      const drip = document.createElement('div');
      drip.style.cssText = `
        position: absolute;
        width: 2px;
        height: 8px;
        background: linear-gradient(to bottom, #8B4513, #654321);
        border-radius: 0 0 50% 50%;
        left: ${48 + Math.random() * 4}%;
        top: 60%;
        pointer-events: none;
      `;
      drips.appendChild(drip);

      gsap.to(drip, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => drip.remove(),
      });
    };

    const dripInterval = setInterval(createDrip, 800);

    return () => {
      clearInterval(steamInterval);
      clearInterval(dripInterval);
    };
  }, [isVisible]);

  // Update progress bar
  useEffect(() => {
    if (!progressRef.current) return;
    
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out",
    });

    if (progress >= 100 && onComplete) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-coffee-dark/95 via-coffee-medium/95 to-coffee-warm/95 backdrop-blur-sm"
    >
      <div className="text-center">
        {/* Coffee Brewing Setup */}
        <div className="relative mb-8">
          {/* Coffee Filter/Dripper */}
          <div className="relative mx-auto w-32 h-20">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-16 border-4 border-coffee-light rounded-b-full bg-gradient-to-b from-transparent to-coffee-medium/20">
              {/* Filter paper */}
              <div className="absolute inset-2 border-2 border-cream/30 rounded-b-full bg-cream/10" />
            </div>
            
            {/* Steam */}
            <div ref={steamRef} className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8" />
            
            {/* Coffee drips */}
            <div ref={dripsRef} className="absolute top-0 left-0 w-full h-full" />
          </div>

          {/* Coffee Cup */}
          <div ref={coffeeRef} className="relative mx-auto w-20 h-20 mt-4">
            <div className="w-full h-full bg-gradient-to-b from-cream to-beige-warm rounded-b-full border-4 border-coffee-light relative overflow-hidden">
              {/* Coffee liquid */}
              <div className="absolute bottom-0 left-2 right-2 bg-gradient-to-t from-coffee-dark to-coffee-medium rounded-b-full transition-all duration-500"
                style={{ height: `${Math.min(progress, 80)}%` }}
              >
                <div className="absolute top-1 left-1 right-1 h-2 bg-coffee-medium/60 rounded-full" />
              </div>
              
              {/* Cup handle */}
              <div className="absolute -right-6 top-4 w-6 h-8 border-4 border-coffee-light rounded-r-full" />
            </div>
          </div>
        </div>

        {/* Brewing Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-body text-cream text-lg mb-6"
        >
          {message}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-3 bg-coffee-medium/30 rounded-full overflow-hidden mx-auto mb-4">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-500"
            style={{ width: '0%' }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="font-body text-beige-warm text-sm"
        >
          {Math.round(progress)}% Complete
        </motion.p>

        {/* Floating Coffee Beans */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                y: -50,
                opacity: [0, 0.6, 0],
                rotate: 360,
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: index * 1,
                ease: "easeOut"
              }}
              className="absolute w-3 h-4 bg-gradient-to-br from-coffee-light to-coffee-dark rounded-full"
              style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
            >
              <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BrewingLoader;