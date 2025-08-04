"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AboutPageDemoProps {
  className?: string;
}

export default function AboutPageDemo({ className = '' }: AboutPageDemoProps) {
  return (
    <div className={`bg-gradient-to-br from-coffee-dark to-coffee-medium p-8 rounded-3xl ${className}`}>
      <div className="text-center mb-8">
        <motion.h2 
          className="font-heading text-3xl text-cream mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ✨ Enhanced About Page Features
        </motion.h2>
        <p className="text-beige-warm">All the amazing animations and interactions you'll find on our about page</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Timeline Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
            <span className="text-2xl">📅</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Interactive Timeline</h3>
          <p className="text-beige-warm text-sm">Animated journey markers with coffee bean effects</p>
        </motion.div>

        {/* Team Cards Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Coffee Team Cards</h3>
          <p className="text-beige-warm text-sm">3D profile cards with steam effects and hover animations</p>
        </motion.div>

        {/* Values Section Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Animated Values</h3>
          <p className="text-beige-warm text-sm">Coffee-themed icons with bounce, pulse, and rotate animations</p>
        </motion.div>

        {/* Roasting Process Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Parallax Roasting</h3>
          <p className="text-beige-warm text-sm">Interactive roasting process with particle effects</p>
        </motion.div>

        {/* Testimonials Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Coffee Cup Testimonials</h3>
          <p className="text-beige-warm text-sm">Speech bubble carousel with steam animations</p>
        </motion.div>

        {/* Typewriter Feature */}
        <motion.div 
          className="glass-morphism p-6 rounded-2xl text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">⌨️</span>
          </div>
          <h3 className="font-heading text-lg text-cream mb-2">Typewriter Mission</h3>
          <p className="text-beige-warm text-sm">Dynamic text animation with coffee particle effects</p>
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <motion.div
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/20 to-accent-dark/20 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-accent font-semibold">🚀 All features are fully responsive and optimized!</span>
        </motion.div>
      </div>
    </div>
  );
}