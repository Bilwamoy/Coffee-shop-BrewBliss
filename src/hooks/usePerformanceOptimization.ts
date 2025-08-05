"use client";

import { useEffect, useState } from 'react';

interface PerformanceSettings {
  isMobile: boolean;
  isLowPowerMode: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
  deviceMemory: number;
  shouldReduceAnimations: boolean;
  animationQuality: 'high' | 'medium' | 'low';
}

export const usePerformanceOptimization = (): PerformanceSettings => {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isMobile: false,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    connectionSpeed: 'unknown',
    deviceMemory: 4,
    shouldReduceAnimations: false,
    animationQuality: 'high',
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    const detectPerformanceSettings = () => {
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Detect connection speed
      let connectionSpeed: 'slow' | 'fast' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          connectionSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
        }
      }

      // Detect device memory (if available)
      let deviceMemory = 4; // Default assumption
      if ('deviceMemory' in navigator) {
        deviceMemory = (navigator as any).deviceMemory || 4;
      }

      // Detect low power mode (battery API)
      let isLowPowerMode = false;
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          isLowPowerMode = battery.level < 0.2 || battery.charging === false;
        }).catch(() => {
          // Battery API not supported or blocked
        });
      }

      // Determine if animations should be reduced
      const shouldReduceAnimations = 
        prefersReducedMotion || 
        connectionSpeed === 'slow' || 
        deviceMemory < 2 || 
        isLowPowerMode;

      // Determine animation quality
      let animationQuality: 'high' | 'medium' | 'low' = 'high';
      if (shouldReduceAnimations || deviceMemory < 2) {
        animationQuality = 'low';
      } else if (isMobile || connectionSpeed === 'slow' || deviceMemory < 4) {
        animationQuality = 'medium';
      }

      setSettings({
        isMobile,
        isLowPowerMode,
        prefersReducedMotion,
        connectionSpeed,
        deviceMemory,
        shouldReduceAnimations,
        animationQuality,
      });
    };

    detectPerformanceSettings();

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => detectPerformanceSettings();
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Listen for orientation changes (mobile)
    window.addEventListener('orientationchange', detectPerformanceSettings);
    window.addEventListener('resize', detectPerformanceSettings);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener('orientationchange', detectPerformanceSettings);
      window.removeEventListener('resize', detectPerformanceSettings);
    };
  }, [isClient]);

  return settings;
};

// Hook for getting optimized animation settings
export const useOptimizedAnimations = () => {
  const performance = usePerformanceOptimization();

  const getAnimationConfig = () => {
    switch (performance.animationQuality) {
      case 'low':
        return {
          duration: 0.3,
          staggerDelay: 0.05,
          particleCount: 2,
          blurAmount: 2,
          enableParticles: false,
          enableComplexAnimations: false,
        };
      case 'medium':
        return {
          duration: 0.6,
          staggerDelay: 0.1,
          particleCount: 4,
          blurAmount: 5,
          enableParticles: true,
          enableComplexAnimations: false,
        };
      default: // high
        return {
          duration: 1.2,
          staggerDelay: 0.15,
          particleCount: 8,
          blurAmount: 10,
          enableParticles: true,
          enableComplexAnimations: true,
        };
    }
  };

  const shouldAnimate = !performance.shouldReduceAnimations;
  const config = getAnimationConfig();

  return {
    shouldAnimate,
    config,
    performance,
  };
};

// Progressive enhancement hook
export const useProgressiveEnhancement = () => {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const performance = usePerformanceOptimization();

  useEffect(() => {
    // Enable enhancements after initial load for better performance
    const timer = setTimeout(() => {
      if (!performance.shouldReduceAnimations) {
        setIsEnhanced(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [performance.shouldReduceAnimations]);

  return {
    isEnhanced,
    canUseAdvancedAnimations: isEnhanced && !performance.shouldReduceAnimations,
    canUseParticles: isEnhanced && performance.animationQuality !== 'low',
    canUseComplexTransitions: isEnhanced && performance.animationQuality === 'high',
  };
};