"use client";

import React, { useEffect, useState } from 'react';

interface FallbackTypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function FallbackTypewriter({ 
  text, 
  speed = 80, 
  className = '' 
}: FallbackTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Hide cursor after typing is complete
      const timeout = setTimeout(() => {
        setShowCursor(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span 
          className="inline-block w-0.5 h-1em bg-current ml-1 animate-pulse"
          style={{ 
            animation: 'blink 1s infinite',
            verticalAlign: 'baseline'
          }}
        >
          |
        </span>
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}