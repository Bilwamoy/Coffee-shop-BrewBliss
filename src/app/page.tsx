"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Animated Background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary-dark bg-opacity-70 z-0"></div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/hero-coffee.jpg"
            alt="Coffee beans background"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-30"
          />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl text-secondary-light mb-6"
          >
            Brew & Bliss
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-body text-xl md:text-2xl text-secondary-light mb-10 max-w-2xl mx-auto"
          >
            Experience the perfect blend of premium coffee and serene ambiance
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="font-body bg-accent text-primary-dark px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary-dark transition-colors duration-300">
              Order Now
            </button>
            <button className="font-body border-2 border-secondary-light text-secondary-light px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary-light hover:text-primary-dark transition-colors duration-300">
              View Menu
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-secondary-light p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary-dark text-secondary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">☕</span>
            </div>
            <h3 className="font-heading text-2xl mb-4 text-primary-dark">
              Premium Blends
            </h3>
            <p className="font-body text-primary-dark">
              Sourced from the finest coffee beans around the world, roasted to
              perfection
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-secondary-light p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary-dark text-secondary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-heading text-2xl mb-4 text-primary-dark">
              Artisanal Experience
            </h3>
            <p className="font-body text-primary-dark">
              Crafted with care and attention to detail for the perfect coffee
              experience
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-secondary-light p-8 rounded-lg shadow-lg text-center"
          >
            <div className="bg-primary-dark text-secondary-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="font-heading text-2xl mb-4 text-primary-dark">
              Sustainable Sourcing
            </h3>
            <p className="font-body text-primary-dark">
              Committed to ethical and sustainable coffee farming practices
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
