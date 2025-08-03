"use client";

import { motion } from "framer-motion";
import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Carousel />
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 bg-primary-dark text-secondary-light text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl mb-8">Experience Brew & Bliss</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <video
              src="/videos/promo.mp4"
              controls
              loop
              muted
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

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
