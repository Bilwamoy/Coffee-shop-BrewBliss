"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GoToMenuSectionProps {
  className?: string;
}

export default function GoToMenuSection({ className = '' }: GoToMenuSectionProps) {
  return (
    <section className={`py-16 px-4 bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-morphism p-8 md:p-12 rounded-3xl luxury-hover"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl"
          >
            <span className="text-3xl">📋</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl text-cream mb-4"
          >
            Explore Our Full Menu
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="font-body text-beige-warm text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Discover our complete collection of artisanal coffees, refreshing beverages, and delicious food items. 
            Browse through our carefully curated menu with detailed descriptions and pricing.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/products">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <span>View Full Menu</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link href="/products/hot">
              <span className="text-beige-warm hover:text-accent transition-colors duration-300 text-sm font-medium">
                Hot Drinks
              </span>
            </Link>
            <span className="text-beige-warm/50">•</span>
            <Link href="/products/cold">
              <span className="text-beige-warm hover:text-accent transition-colors duration-300 text-sm font-medium">
                Cold Drinks
              </span>
            </Link>
            <span className="text-beige-warm/50">•</span>
            <Link href="/products/food">
              <span className="text-beige-warm hover:text-accent transition-colors duration-300 text-sm font-medium">
                Food
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}