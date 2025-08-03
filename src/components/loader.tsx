"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- TYPE DEFINITIONS ---
// This defines the props our component will accept.
// It needs a function to call when the animation is over.
interface DynamicBrandFeatureProps {
  onAnimationComplete: () => void;
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import MobileCartDrawer from "@/components/ui/MobileCartDrawer";
import AudioPlayer from "@/components/AudioPlayer";

// A placeholder for your actual website content.
// In a real app, this would be your main router or page component.
const MainWebsite = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
    <MobileCartDrawer />
    <AudioPlayer src="/music/background_music.mp3" />
  </CartProvider>
);


// --- THE ANIMATED LANDING PAGE COMPONENT ---
const DynamicBrandFeature: React.FC<DynamicBrandFeatureProps> = ({ onAnimationComplete }) => {
  // State to handle if the logo image fails to load
  const [imageError, setImageError] = useState(false);
  // A ref to the container for the GSAP background animation
  const containerRef = useRef<HTMLDivElement>(null);
  // State to track if the GSAP library has been loaded from the CDN
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // The URL for your logo, as requested.
  const logoUrl = "/images/Brew&Bliss1.png";

  // Effect to load the GSAP library from a CDN.
  // This avoids the build error by not using a direct import.
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => {
      // Once the script is loaded, update the state to trigger the animation effect.
      setGsapLoaded(true);
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts.
    return () => {
      document.body.removeChild(script);
    };
  }, []); // This effect runs only once when the component mounts.

  // GSAP animation for the background particles.
  // This effect now depends on `gsapLoaded` to ensure the library is available.
  useEffect(() => {
    // Do nothing if GSAP hasn't loaded yet or if the container isn't rendered.
    if (!gsapLoaded || !containerRef.current) return;

    const container = containerRef.current;
    // Access the GSAP library from the global window object.
    const gsap = (window as any).gsap;

    // Create particles dynamically
    const particles: HTMLDivElement[] = [];
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        container.appendChild(particle);
        particles.push(particle);
        Object.assign(particle.style, styles.particle);

        // Animate each particle with GSAP for performance
        gsap.to(particle, {
            x: () => Math.random() * container.offsetWidth - container.offsetWidth / 2,
            y: () => Math.random() * container.offsetHeight - container.offsetHeight / 2,
            scale: () => Math.random() * 1.2 + 0.3,
            opacity: () => Math.random() * 0.5 + 0.1,
            duration: () => Math.random() * 20 + 15,
            repeat: -1, // Loop forever
            yoyo: true, // Animate back and forth
            ease: 'power1.inOut',
        });
    }
    
    // Cleanup function to remove particles when the component unmounts
    return () => {
        particles.forEach(p => p.remove());
    };

  }, [gsapLoaded]); // The dependency array ensures this runs only after GSAP is loaded.

  // Framer Motion animation variants for the text elements
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // This function is called when the logo's entrance animation is finished.
  // It waits 3 seconds before calling the prop to transition to the main site.
  const handleLogoAnimationComplete = () => {
    setTimeout(() => {
      onAnimationComplete();
    }, 7000); // 7-second delay after animation
  };

  return (
    <motion.div
      ref={containerRef}
      style={styles.container}
      // This defines the animation for when the component is removed
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
    >
      {/* The content is layered on top of the particles */}
      <div style={styles.contentOverlay}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.4 } }, // Animate children one after another
          }}
        >
          {/* Animated Headline */}
          <motion.h2 style={styles.headline} variants={textVariants}>
            The Heart of Our Craft
          </motion.h2>

          {/* Animated Tagline */}
          <motion.p style={styles.tagline} variants={textVariants}>
            Where every bean tells a story of passion and purpose.
          </motion.p>
        </motion.div>

        {/* Animated Logo Container */}
        <motion.div
          style={styles.logoContainer}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: [0.6, -0.28, 0.73, 1.28], delay: 1 },
          }}
          onAnimationComplete={handleLogoAnimationComplete}
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, ease: 'backOut' },
            }}
          >
            {imageError ? (
              // Fallback display if the image fails to load
              <div style={styles.fallbackLogo}>B&B</div>
            ) : (
              <motion.img
                src={logoUrl}
                alt="Brew & Bliss Animated Logo"
                style={styles.logo}
                onError={() => setImageError(true)}
                whileHover={{
                  filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(212, 175, 55, 0.7))',
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};


// --- MAIN APP COMPONENT (How to use it) ---
const App = ({ children }: { children: React.ReactNode }) => {
  // State to control whether the landing page or main site is shown
  const [isLoading, setIsLoading] = useState(true);

  // Effect to load Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    // AnimatePresence allows the landing page to animate *out* before being removed
    <AnimatePresence mode="wait">
      {isLoading ? (
        // Show the landing page and pass the function to update the state
        <DynamicBrandFeature
          key="loader"
          onAnimationComplete={() => setIsLoading(false)}
        />
      ) : (
        // Once loading is false, show the main website
        <MainWebsite key="main-site">{children}</MainWebsite>
      )}
    </AnimatePresence>
  );
};


// --- STYLES (TypeScript-friendly) ---
// Using style objects provides type safety and autocompletion.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(180deg, #fdfbfb 0%, #e2e2e2 100%)',
    overflow: 'hidden',
    position: 'relative', // Needed for particle positioning
  },
  particle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(74, 44, 42, 0.15)', // Subtle particle color
  },
  contentOverlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',
    zIndex: 1, // Ensure content is above particles
    position: 'relative',
  },
  headline: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 8vw, 3.5rem)', // Responsive font size
    color: '#4a2c2a',
    marginBottom: '1rem',
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
  },
  tagline: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
    color: '#6c584c',
    marginBottom: '3rem',
    maxWidth: '500px',
  },
  logoContainer: {
    perspective: '1500px', // Creates 3D space for the rotation
  },
  logo: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 5px rgba(255,255,255,0.3)',
    objectFit: 'cover',
    transition: 'filter 0.4s ease',
  },
  fallbackLogo: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    backgroundColor: '#4a2c2a',
    color: '#d4af37',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '80px',
    fontFamily: "'Playfair Display', serif",
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
};

export default App;
