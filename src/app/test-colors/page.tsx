"use client";

import { motion } from "framer-motion";

export default function TestColorsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Color Test Page</h1>
        
        {/* Test Primary Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-primary-light p-4 rounded-lg">
              <p className="text-gray-900 font-black text-lg">primary-light</p>
            </div>
            <div className="bg-primary p-4 rounded-lg">
              <p className="text-white">primary</p>
            </div>
            <div className="bg-primary-dark p-4 rounded-lg">
              <p className="text-white">primary-dark</p>
            </div>
          </div>
        </div>

        {/* Test Secondary Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Secondary Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-secondary-light p-4 rounded-lg">
              <p className="text-gray-900 font-black text-lg">secondary-light</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-gray-900 font-black text-lg">secondary</p>
            </div>
            <div className="bg-secondary-dark p-4 rounded-lg">
              <p className="text-white">secondary-dark</p>
            </div>
          </div>
        </div>

        {/* Test Accent Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Accent Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-accent-light p-4 rounded-lg">
              <p className="text-gray-900 font-black text-lg">accent-light</p>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <p className="text-gray-900 font-black text-lg">accent</p>
            </div>
            <div className="bg-accent-dark p-4 rounded-lg">
              <p className="text-white">accent-dark</p>
            </div>
          </div>
        </div>

        {/* Test Cream Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cream Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-cream-light p-4 rounded-lg border">
              <p className="text-gray-900 font-black text-lg">cream-light</p>
            </div>
            <div className="bg-cream p-4 rounded-lg border">
              <p className="text-gray-900 font-black text-lg">cream</p>
            </div>
            <div className="bg-cream-dark p-4 rounded-lg border">
              <p className="text-gray-900 font-black text-lg">cream-dark</p>
            </div>
          </div>
        </div>

        {/* Test Coffee Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Coffee Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-coffee-light p-4 rounded-lg">
              <p className="text-white">coffee-light</p>
            </div>
            <div className="bg-coffee-warm p-4 rounded-lg">
              <p className="text-white">coffee-warm</p>
            </div>
            <div className="bg-coffee-medium p-4 rounded-lg">
              <p className="text-white">coffee-medium</p>
            </div>
            <div className="bg-coffee-dark p-4 rounded-lg">
              <p className="text-white">coffee-dark</p>
            </div>
          </div>
        </div>

        {/* Test Beige Colors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Beige Colors</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-beige-light p-4 rounded-lg border">
              <p className="text-gray-900 font-black text-lg">beige-light</p>
            </div>
            <div className="bg-beige-warm p-4 rounded-lg border">
              <p className="text-gray-900 font-black text-lg">beige-warm</p>
            </div>
          </div>
        </div>

        {/* Test Gradient */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Test Gradient</h2>
          <div className="bg-gradient-to-br from-primary-light via-secondary-light to-cream p-8 rounded-lg">
            <p className="text-gray-900 font-black text-center text-xl">
              Gradient: from-primary-light via-secondary-light to-cream
            </p>
          </div>
        </div>

        {/* Motion Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Motion Test</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-accent p-6 rounded-lg text-center"
          >
            <p className="text-gray-900 font-black text-xl">
              This should animate in smoothly
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}