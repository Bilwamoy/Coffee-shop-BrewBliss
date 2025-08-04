"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: { x: number; y: number };
}

interface CoffeeBeanJourneyProps {
  steps?: JourneyStep[];
  className?: string;
}

const defaultSteps: JourneyStep[] = [
  {
    id: 'farm',
    title: 'Farm to Bean',
    description: 'Carefully selected from sustainable farms around the world',
    icon: '🌱',
    position: { x: 10, y: 20 }
  },
  {
    id: 'harvest',
    title: 'Hand Picked',
    description: 'Each bean is hand-picked at peak ripeness for optimal flavor',
    icon: '👐',
    position: { x: 30, y: 40 }
  },
  {
    id: 'process',
    title: 'Processing',
    description: 'Traditional methods preserve the unique characteristics',
    icon: '⚙️',
    position: { x: 50, y: 30 }
  },
  {
    id: 'roast',
    title: 'Artisan Roasting',
    description: 'Master roasters craft the perfect roast profile',
    icon: '🔥',
    position: { x: 70, y: 50 }
  },
  {
    id: 'brew',
    title: 'Perfect Brew',
    description: 'Expertly brewed to bring out the best flavors',
    icon: '☕',
    position: { x: 90, y: 35 }
  }
];

const CoffeeBeanJourney: React.FC<CoffeeBeanJourneyProps> = ({
  steps = defaultSteps,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const beansRef = useRef<HTMLDivElement[]>([]);
  const { shouldAnimate, config } = useOptimizedAnimations();

  useEffect(() => {
    if (!containerRef.current || !pathRef.current || !shouldAnimate || !ScrollTrigger) return;

    const container = containerRef.current;
    const path = pathRef.current;
    const beans = beansRef.current.filter(Boolean);

    // Create animated coffee beans that travel along the path
    const createTravelingBeans = () => {
      const beanCount = config.enableComplexAnimations ? 8 : 4;
      
      for (let i = 0; i < beanCount; i++) {
        const bean = document.createElement('div');
        bean.style.cssText = `
          position: absolute;
          width: 6px;
          height: 8px;
          background: linear-gradient(45deg, #8B4513, #654321);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          z-index: 10;
          pointer-events: none;
        `;
        
        // Add coffee bean crack
        const crack = document.createElement('div');
        crack.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 4px;
          background: #2D1810;
          border-radius: 1px;
          transform: translate(-50%, -50%);
        `;
        bean.appendChild(crack);
        container.appendChild(bean);

        // Animate bean along the journey path
        const pathLength = path.getTotalLength();
        const startProgress = i / beanCount;
        
        gsap.set(bean, {
          motionPath: {
            path: path,
            autoRotate: true,
          },
          transformOrigin: "center center"
        });

        gsap.fromTo(bean, 
          {
            motionPath: { path: path, start: startProgress, end: startProgress }
          },
          {
            motionPath: { path: path, start: startProgress, end: startProgress + 1 },
            duration: config.duration * 4,
            delay: i * 0.5,
            ease: "none",
            repeat: -1,
            onComplete: () => bean.remove()
          }
        );
      }
    };

    // Animate the path drawing
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      }
    });

    // Draw the path
    tl.to(path, {
      strokeDashoffset: 0,
      duration: config.duration * 2,
      ease: "power2.inOut"
    })
    // Animate journey steps
    .to(beans, {
      scale: 1,
      opacity: 1,
      duration: config.duration * 0.5,
      stagger: config.staggerDelay * 2,
      ease: "back.out(1.7)"
    }, "-=1");

    // Start traveling beans animation
    setTimeout(createTravelingBeans, 1000);

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, [shouldAnimate, config, steps]);

  // Generate SVG path based on step positions
  const generatePath = () => {
    if (steps.length < 2) return '';
    
    let path = `M ${steps[0].position.x} ${steps[0].position.y}`;
    
    for (let i = 1; i < steps.length; i++) {
      const prev = steps[i - 1];
      const curr = steps[i];
      
      // Create smooth curves between points
      const midX = (prev.position.x + curr.position.x) / 2;
      const controlY = Math.min(prev.position.y, curr.position.y) - 10;
      
      path += ` Q ${midX} ${controlY} ${curr.position.x} ${curr.position.y}`;
    }
    
    return path;
  };

  return (
    <div ref={containerRef} className={`relative w-full h-96 ${className}`}>
      {/* Journey Path */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={generatePath()}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Journey Steps */}
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          ref={(el) => {
            if (el) beansRef.current[index] = el;
          }}
          initial={{ scale: 0, opacity: 0 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${step.position.x}%`,
            top: `${step.position.y}%`,
          }}
        >
          {/* Step Circle */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-gradient-to-br from-coffee-warm to-coffee-light rounded-full flex items-center justify-center shadow-lg cursor-pointer group"
            >
              <span className="text-2xl">{step.icon}</span>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-150 transition-transform duration-500" />
            </motion.div>

            {/* Step Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48 glass-morphism p-4 rounded-xl shadow-xl z-20"
            >
              <h3 className="font-heading text-lg text-coffee-dark mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-coffee-warm leading-relaxed">
                {step.description}
              </p>
              
              {/* Arrow pointing to circle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cream rotate-45 border-l border-t border-coffee-light/20" />
            </motion.div>

            {/* Step Number */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-coffee-dark rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              {index + 1}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Floating Coffee Aroma */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {shouldAnimate && [...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [50, -20, -100],
              x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
              scale: [1, 1.5, 2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.5,
            }}
            className="absolute w-1 h-3 bg-white/30 rounded-full blur-sm"
            style={{ 
              left: `${20 + index * 30}%`,
              bottom: '20%'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CoffeeBeanJourney;