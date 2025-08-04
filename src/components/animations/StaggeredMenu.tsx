"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredMenuProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  animationType?: 'drops' | 'beans' | 'steam' | 'pour';
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  animationType = 'drops'
}) => {
  
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'drops':
        return {
          hidden: {
            opacity: 0,
            y: -50,
            scale: 0.8,
            filter: 'blur(10px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 200,
              duration: 0.8,
            },
          },
        };

      case 'beans':
        return {
          hidden: {
            opacity: 0,
            x: -100,
            rotation: -180,
            scale: 0.5,
          },
          visible: {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 150,
              duration: 1,
            },
          },
        };

      case 'steam':
        return {
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
            filter: 'blur(5px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              type: "tween",
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.8,
            },
          },
        };

      case 'pour':
        return {
          hidden: {
            opacity: 0,
            x: 50,
            y: -20,
            scale: 0.8,
            skewX: 10,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            skewX: 0,
            transition: {
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.6,
            },
          },
        };

      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = getAnimationVariants();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {/* Add coffee drop effect for drops animation */}
          {animationType === 'drops' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, 20, 40]
              }}
              transition={{
                duration: 2,
                delay: index * staggerDelay + 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-coffee-dark rounded-full pointer-events-none"
            />
          )}

          {/* Add coffee bean decoration for beans animation */}
          {animationType === 'beans' && (
            <motion.div
              initial={{ opacity: 0, rotation: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                rotation: 360,
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                delay: index * staggerDelay + 1,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              className="absolute -top-1 -right-1 w-3 h-4 bg-gradient-to-br from-coffee-light to-coffee-dark pointer-events-none"
              style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
            >
              <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </motion.div>
          )}

          {/* Add steam effect for steam animation */}
          {animationType === 'steam' && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                y: [-10, -30, -50],
                scale: [1, 1.5, 2]
              }}
              transition={{
                duration: 2.5,
                delay: index * staggerDelay + 0.8,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-white/40 rounded-full blur-sm pointer-events-none"
            />
          )}

          {/* Add pour effect for pour animation */}
          {animationType === 'pour' && (
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2,
                delay: index * staggerDelay + 0.6,
                repeat: Infinity,
                repeatDelay: 4,
              }}
              className="absolute -top-2 -left-2 w-8 h-8 pointer-events-none"
            >
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <motion.path
                  d="M4,4 Q16,12 28,4"
                  stroke="#8B4513"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}

          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredMenu;