"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  trigger?: boolean;
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  showCursor = true,
  onComplete,
  trigger = true
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorState, setShowCursorState] = useState(showCursor);

  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      setIsTyping(false);
      return;
    }

    const startTyping = () => {
      setIsTyping(true);
      setDisplayText('');
      
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          if (onComplete) onComplete();
          
          // Hide cursor after typing is complete
          if (showCursor) {
            setTimeout(() => {
              setShowCursorState(false);
            }, 2000);
          }
        }
      }, speed);

      return () => clearInterval(timer);
    };

    const delayTimer = setTimeout(startTyping, delay);
    return () => clearTimeout(delayTimer);
  }, [text, speed, delay, onComplete, trigger, showCursor]);

  return (
    <span className={`typewriter-container ${className}`}>
      <span className="typewriter-text">{displayText}</span>
      {showCursorState && (
        <motion.span
          className="typewriter-cursor inline-block w-0.5 h-6 bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            duration: 1, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

// Enhanced typewriter with coffee-themed effects
interface CoffeeTypewriterProps extends TypewriterTextProps {
  coffeeEffect?: boolean;
}

export function CoffeeTypewriter({ 
  coffeeEffect = false, 
  ...props 
}: CoffeeTypewriterProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!coffeeEffect) return;

    const createParticle = () => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 2000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, [coffeeEffect]);

  return (
    <div className="relative">
      <TypewriterText {...props} />
      
      {coffeeEffect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40]
              }}
              transition={{ duration: 2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}