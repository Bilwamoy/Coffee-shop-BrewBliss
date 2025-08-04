"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Carousel from "@/components/carousel";
import PremiumBackground from "@/components/PremiumBackground";
import CoffeeDivider from "@/components/CoffeeDivider";
import LiquidPourDivider from "@/components/animations/LiquidPourDivider";
import CoffeeCupFill from "@/components/animations/CoffeeCupFill";
import SteamDissolveTransition from "@/components/animations/SteamDissolveTransition";
import { Typewriter, WordReveal } from "@/components/animations/ClientSideAnimations";

// Dynamically import ScrollTrigger to avoid SSR issues
let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

export default function Home() {
  const steamRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showSteamTransition, setShowSteamTransition] = useState(false);

  // Steam animation for video section
  useEffect(() => {
    if (!steamRef.current) return;

    const createSteamParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'steam-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '20px';
      steamRef.current?.appendChild(particle);

      gsap.fromTo(particle, 
        {
          y: 0,
          opacity: 0.6,
          scale: 1,
        },
        {
          y: -150,
          opacity: 0,
          scale: 2.5,
          duration: 6,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        }
      );
    };

    const interval = setInterval(createSteamParticle, 1500);
    return () => clearInterval(interval);
  }, []);

  // Features section animation
  useEffect(() => {
    if (!featuresRef.current || !ScrollTrigger) return;

    const cards = featuresRef.current.querySelectorAll('.feature-card');
    
    gsap.fromTo(cards, 
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Trigger steam dissolve transition after hero section
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSteamTransition(true);
      setTimeout(() => setShowSteamTransition(false), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PremiumBackground>
      <div className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden parallax-container">
          <div className="parallax-layer">
            <Carousel />
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Video Section */}
        <section className="section-warm-beige py-20 px-4 text-center relative overflow-hidden dynamic-lighting">
          <div ref={steamRef} className="absolute inset-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Coffee Cup Animation */}
              <div className="flex justify-center">
                <CoffeeCupFill size="large" fillPercentage={85} className="coffee-splash" />
              </div>

              {/* Video Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <Typewriter 
                    text="Experience Brew & Bliss"
                    speed={80}
                    className="font-heading text-4xl md:text-5xl text-coffee-dark"
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full luxury-hover rounded-2xl overflow-hidden shadow-2xl"
                  style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}
                >
                  <video
                    src="/videos/promo.mp4"
                    controls
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/20 to-transparent pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="cream" height={120} />

        {/* Features Section */}
        <section className="section-cream py-24 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="mb-6">
                <Typewriter 
                  text="Our Coffee Philosophy"
                  speed={60}
                  className="font-heading text-4xl md:text-5xl text-coffee-dark"
                />
              </div>
              <WordReveal 
                text="Every cup tells a story of passion, precision, and the pursuit of perfection"
                animationType="coffee-drop"
                delay={3}
                staggerDelay={0.15}
                className="font-body text-xl text-coffee-dark max-w-3xl mx-auto"
              />
            </motion.div>

            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                className="feature-card brew-in glass-morphism p-10 rounded-2xl text-center luxury-hover dynamic-lighting"
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="bg-gradient-to-br from-coffee-warm to-coffee-light text-coffee-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-3xl">☕</span>
                </div>
                <h3 className="font-heading text-2xl mb-6 text-coffee-dark">
                  Premium Blends
                </h3>
                <p className="font-body text-coffee-warm leading-relaxed">
                  Sourced from the finest coffee beans around the world, each blend is carefully crafted and roasted to perfection
                </p>
              </motion.div>

              <motion.div
                className="feature-card brew-in glass-morphism p-10 rounded-2xl text-center luxury-hover dynamic-lighting"
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="bg-gradient-to-br from-coffee-warm to-coffee-light text-coffee-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="font-heading text-2xl mb-6 text-coffee-dark">
                  Artisanal Experience
                </h3>
                <p className="font-body text-coffee-warm leading-relaxed">
                  Every cup is crafted with meticulous care and attention to detail, creating the perfect coffee experience
                </p>
              </motion.div>

              <motion.div
                className="feature-card brew-in glass-morphism p-10 rounded-2xl text-center luxury-hover dynamic-lighting"
                whileHover={{ 
                  y: -15,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="bg-gradient-to-br from-coffee-warm to-coffee-light text-coffee-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-heading text-2xl mb-6 text-coffee-dark">
                  Sustainable Sourcing
                </h3>
                <p className="font-body text-coffee-warm leading-relaxed">
                  Committed to ethical and sustainable coffee farming practices that support communities and protect our planet
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wave Divider */}
        <CoffeeDivider variant="wave" />

        {/* Testimonial Section */}
        <section className="section-dark-brown py-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-morphism p-12 rounded-3xl luxury-hover"
            >
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">☕</span>
                </div>
              </div>
              <blockquote className="font-heading text-2xl md:text-3xl text-cream mb-8 italic leading-relaxed">
                "Brew & Bliss isn't just a coffee shop—it's a sanctuary where every sip transports you to a moment of pure bliss."
              </blockquote>
              <cite className="font-body text-beige-warm text-lg">— Sarah M., Coffee Enthusiast</cite>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Steam Dissolve Transition */}
      <SteamDissolveTransition
        isActive={showSteamTransition}
        direction="center-out"
        intensity="medium"
        onComplete={() => setShowSteamTransition(false)}
      />
    </PremiumBackground>
  );
}
