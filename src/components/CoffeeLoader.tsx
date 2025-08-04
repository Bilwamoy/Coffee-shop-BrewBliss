"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface CoffeeLoaderProps {
  isVisible: boolean;
  message?: string;
}

const CoffeeLoader: React.FC<CoffeeLoaderProps> = ({ 
  isVisible, 
  message = "Brewing your experience..." 
}) => {
  const cupRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const beansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !cupRef.current || !steamRef.current || !beansRef.current) return;

    // Coffee cup animation
    gsap.to(cupRef.current, {
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Steam animation
    const steamParticles = steamRef.current.children;
    Array.from(steamParticles).forEach((particle, index) => {
      gsap.to(particle, {
        y: -30,
        opacity: 0,
        scale: 1.5,
        duration: 2,
        repeat: -1,
        delay: index * 0.3,
        ease: "power2.out"
      });
    });

    // Coffee beans rotation
    const beans = beansRef.current.children;
    Array.from(beans).forEach((bean, index) => {
      gsap.to(bean, {
        rotation: 360,
        duration: 3 + index * 0.5,
        repeat: -1,
        ease: "none"
      });
    });

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm"
    >
      <div className="text-center">
        {/* Coffee Cup with Steam */}
        <div className="relative mb-8">
          <div ref={cupRef} className="relative">
            {/* Coffee Cup */}
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full bg-gradient-to-b from-coffee-light to-coffee-warm rounded-b-full border-4 border-cream relative">
                {/* Coffee liquid */}
                <div className="absolute top-2 left-2 right-2 h-16 bg-gradient-to-b from-coffee-dark to-coffee-medium rounded-b-full">
                  <div className="absolute top-1 left-1 right-1 h-2 bg-coffee-medium rounded-full opacity-60" />
                </div>
                {/* Cup handle */}
                <div className="absolute -right-6 top-4 w-6 h-8 border-4 border-cream rounded-r-full" />
              </div>
            </div>
          </div>

          {/* Steam */}
          <div ref={steamRef} className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-8 bg-white/60 rounded-full blur-sm" />
            <div className="w-1 h-6 bg-white/40 rounded-full blur-sm ml-2 -mt-6" />
            <div className="w-1 h-4 bg-white/30 rounded-full blur-sm ml-4 -mt-4" />
          </div>
        </div>

        {/* Rotating Coffee Beans */}
        <div ref={beansRef} className="flex justify-center space-x-4 mb-8">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-3 h-4 bg-gradient-to-br from-coffee-light to-coffee-dark rounded-full relative"
              style={{ 
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-body text-cream text-lg mb-4"
        >
          {message}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-coffee-medium rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
          />
        </div>

        {/* Floating Coffee Aroma */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                opacity: 0
              }}
              animate={{
                y: -50,
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 1.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 1,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 bg-coffee-light rounded-full blur-sm"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CoffeeLoader;