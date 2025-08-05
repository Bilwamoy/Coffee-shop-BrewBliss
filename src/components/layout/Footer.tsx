"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Star, Send, MessageCircle } from "lucide-react";

const FeedbackSection = () => {
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    console.log('Star clicked:', rating); // Debug log
    setFeedbackData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackData.name || !feedbackData.email || !feedbackData.message) {
      setSubmitMessage({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setSubmitMessage({ type: "success", text: "Thank you for your feedback! We'll get back to you soon." });
        setFeedbackData({ name: "", email: "", message: "", rating: 0 });
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "Sorry, there was an error sending your feedback. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-accent mb-4">
          Share Your Feedback
        </h3>
        <p className="font-body text-cream max-w-2xl mx-auto">
          We value your thoughts and experiences. Help us improve by sharing your feedback!
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={feedbackData.name}
            onChange={handleInputChange}
            className="px-5 py-3 rounded-xl bg-cream text-coffee-dark focus:outline-none focus:ring-2 focus:ring-accent shadow-lg transition-all duration-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={feedbackData.email}
            onChange={handleInputChange}
            className="px-5 py-3 rounded-xl bg-cream text-coffee-dark focus:outline-none focus:ring-2 focus:ring-accent shadow-lg transition-all duration-300"
            required
          />
        </div>

        {/* Rating Section */}
        <div className="text-center">
          <p className="font-body text-cream mb-3">Rate your experience:</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingClick(star)}
                className="focus:outline-none cursor-pointer p-1"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-8 h-8 transition-all duration-200 ${
                    star <= feedbackData.rating
                      ? "text-accent fill-accent drop-shadow-lg"
                      : "text-cream hover:text-accent hover:fill-accent/50 hover:scale-110"
                  }`}
                />
              </motion.button>
            ))}
          </div>
          {feedbackData.rating > 0 && (
            <p className="font-body text-accent mt-2 text-sm">
              You rated: {feedbackData.rating} star{feedbackData.rating > 1 ? 's' : ''}
            </p>
          )}
        </div>

        <textarea
          name="message"
          placeholder="Tell us about your experience... *"
          value={feedbackData.message}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-5 py-3 rounded-xl bg-cream text-coffee-dark focus:outline-none focus:ring-2 focus:ring-accent shadow-lg transition-all duration-300 resize-none"
          required
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="font-body bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-coffee-dark mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Feedback
            </>
          )}
        </motion.button>

        {submitMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-body text-center ${
              submitMessage.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {submitMessage.text}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    // Simulate sending email to admin
    console.log(`Admin Notification: New newsletter subscription from: ${email}`);
    setMessage({ type: "success", text: "Thank you for subscribing!" });
    setEmail(""); // Clear the input

    // Optionally clear message after some time
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const footerLinks = [
    {
      title: "About Us",
      links: [
        { name: "Our Story", path: "/about" },
        { name: "Sustainability", path: "/sustainability" },
        { name: "Careers", path: "/careers" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Hot Drinks", path: "/products/hot" },
        { name: "Cold Drinks", path: "/products/cold" },
        { name: "Food", path: "/products/food" },
        { name: "Merchandise", path: "/products/merch" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Store Locator", path: "/locations" },
      ],
    },
  ];

  return (
    <footer className="section-dark-brown coffee-drip text-cream py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <h2 className="font-heading text-3xl font-bold mb-6 text-accent">Brew & Bliss</h2>
          <p className="font-body mb-8 text-cream leading-relaxed">
            Experience the perfect blend of premium coffee and serene ambiance in our artisanal sanctuary.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/reviews"
              className="group text-cream hover:text-accent transition-all duration-300 flex flex-col items-center"
              aria-label="Customer Reviews"
            >
              <motion.span 
                whileHover={{ y: -5, scale: 1.1 }} 
                className="text-3xl mb-1 group-hover:drop-shadow-lg"
              >
                📘
              </motion.span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Reviews
              </span>
            </Link>
            <Link
              href="/post-selfie"
              className="group text-cream hover:text-accent transition-all duration-300 flex flex-col items-center"
              aria-label="Post a Selfie"
            >
              <motion.span 
                whileHover={{ y: -5, scale: 1.1 }} 
                className="text-3xl mb-1 group-hover:drop-shadow-lg"
              >
                📷
              </motion.span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Selfies
              </span>
            </Link>
            <Link
              href="/events"
              className="group text-cream hover:text-accent transition-all duration-300 flex flex-col items-center"
              aria-label="Community Events"
            >
              <motion.span 
                whileHover={{ y: -5, scale: 1.1 }} 
                className="text-3xl mb-1 group-hover:drop-shadow-lg"
              >
                🐦
              </motion.span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Events
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Footer Links */}
        {footerLinks.map((column, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="md:col-span-1"
          >
            <h3 className="font-heading text-xl font-semibold mb-6 text-accent">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.path}
                    className="font-body text-lg text-cream hover:text-accent transition-colors duration-300 hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-1"
        >
          <h3 className="font-heading text-xl font-semibold mb-6 text-accent">
            Join Our Newsletter
          </h3>
          <p className="font-body mb-6 text-cream leading-relaxed">
            Stay updated with our latest blends, exclusive offers, and coffee stories.
          </p>
          <form className="flex flex-col space-y-4" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="px-5 py-3 rounded-xl bg-cream text-coffee-dark focus:outline-none focus:ring-2 focus:ring-accent shadow-lg transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="font-body bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-5 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe to Bliss
            </motion.button>
            {message && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-body text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}
              >
                {message.text}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Feedback Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-4xl mx-auto mt-16 pt-8 border-t border-cream/20"
      >
        <FeedbackSection />
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-6xl mx-auto mt-12 pt-8 border-t border-cream/20 text-center"
      >
        <p className="font-body text-cream text-lg">
          &copy; {currentYear} Brew & Bliss Coffee. Crafted with ❤️ for coffee lovers worldwide.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
