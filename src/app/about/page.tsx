"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumBackground from '@/components/PremiumBackground';
import LiquidPourDivider from '@/components/animations/LiquidPourDivider';
import CoffeeBeanJourney from '@/components/animations/CoffeeBeanJourney';
import EnhancedTimeline from '@/components/animations/EnhancedTimeline';
import TestimonialsCarousel from '@/components/animations/TestimonialsCarousel';
import ParallaxRoastingProcess from '@/components/animations/ParallaxRoastingProcess';
import AnimatedValueCard from '@/components/animations/AnimatedValueCard';
import CoffeeTeamCard from '@/components/animations/CoffeeTeamCard';
import { CoffeeTypewriter } from '@/components/animations/TypewriterText';
import AboutPageDemo from '@/components/animations/AboutPageDemo';
import FloatingCoffeeBeans from '@/components/animations/FloatingCoffeeBeans';
import { useScrollAnimations } from '@/hooks/useAnimations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const animations = useScrollAnimations(containerRef);
  
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced timeline data with more details
  const timelineData = [
    {
      year: "2018",
      title: "The Seed of an Idea",
      description: "Our founders discovered exceptional coffee beans during a trip to Colombia, inspiring the vision for Brew & Bliss.",
      icon: "🌱",
      side: "left",
      details: "A life-changing journey through Colombian coffee farms sparked our passion for exceptional coffee."
    },
    {
      year: "2019",
      title: "First Roastery",
      description: "We established our first small-batch roastery, focusing on sustainable sourcing and artisanal roasting techniques.",
      icon: "🏭",
      side: "right",
      details: "Our first roastery in downtown, where every bean is carefully crafted to perfection."
    },
    {
      year: "2020",
      title: "Community Roots",
      description: "Despite challenges, we opened our first café, creating a warm community space for coffee lovers.",
      icon: "🏠",
      side: "left",
      details: "Building connections one cup at a time, even during the most challenging times."
    },
    {
      year: "2021",
      title: "Direct Trade Partnerships",
      description: "We formed direct relationships with coffee farmers, ensuring fair prices and sustainable practices.",
      icon: "🤝",
      side: "right",
      details: "Partnering directly with farmers to ensure quality, sustainability, and fair compensation."
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Our commitment to quality earned us the 'Best Local Coffee Roaster' award from the Coffee Association.",
      icon: "🏆",
      side: "left",
      details: "Recognition for our dedication to quality and community impact."
    },
    {
      year: "2023",
      title: "Expansion & Innovation",
      description: "We expanded to multiple locations while introducing innovative brewing methods and specialty drinks.",
      icon: "🚀",
      side: "right",
      details: "Growing our family of coffee lovers across the city with innovative experiences."
    },
    {
      year: "2024",
      title: "Digital Experience",
      description: "Launched our premium digital platform, bringing the Brew & Bliss experience to coffee lovers everywhere.",
      icon: "💻",
      side: "left",
      details: "Connecting coffee lovers worldwide through our digital platform and premium experiences."
    }
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Elena Rodriguez",
      role: "Master Roaster",
      bio: "With 15 years of experience, Elena crafts each roast with precision and passion.",
      image: "/images/team-elena.jpg",
      specialty: "Single Origin Roasts",
      coffeeIcon: "☕",
      hoverColor: "from-amber-400 to-orange-500"
    },
    {
      name: "Marcus Chen",
      role: "Head Barista",
      bio: "Marcus creates coffee art that's as beautiful as it is delicious.",
      image: "/images/team-marcus.jpg",
      specialty: "Latte Art & Espresso",
      coffeeIcon: "🎨",
      hoverColor: "from-brown-400 to-amber-600"
    },
    {
      name: "Sofia Thompson",
      role: "Sustainability Director",
      bio: "Sofia ensures every bean we source supports farmers and the environment.",
      image: "/images/team-sofia.jpg",
      specialty: "Ethical Sourcing",
      coffeeIcon: "🌱",
      hoverColor: "from-green-400 to-emerald-500"
    },
    {
      name: "David Kim",
      role: "Innovation Chef",
      bio: "David experiments with flavors to create our signature coffee experiences.",
      image: "/images/team-david.jpg",
      specialty: "Flavor Innovation",
      coffeeIcon: "🧪",
      hoverColor: "from-purple-400 to-indigo-500"
    }
  ];

  // Values data with coffee-themed icons
  const valuesData = [
    {
      title: "Quality First",
      description: "Every bean is carefully selected and roasted to perfection, ensuring exceptional taste in every cup.",
      icon: "☕",
      animation: "bounce",
      color: "from-amber-400 to-orange-500"
    },
    {
      title: "Sustainability",
      description: "We're committed to ethical sourcing and environmental responsibility throughout our supply chain.",
      icon: "🌱",
      animation: "grow",
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Community",
      description: "Building connections and creating spaces where people come together over great coffee.",
      icon: "🤝",
      animation: "pulse",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Innovation",
      description: "Constantly exploring new brewing methods and flavors to enhance your coffee experience.",
      icon: "🚀",
      animation: "rotate",
      color: "from-purple-400 to-pink-500"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Coffee Enthusiast",
      text: "Brew & Bliss has completely transformed my morning routine. Their attention to detail and passion for quality is evident in every cup.",
      rating: 5,
      location: "New York, NY"
    },
    {
      name: "Michael Chen",
      role: "Local Business Owner",
      text: "The community atmosphere at Brew & Bliss is unmatched. It's become our go-to spot for meetings and casual conversations.",
      rating: 5,
      location: "San Francisco, CA"
    },
    {
      name: "Emma Davis",
      role: "Sustainability Advocate",
      text: "I love knowing that my daily coffee supports ethical farming practices. The taste is incredible, and the impact is meaningful.",
      rating: 5,
      location: "Portland, OR"
    },
    {
      name: "James Wilson",
      role: "Coffee Connoisseur",
      text: "The single-origin roasts are exceptional. You can taste the care and expertise that goes into every batch.",
      rating: 5,
      location: "Seattle, WA"
    }
  ];

  // Mission statement for typewriter effect
  const missionStatement = "To create exceptional coffee experiences that bring people together, support sustainable farming, and celebrate the artistry of coffee, one perfect cup at a time.";





  // Mission statement trigger
  useEffect(() => {
    if (!missionRef.current || !animations.shouldAnimate) return;

    ScrollTrigger.create({
      trigger: missionRef.current,
      start: "top 70%",
      onEnter: () => {
        setIsTyping(true);
      }
    });
  }, [animations]);

  return (
    <PremiumBackground>
      <FloatingCoffeeBeans count={12} />
      <div ref={containerRef} className="min-h-screen py-20 relative z-10">
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
          
          {/* Floating coffee beans background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-4 bg-gradient-to-br from-coffee-light to-coffee-dark rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Mission Statement with Typewriter Animation */}
        <section ref={missionRef} className="section-dark-brown py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-morphism p-12 rounded-3xl luxury-hover"
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-3xl">🎯</span>
              </motion.div>
              <h2 className="font-heading text-3xl md:text-4xl text-cream mb-8">Our Mission</h2>
              <div className="font-body text-xl text-beige-warm leading-relaxed min-h-[120px] flex items-center justify-center">
                <CoffeeTypewriter
                  text={missionStatement}
                  speed={50}
                  delay={500}
                  trigger={isTyping}
                  coffeeEffect={true}
                  className="text-center"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={120} />

        {/* Values Section with Animated Coffee Icons */}
        <section className="section-cream py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-coffee-dark mb-6">
                Our Core Values
              </h2>
              <p className="font-body text-xl text-coffee-warm max-w-3xl mx-auto">
                The principles that guide everything we do, from bean to cup
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valuesData.map((value, index) => (
                <AnimatedValueCard
                  key={index}
                  value={value}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Parallax Coffee Roasting Process */}
        <ParallaxRoastingProcess />
        
        {/* Coffee Bean Journey */}
        <section className="section-dark-brown py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <CoffeeBeanJourney className="mb-16" />
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="cream" height={100} />

        {/* Enhanced Timeline Section */}
        <section className="section-dark-brown py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="typewriter font-heading text-4xl md:text-5xl text-cream mb-6">
                Our Story Timeline
              </h2>
              <p className="word-reveal font-body text-xl text-beige-warm max-w-3xl mx-auto">
                The milestones that shaped our journey from a simple idea to a coffee community
              </p>
            </motion.div>

            <EnhancedTimeline items={timelineData} />
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={120} />

        {/* Team Section with Coffee-themed Profile Cards */}
        <section className="section-cream py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-coffee-dark mb-6">
                Meet Our Coffee Artisans
              </h2>
              <p className="font-body text-xl text-coffee-warm max-w-3xl mx-auto">
                The passionate experts behind every perfect cup
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <CoffeeTeamCard
                  key={index}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Testimonials Carousel with Coffee Cup Speech Bubbles */}
        <section ref={testimonialsRef} className="section-dark-brown py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
                What Our Customers Say
              </h2>
              <p className="font-body text-xl text-beige-warm">
                Real stories from our coffee community
              </p>
            </motion.div>

            <TestimonialsCarousel 
              testimonials={testimonials}
              autoPlay={true}
              interval={5000}
            />
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="cream" height={100} />

        {/* Call to Action */}
        <section className="section-cream py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-morphism p-12 rounded-3xl luxury-hover"
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-4xl">🚀</span>
              </motion.div>
              
              <h2 className="font-heading text-3xl md:text-4xl text-coffee-dark mb-6">
                Join Our Coffee Journey
              </h2>
              <p className="font-body text-coffee-warm text-lg mb-8 leading-relaxed">
                Experience the passion, quality, and community that makes Brew & Bliss special. 
                Visit us today and become part of our story.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="coffee-button bg-gradient-to-r from-coffee-warm to-coffee-light text-cream px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-2">📍</span>
                    Find Our Locations
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-coffee-light to-coffee-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="coffee-button bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="mr-2">🛒</span>
                    Shop Online
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={100} />

        {/* Features Demo Section */}
        <section className="section-dark-brown py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6">
                Experience Our Innovations
              </h2>
              <p className="font-body text-xl text-beige-warm max-w-3xl mx-auto">
                Discover all the interactive features and animations that make our about page special
              </p>
            </motion.div>

            <AboutPageDemo />
          </div>
        </section>
      </div>
    </PremiumBackground>
  );
}