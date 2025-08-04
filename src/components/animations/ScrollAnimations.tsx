"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();

  useEffect(() => {
    if (!containerRef.current || !ScrollTrigger || !shouldAnimate) return;

    const container = containerRef.current;

    // Brew/Percolate effect for elements
    const brewElements = container.querySelectorAll('.brew-in');
    brewElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: config.duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Coffee cup fill animation
    const cupElements = container.querySelectorAll('.coffee-cup-fill');
    cupElements.forEach((element) => {
      const fillElement = element.querySelector('.coffee-fill');
      if (fillElement) {
        gsap.fromTo(fillElement,
          {
            height: '0%',
            opacity: 0,
          },
          {
            height: '80%',
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Liquid pour effect between sections
    const sectionDividers = container.querySelectorAll('.liquid-pour');
    sectionDividers.forEach((divider) => {
      const liquidPath = divider.querySelector('.liquid-path');
      if (liquidPath) {
        gsap.fromTo(liquidPath,
          {
            strokeDasharray: "0 1000",
          },
          {
            strokeDasharray: "1000 0",
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Typewriter effect for headings
    const typewriterElements = container.querySelectorAll('.typewriter');
    typewriterElements.forEach((element) => {
      const text = element.textContent || '';
      element.textContent = '';
      
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => {
          let i = 0;
          const typeInterval = setInterval(() => {
            element.textContent = text.slice(0, i + 1);
            i++;
            if (i >= text.length) {
              clearInterval(typeInterval);
            }
          }, 50);
        },
        onLeave: () => {
          element.textContent = text;
        },
        onEnterBack: () => {
          element.textContent = text;
        }
      });
    });

    // Word-by-word reveal for paragraphs
    const wordRevealElements = container.querySelectorAll('.word-reveal');
    wordRevealElements.forEach((element) => {
      const text = element.textContent || '';
      const words = text.split(' ');
      element.innerHTML = words.map(word => `<span class="word-span" style="opacity: 0;">${word}</span>`).join(' ');
      
      const wordSpans = element.querySelectorAll('.word-span');
      
      gsap.to(wordSpans, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Coffee splash effect for images
    const splashElements = container.querySelectorAll('.coffee-splash');
    splashElements.forEach((element) => {
      gsap.fromTo(element,
        {
          scale: 0.5,
          rotation: -180,
          opacity: 0,
          filter: 'blur(20px)',
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Steam dissolve transition
    const steamDissolveElements = container.querySelectorAll('.steam-dissolve');
    steamDissolveElements.forEach((element) => {
      // Create steam particles
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle-dissolve';
        particle.style.cssText = `
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: 100%;
          pointer-events: none;
        `;
        element.appendChild(particle);
      }

      gsap.fromTo(element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              const particles = element.querySelectorAll('.steam-particle-dissolve');
              particles.forEach((particle: any, index: number) => {
                gsap.to(particle, {
                  y: -50,
                  opacity: 0,
                  scale: 2,
                  duration: 2,
                  delay: index * 0.2,
                  ease: "power2.out",
                });
              });
            }
          },
        }
      );
    });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-animations-container">
      {children}
    </div>
  );
};

export default ScrollAnimations;