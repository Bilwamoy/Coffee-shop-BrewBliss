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
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isAnimating = useRef(false);
  const trailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Performance optimized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Only update if mouse moved significantly (reduces unnecessary renders)
    const deltaX = Math.abs(newX - lastMousePos.current.x);
    const deltaY = Math.abs(newY - lastMousePos.current.y);
    
    if (deltaX < 1 && deltaY < 1) return;
    
    lastMousePos.current = { x: newX, y: newY };
    setMousePos({ x: newX, y: newY });
    setIsVisible(true);
    
    // Throttled trail particle creation
    if (config.enableParticles && trailParticles.length < 6) {
      if (trailTimeoutRef.current) return;
      
      trailTimeoutRef.current = setTimeout(() => {
        const newParticle: TrailParticle = {
          x: newX,
          y: newY,
          opacity: 0.5,
          scale: 0.4 + Math.random() * 0.3,
          id: particleIdRef.current++
        };
        
        setTrailParticles(prev => [...prev.slice(-5), newParticle]);
        trailTimeoutRef.current = null;
      }, 50);
    }
  }, [config.enableParticles, trailParticles.length]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrailParticles([]);
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  }, [isScrolling]);

  // Click handler with debouncing
  const handleClick = useCallback(() => {
    if (cursorState.type === 'click') return;
    
    setCursorState(prev => ({ ...prev, type: 'click' }));
    
    // Create ripple effect
    if (rippleRef.current && shouldAnimate) {
      gsap.killTweensOf(rippleRef.current);
      gsap.fromTo(rippleRef.current,
        { scale: 0, opacity: 0.6 },
        { 
          scale: 2.5, 
          opacity: 0, 
          duration: 0.4, 
          ease: "power2.out" 
        }
      );
    }
    
    setTimeout(() => {
      setCursorState(prev => ({ ...prev, type: 'default' }));
    }, 150);
  }, [cursorState.type, shouldAnimate]);

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

  // Optimized element hover detection with throttling
  useEffect(() => {
    let hoverTimeout: NodeJS.Timeout | null = null;
    
    const handleMouseOver = (e: MouseEvent) => {
      if (hoverTimeout) return;
      
      hoverTimeout = setTimeout(() => {
        const target = e.target as HTMLElement;
        
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
          setCursorState(prev => ({ ...prev, type: 'link', scale: 1.15 }));
        } else if (target.closest('[data-cursor="product"]') || target.closest('.product-card')) {
          setCursorState(prev => ({ ...prev, type: 'product', scale: 1.25 }));
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
          setCursorState(prev => ({ ...prev, type: 'text', scale: 0.85 }));
        } else if (target.closest('[data-loading]') || target.closest('.loading')) {
          setCursorState(prev => ({ ...prev, type: 'loading', scale: 1.1 }));
        } else {
          setCursorState(prev => ({ ...prev, type: 'default', scale: 1 }));
        }
        
        hoverTimeout = null;
      }, 16); // ~60fps throttling
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, []);

  // Optimized cursor animation with RAF
  useEffect(() => {
    if (!cursorRef.current || !innerCursorRef.current || !isVisible) return;

    const cursor = cursorRef.current;
    const innerCursor = innerCursorRef.current;

    const animateCursor = () => {
      if (!isVisible || isScrolling) {
        isAnimating.current = false;
        return;
      }

      // Use GSAP's optimized transforms
      gsap.set(cursor, {
        x: mousePos.x,
        y: mousePos.y,
        force3D: true
      });

      gsap.set(innerCursor, {
        x: mousePos.x,
        y: mousePos.y,
        force3D: true
      });

      if (isAnimating.current) {
        animationFrameRef.current = requestAnimationFrame(animateCursor);
      }
    };

    isAnimating.current = true;
    animateCursor();

    return () => {
      isAnimating.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos.x, mousePos.y, isVisible, isScrolling]);

  // Cursor state animations with kill tweens to prevent conflicts
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    
    gsap.killTweensOf(cursor);
    gsap.to(cursor, {
      scale: cursorState.scale,
      rotation: cursorState.rotation,
      opacity: isScrolling ? 0.2 : cursorState.opacity,
      duration: config.duration * 0.25,
      ease: "power2.out",
      force3D: true
    });
  }, [cursorState, isScrolling, config.duration]);

  // Optimized trail particles animation
  useEffect(() => {
    if (!config.enableParticles || trailParticles.length === 0) return;

    const animateTrail = () => {
      setTrailParticles(prev => 
        prev.map(particle => ({
          ...particle,
          opacity: particle.opacity * 0.92,
          scale: particle.scale * 0.96
        })).filter(particle => particle.opacity > 0.05)
      );
    };

    const interval = setInterval(animateTrail, 60);
    return () => clearInterval(interval);
  }, [config.enableParticles, trailParticles.length]);

  // Event listeners with passive options for better performance
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.cursor = 'auto';
      
      // Cleanup timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
      
      // Kill all GSAP animations
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
      if (rippleRef.current) {
        gsap.killTweensOf(rippleRef.current);
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
          willChange: 'transform, opacity, scale',
          backfaceVisibility: 'hidden',
          perspective: 1000,
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
          width: '3px',
          height: '3px',
          backgroundColor: '#8B4513',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 0.7 : 0,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
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
          width: '16px',
          height: '16px',
          border: '1.5px solid #8B4513',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          willChange: 'transform, opacity, scale',
        }}
      />

      {/* Trail Particles */}
      {config.enableParticles && (
        <div ref={trailRef} className="cursor-trail">
          {trailParticles.map(particle => (
            <div
              key={particle.id}
              className="trail-particle"
              style={{
                position: 'fixed',
                top: particle.y,
                left: particle.x,
                width: '2px',
                height: '2px',
                backgroundColor: '#8B4513',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9996,
                transform: `translate(-50%, -50%) scale(${particle.scale})`,
                opacity: particle.opacity,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .custom-cursor {
          transition: opacity 0.15s ease-out;
          transform-origin: center;
        }
        
        .custom-cursor.hidden {
          opacity: 0;
        }
        
        .custom-cursor.visible {
          opacity: 1;
        }

        .cursor-coffee-cup {
          position: relative;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cursor-coffee-cup .steam {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1px;
        }
        
        .cursor-coffee-cup .steam span {
          animation: steam-rise 1.2s infinite ease-out;
          font-size: 6px;
          opacity: 0.5;
          will-change: transform, opacity;
        }
        
        .cursor-coffee-cup .steam span:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .cursor-coffee-cup .steam span:nth-child(3) {
          animation-delay: 0.8s;
        }

        .cursor-grinder {
          position: relative;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-grinder .grinder-handle {
          animation: rotate 1.5s linear infinite;
          display: inline-block;
          will-change: transform;
        }

        .cursor-spoon {
          position: relative;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-spoon .stir-motion {
          animation: stir 0.8s ease-in-out infinite;
          display: inline-block;
          will-change: transform;
        }

        .cursor-brewing {
          position: relative;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-brewing .drop {
          animation: drip 1.2s ease-in-out infinite;
          display: inline-block;
          will-change: transform;
        }

        .cursor-bean {
          position: relative;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-bean .glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 24px;
          height: 24px;
          background: radial-gradient(circle, rgba(139, 69, 19, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: glow-pulse 1.8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .cursor-splash {
          font-size: 20px;
          animation: splash-burst 0.3s ease-out;
          will-change: transform;
        }

        @keyframes steam-rise {
          0% { transform: translateY(0px) scale(1); opacity: 0.5; }
          100% { transform: translateY(-15px) scale(1.3); opacity: 0; }
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
          50% { transform: translateY(4px); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes splash-burst {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        /* Reduce animations on slower devices */
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor * {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;