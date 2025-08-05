"use client";

import React, { useEffect, useState, useRef } from 'react';

interface SafeTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function SafeTypewriter({ 
  text, 
  speed = 80, 
  delay = 0, 
  className = '', 
  showCursor = true,
  onComplete 
}: SafeTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [showCursorState, setShowCursorState] = useState(showCursor);
  const [hasStarted, setHasStarted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer for triggering animation
  useEffect(() => {
    if (!isClient || !elementRef.current || hasStarted) return;

    try {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            
            // Start typing after delay
            timeoutRef.current = setTimeout(() => {
              let index = 0;
              
              const typeNextChar = () => {
                if (index <= text.length) {
                  setDisplayText(text.slice(0, index));
                  index++;
                  timeoutRef.current = setTimeout(typeNextChar, speed);
                } else {
                  onComplete?.();
                  
                  // Hide cursor after completion
                  setTimeout(() => {
                    setShowCursorState(false);
                  }, 2000);
                }
              };
              
              typeNextChar();
            }, delay);
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(elementRef.current);
    } catch (error) {
      console.warn('IntersectionObserver not supported, falling back to immediate display');
      // Fallback: show text immediately
      setDisplayText(text);
      setShowCursorState(false);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isClient, text, speed, delay, hasStarted, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Fallback for SSR or if client-side rendering fails
  if (!isClient) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={elementRef} className={className}>
      {displayText}
      {showCursorState && (
        <span
          className="inline-block w-0.5 bg-current ml-1 typewriter-cursor"
          style={{ 
            height: '1em',
            verticalAlign: 'baseline',
            animation: 'typewriterBlink 1s infinite'
          }}
        >
          |
        </span>
      )}
    </span>
  );
}

// Safe Word Reveal Component
interface SafeWordRevealProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  animationType?: 'fade' | 'slide' | 'bounce' | 'coffee-drop';
  className?: string;
}

export function SafeWordReveal({ 
  text, 
  delay = 0, 
  staggerDelay = 0.15, 
  animationType = 'coffee-drop',
  className = '' 
}: SafeWordRevealProps) {
  const [isClient, setIsClient] = useState(false);
  const [visibleWords, setVisibleWords] = useState<boolean[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    setIsClient(true);
    setVisibleWords(new Array(words.length).fill(false));
  }, [words.length]);

  useEffect(() => {
    if (!isClient || !elementRef.current || hasStarted) return;

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            
            // Animate words one by one
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, delay + index * staggerDelay * 1000);
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(elementRef.current);

      return () => observer.disconnect();
    } catch (error) {
      console.warn('IntersectionObserver not supported, showing all words immediately');
      setVisibleWords(new Array(words.length).fill(true));
    }
  }, [isClient, words, delay, staggerDelay, hasStarted]);

  if (!isClient) {
    return <span className={className}>{text}</span>;
  }

  const getWordStyle = (isVisible: boolean, animationType: string) => {
    if (!isVisible) {
      switch (animationType) {
        case 'slide':
          return { opacity: 0, transform: 'translateX(-20px)' };
        case 'bounce':
          return { opacity: 0, transform: 'translateY(20px) scale(0.8)' };
        case 'coffee-drop':
          return { opacity: 0, transform: 'translateY(-30px) scale(0)', filter: 'blur(5px)' };
        default:
          return { opacity: 0 };
      }
    }
    return { 
      opacity: 1, 
      transform: 'translateX(0) translateY(0) scale(1)', 
      filter: 'blur(0px)',
      transition: 'all 0.6s ease-out'
    };
  };

  return (
    <span ref={elementRef} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block mr-1"
          style={getWordStyle(visibleWords[index], animationType)}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}