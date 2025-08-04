"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

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
          <p className="font-body mb-8 text-beige-warm leading-relaxed">
            Experience the perfect blend of premium coffee and serene ambiance in our artisanal sanctuary.
          </p>
          <div className="flex space-x-6">
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              href="#"
              className="text-cream hover:text-accent transition-colors duration-300"
              aria-label="Facebook"
            >
              <span className="text-3xl">📘</span>
            </motion.a>
            <Link
              href="/post-selfie"
              className="text-cream hover:text-accent transition-colors duration-300"
              aria-label="Post a Selfie"
            >
              <motion.span whileHover={{ y: -5, scale: 1.1 }} className="text-3xl">📷</motion.span>
            </Link>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              href="#"
              className="text-cream hover:text-accent transition-colors duration-300"
              aria-label="Twitter"
            >
              <span className="text-3xl">🐦</span>
            </motion.a>
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
                    className="font-body text-lg text-beige-warm hover:text-accent transition-colors duration-300 hover:translate-x-2 inline-block"
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
          <p className="font-body mb-6 text-beige-warm leading-relaxed">
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

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-6xl mx-auto mt-16 pt-8 border-t border-cream/20 text-center"
      >
        <p className="font-body text-beige-warm text-lg">
          &copy; {currentYear} Brew & Bliss Coffee. Crafted with ❤️ for coffee lovers worldwide.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
