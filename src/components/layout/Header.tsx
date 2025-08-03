"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAuthInstance } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

import Logo from "@/components/logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();

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

  // Check authentication state
  useEffect(() => {
    const initAuth = async () => {
      const authInstance = await getAuthInstance();
      if (!authInstance) return;
      
      const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
        setUser(currentUser);
      });
      return unsubscribe;
    };
    
    let unsubscribe: (() => void) | undefined;
    initAuth().then((unsub) => {
      unsubscribe = unsub;
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setShowCartPopup(true);
      setTimeout(() => {
        setShowCartPopup(false);
      }, 2000);
    }
  }, [totalItems]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/products" },
    { name: "Locations", path: "/locations" },
    { name: "Rewards", path: "/rewards" },
    { name: "Cart", path: "/cart" },
    { name: "Subscribe", path: "/subscribe" },
  ];

  const handleSignOut = async () => {
    const authInstance = await getAuthInstance();
    if (!authInstance) return;
    
    try {
      await signOut(authInstance);
      setIsUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-primary-dark text-secondary-light py-4 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.path}
                className={`font-body text-lg font-medium relative ${
                  pathname === item.path
                    ? "text-accent border-b-2 border-accent"
                    : "hover:text-accent"
                }`}
              >
                {item.name}
                {item.name === "Cart" && totalItems > 0 && (
                  <span className="absolute -top-2 -right-4 bg-accent text-primary-dark rounded-full h-6 w-6 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="font-body bg-accent text-primary-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-secondary-dark transition-colors duration-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                {user.displayName || user.email}
              </motion.button>
              
              {/* User Menu Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-secondary-light rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link
                      href="/profile"
                      className="font-body block px-4 py-2 text-primary-dark hover:bg-primary-light"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="font-body w-full text-left px-4 py-2 text-primary-dark hover:bg-primary-light"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="font-body hidden md:block border-2 border-secondary-light text-secondary-light px-4 py-2 rounded-full text-sm font-semibold hover:bg-secondary-light hover:text-primary-dark transition-colors duration-300"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="font-body bg-accent text-primary-dark px-4 py-2 rounded-full text-sm font-semibold hover:bg-secondary-dark transition-colors duration-300"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </motion.button>
            </>
          )}

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
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-16 left-0 right-0 bg-primary-dark md:hidden z-50"
            >
              <div className="flex flex-col py-4 px-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`font-body text-lg py-2 relative ${
                      pathname === item.path
                        ? "text-accent border-l-4 border-accent pl-4"
                        : "hover:text-accent"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {item.name === "Cart" && totalItems > 0 && (
                      <span className="absolute top-0 left-12 bg-accent text-primary-dark rounded-full h-6 w-6 flex items-center justify-center text-xs">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Cart Popup */}
        <AnimatePresence>
          {showCartPopup && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-20 right-10 bg-accent text-primary-dark p-4 rounded-lg shadow-lg"
            >
              <p>Item added to cart!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
