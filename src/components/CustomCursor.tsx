"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface CursorState {
  type: 'default' | 'link' | 'product' | 'text' | 'loading' | 'click';
  scale: number;
  rotation: number;
  opacity: number;
}

interface TrailParticle {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  id: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    type: 'default',
    scale: 1,
    rotation: 0,
    opacity: 1
  });
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const { shouldAnimate, config } = useOptimizedAnimations();
  const animationFrameRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  // Check for touch device and reduced motion preference
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    };

    checkTouchDevice();
    const cleanup = checkReducedMotion();
    
    return cleanup || (() => {});
  }, []);

  // Don't render cursor on touch devices or if reduced motion is preferred
  if (isTouch || prefersReducedMotion || !shouldAnimate) {
    return null;
  }

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
    
    // Add trail particle
    if (config.enableParticles && trailParticles.length < 8) {
      const newParticle: TrailParticle = {
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        scale: 0.3 + Math.random() * 0.4,
        id: particleIdRef.current++
      };
      
      setTrailParticles(prev => [...prev, newParticle]);
    }
  }, [config.enableParticles, trailParticles.length]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  // Click handler
  const handleClick = useCallback(() => {
    setCursorState(prev => ({ ...prev, type: 'click' }));
    
    // Create ripple effect
    if (rippleRef.current) {
      gsap.fromTo(rippleRef.current,
        { scale: 0, opacity: 0.8 },
        { 
          scale: 3, 
          opacity: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        }
      );
    }
    
    setTimeout(() => {
      setCursorState(prev => ({ ...prev, type: 'default' }));
    }, 200);
  }, []);

  // Element hover detection
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
        setCursorState(prev => ({ ...prev, type: 'link', scale: 1.2 }));
      } else if (target.closest('[data-cursor="product"]') || target.closest('.product-card')) {
        setCursorState(prev => ({ ...prev, type: 'product', scale: 1.3 }));
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        setCursorState(prev => ({ ...prev, type: 'text', scale: 0.8 }));
      } else if (target.closest('[data-loading]') || target.closest('.loading')) {
        setCursorState(prev => ({ ...prev, type: 'loading', scale: 1.1 }));
      } else {
        setCursorState(prev => ({ ...prev, type: 'default', scale: 1 }));
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // Main cursor animation
  useEffect(() => {
    if (!cursorRef.current || !innerCursorRef.current) return;

    const cursor = cursorRef.current;
    const innerCursor = innerCursorRef.current;

    const animateCursor = () => {
      gsap.to(cursor, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(innerCursor, {
        x: mousePos.x,
        y: mousePos.y,
        duration: 0.15,
        ease: "power2.out"
      });

      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    if (isVisible && !isScrolling) {
      animateCursor();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos, isVisible, isScrolling]);

  // Cursor state animations
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    
    gsap.to(cursor, {
      scale: cursorState.scale,
      rotation: cursorState.rotation,
      opacity: isScrolling ? 0.3 : cursorState.opacity,
      duration: config.duration * 0.3,
      ease: "back.out(1.7)"
    });
  }, [cursorState, isScrolling, config.duration]);

  // Trail particles animation
  useEffect(() => {
    const animateTrail = () => {
      setTrailParticles(prev => 
        prev.map(particle => ({
          ...particle,
          opacity: particle.opacity * 0.95,
          scale: particle.scale * 0.98
        })).filter(particle => particle.opacity > 0.1)
      );
    };

    const interval = setInterval(animateTrail, 50);
    return () => clearInterval(interval);
  }, []);

  // Event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.cursor = 'auto';
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleClick, handleScroll]);

  const getCursorContent = () => {
    switch (cursorState.type) {
      case 'link':
        return (
          <div className="cursor-coffee-cup">
            <div className="cup">☕</div>
            <div className="steam">
              <span>~</span>
              <span>~</span>
              <span>~</span>
            </div>
          </div>
        );
      case 'product':
        return (
          <div className="cursor-grinder">
            <div className="grinder-body">⚙</div>
            <div className="grinder-handle">🔄</div>
          </div>
        );
      case 'text':
        return (
          <div className="cursor-spoon">
            <div className="spoon">🥄</div>
            <div className="stir-motion">∞</div>
          </div>
        );
      case 'loading':
        return (
          <div className="cursor-brewing">
            <div className="drop">💧</div>
            <div className="brewing-animation">⏳</div>
          </div>
        );
      case 'click':
        return (
          <div className="cursor-splash">
            <div className="splash-center">💥</div>
          </div>
        );
      default:
        return (
          <div className="cursor-bean">
            <div className="bean">🫘</div>
            <div className="glow"></div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorState.type} ${isVisible ? 'visible' : 'hidden'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        {getCursorContent()}
      </div>

      {/* Inner Cursor */}
      <div
        ref={innerCursorRef}
        className="custom-cursor-inner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          backgroundColor: '#8B4513',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.8 : 0,
          willChange: 'transform',
        }}
      />

      {/* Ripple Effect */}
      <div
        ref={rippleRef}
        className="cursor-ripple"
        style={{
          position: 'fixed',
          top: mousePos.y,
          left: mousePos.x,
          width: '20px',
          height: '20px',
          border: '2px solid #8B4513',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
        }}
      />

      {/* Trail Particles */}
      <div ref={trailRef} className="cursor-trail">
        {trailParticles.map(particle => (
          <div
            key={particle.id}
            className="trail-particle"
            style={{
              position: 'fixed',
              top: particle.y,
              left: particle.x,
              width: '3px',
              height: '3px',
              backgroundColor: '#8B4513',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9996,
              transform: `translate(-50%, -50%) scale(${particle.scale})`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .custom-cursor {
          transition: opacity 0.2s ease;
        }
        
        .custom-cursor.hidden {
          opacity: 0;
        }
        
        .custom-cursor.visible {
          opacity: 1;
        }

        .cursor-coffee-cup {
          position: relative;
          font-size: 20px;
        }
        
        .cursor-coffee-cup .steam {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 2px;
        }
        
        .cursor-coffee-cup .steam span {
          animation: steam-rise 1.5s infinite;
          font-size: 8px;
          opacity: 0.6;
        }
        
        .cursor-coffee-cup .steam span:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        .cursor-coffee-cup .steam span:nth-child(3) {
          animation-delay: 1s;
        }

        .cursor-grinder .grinder-handle {
          animation: rotate 2s linear infinite;
          display: inline-block;
        }

        .cursor-spoon .stir-motion {
          animation: stir 1s ease-in-out infinite;
          display: inline-block;
        }

        .cursor-brewing .drop {
          animation: drip 1.5s ease-in-out infinite;
          display: inline-block;
        }

        .cursor-bean .glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes steam-rise {
          0% { transform: translateY(0px) scale(1); opacity: 0.6; }
          100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes stir {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        @keyframes drip {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(5px); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
