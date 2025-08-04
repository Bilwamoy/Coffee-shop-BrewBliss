"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  location: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function TestimonialsCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000,
  className = '' 
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Coffee Cup Speech Bubble */}
          <div className="glass-morphism p-8 rounded-3xl luxury-hover relative">
            {/* Speech bubble tail */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-accent/20 to-accent-dark/20 rotate-45 backdrop-blur-sm border border-white/20"></div>
            
            {/* Coffee cup decoration */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl">☕</span>
              </motion.div>
              
              {/* Steam effect */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-white rounded-full absolute opacity-60"
                    style={{ left: `${(i - 1) * 4}px` }}
                    animate={{
                      y: [0, -15, -30],
                      opacity: [0.6, 0.3, 0],
                      scale: [1, 1.2, 1.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-accent text-xl mx-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              <blockquote className="font-body text-lg text-cream leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="border-t border-white/20 pt-4">
                <p className="font-heading text-xl text-accent mb-1">
                  {testimonials[currentIndex].name}
                </p>
                <p className="font-body text-beige-warm text-sm">
                  {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8">
        {/* Previous Button */}
        <motion.button
          onClick={prevTestimonial}
          className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent-dark/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:from-accent/30 hover:to-accent-dark/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-cream text-xl">‹</span>
        </motion.button>

        {/* Navigation dots */}
        <div className="flex space-x-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => goToTestimonial(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={nextTestimonial}
          className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent-dark/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:from-accent/30 hover:to-accent-dark/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-cream text-xl">›</span>
        </motion.button>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-dark"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}