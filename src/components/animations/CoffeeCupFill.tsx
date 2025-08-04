"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

interface CoffeeCupFillProps {
  className?: string;
  fillPercentage?: number;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

const CoffeeCupFill: React.FC<CoffeeCupFillProps> = ({ 
  className = '',
  fillPercentage = 80,
  size = 'medium',
  animated = true
}) => {
  const cupRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-20';
      case 'large':
        return 'w-32 h-40';
      default:
        return 'w-24 h-30';
    }
  };

  useEffect(() => {
    if (!cupRef.current || !fillRef.current || !animated || !ScrollTrigger) return;

    const cup = cupRef.current;
    const fill = fillRef.current;
    const steam = steamRef.current;

    // Set initial state
    gsap.set(fill, { height: '0%', opacity: 0 });

    // Coffee fill animation
    const fillAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: cup,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      }
    });

    fillAnimation
      .to(fill, {
        height: `${fillPercentage}%`,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(fill, {
        background: 'linear-gradient(to top, #1a0f0a, #2d1810, #4a2c2a)',
        duration: 0.5,
        ease: "power2.out",
      }, "-=1");

    // Steam animation
    if (steam) {
      const createSteamParticle = () => {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          left: ${45 + Math.random() * 10}%;
          bottom: 0;
          pointer-events: none;
        `;
        steam.appendChild(particle);

        gsap.to(particle, {
          y: -30,
          x: Math.random() * 10 - 5,
          opacity: 0,
          scale: 2,
          duration: 2,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        });
      };

      ScrollTrigger.create({
        trigger: cup,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          const steamInterval = setInterval(createSteamParticle, 400);
          setTimeout(() => clearInterval(steamInterval), 4000);
        }
      });
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [fillPercentage, animated]);

  return (
    <div className={`coffee-cup-fill relative ${getSizeClasses()} ${className}`}>
      <div ref={cupRef} className="relative w-full h-full">
        {/* Cup Body */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-beige-warm rounded-b-3xl border-4 border-coffee-light overflow-hidden shadow-lg">
          {/* Coffee Fill */}
          <div
            ref={fillRef}
            className="coffee-fill absolute bottom-0 left-0 right-0 bg-gradient-to-t from-coffee-dark to-coffee-medium rounded-b-3xl"
            style={{ height: animated ? '0%' : `${fillPercentage}%` }}
          >
            {/* Coffee Surface */}
            <div className="absolute top-1 left-1 right-1 h-2 bg-coffee-medium/60 rounded-full opacity-80" />
            
            {/* Coffee Foam */}
            <div className="absolute top-0 left-2 right-2 h-1 bg-cream/40 rounded-full blur-sm" />
          </div>
          
          {/* Cup Rim Highlight */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-cream/60 to-transparent rounded-t-3xl" />
        </div>

        {/* Cup Handle */}
        <div className="absolute -right-6 top-1/3 w-6 h-8 border-4 border-coffee-light rounded-r-full bg-transparent" />

        {/* Steam */}
        {animated && (
          <div ref={steamRef} className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-6" />
        )}

        {/* Cup Base Shadow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-coffee-dark/20 rounded-full blur-sm" />
      </div>

      {/* Decorative Coffee Beans */}
      <div className="absolute -top-2 -left-2 w-3 h-4 bg-gradient-to-br from-coffee-light to-coffee-dark opacity-60 transform rotate-12"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      >
        <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      
      <div className="absolute -bottom-1 -right-3 w-2 h-3 bg-gradient-to-br from-coffee-light to-coffee-dark opacity-40 transform -rotate-45"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      >
        <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
    </div>
  );
};

export default CoffeeCupFill;