"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  category?: string;
}

interface ProductShowcaseProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  title,
  subtitle,
  columns = 3,
  showAddToCart = true,
  onAddToCart
}) => {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showcaseRef.current) return;

    const cards = showcaseRef.current.querySelectorAll('.product-card');
    
    // Staggered entrance animation
    gsap.fromTo(cards, 
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover animations for each card
    cards.forEach((card) => {
      const image = card.querySelector('.product-image');
      const overlay = card.querySelector('.product-overlay');
      const details = card.querySelector('.product-details');

      card.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.3 });
        gsap.to(details, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
        gsap.to(details, { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" });
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [products]);

  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="font-heading text-4xl md:text-5xl mb-6 text-coffee-dark">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-body text-xl text-coffee-warm max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        <div ref={showcaseRef} className={`grid ${getGridCols()} gap-8`}>
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative overflow-hidden rounded-2xl glass-morphism luxury-hover cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0] || '/images/placeholder-coffee.jpg'}
                  alt={product.name}
                  fill
                  className="product-image object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="product-overlay absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-coffee-dark/40 to-transparent opacity-0 transition-opacity duration-300" />
                
                {/* Floating Details */}
                <div className="product-details absolute bottom-4 left-4 right-4 transform translate-y-5 opacity-0">
                  {product.category && (
                    <span className="inline-block px-3 py-1 bg-accent text-coffee-dark text-sm font-semibold rounded-full mb-2">
                      {product.category}
                    </span>
                  )}
                  {product.description && (
                    <p className="text-cream text-sm leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl mb-2 text-coffee-dark group-hover:text-coffee-warm transition-colors duration-300">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="font-body text-2xl font-bold text-accent">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  {showAddToCart && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAddToCart?.(product)}
                      className="bg-gradient-to-r from-coffee-warm to-coffee-light text-cream px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Steam Effect on Hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="steam-particle w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                <div className="steam-particle w-1 h-1 bg-white/40 rounded-full animate-pulse ml-1 mt-1" style={{ animationDelay: '0.5s' }} />
                <div className="steam-particle w-1 h-1 bg-white/30 rounded-full animate-pulse ml-2" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;