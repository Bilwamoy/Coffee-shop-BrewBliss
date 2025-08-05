"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { useOptimizedAnimations } from '@/hooks/usePerformanceOptimization';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  showCursor = true,
  onComplete,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursorState, setShowCursorState] = useState(true);
  const { shouldAnimate, config } = useOptimizedAnimations();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    let typeInterval: NodeJS.Timeout | undefined;

    if (shouldAnimate && isInView) {
      setDisplayText(''); // Start fresh for animation
      let index = 0;
      const adjustedSpeed = speed;
      
      typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          onComplete?.();
        }
      }, adjustedSpeed);
    } else {
      setDisplayText(text); // Show full text if not animating or not in view
    }

    return () => {
      if (typeInterval) {
        clearInterval(typeInterval);
      }
    };
  }, [text, speed, shouldAnimate, config, isInView, onComplete]);

  useEffect(() => {
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-0.5 h-1em bg-current ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

interface WordRevealProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  animationType?: 'fade' | 'slide' | 'bounce' | 'coffee-drop';
  className?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  delay = 0,
  staggerDelay = 0.1,
  animationType = 'fade',
  className = ''
}) => {
  const words = text.split(' ');
  const { shouldAnimate, config } = useOptimizedAnimations();

  const getWordVariants = () => {
    switch (animationType) {
      case 'slide':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        };
      case 'bounce':
        return {
          hidden: { opacity: 0, y: 20, scale: 0.8 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
      case 'coffee-drop':
        return {
          hidden: { 
            opacity: 0, 
            y: -30, 
            scale: 0,
            filter: 'blur(5px)'
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: 'blur(0px)'
          }
        };
      default: // fade
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getWordVariants();
  const adjustedStaggerDelay = shouldAnimate ? staggerDelay * config.staggerDelay : 0;

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={shouldAnimate ? variants.hidden : variants.visible}
          whileInView={variants.visible}
          transition={{
            duration: config.duration * 0.5,
            delay: delay + index * adjustedStaggerDelay,
            ease: animationType === 'bounce' ? "backOut" : "easeOut"
          }}
          className="inline-block mr-1"
        >
          {word}
          {index < words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  );
};

interface LetterRevealProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  animationType?: 'wave' | 'spiral' | 'coffee-steam';
  className?: string;
}

export const LetterReveal: React.FC<LetterRevealProps> = ({
  text,
  delay = 0,
  staggerDelay = 0.05,
  animationType = 'wave',
  className = ''
}) => {
  const letters = text.split('');
  const { shouldAnimate, config } = useOptimizedAnimations();

  const getLetterVariants = () => {
    switch (animationType) {
      case 'spiral':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0,
            rotate: 180
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            rotate: 0
          }
        };
      case 'coffee-steam':
        return {
          hidden: { 
            opacity: 0, 
            y: 20,
            filter: 'blur(3px)'
          },
          visible: { 
            opacity: 1, 
            y: 0,
            filter: 'blur(0px)'
          }
        };
      default: // wave
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  const variants = getLetterVariants();
  const adjustedStaggerDelay = shouldAnimate ? staggerDelay * config.staggerDelay : 0;

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={shouldAnimate ? variants.hidden : variants.visible}
          whileInView={variants.visible}
          transition={{
            duration: config.duration * 0.3,
            delay: delay + index * adjustedStaggerDelay,
            ease: animationType === 'spiral' ? [0.68, -0.55, 0.265, 1.55] : [0, 0, 0.2, 1]
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

interface CoffeeTextEffectProps {
  text: string;
  effect?: 'steam-rise' | 'coffee-pour' | 'bean-scatter';
  className?: string;
}

export const CoffeeTextEffect: React.FC<CoffeeTextEffectProps> = ({
  text,
  effect = 'steam-rise',
  className = ''
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate, config } = useOptimizedAnimations();

  useEffect(() => {
    if (!textRef.current || !shouldAnimate) return;

    const textElement = textRef.current;

    switch (effect) {
      case 'steam-rise':
        // Create steam particles that rise from text
        const createSteam = () => {
          const rect = textElement.getBoundingClientRect();
          const particleCount = config.enableParticles ? 6 : 3;
          
          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
              position: fixed;
              width: 2px;
              height: 4px;
              background: rgba(255, 255, 255, 0.6);
              border-radius: 50%;
              left: ${rect.left + Math.random() * rect.width}px;
              top: ${rect.bottom}px;
              pointer-events: none;
              z-index: 1000;
            `;
            
            document.body.appendChild(particle);

            gsap.to(particle, {
              y: -50,
              x: Math.random() * 20 - 10,
              opacity: 0,
              scale: 2,
              duration: 2,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        };

        const steamInterval = setInterval(createSteam, 1000);
        setTimeout(() => clearInterval(steamInterval), 5000);
        
        return () => clearInterval(steamInterval);

      case 'coffee-pour':
        // Animate text as if coffee is being poured over it
        gsap.fromTo(textElement,
          {
            background: 'linear-gradient(to bottom, transparent 0%, transparent 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          },
          {
            background: 'linear-gradient(to bottom, #8B4513 0%, #654321 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            duration: config.duration * 2,
            ease: "power2.inOut"
          }
        );
        break;

      case 'bean-scatter':
        // Scatter coffee beans around the text
        const rect = textElement.getBoundingClientRect();
        const beanCount = config.enableComplexAnimations ? 8 : 4;
        
        for (let i = 0; i < beanCount; i++) {
          const bean = document.createElement('div');
          bean.style.cssText = `
            position: fixed;
            width: 4px;
            height: 6px;
            background: linear-gradient(45deg, #8B4513, #654321);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 1000;
          `;
          
          document.body.appendChild(bean);

          const angle = (i / beanCount) * Math.PI * 2;
          const distance = 50 + Math.random() * 30;
          
          gsap.to(bean, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            rotation: 360,
            duration: config.duration,
            ease: "back.out(1.7)",
            onComplete: () => {
              gsap.to(bean, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                onComplete: () => bean.remove()
              });
            }
          });
        }
        break;
    }
  }, [effect, shouldAnimate, config]);

  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};

// Combined component for easy use
interface EnhancedTextProps {
  children: React.ReactNode;
  animation?: 'typewriter' | 'word-reveal' | 'letter-reveal' | 'coffee-effect';
  animationType?: string;
  speed?: number;
  delay?: number;
  staggerDelay?: number;
  effect?: string;
  className?: string;
  onComplete?: () => void;
}

const EnhancedText: React.FC<EnhancedTextProps> = ({
  children,
  animation = 'word-reveal',
  animationType = 'fade',
  speed = 50,
  delay = 0,
  staggerDelay = 0.1,
  effect = 'steam-rise',
  className = '',
  onComplete
}) => {
  const text = typeof children === 'string' ? children : '';

  switch (animation) {
    case 'typewriter':
      return (
        <TypewriterText
          text={text}
          speed={speed}
          onComplete={onComplete}
          className={className}
        />
      );
    case 'letter-reveal':
      return (
        <LetterReveal
          text={text}
          delay={delay}
          staggerDelay={staggerDelay}
          animationType={animationType as any}
          className={className}
        />
      );
    case 'coffee-effect':
      return (
        <CoffeeTextEffect
          text={text}
          effect={effect as any}
          className={className}
        />
      );
    default: // word-reveal
      return (
        <WordReveal
          text={text}
          delay={delay}
          staggerDelay={staggerDelay}
          animationType={animationType as any}
          className={className}
        />
      );
  }
};

export default EnhancedText;