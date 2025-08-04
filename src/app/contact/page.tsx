"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumBackground from '@/components/PremiumBackground';
import BrewingLoader from '@/components/animations/BrewingLoader';
import BrewingSubmission from '@/components/animations/BrewingSubmission';
import AnimatedCard from '@/components/animations/AnimatedCard';
import LiquidPourDivider from '@/components/animations/LiquidPourDivider';
import EnhancedText from '@/components/animations/EnhancedTextAnimations';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form processing with brewing animation
    // In a real app, this would be your actual form submission logic
  };

  const handleBrewingComplete = () => {
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PremiumBackground>
      <div className="min-h-screen py-20">
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
                Get in Touch
              </h1>
              <p className="word-reveal font-body text-xl text-coffee-warm max-w-3xl mx-auto leading-relaxed">
                We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, reach out to us.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="coffee" height={100} />

        {/* Contact Form Section */}
        <section className="section-cream py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <AnimatedCard animationType="brew" className="brew-in">
                <div className="glass-morphism p-8 rounded-2xl luxury-hover">
                  <h2 className="font-heading text-3xl text-coffee-dark mb-8 text-center">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-coffee-dark mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-coffee-light/20 focus:border-accent focus:outline-none transition-colors duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-coffee-dark mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-coffee-light/20 focus:border-accent focus:outline-none transition-colors duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-body text-coffee-dark mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-coffee-light/20 focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-body text-coffee-dark mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-coffee-light/20 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-coffee-warm to-coffee-light text-cream px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Brewing your message...' : 'Send Message'}
                    </motion.button>
                  </form>
                </div>
              </AnimatedCard>

              {/* Contact Information */}
              <div className="space-y-8">
                <AnimatedCard animationType="lift" delay={0.2} className="brew-in">
                  <div className="glass-morphism p-6 rounded-2xl luxury-hover text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <h3 className="font-heading text-xl text-coffee-dark mb-2">Email Us</h3>
                    <p className="font-body text-coffee-warm">info@brewbliss.com</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animationType="lift" delay={0.4} className="brew-in">
                  <div className="glass-morphism p-6 rounded-2xl luxury-hover text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                      <span className="text-2xl">📞</span>
                    </div>
                    <h3 className="font-heading text-xl text-coffee-dark mb-2">Call Us</h3>
                    <p className="font-body text-coffee-warm">(123) 456-7890</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animationType="lift" delay={0.6} className="brew-in">
                  <div className="glass-morphism p-6 rounded-2xl luxury-hover text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <h3 className="font-heading text-xl text-coffee-dark mb-2">Visit Us</h3>
                    <p className="font-body text-coffee-warm">123 Coffee Lane<br />Brewtown, CA 90210</p>
                  </div>
                </AnimatedCard>

                <AnimatedCard animationType="lift" delay={0.8} className="brew-in">
                  <div className="glass-morphism p-6 rounded-2xl luxury-hover text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center">
                      <span className="text-2xl">⏰</span>
                    </div>
                    <h3 className="font-heading text-xl text-coffee-dark mb-2">Business Hours</h3>
                    <p className="font-body text-coffee-warm">
                      Mon-Fri: 7:00 AM - 6:00 PM<br />
                      Sat-Sun: 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </section>

        {/* Liquid Pour Divider */}
        <LiquidPourDivider color="accent" height={120} />

        {/* Map Section */}
        <section className="section-dark-brown py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <AnimatedCard animationType="splash" className="steam-dissolve">
              <div className="glass-morphism p-12 rounded-3xl luxury-hover">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-4xl">🗺️</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl text-cream mb-6">
                  Find Our Coffee Shop
                </h2>
                <p className="word-reveal font-body text-beige-warm text-lg mb-8 leading-relaxed">
                  Located in the heart of Brewtown, our cozy coffee shop is the perfect place to enjoy premium coffee and connect with fellow coffee lovers.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Directions
                </motion.button>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </div>

      {/* Brewing Submission Animation */}
      <BrewingSubmission
        isSubmitting={isSubmitting}
        onComplete={handleBrewingComplete}
        brewingText="Brewing your message with care..."
        successText="Your message has been sent! We'll get back to you soon."
      />
    </PremiumBackground>
  );
}