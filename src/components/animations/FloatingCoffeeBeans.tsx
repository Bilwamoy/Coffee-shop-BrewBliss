"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingCoffeeBeansProps {
  count?: number;
  className?: string;
}

interface Bean {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingCoffeeBeans({ count = 15, className = '' }: FloatingCoffeeBeansProps) {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const generateBeans = () => {
      const newBeans: Bean[] = [];
      for (let i = 0; i < count; i++) {
        newBeans.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4, // 4-12px
          duration: Math.random() * 10 + 15, // 15-25 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
        });
      }
      setBeans(newBeans);
    };

    generateBeans();

    // Regenerate beans periodically
    const interval = setInterval(generateBeans, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [count]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <AnimatePresence>
        {beans.map((bean) => (
          <motion.div
            key={bean.id}
            className="absolute coffee-bean opacity-20"
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              width: `${bean.size}px`,
              height: `${bean.size * 1.4}px`,
            }}
            initial={{ 
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0.2, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360, 720, 1080],
              y: [0, -50, -100, -150],
              x: [0, Math.sin(bean.id) * 30, Math.cos(bean.id) * 20, 0],
            }}
            transition={{
              duration: bean.duration,
              delay: bean.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Coffee Bean Shape */}
            <div 
              className="w-full h-full bg-gradient-to-br from-coffee-light to-coffee-dark rounded-full relative"
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            >
              {/* Coffee Bean Line */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-coffee-dark rounded-full"
                style={{
                  width: '2px',
                  height: `${bean.size * 0.6}px`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Specialized component for section-specific beans
export function SectionCoffeeBeans({ 
  sectionRef, 
  count = 8,
  className = '' 
}: { 
  sectionRef: React.RefObject<HTMLElement>;
  count?: number;
  className?: string;
}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [sectionRef]);

  if (!isInView) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            y: [0, -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <div 
            className="w-2 h-3 bg-gradient-to-br from-coffee-light to-coffee-dark opacity-40"
            style={{
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-coffee-dark rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}