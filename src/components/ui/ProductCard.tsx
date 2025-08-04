"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/lib/menuData";
import EnhancedHover from "@/components/animations/EnhancedHover";

const ProductCard = ({ product }: { product: MenuItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current || !overlayRef.current || !steamRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const steam = steamRef.current;

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power2.out" });
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
      gsap.to(steam, { opacity: 1, duration: 0.5 });
      
      // Create steam particles
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '10px';
        steam.appendChild(particle);

        gsap.fromTo(particle, 
          {
            y: 0,
            opacity: 0.6,
            scale: 1,
          },
          {
            y: -60,
            opacity: 0,
            scale: 2,
            duration: 2,
            delay: i * 0.3,
            ease: "power2.out",
            onComplete: () => particle.remove(),
          }
        );
      }
    };

    const handleMouseLeave = () => {
      gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
      gsap.to(steam, { opacity: 0, duration: 0.5 });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <EnhancedHover 
      hoverType="coffee-steam" 
      intensity="medium"
      glowColor="#D4AF37"
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        whileTap={{ scale: 0.98 }}
        className="glass-morphism rounded-2xl shadow-xl overflow-hidden h-full flex flex-col luxury-hover dynamic-lighting group relative"
      >
      {/* Product Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-coffee-dark/40 to-transparent opacity-0 transition-opacity duration-300"
        />
        
        {/* Steam Effect */}
        <div 
          ref={steamRef}
          className="absolute top-2 right-2 opacity-0 transition-opacity duration-500 pointer-events-none"
        />

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {product.category}
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-coffee-dark/90 text-cream px-4 py-2 rounded-full font-bold text-lg shadow-lg">
          ${product.price?.toFixed(2) || 'N/A'}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-semibold text-coffee-dark mb-3 group-hover:text-coffee-warm transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-body text-coffee-warm/80 mb-6 flex-grow leading-relaxed line-clamp-3">
          {product.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <Link 
            href={`/products/${product.id}`}
            className="flex-1 text-center font-body bg-gradient-to-r from-coffee-warm to-coffee-light text-cream px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View Details
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-coffee-dark px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            title="Add to Cart"
          >
            <span className="text-lg">🛒</span>
          </motion.button>
        </div>
      </div>

      {/* Floating Coffee Bean Decoration */}
      <div 
        className="absolute -top-2 -right-2 w-6 h-8 bg-gradient-to-br from-coffee-light to-coffee-dark opacity-20 group-hover:opacity-40 transition-opacity duration-300 transform rotate-12"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
      >
        <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-coffee-dark transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      </motion.div>
    </EnhancedHover>
  );
};

export default ProductCard;
