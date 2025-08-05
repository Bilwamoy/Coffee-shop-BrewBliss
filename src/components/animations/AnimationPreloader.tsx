"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimationPreloaderProps {
  onComplete: () => void;
}

const AnimationPreloader: React.FC<AnimationPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Preparing animations...');

  useEffect(() => {
    const stages = [
      'Preparing animations...',
      'Loading GSAP libraries...',
      'Initializing coffee particles...',
      'Setting up scroll triggers...',
      'Brewing the perfect experience...',
      'Almost ready...'
    ];

    let currentStage = 0;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update loading stage based on progress
        const stageIndex = Math.floor((newProgress / 100) * stages.length);
        if (stageIndex !== currentStage && stageIndex < stages.length) {
          currentStage = stageIndex;
          setLoadingStage(stages[stageIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    // Preload critical animation assets
    const preloadAssets = async () => {
      try {
        // Preload GSAP if not already loaded
        if (typeof window !== 'undefined' && !window.gsap) {
          await import('gsap');
          await import('gsap/ScrollTrigger');
        }
        
        // Preload any critical images or assets
        const imagePromises = [
          '/images/coffee-bean.svg',
          '/images/steam.svg',
        ].map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Don't fail if image doesn't exist
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
      } catch (error) {
        console.log('Some assets failed to preload, continuing anyway');
      }
    };

    preloadAssets();

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm"
    >
      <div className="text-center">
        {/* Animated Coffee Cup */}
        <div className="relative mb-8">
          <div className="w-24 h-30 mx-auto relative">
            {/* Cup */}
            <div className="absolute inset-0 bg-gradient-to-b from-cream to-beige-warm rounded-b-3xl border-4 border-coffee-light overflow-hidden">
              {/* Coffee Fill Animation */}
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-coffee-dark to-coffee-medium rounded-b-3xl"
              >
                <div className="absolute top-1 left-1 right-1 h-2 bg-coffee-medium/60 rounded-full" />
              </motion.div>
            </div>
            
            {/* Cup Handle */}
            <div className="absolute -right-6 top-1/3 w-6 h-8 border-4 border-coffee-light rounded-r-full" />
            
            {/* Steam Animation */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    y: [-10, -30, -50],
                    scale: [1, 1.5, 2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute w-1 h-4 bg-white/40 rounded-full blur-sm"
                  style={{ left: `${index * 8}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-2xl text-cream mb-4"
        >
          Brewing Your Experience
        </motion.h2>

        {/* Loading Stage */}
        <motion.p
          key={loadingStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-body text-beige-warm mb-6"
        >
          {loadingStage}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-coffee-medium/30 rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full"
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-body text-beige-warm/80 text-sm"
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Floating Coffee Beans */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, index) => (
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
                opacity: [0, 0.4, 0],
                rotate: 360,
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: index * 1,
                ease: "easeOut"
              }}
              className="absolute w-2 h-3 bg-gradient-to-br from-coffee-light to-coffee-dark"
              style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
            >
              <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimationPreloader;