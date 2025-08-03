"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

export default function RewardsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [tier, setTier] = useState("Silver");
  const [nextTierPoints, setNextTierPoints] = useState(100);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Load loyalty points from localStorage or simulate
      if (currentUser) {
        const savedPoints = localStorage.getItem(`brewbliss_points_${currentUser.uid}`);
        const points = savedPoints ? parseInt(savedPoints) : Math.floor(Math.random() * 300);
        setLoyaltyPoints(points);
        
        // Save points if not already saved
        if (!savedPoints) {
          localStorage.setItem(`brewbliss_points_${currentUser.uid}`, points.toString());
        }
        
        // Determine tier based on points
        if (points < 100) {
          setTier("Silver");
          setNextTierPoints(100);
        } else if (points < 250) {
          setTier("Gold");
          setNextTierPoints(250);
        } else {
          setTier("Platinum");
          setNextTierPoints(500);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const progressPercentage = (loyaltyPoints / nextTierPoints) * 100;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl text-primary-dark text-center mb-12"
        >
          Rewards Program
        </motion.h1>

        {loading ? (
          <div className="bg-secondary-light rounded-lg shadow-lg p-8 h-64 animate-pulse"></div>
        ) : user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary-light rounded-lg shadow-lg overflow-hidden"
          >
            {/* Loyalty Card Header */}
            <div className="bg-primary-dark text-secondary-light p-6 text-center">
              <h2 className="font-heading text-2xl mb-2">Your Rewards</h2>
              <p className="font-body">Welcome back, {user.displayName || user.email}!</p>
            </div>

            {/* Points Display */}
            <div className="p-8 text-center">
              <div className="text-6xl font-bold text-primary-dark mb-2">
                {loyaltyPoints}
              </div>
              <p className="font-body text-primary-dark/80 mb-8">Loyalty Points</p>

              {/* Tier Progress */}
              <div className="mb-8">
                <div className="flex justify-between font-body text-primary-dark mb-2">
                  <span>{tier} Tier</span>
                  <span>{nextTierPoints} points for next tier</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>

              {/* Rewards Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="border-2 border-primary-dark rounded-lg p-4">
                  <div className="text-2xl mb-2">☕</div>
                  <h3 className="font-heading text-lg text-primary-dark mb-2">
                    Free Drinks
                  </h3>
                  <p className="font-body text-primary-dark/80">
                    Redeem points for free beverages
                  </p>
                </div>
                <div className="border-2 border-primary-dark rounded-lg p-4">
                  <div className="text-2xl mb-2">🎂</div>
                  <h3 className="font-heading text-lg text-primary-dark mb-2">
                    Birthday Reward
                  </h3>
                  <p className="font-body text-primary-dark/80">
                    Get a free drink on your birthday
                  </p>
                </div>
                <div className="border-2 border-primary-dark rounded-lg p-4">
                  <div className="text-2xl mb-2">📱</div>
                  <h3 className="font-heading text-lg text-primary-dark mb-2">
                    Mobile Order
                  </h3>
                  <p className="font-body text-primary-dark/80">
                    Earn extra points for mobile orders
                  </p>
                </div>
              </div>

              {/* How it Works */}
              <div className="text-left">
                <h3 className="font-heading text-xl text-primary-dark mb-4">
                  How It Works
                </h3>
                <ul className="font-body text-primary-dark/80 space-y-2">
                  <li>• Earn 1 point for every $1 spent</li>
                  <li>• Redeem 100 points for a free drink</li>
                  <li>• Earn bonus points during special promotions</li>
                  <li>• Move up tiers for exclusive benefits</li>
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary-light rounded-lg shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-6">yalty</div>
            <h2 className="font-heading text-2xl text-primary-dark mb-4">
              Join Our Rewards Program
            </h2>
            <p className="font-body text-primary-dark/80 mb-8 max-w-2xl mx-auto">
              Sign in to start earning points with every purchase and unlock
              exclusive rewards and benefits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/auth/signin'}
                className="font-body bg-primary-dark text-secondary-light px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300 text-lg font-semibold"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/auth/signup'}
                className="font-body border-2 border-primary-dark text-primary-dark px-6 py-3 rounded-lg hover:bg-primary-dark hover:text-secondary-light transition-colors duration-300 text-lg font-semibold"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
