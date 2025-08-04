"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import StaggeredMenu from './StaggeredMenu';
import CoffeeCupFill from './CoffeeCupFill';
import LiquidPourDivider from './LiquidPourDivider';

const AnimationShowcase: React.FC = () => {
  const showcaseItems = [
    {
      title: "Page Transitions",
      description: "Coffee beans fall from top, form logo, then fade to content with steam trail effects",
      features: ["Route transitions", "Steam trail effects", "Coffee bean animations"]
    },
    {
      title: "Scroll Animations",
      description: "Elements brew/percolate into view with liquid pour effects between sections",
      features: ["Brew-in effects", "Liquid pour dividers", "Coffee cup fill animations"]
    },
    {
      title: "Text Animations",
      description: "Typewriter effect for headings and word-by-word reveal for paragraphs",
      features: ["Typewriter headings", "Word reveal paragraphs", "Animated cursors"]
    },
    {
      title: "Interactive Elements",
      description: "Cards flip like coffee packaging with lift effects and glowing shadows",
      features: ["Card flip animations", "Hover lift effects", "Glow shadows"]
    },
    {
      title: "Loading States",
      description: "Coffee brewing progress animations with realistic steam and drip effects",
      features: ["Brewing animations", "Progress indicators", "Steam particles"]
    },
    {
      title: "Performance Optimized",
      description: "Mobile-optimized animations with reduced motion support and progressive enhancement",
      features: ["Mobile optimization", "Accessibility support", "Progressive enhancement"]
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="typewriter font-heading text-4xl md:text-5xl text-coffee-dark mb-6">
            Advanced Coffee Animations
          </h2>
          <p className="word-reveal font-body text-xl text-coffee-warm max-w-3xl mx-auto">
            Experience our comprehensive animation system featuring GSAP and Framer Motion
          </p>
        </div>

        {/* Coffee Cup Showcase */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <CoffeeCupFill size="small" fillPercentage={60} />
            <CoffeeCupFill size="large" fillPercentage={85} />
            <CoffeeCupFill size="medium" fillPercentage={70} />
          </div>
        </div>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Animation Features Grid */}
        <StaggeredMenu 
          animationType="drops"
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16"
        >
          {showcaseItems.map((item, index) => (
            <AnimatedCard
              key={index}
              animationType={index % 4 === 0 ? 'flip' : index % 4 === 1 ? 'lift' : index % 4 === 2 ? 'brew' : 'splash'}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="glass-morphism p-6 rounded-2xl h-full luxury-hover">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {index === 0 ? '🎬' : index === 1 ? '📜' : index === 2 ? '✍️' : index === 3 ? '🎯' : index === 4 ? '⏳' : '⚡'}
                  </span>
                </div>
                <h3 className="font-heading text-xl text-coffee-dark mb-3">{item.title}</h3>
                <p className="font-body text-coffee-warm mb-4 text-sm leading-relaxed">{item.description}</p>
                <ul className="space-y-1">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="font-body text-coffee-warm/80 text-xs flex items-center">
                      <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </StaggeredMenu>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={120} />

        {/* Performance Features */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism p-8 rounded-2xl luxury-hover steam-dissolve"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="font-heading text-2xl text-coffee-dark mb-4">Performance Optimized</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="brew-in">
                <div className="font-semibold text-coffee-dark">Mobile Optimized</div>
                <div className="text-coffee-warm">Lighter animations for mobile devices</div>
              </div>
              <div className="brew-in">
                <div className="font-semibold text-coffee-dark">Accessibility</div>
                <div className="text-coffee-warm">Respects reduced motion preferences</div>
              </div>
              <div className="brew-in">
                <div className="font-semibold text-coffee-dark">Progressive Enhancement</div>
                <div className="text-coffee-warm">Graceful degradation for older devices</div>
              </div>
              <div className="brew-in">
                <div className="font-semibold text-coffee-dark">Smart Loading</div>
                <div className="text-coffee-warm">Preloads animations for smooth experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimationShowcase;