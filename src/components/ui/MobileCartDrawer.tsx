"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

const MobileCartDrawer = () => {
  const { items, totalItems, totalAmount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle drawer open/close
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById("cart-drawer");
      const cartButton = document.getElementById("cart-button");
      
      if (drawer && !drawer.contains(event.target as Node) && 
          cartButton && !cartButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Cart Button (Fixed Position) */}
      <button
        id="cart-button"
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 z-40 bg-primary-dark text-secondary-light w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors duration-300 md:hidden"
      >
        <span className="text-2xl">🛒</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-primary-dark rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            />
            
            {/* Drawer Content */}
            <motion.div
              id="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-secondary-light shadow-lg rounded-l-lg overflow-hidden"
            >
              <div className="h-full flex flex-col">
                {/* Drawer Header */}
                <div className="bg-primary-dark text-secondary-light p-4 flex justify-between items-center">
                  <h2 className="font-heading text-xl font-bold">
                    Cart ({totalItems} items)
                  </h2>
                  <button 
                    onClick={toggleDrawer}
                    className="text-secondary-light hover:text-accent"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Drawer Body */}
                <div className="flex-grow overflow-y-auto p-4">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🛒</div>
                      <h3 className="font-heading text-lg text-primary-dark mb-2">
                        Your cart is empty
                      </h3>
                      <p className="font-body text-primary-dark/80">
                        Add some delicious items from our menu
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4 p-3 bg-white rounded-lg shadow">
                          {/* Product Image */}
                          <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                            {item.product.images && item.product.images.length > 0 ? (
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                                <span className="text-gray-500 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-grow">
                            <h3 className="font-heading text-primary-dark font-semibold">
                              {item.product.name}
                            </h3>
                            <div className="font-body text-primary-dark/80 text-sm">
                              {Object.entries(item.customizations).map(([type, option]) => (
                                <div key={type} className="flex justify-between">
                                  <span>{type}:</span>
                                  <span>{option.name}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-body text-primary-dark">
                                Qty: {item.quantity}
                              </span>
                              <span className="font-body font-semibold text-primary-dark">
                                ${(item.totalPrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Drawer Footer */}
                {items.length > 0 && (
                  <div className="bg-primary-dark text-secondary-light p-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <Link 
                      href="/cart"
                      onClick={toggleDrawer}
                      className="font-body block w-full bg-accent text-primary-dark py-3 rounded-lg text-center font-bold hover:bg-secondary-dark transition-colors duration-300"
                    >
                      View Cart
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileCartDrawer;
