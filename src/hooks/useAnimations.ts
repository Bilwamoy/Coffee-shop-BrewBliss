"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from './usePerformanceOptimization';

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

interface UseAnimationsOptions {
  reduceMotion?: boolean;
  mobile?: boolean;
}

export const useAnimations = (options: UseAnimationsOptions = {}) => {
  const { reduceMotion = false, mobile = false } = options;
  const { shouldAnimate: optimizedShouldAnimate, config } = useOptimizedAnimations();

  const shouldAnimate = !reduceMotion && optimizedShouldAnimate;

  // Coffee cup fill animation
  const animateCoffeeFill = (element: HTMLElement, progress: number = 80) => {
    if (!shouldAnimate) return;

    const fillElement = element.querySelector('.coffee-fill') as HTMLElement;
    if (!fillElement) return;

    gsap.to(fillElement, {
      height: `${progress}%`,
      duration: config.duration,
      ease: "power2.inOut",
    });
  };

  // Typewriter effect
  const animateTypewriter = (element: HTMLElement, text: string, speed: number = 50) => {
    if (!shouldAnimate) {
      element.textContent = text;
      return;
    }

    element.textContent = '';
    let i = 0;
    const typeInterval = setInterval(() => {
      element.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(typeInterval);
      }
    }, mobile ? speed * 1.5 : speed);

    return () => clearInterval(typeInterval);
  };

  // Word reveal animation
  const animateWordReveal = (element: HTMLElement) => {
    if (!shouldAnimate) return;

    const text = element.textContent || '';
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word-span" style="opacity: 0;">${word}</span>`).join(' ');
    
    const wordSpans = element.querySelectorAll('.word-span');
    
    gsap.to(wordSpans, {
      opacity: 1,
      duration: mobile ? 0.3 : 0.5,
      stagger: mobile ? 0.05 : 0.1,
      ease: "power2.out",
    });
  };

  // Coffee splash effect
  const animateCoffeeSplash = (element: HTMLElement) => {
    if (!shouldAnimate) return;

    gsap.fromTo(element,
      {
        scale: 0.5,
        rotation: mobile ? -90 : -180,
        opacity: 0,
        filter: mobile ? 'blur(5px)' : 'blur(20px)',
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: mobile ? 0.8 : 1.5,
        ease: "back.out(1.7)",
      }
    );
  };

  // Steam effect
  const createSteamEffect = (container: HTMLElement, count: number = 3) => {
    if (!shouldAnimate) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        pointer-events: none;
      `;
      container.appendChild(particle);

      gsap.to(particle, {
        y: mobile ? -30 : -60,
        x: Math.random() * 20 - 10,
        opacity: 0,
        scale: mobile ? 1.5 : 2,
        duration: mobile ? 1 : 2,
        delay: i * 0.2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  // Coffee beans falling animation
  const animateBeansfall = (container: HTMLElement, count: number = 8) => {
    if (!shouldAnimate) return;

    for (let i = 0; i < count; i++) {
      const bean = document.createElement('div');
      bean.style.cssText = `
        position: absolute;
        width: 8px;
        height: 12px;
        background: linear-gradient(45deg, #8B4513, #654321);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        left: ${Math.random() * 100}%;
        top: -20px;
        pointer-events: none;
      `;
      
      const line = document.createElement('div');
      line.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1px;
        height: 8px;
        background: #654321;
        border-radius: 1px;
        transform: translate(-50%, -50%);
      `;
      bean.appendChild(line);
      container.appendChild(bean);

      gsap.to(bean, {
        y: container.offsetHeight + 50,
        rotation: 360 * (mobile ? 1 : 3),
        duration: mobile ? 1.5 : 3,
        delay: i * 0.1,
        ease: "power2.in",
        onComplete: () => bean.remove(),
      });
    }
  };

  // Brewing bubbles effect
  const createBrewingBubbles = (container: HTMLElement, count: number = 5) => {
    if (!shouldAnimate) return;

    for (let i = 0; i < count; i++) {
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
      container.appendChild(bubble);

      gsap.to(bubble, {
        y: mobile ? -30 : -50,
        opacity: 0,
        scale: mobile ? 1.5 : 2,
        duration: mobile ? 1 : 1.5,
        delay: i * 0.2,
        ease: "power2.out",
        onComplete: () => bubble.remove(),
      });
    }
  };

  // Grid morphing animation
  const animateGridMorph = (gridElement: HTMLElement) => {
    if (!shouldAnimate) return;

    const items = gridElement.children;
    
    gsap.fromTo(items,
      {
        scale: 0.8,
        opacity: 0,
        y: 50,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: mobile ? 0.4 : 0.8,
        stagger: mobile ? 0.05 : 0.1,
        ease: "back.out(1.4)",
      }
    );
  };

  // Timeline animation for about section
  const animateTimeline = (timelineElement: HTMLElement) => {
    if (!shouldAnimate) return;

    const items = timelineElement.querySelectorAll('.timeline-item');
    const line = timelineElement.querySelector('.timeline-line');

    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        { 
          scaleY: 1, 
          duration: mobile ? 1 : 2, 
          ease: "power2.inOut",
          transformOrigin: "top center"
        }
      );
    }

    gsap.fromTo(items,
      {
        opacity: 0,
        x: (index) => index % 2 === 0 ? -50 : 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: mobile ? 0.4 : 0.8,
        stagger: mobile ? 0.1 : 0.2,
        ease: "power2.out",
        delay: mobile ? 0.5 : 1,
      }
    );
  };

  // Performance optimization: Cleanup function
  const cleanup = () => {
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
  };

  return {
    shouldAnimate,
    animateCoffeeFill,
    animateTypewriter,
    animateWordReveal,
    animateCoffeeSplash,
    createSteamEffect,
    animateBeansfall,
    createBrewingBubbles,
    animateGridMorph,
    animateTimeline,
    cleanup,
  };
};

// Hook for scroll-triggered animations
export const useScrollAnimations = (containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
  const animations = useAnimations();

  useEffect(() => {
    if (!containerRef.current || !ScrollTrigger || !animations.shouldAnimate) return;

    const container = containerRef.current;

    // Auto-detect and animate elements with specific classes
    const brewElements = container.querySelectorAll('.brew-in');
    const typewriterElements = container.querySelectorAll('.typewriter');
    const wordRevealElements = container.querySelectorAll('.word-reveal');
    const coffeeSplashElements = container.querySelectorAll('.coffee-splash');
    const steamDissolveElements = container.querySelectorAll('.steam-dissolve');

    // Animate brew-in elements
    brewElements.forEach((element) => {
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
          duration: 1.2,
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

    // Animate typewriter elements
    typewriterElements.forEach((element) => {
      const text = element.textContent || '';
      element.textContent = '';
      
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => animations.animateTypewriter(element as HTMLElement, text),
      });
    });

    // Animate word reveal elements
    wordRevealElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => animations.animateWordReveal(element as HTMLElement),
      });
    });

    // Animate coffee splash elements
    coffeeSplashElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 75%",
        onEnter: () => animations.animateCoffeeSplash(element as HTMLElement),
      });
    });

    // Animate steam dissolve elements
    steamDissolveElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        onEnter: () => animations.createSteamEffect(element as HTMLElement),
      });
    });

    return animations.cleanup;
  }, [animations]);

  return animations;
};