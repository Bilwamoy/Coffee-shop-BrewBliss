"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RoastingStage {
  stage: string;
  temp: string;
  icon: string;
  color: string;
  description: string;
}

interface ParallaxRoastingProcessProps {
  className?: string;
}

export default function ParallaxRoastingProcess({ className = '' }: ParallaxRoastingProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const roastingStages: RoastingStage[] = [
    {
      stage: "Green Beans",
      temp: "Room Temperature",
      icon: "🌱",
      color: "from-green-400 to-green-600",
      description: "Fresh, raw coffee beans ready for transformation"
    },
    {
      stage: "Drying Phase",
      temp: "300°F",
      icon: "💨",
      color: "from-yellow-400 to-orange-400",
      description: "Moisture evaporates as beans begin to heat"
    },
    {
      stage: "First Crack",
      temp: "385°F",
      icon: "🔥",
      color: "from-orange-400 to-red-500",
      description: "Beans expand and crack, releasing aromatic oils"
    },
    {
      stage: "Development",
      temp: "410°F",
      icon: "⚡",
      color: "from-red-400 to-brown-500",
      description: "Flavor compounds develop and intensify"
    },
    {
      stage: "Perfect Roast",
      temp: "435°F",
      icon: "☕",
      color: "from-amber-400 to-brown-600",
      description: "Optimal roast achieved for maximum flavor"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const stages = containerRef.current.querySelectorAll('.roasting-stage');
    
    stages.forEach((stage, index) => {
      gsap.fromTo(stage,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationX: -30,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Add floating particles for each stage
      const createParticles = () => {
        const particleContainer = stage.querySelector('.particle-container');
        if (!particleContainer) return;

        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'roasting-particle';
            particle.style.cssText = `
              position: absolute;
              width: 4px;
              height: 4px;
              background: ${index < 2 ? 'rgba(34, 197, 94, 0.6)' : index < 4 ? 'rgba(251, 146, 60, 0.6)' : 'rgba(139, 69, 19, 0.6)'};
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              top: 100%;
              pointer-events: none;
              filter: blur(1px);
            `;
            
            particleContainer.appendChild(particle);

            gsap.to(particle, {
              y: -120,
              x: (Math.random() - 0.5) * 60,
              opacity: 0,
              scale: Math.random() * 2 + 1,
              duration: 3 + Math.random() * 2,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }, i * 200);
        }
      };

      ScrollTrigger.create({
        trigger: stage,
        start: "top 80%",
        onEnter: createParticles
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="absolute inset-0 bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm opacity-50"
      />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23654321' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
            The Roasting Journey
          </h2>
          <p className="font-body text-xl text-beige-warm max-w-3xl mx-auto">
            Follow the transformation from green bean to perfect roast
          </p>
        </motion.div>

        {/* Roasting Process Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-orange-400 to-brown-600 opacity-30 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {roastingStages.map((stage, index) => (
              <motion.div
                key={index}
                className="roasting-stage text-center relative z-10"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism p-6 rounded-2xl luxury-hover relative overflow-hidden">
                  {/* Particle Container */}
                  <div className="particle-container absolute inset-0 pointer-events-none"></div>
                  
                  {/* Temperature Indicator */}
                  <div className="absolute top-2 right-2 bg-gradient-to-br from-accent/20 to-accent-dark/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-semibold text-accent">{stage.temp}</span>
                  </div>

                  <motion.div
                    className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${stage.color} rounded-full flex items-center justify-center shadow-xl relative z-10`}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <span className="text-3xl">{stage.icon}</span>
                    
                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="font-heading text-lg text-cream mb-2 relative z-10">{stage.stage}</h3>
                  <p className="font-body text-beige-warm text-sm leading-relaxed relative z-10">{stage.description}</p>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 w-full bg-white/10 rounded-full h-1 overflow-hidden relative z-10">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stage.color}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Roasting Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-morphism p-8 rounded-3xl luxury-hover inline-block">
            <h3 className="font-heading text-2xl text-cream mb-4">Temperature Timeline</h3>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-green-400 font-semibold">Room Temp</span>
              <div 
                className="flex-1 h-2 rounded-full max-w-xs"
                style={{
                  background: 'linear-gradient(to right, rgb(74, 222, 128), rgb(250, 204, 21), rgb(251, 146, 60), rgb(239, 68, 68), rgb(146, 64, 14))'
                }}
              ></div>
              <span className="text-brown-400 font-semibold">435°F</span>
            </div>
            <p className="font-body text-beige-warm text-sm mt-4">
              The perfect roast is achieved through precise temperature control
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}