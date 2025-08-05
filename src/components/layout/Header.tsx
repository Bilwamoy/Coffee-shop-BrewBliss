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
    <header className="glass-morphism sticky top-0 z-50 text-cream py-4 px-6 shadow-2xl backdrop-blur-md border-b border-cream/10">
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
        <nav className="hidden md:flex space-x-2 items-center">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.path}
                className={`font-body text-lg font-medium relative px-4 py-2 rounded-full transition-all duration-300 ${
                  pathname === item.path
                    ? "text-coffee-dark bg-accent shadow-lg"
                    : "text-cream hover:text-accent hover:bg-cream/10 backdrop-blur-sm"
                }`}
              >
                {item.name}
                {item.name === "Cart" && totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Auth Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-accent/20"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="mr-2">👤</span>
                {user.displayName || user.email?.split('@')[0]}
              </motion.button>
              
              {/* User Menu Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-3 z-50 border border-cream/20"
                  >
                    <Link
                      href="/profile"
                      className="font-body flex items-center px-5 py-3 text-coffee-dark hover:bg-accent/10 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <span className="mr-3">👤</span>
                      Profile
                    </Link>
                    <button
                      className="font-body w-full flex items-center text-left px-5 py-3 text-coffee-dark hover:bg-red-50 transition-colors duration-200"
                      onClick={handleSignOut}
                    >
                      <span className="mr-3">🚪</span>
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body hidden md:block border-2 border-accent/60 text-accent px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-coffee-dark transition-all duration-300 backdrop-blur-sm"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </motion.button>
            </>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-accent focus:outline-none p-2 rounded-full hover:bg-cream/10 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-accent transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-accent transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-accent transition-all duration-300 ${
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
              className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md md:hidden z-50 shadow-2xl border-t border-cream/20"
            >
              <div className="flex flex-col py-6 px-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className={`font-body text-lg py-3 px-4 rounded-xl relative flex items-center transition-all duration-300 ${
                        pathname === item.path
                          ? "text-coffee-dark bg-accent shadow-lg"
                          : "text-coffee-medium hover:text-coffee-dark hover:bg-accent/10"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                      {item.name === "Cart" && totalItems > 0 && (
                        <span className="ml-auto bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="pt-4 border-t border-cream/20 space-y-3">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-body w-full border-2 border-accent text-accent px-4 py-3 rounded-xl text-sm font-semibold hover:bg-accent hover:text-coffee-dark transition-all duration-300"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/auth/signin");
                      }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + 1) * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-body w-full bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-4 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/auth/signup");
                      }}
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Cart Popup */}
        <AnimatePresence>
          {showCartPopup && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="absolute top-20 right-10 bg-gradient-to-r from-accent to-accent-dark text-coffee-dark p-4 rounded-2xl shadow-2xl border border-accent/20"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-2">🛒</span>
                <p className="font-semibold">Item added to cart!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
