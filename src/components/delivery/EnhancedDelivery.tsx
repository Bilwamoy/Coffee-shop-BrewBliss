"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { gsap } from 'gsap';
import Link from 'next/link';

// Icons
const CheckCircleIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TruckIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const MapPinIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface DeliveryStatus {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  completed: boolean;
  active: boolean;
}

const EnhancedDelivery = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const total = searchParams.get('total');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(25);
  const [driverLocation, setDriverLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const mapRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);

  const [statuses, setStatuses] = useState<DeliveryStatus[]>([
    {
      id: 1,
      title: "Order Confirmed",
      description: "We've received your order and payment",
      time: "2 min ago",
      icon: "✅",
      completed: true,
      active: false
    },
    {
      id: 2,
      title: "Preparing Your Coffee",
      description: "Our baristas are crafting your perfect brew",
      time: "Just now",
      icon: "☕",
      completed: false,
      active: true
    },
    {
      id: 3,
      title: "Quality Check",
      description: "Ensuring everything meets our standards",
      time: "Pending",
      icon: "🔍",
      completed: false,
      active: false
    },
    {
      id: 4,
      title: "Out for Delivery",
      description: "Your order is on its way to you",
      time: "Pending",
      icon: "🚚",
      completed: false,
      active: false
    },
    {
      id: 5,
      title: "Delivered",
      description: "Enjoy your delicious coffee!",
      time: "Pending",
      icon: "🎉",
      completed: false,
      active: false
    }
  ]);

  // Simulate delivery progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < statuses.length - 1) {
          const newStep = prev + 1;
          
          // Update statuses
          setStatuses(prevStatuses => 
            prevStatuses.map((status, index) => ({
              ...status,
              completed: index < newStep,
              active: index === newStep,
              time: index === newStep ? "Just now" : 
                    index < newStep ? getTimeAgo(index) : "Pending"
            }))
          );

          // Update delivery time
          setDeliveryTime(prev => Math.max(prev - 5, 0));
          
          return newStep;
        }
        clearInterval(interval);
        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animate truck movement
  useEffect(() => {
    if (truckRef.current && currentStep >= 3) {
      gsap.to(truckRef.current, {
        x: "+=50px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, [currentStep]);

  // Simulate driver location updates
  useEffect(() => {
    if (currentStep >= 3) {
      const locationInterval = setInterval(() => {
        setDriverLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }));
      }, 3000);

      return () => clearInterval(locationInterval);
    }
  }, [currentStep]);

  const getTimeAgo = (step: number) => {
    const times = ["5 min ago", "3 min ago", "1 min ago", "Just now"];
    return times[step] || "Just now";
  };

  const getEstimatedTime = () => {
    if (currentStep >= 4) return "Delivered!";
    if (currentStep >= 3) return `${deliveryTime} min`;
    return `${deliveryTime + 10} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl text-cream mb-4">
            Order Tracking
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-cream/80">
            <p className="font-body text-lg">Order #{orderId}</p>
            <div className="hidden md:block w-1 h-1 bg-cream/50 rounded-full"></div>
            <p className="font-body text-lg">Total: ${total}</p>
            <div className="hidden md:block w-1 h-1 bg-cream/50 rounded-full"></div>
            <p className="font-body text-lg">ETA: {getEstimatedTime()}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Timeline */}
            <motion.div
              className="glass-morphism rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl text-cream mb-8">Delivery Progress</h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-cream/20"></div>
                <motion.div
                  className="absolute left-6 top-0 w-0.5 bg-accent"
                  initial={{ height: "0%" }}
                  animate={{ height: `${(currentStep / (statuses.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                ></motion.div>

                {/* Status Items */}
                <div className="space-y-8">
                  {statuses.map((status, index) => (
                    <motion.div
                      key={status.id}
                      className="relative flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Status Icon */}
                      <motion.div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                          status.completed
                            ? 'bg-accent text-coffee-dark shadow-lg'
                            : status.active
                            ? 'bg-accent/20 text-accent border-2 border-accent'
                            : 'bg-coffee-medium text-cream/50'
                        }`}
                        animate={status.active ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {status.icon}
                        {status.active && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-accent"
                            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      {/* Status Content */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-heading text-lg ${
                            status.completed || status.active ? 'text-cream' : 'text-cream/50'
                          }`}>
                            {status.title}
                          </h3>
                          <span className={`text-sm ${
                            status.completed || status.active ? 'text-accent' : 'text-cream/50'
                          }`}>
                            {status.time}
                          </span>
                        </div>
                        <p className={`font-body ${
                          status.completed || status.active ? 'text-cream/80' : 'text-cream/40'
                        }`}>
                          {status.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Map (Simulated) */}
            {currentStep >= 3 && (
              <motion.div
                className="glass-morphism rounded-2xl p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="font-heading text-2xl text-cream mb-6">Live Tracking</h2>
                
                <div 
                  ref={mapRef}
                  className="relative h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl overflow-hidden"
                >
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-white/10"></div>
                      ))}
                    </div>
                  </div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 50 200 Q 150 100 250 150 T 350 100"
                      stroke="#ffd700"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: currentStep >= 4 ? 1 : 0.6 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </svg>

                  {/* Delivery Truck */}
                  <motion.div
                    ref={truckRef}
                    className="absolute top-20 left-16 text-2xl"
                    initial={{ x: 0, y: 0 }}
                    animate={{ 
                      x: currentStep >= 4 ? 280 : 150,
                      y: currentStep >= 4 ? -10 : 20
                    }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    🚚
                  </motion.div>

                  {/* Destination */}
                  <div className="absolute top-16 right-16 text-2xl">
                    🏠
                  </div>

                  {/* Driver Info Popup */}
                  <motion.div
                    className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-coffee-dark"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                        B
                      </div>
                      <div>
                        <p className="font-bold text-sm">Bilwamoy Sarkar</p>
                        <p className="text-xs text-gray-600">Your delivery driver</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Driver Contact */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-coffee-dark font-bold text-lg">
                      B
                    </div>
                    <div>
                      <p className="text-cream font-bold">Bilwamoy Sarkar</p>
                      <p className="text-cream/70 text-sm">Delivery Driver • 4.9 ⭐</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      className="bg-accent/20 text-accent px-4 py-2 rounded-lg font-bold hover:bg-accent/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📞 Call
                    </motion.button>
                    <motion.button
                      className="bg-accent/20 text-accent px-4 py-2 rounded-lg font-bold hover:bg-accent/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      💬 Message
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              className="glass-morphism rounded-2xl p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-heading text-xl text-cream mb-4">Order Details</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/70">Order ID</span>
                  <span className="text-cream font-mono">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">Total Amount</span>
                  <span className="text-accent font-bold">${total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">Payment Method</span>
                  <span className="text-cream">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/70">Delivery Address</span>
                  <span className="text-cream text-right">123 Main St<br />New York, NY</span>
                </div>
              </div>
            </motion.div>

            {/* Estimated Time */}
            <motion.div
              className="glass-morphism rounded-2xl p-6 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-heading text-xl text-cream mb-2">Estimated Delivery</h3>
              <motion.p
                className="text-3xl font-bold text-accent"
                key={deliveryTime}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {getEstimatedTime()}
              </motion.p>
              {currentStep < 4 && (
                <p className="text-cream/70 text-sm mt-2">
                  We'll notify you when your order arrives
                </p>
              )}
            </motion.div>

            {/* Special Instructions */}
            <motion.div
              className="glass-morphism rounded-2xl p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="font-heading text-lg text-cream mb-3">Delivery Instructions</h3>
              <p className="text-cream/80 text-sm">
                "Please ring the doorbell and leave at the front door. Thank you!"
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                className="w-full bg-accent/20 text-accent py-3 rounded-lg font-bold hover:bg-accent/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📞 Contact Support
              </motion.button>
              
              <Link href="/products">
                <motion.button
                  className="w-full bg-coffee-medium text-cream py-3 rounded-lg font-bold hover:bg-coffee-light transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🛒 Order Again
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 bg-coffee-dark/90 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                className="glass-morphism rounded-3xl p-12 text-center max-w-md mx-4"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, repeat: 3 }}
                >
                  🎉
                </motion.div>
                
                <h2 className="font-heading text-3xl text-cream mb-4">
                  Delivered Successfully!
                </h2>
                
                <p className="text-cream/80 mb-8">
                  Your delicious coffee has been delivered. We hope you enjoy every sip!
                </p>
                
                <div className="space-y-3">
                  <motion.button
                    className="w-full bg-accent text-coffee-dark py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(5)}
                  >
                    ⭐ Rate Your Experience
                  </motion.button>
                  
                  <Link href="/products">
                    <motion.button
                      className="w-full bg-coffee-medium text-cream py-3 rounded-lg font-bold hover:bg-coffee-light transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🛒 Order Again
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedDelivery;