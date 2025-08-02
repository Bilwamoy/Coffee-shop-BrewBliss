"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real implementation, this would redirect to a checkout page or open a modal
    setTimeout(() => {
      alert("Proceeding to checkout!");
      setIsCheckingOut(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl text-primary-dark mb-6"
          >
            Your Cart
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-secondary-light rounded-lg shadow-lg p-12"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="font-heading text-2xl text-primary-dark mb-4">
              Your cart is empty
            </h2>
            <p className="font-body text-primary-dark/80 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              href="/products" 
              className="font-body inline-block bg-primary-dark text-secondary-light px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300 text-lg font-semibold"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl text-primary-dark mb-6"
        >
          Your Cart ({totalItems} items)
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-secondary-light rounded-lg shadow-lg overflow-hidden"
        >
          {/* Cart Items */}
          <div className="divide-y divide-secondary-dark">
            {items.map((item) => (
              <div key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                  {item.product.images && item.product.images.length > 0 ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="font-heading text-xl text-primary-dark mb-2">
                    {item.product.name}
                  </h3>
                  
                  {/* Customizations */}
                  <div className="font-body text-primary-dark/80 mb-4">
                    {Object.entries(item.customizations).map(([type, option]) => (
                      <div key={type} className="flex justify-between">
                        <span>{type}:</span>
                        <span>{option.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border-2 border-secondary-dark rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="font-body px-3 py-1 text-primary-dark hover:bg-secondary-light"
                      >
                        -
                      </button>
                      <span className="font-body px-3 py-1 text-primary-dark">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="font-body px-3 py-1 text-primary-dark hover:bg-secondary-light"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-body text-lg font-semibold text-primary-dark">
                        ${(item.totalPrice).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="font-body text-primary-dark/60 hover:text-primary-dark"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-primary-dark text-secondary-light"
          >
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="font-body w-full bg-accent text-primary-dark py-4 rounded-lg text-xl font-bold hover:bg-secondary-dark transition-colors duration-300 disabled:opacity-50"
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
