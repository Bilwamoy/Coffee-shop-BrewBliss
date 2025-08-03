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
    <footer className="bg-primary-dark text-secondary-light py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <h2 className="font-heading text-2xl font-bold mb-4">Brew & Bliss</h2>
          <p className="font-body mb-6">
            Experience the perfect blend of premium coffee and serene ambiance.
          </p>
          <div className="flex space-x-4">
            <motion.a
              whileHover={{ y: -3 }}
              href="#"
              className="text-secondary-light hover:text-accent"
              aria-label="Facebook"
            >
              <span className="text-2xl">📘</span>
            </motion.a>
            <Link
              href="/post-selfie"
              className="text-secondary-light hover:text-accent"
              aria-label="Post a Selfie"
            >
              <motion.span whileHover={{ y: -3 }} className="text-2xl">📷</motion.span>
            </Link>
            <motion.a
              whileHover={{ y: -3 }}
              href="#"
              className="text-secondary-light hover:text-accent"
              aria-label="Twitter"
            >
              <span className="text-2xl">🐦</span>
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
            <h3 className="font-heading text-xl font-semibold mb-4">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.path}
                    className="font-body text-lg hover:text-accent transition-colors duration-300"
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
          <h3 className="font-heading text-xl font-semibold mb-4">
            Join Our Newsletter
          </h3>
          <p className="font-body mb-4">
            Stay updated with our latest offers and products.
          </p>
          <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg bg-secondary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="font-body bg-accent text-primary-dark px-4 py-2 rounded-lg font-semibold hover:bg-secondary-dark transition-colors duration-300"
            >
              Subscribe
            </motion.button>
            {message && (
              <p className={`font-body text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                {message.text}
              </p>
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
        className="max-w-6xl mx-auto mt-12 pt-6 border-t border-secondary-light/30 text-center"
      >
        <p className="font-body">
          &copy; {currentYear} Brew & Bliss Coffee. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
