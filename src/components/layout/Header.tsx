"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/products" },
    { name: "Locations", path: "/locations" },
    { name: "Rewards", path: "/rewards" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <header className="bg-primary-dark text-secondary-light py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="font-heading text-2xl font-bold">
            Brew & Bliss
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.path}
                className={`font-body text-lg font-medium ${
                  pathname === item.path
                    ? "text-accent border-b-2 border-accent"
                    : "hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-secondary-light focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-secondary-light transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-secondary-light transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-secondary-light transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 right-0 bg-primary-dark md:hidden z-50"
            >
              <div className="flex flex-col py-4 px-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`font-body text-lg py-2 ${
                      pathname === item.path
                        ? "text-accent border-l-4 border-accent pl-4"
                        : "hover:text-accent"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
