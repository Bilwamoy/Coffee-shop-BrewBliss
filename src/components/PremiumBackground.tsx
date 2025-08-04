"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

interface PremiumBackgroundProps {
  children: React.ReactNode;
}

const PremiumBackground: React.FC<PremiumBackgroundProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Coffee Bean Particles Animation
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 15;

    // Create coffee bean particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'coffee-bean';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      particlesRef.current.appendChild(particle);
      particles.push(particle);
    }

    // GSAP animation for more complex particle movement
    particles.forEach((particle, index) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      });

      gsap.to(particle, {
        y: -100,
        x: `+=${Math.random() * 200 - 100}`,
        rotation: 360,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        ease: "none",
        delay: index * 2,
      });
    });

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  // Steam Particles Animation
  useEffect(() => {
    if (!steamRef.current) return;

    const createSteamParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'steam-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '0px';
      steamRef.current?.appendChild(particle);

      gsap.fromTo(particle, 
        {
          y: 0,
          opacity: 0.8,
          scale: 1,
        },
        {
          y: -200,
          opacity: 0,
          scale: 2,
          duration: 8,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        }
      );
    };

    const steamInterval = setInterval(createSteamParticle, 2000);

    return () => {
      clearInterval(steamInterval);
    };
  }, []);

  // Mouse tracking for dynamic lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax scrolling effect
  useEffect(() => {
    if (!containerRef.current || !ScrollTrigger) return;

    const parallaxElements = containerRef.current.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.2);
      
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen"
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`,
      } as React.CSSProperties}
    >
      {/* Coffee Bean Particles */}
      <div ref={particlesRef} className="coffee-particles" />
      
      {/* Steam Particles */}
      <div ref={steamRef} className="coffee-particles" />
      
      {/* Parallax Background Layers */}
      <div className="parallax-container">
        <div className="parallax-layer opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/20" />
        </div>
        <div className="parallax-layer opacity-10">
          <div 
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23654321' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PremiumBackground;