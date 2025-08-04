"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import PremiumBackground from '@/components/PremiumBackground';
import AnimatedCard from '@/components/animations/AnimatedCard';
import LiquidPourDivider from '@/components/animations/LiquidPourDivider';
import CoffeeBeanJourney from '@/components/animations/CoffeeBeanJourney';
import EnhancedText from '@/components/animations/EnhancedTextAnimations';
import { useScrollAnimations } from '@/hooks/useAnimations';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animations = useScrollAnimations(containerRef);

  // Coffee bean journey timeline data
  const timelineData = [
    {
      year: "2018",
      title: "The Seed of an Idea",
      description: "Our founders discovered exceptional coffee beans during a trip to Colombia, inspiring the vision for Brew & Bliss.",
      icon: "🌱",
      side: "left"
    },
    {
      year: "2019",
      title: "First Roastery",
      description: "We established our first small-batch roastery, focusing on sustainable sourcing and artisanal roasting techniques.",
      icon: "🏭",
      side: "right"
    },
    {
      year: "2020",
      title: "Community Roots",
      description: "Despite challenges, we opened our first café, creating a warm community space for coffee lovers.",
      icon: "🏠",
      side: "left"
    },
    {
      year: "2021",
      title: "Direct Trade Partnerships",
      description: "We formed direct relationships with coffee farmers, ensuring fair prices and sustainable practices.",
      icon: "🤝",
      side: "right"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Our commitment to quality earned us the 'Best Local Coffee Roaster' award from the Coffee Association.",
      icon: "🏆",
      side: "left"
    },
    {
      year: "2023",
      title: "Expansion & Innovation",
      description: "We expanded to multiple locations while introducing innovative brewing methods and specialty drinks.",
      icon: "🚀",
      side: "right"
    },
    {
      year: "2024",
      title: "Digital Experience",
      description: "Launched our premium digital platform, bringing the Brew & Bliss experience to coffee lovers everywhere.",
      icon: "💻",
      side: "left"
    }
  ];

  useEffect(() => {
    if (!timelineRef.current || !animations.shouldAnimate) return;

    const timeline = timelineRef.current;
    const line = timeline.querySelector('.timeline-line');
    const items = timeline.querySelectorAll('.timeline-item');

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
    items.forEach((item, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Add coffee bean animation for each timeline item
      const beanContainer = item.querySelector('.bean-animation');
      if (beanContainer) {
        const createBean = () => {
          const bean = document.createElement('div');
          bean.style.cssText = `
            position: absolute;
            width: 6px;
            height: 8px;
            background: linear-gradient(45deg, #8B4513, #654321);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            left: ${Math.random() * 100}%;
            top: -10px;
            pointer-events: none;
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
            y: 60,
            rotation: 360,
            opacity: 0,
            duration: 3,
            ease: "power2.out",
            onComplete: () => bean.remove(),
          });
        };

        // Create beans periodically when item is in view
        gsap.set({}, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              const interval = setInterval(createBean, 1000);
              setTimeout(() => clearInterval(interval), 5000);
            }
          }
        });
      }
    });

  }, [animations]);

  return (
    <PremiumBackground>
      <div ref={containerRef} className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="section-warm-beige py-20 px-4 text-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="typewriter font-heading text-5xl md:text-6xl text-coffee-dark mb-6">
                Our Coffee Journey
              </h1>
              <p className="word-reveal font-body text-xl text-coffee-warm max-w-4xl mx-auto leading-relaxed">
                From a simple idea to a thriving community of coffee lovers, discover the story behind every cup we serve.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Mission Section */}
        <section className="section-cream py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <AnimatedCard animationType="brew" delay={0} className="brew-in">
                <div className="glass-morphism p-8 rounded-2xl text-center luxury-hover h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="font-heading text-2xl text-coffee-dark mb-4">Our Mission</h3>
                  <p className="font-body text-coffee-warm leading-relaxed">
                    To create exceptional coffee experiences that bring people together, support sustainable farming, and celebrate the artistry of coffee.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard animationType="brew" delay={0.2} className="brew-in">
                <div className="glass-morphism p-8 rounded-2xl text-center luxury-hover h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl">👁️</span>
                  </div>
                  <h3 className="font-heading text-2xl text-coffee-dark mb-4">Our Vision</h3>
                  <p className="font-body text-coffee-warm leading-relaxed">
                    To be the world's most beloved coffee community, where every cup creates moments of bliss and meaningful connections.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard animationType="brew" delay={0.4} className="brew-in">
                <div className="glass-morphism p-8 rounded-2xl text-center luxury-hover h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h3 className="font-heading text-2xl text-coffee-dark mb-4">Our Values</h3>
                  <p className="font-body text-coffee-warm leading-relaxed">
                    Quality, sustainability, community, and innovation guide everything we do, from bean to cup.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={120} />

        {/* Coffee Bean Journey */}
        <section className="section-dark-brown py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <EnhancedText 
                animation="typewriter" 
                className="font-heading text-4xl md:text-5xl text-cream mb-6"
              >
                From Bean to Bliss
              </EnhancedText>
              <EnhancedText 
                animation="word-reveal" 
                animationType="coffee-drop"
                delay={2}
                className="font-body text-xl text-beige-warm max-w-3xl mx-auto"
              >
                Follow the journey of our coffee beans from sustainable farms to your perfect cup
              </EnhancedText>
            </motion.div>

            <CoffeeBeanJourney className="mb-16" />
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Timeline Section */}
        <section className="section-dark-brown py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="typewriter font-heading text-4xl md:text-5xl text-cream mb-6">
                The Bean Journey
              </h2>
              <p className="word-reveal font-body text-xl text-beige-warm max-w-3xl mx-auto">
                Follow the path of our coffee beans from farm to cup, and discover the milestones that shaped our story.
              </p>
            </motion.div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent-dark to-accent opacity-60"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    className={`timeline-item relative flex items-center ${
                      item.side === 'left' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Content */}
                    <div className={`w-5/12 ${item.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <AnimatedCard animationType="lift" delay={index * 0.1}>
                        <div className="glass-morphism p-6 rounded-2xl luxury-hover relative overflow-hidden">
                          {/* Bean Animation Container */}
                          <div className="bean-animation absolute inset-0 pointer-events-none"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-center mb-4">
                              <span className="text-2xl mr-3">{item.icon}</span>
                              <span className="font-heading text-2xl text-accent font-bold">{item.year}</span>
                            </div>
                            <h3 className="font-heading text-xl text-cream mb-3">{item.title}</h3>
                            <p className="font-body text-beige-warm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </AnimatedCard>
                    </div>

                    {/* Timeline Dot */}
                    <div className="w-2/12 flex justify-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-accent to-accent-dark rounded-full border-4 border-cream shadow-lg z-10 relative">
                        <div className="absolute inset-1 bg-cream rounded-full opacity-50"></div>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="cream" height={100} />

        {/* Team Section */}
        <section className="section-cream py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard animationType="splash" className="steam-dissolve">
              <div className="glass-morphism p-12 rounded-3xl luxury-hover">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">👥</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl text-coffee-dark mb-6">
                  Meet Our Coffee Artisans
                </h2>
                <p className="word-reveal font-body text-coffee-warm text-lg mb-8 leading-relaxed">
                  Behind every perfect cup is a team of passionate coffee experts, from our master roasters to our skilled baristas, all dedicated to crafting your ideal coffee experience.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-coffee-warm to-coffee-light text-cream px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Meet the Team
                </motion.button>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PremiumBackground>
  );
}