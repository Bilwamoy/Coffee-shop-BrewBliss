"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ValueData {
  title: string;
  description: string;
  icon: string;
  animation: 'bounce' | 'grow' | 'pulse' | 'rotate';
  color: string;
}

interface AnimatedValueCardProps {
  value: ValueData;
  index: number;
  className?: string;
}

export default function AnimatedValueCard({ value, index, className = '' }: AnimatedValueCardProps) {
  const getIconAnimation = () => {
    switch (value.animation) {
      case 'bounce':
        return {
          y: [0, -10, 0],
          transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
        };
      case 'grow':
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
        };
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          opacity: [1, 0.8, 1],
          transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
        };
      case 'rotate':
        return {
          rotate: [0, 360],
          transition: { duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.2 }
        };
      default:
        return {};
    }
  };

  const getHoverAnimation = () => {
    switch (value.animation) {
      case 'bounce':
        return { y: -15, scale: 1.1 };
      case 'grow':
        return { scale: 1.2 };
      case 'pulse':
        return { scale: 1.1 };
      case 'rotate':
        return { rotate: 360, scale: 1.1 };
      default:
        return { scale: 1.1 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className={`group ${className}`}
    >
      <div className="glass-morphism p-8 rounded-2xl text-center luxury-hover h-full relative overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Animated icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg relative z-10"
          animate={getIconAnimation()}
          whileHover={getHoverAnimation()}
          transition={{ duration: 0.6 }}
        >
          <span className="text-3xl">{value.icon}</span>
          
          {/* Special effects for different animations */}
          {value.animation === 'pulse' && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent-dark"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3 + 0.5
                }}
              />
            </>
          )}
          
          {value.animation === 'grow' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent-dark/20"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 0.4
              }}
            />
          )}
          
          {value.animation === 'bounce' && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent rounded-full"
                  style={{ 
                    top: '20%',
                    left: `${30 + i * 20}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2 + index * 0.1
                  }}
                />
              ))}
            </>
          )}
          
          {value.animation === 'rotate' && (
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-dashed border-accent/50"
              animate={{ rotate: [0, -360] }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
        
        <h3 className="font-heading text-2xl text-coffee-dark mb-4 relative z-10">{value.title}</h3>
        <p className="font-body text-coffee-warm leading-relaxed relative z-10">{value.description}</p>
        
        {/* Floating particles on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}