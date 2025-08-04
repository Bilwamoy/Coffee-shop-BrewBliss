"use client";

import dynamic from 'next/dynamic';

// Dynamically import the animation components with SSR disabled
const EnhancedText = dynamic(() => import('@/components/animations/EnhancedTextAnimations'), { ssr: false });

export const Typewriter = ({ text, speed, className }: { text: string, speed?: number, className?: string }) => (
  <EnhancedText animation="typewriter" speed={speed} className={className}>
    {text}
  </EnhancedText>
);

export const WordReveal = ({ text, animationType, delay, staggerDelay, className }: { text: string, animationType?: 'fade' | 'slide' | 'bounce' | 'coffee-drop', delay?: number, staggerDelay?: number, className?: string }) => (
  <EnhancedText
    animation="word-reveal"
    animationType={animationType}
    delay={delay}
    staggerDelay={staggerDelay}
    className={className}
  >
    {text}
  </EnhancedText>
);