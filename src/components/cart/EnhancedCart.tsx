"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
const TrashIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PlusIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const MinusIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
  </svg>
);

const ShoppingBagIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
  </svg>
);

const EnhancedCart = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

  // 3D hover effects for cart items
  useEffect(() => {
    const cartItems = cartRef.current?.querySelectorAll('.cart-item');
    if (!cartItems) return;

    cartItems.forEach((item) => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = item.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(item, {
          duration: 0.3,
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          duration: 0.5,
          rotationX: 0,
          rotationY: 0,
          ease: "power2.out",
        });
      };

      item.addEventListener('mousemove', handleMouseMove);
      item.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        item.removeEventListener('mousemove', handleMouseMove);
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [items]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Add some visual feedback
    gsap.to(cartRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/checkout");
      }
    });
  };

  const handleRemoveItem = (productId: string) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    
    // Animate removal
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-5xl text-cream mb-8"
          >
            Your Cart
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-morphism rounded-2xl p-12 max-w-md mx-auto"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            
            <h2 className="font-heading text-2xl text-cream mb-4">
              Your cart is empty
            </h2>
            
            <p className="font-body text-cream/80 mb-8 leading-relaxed">
              Looks like you haven't added any delicious coffee to your cart yet. 
              Let's fix that!
            </p>
            
            <Link href="/products">
              <motion.button
                className="bg-accent text-coffee-dark px-8 py-4 rounded-xl text-lg font-bold hover:bg-accent-dark transition-colors inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <span>Browse Menu</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-cream mb-2 text-center"
        >
          Your Cart
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-cream/80 text-center mb-12"
        >
          {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              ref={cartRef}
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    className={`cart-item glass-morphism rounded-2xl p-6 ${
                      removingItems.has(item.product.id) ? 'opacity-50' : ''
                    }`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ 
                      opacity: 0, 
                      x: -100, 
                      scale: 0.8,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    layout
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <motion.div 
                        className="relative h-32 w-32 flex-shrink-0 rounded-xl overflow-hidden mx-auto md:mx-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.product.images && item.product.images.length > 0 ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="bg-coffee-medium border-2 border-dashed border-cream/30 w-full h-full flex items-center justify-center">
                            <span className="text-cream/50">No Image</span>
                          </div>
                        )}
                        
                        {/* Floating badge */}
                        <motion.div
                          className="absolute -top-2 -right-2 bg-accent text-coffee-dark rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                        >
                          {item.quantity}
                        </motion.div>
                      </motion.div>
                      
                      {/* Product Details */}
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="font-heading text-xl md:text-2xl text-cream mb-3">
                          {item.product.name}
                        </h3>
                        
                        {/* Customizations */}
                        {Object.keys(item.customizations).length > 0 && (
                          <div className="mb-4">
                            <p className="text-cream/70 text-sm mb-2">Customizations:</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                              {Object.entries(item.customizations).map(([type, option]) => (
                                <span
                                  key={type}
                                  className="bg-coffee-medium/50 text-cream/90 px-3 py-1 rounded-full text-xs"
                                >
                                  {type}: {option.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Quantity and Price Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-coffee-medium/30 rounded-xl p-1">
                            <motion.button 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-lg bg-coffee-medium/50 text-cream hover:bg-coffee-light/50 transition-colors flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MinusIcon className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.span 
                              className="font-body px-6 py-2 text-cream font-bold text-lg"
                              key={item.quantity}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.quantity}
                            </motion.span>
                            
                            <motion.button 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-lg bg-coffee-medium/50 text-cream hover:bg-coffee-light/50 transition-colors flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <PlusIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                          
                          {/* Price and Remove */}
                          <div className="flex items-center gap-4">
                            <motion.span 
                              className="font-heading text-2xl font-bold text-accent"
                              key={item.totalPrice}
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              ${item.totalPrice.toFixed(2)}
                            </motion.span>
                            
                            <motion.button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-cream/60 hover:text-red-400 transition-colors p-2"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="glass-morphism rounded-2xl p-8 sticky top-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-heading text-2xl text-cream mb-6 text-center">
                Order Summary
              </h2>
              
              {/* Summary Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <div className="flex-grow">
                      <p className="text-cream font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-cream/70">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-accent font-bold ml-2">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-cream/20 pt-6 space-y-3">
                <div className="flex justify-between text-cream/80">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-cream/80">
                  <span>Estimated Tax</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-cream font-bold text-xl pt-3 border-t border-cream/20">
                  <span>Total</span>
                  <motion.span 
                    className="text-accent"
                    key={totalAmount}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${(totalAmount * 1.08).toFixed(2)}
                  </motion.span>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-accent text-coffee-dark py-4 rounded-xl text-xl font-bold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                whileHover={{ scale: isCheckingOut ? 1 : 1.02, y: isCheckingOut ? 0 : -2 }}
                whileTap={{ scale: isCheckingOut ? 1 : 0.98 }}
              >
                {isCheckingOut ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-coffee-dark border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Proceed to Checkout"
                )}
              </motion.button>

              {/* Continue Shopping */}
              <Link href="/products">
                <motion.button
                  className="w-full bg-coffee-medium/50 text-cream py-3 rounded-xl font-bold hover:bg-coffee-light/50 transition-colors mt-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-cream/70 text-sm">
                  <div className="w-4 h-4 text-accent">🔒</div>
                  <span>Secure Checkout</span>
                </div>
                <p className="text-cream/50 text-xs mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCart;