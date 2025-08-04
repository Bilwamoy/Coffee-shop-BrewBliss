"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  side: 'left' | 'right';
  details: string;
}

interface EnhancedTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function EnhancedTimeline({ items, className = '' }: EnhancedTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    const line = timeline.querySelector('.timeline-line');
    const timelineItems = timeline.querySelectorAll('.timeline-item');

    // Animate timeline line
    if (line) {
      gsap.fromTo(line,
        { scaleY: 0 },
        { 
          scaleY: 1, 
          duration: 2, 
          ease: "power2.inOut",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Animate timeline items
    timelineItems.forEach((item, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -150 : 150,
          scale: 0.8,
          rotationY: index % 2 === 0 ? -30 : 30,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(1.7)",
        }
      )
      .to(item.querySelector('.timeline-marker'), {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, "-=0.5");

      // Coffee bean animation
      const createCoffeeBeans = () => {
        const beanContainer = item.querySelector('.bean-animation');
        if (!beanContainer) return;

        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const bean = document.createElement('div');
            bean.className = 'coffee-bean-particle';
            bean.style.cssText = `
              position: absolute;
              width: 6px;
              height: 8px;
              background: linear-gradient(45deg, #8B4513, #654321);
              border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
              left: ${Math.random() * 100}%;
              top: -10px;
              pointer-events: none;
              z-index: 10;
            `;
            
            const line = document.createElement('div');
            line.style.cssText = `
              position: absolute;
              top: 50%;
              left: 50%;
              width: 1px;
              height: 4px;
              background: #654321;
              border-radius: 1px;
              transform: translate(-50%, -50%);
            `;
            bean.appendChild(line);
            beanContainer.appendChild(bean);

            gsap.to(bean, {
              y: 80,
              rotation: 360,
              opacity: 0,
              duration: 2,
              ease: "power2.out",
              onComplete: () => bean.remove(),
            });
          }, i * 300);
        }
      };

      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        onEnter: createCoffeeBeans
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-accent via-accent-dark to-accent opacity-80 rounded-full shadow-lg"></div>

      {/* Timeline Items */}
      <div className="space-y-16">
        {items.map((item, index) => (
          <div
            key={index}
            className={`timeline-item relative flex items-center ${
              item.side === 'left' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Content */}
            <div className={`w-5/12 ${item.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: item.side === 'left' ? -5 : 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-morphism p-8 rounded-2xl luxury-hover relative overflow-hidden group">
                  {/* Bean Animation Container */}
                  <div className="bean-animation absolute inset-0 pointer-events-none"></div>
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <motion.span 
                        className="text-3xl mr-3"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-heading text-3xl text-accent font-bold">{item.year}</span>
                    </div>
                    <h3 className="font-heading text-2xl text-cream mb-3">{item.title}</h3>
                    <p className="font-body text-beige-warm leading-relaxed mb-4">{item.description}</p>
                    <p className="font-body text-accent text-sm italic">{item.details}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline Marker */}
            <div className="w-2/12 flex justify-center">
              <motion.div 
                className="timeline-marker w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-full border-4 border-cream shadow-xl z-10 relative"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-2 bg-cream rounded-full opacity-50"></div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
              </motion.div>
            </div>

            {/* Spacer */}
            <div className="w-5/12"></div>
          </div>
        ))}
      </div>
    </div>
  );
}