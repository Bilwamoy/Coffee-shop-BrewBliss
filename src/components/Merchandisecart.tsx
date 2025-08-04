"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, Search, Menu, Coffee, Home, Star, User, ArrowDown, Play } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

// --- TYPE DEFINITIONS ---
// Defines the structure for a single product item.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Defines the structure for an item within the shopping cart.
// This matches the CartContext structure.
interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  customizations: Record<string, any>;
  quantity: number;
  totalPrice: number;
}

// --- PRODUCT DATA ---
// An array of all available merchandise items with real images.
const merchandiseItems: Product[] = [
  {
    id: 1,
    name: 'Branded Coffee Mugs',
    description: 'Start your day with a sturdy ceramic mug featuring our classic logo.',
    price: 1200, // Price in INR
    imageUrl: '/merchandise-images/Branded Coffee Mugs.png',
  },
  {
    id: 2,
    name: 'Reusable Tumblers',
    description: 'Eco-friendly and stylish, perfect for your coffee on the go.',
    price: 1800,
    imageUrl: '/merchandise-images/Reusable Tumblers.png',
  },
  {
    id: 3,
    name: 'Brew & Bliss T-shirts',
    description: 'Soft, 100% cotton t-shirts. Show off your love for great coffee.',
    price: 1500,
    imageUrl: '/merchandise-images/Brew & Bliss T-shirts.png',
  },
  {
    id: 4,
    name: 'Signature Roast Coffee Beans',
    description: 'A 250g bag of our signature medium roast with notes of chocolate and citrus.',
    price: 850,
    imageUrl: '/merchandise-images/Signature Roast Coffee Beans.png',
  },
  {
    id: 5,
    name: 'Pour-Over Coffee Maker',
    description: 'Brew the perfect cup at home with this elegant glass pour-over set.',
    price: 2500,
    imageUrl: '/merchandise-images/Pour-Over Coffee Maker.png',
  },
  {
    id: 6,
    name: 'Brew & Bliss Gift Cards',
    description: 'The perfect gift for any coffee lover. Available in various amounts.',
    price: 1000,
    imageUrl: '/merchandise-images/Brew & Bliss Gift Cards.png',
  },
];

// --- REUSABLE COMPONENTS ---

// ProductCard Component: Displays a single merchandise item.
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 ease-in-out group border border-coffee-light/20">
    <div className="relative overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-coffee-primary font-playfair">{product.name}</h3>
      <p className="text-gray-600 mt-2 font-roboto h-12 text-sm leading-relaxed">{product.description}</p>
      <div className="flex justify-between items-center mt-6">
        <p className="text-2xl font-bold text-coffee-primary font-playfair">₹{product.price.toLocaleString('en-IN')}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="coffee-glow bg-gradient-to-r from-coffee-primary to-coffee-secondary text-white px-5 py-2.5 rounded-full flex items-center space-x-2 hover:shadow-lg transition-all duration-300 font-roboto font-medium"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN MERCHANDISE PAGE COMPONENT ---
const MerchandisePage: React.FC = () => {
  const { items: cart, addToCart, updateQuantity, totalItems, totalAmount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsAnimated, setStatsAnimated] = useState(false);
  const router = useRouter();

  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const coffeeBeansRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const coffeeCupRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Effect to load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Effect to handle scroll detection for header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to load GSAP and initialize animations
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        // Dynamically import GSAP
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger);

        // Hero text animation
        if (heroTextRef.current) {
          const tl = gsap.timeline();
          tl.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            stagger: 0.2
          })
          .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
          }, '-=0.5')
          .from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
          }, '-=0.3');
        }

        // Coffee beans floating animation
        if (coffeeBeansRef.current) {
          const beans = coffeeBeansRef.current.querySelectorAll('.coffee-bean-float');
          beans.forEach((bean, index) => {
            gsap.to(bean, {
              duration: 3 + index * 0.5,
              y: -20,
              rotation: 360,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.3
            });
          });
        }

        // Coffee cup steam animation
        if (coffeeCupRef.current) {
          const steamParticles = coffeeCupRef.current.querySelectorAll('.steam-particle');
          steamParticles.forEach((particle, index) => {
            gsap.to(particle, {
              duration: 2,
              y: -50,
              opacity: 0,
              scale: 1.5,
              repeat: -1,
              ease: 'power1.out',
              delay: index * 0.3
            });
          });

          // Coffee cup rotation
          gsap.to('.coffee-cup-main', {
            duration: 4,
            rotation: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }

        // Parallax background
        if (parallaxRef.current) {
          gsap.to('.parallax-bg', {
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1
            },
            y: -100,
            ease: 'none'
          });
        }

        // Stats counter animation
        if (statsRef.current) {
          ScrollTrigger.create({
            trigger: statsRef.current,
            start: 'top 80%',
            onEnter: () => {
              if (!statsAnimated) {
                setStatsAnimated(true);
                animateCounters();
              }
            }
          });
        }

        // Scroll indicator animation
        gsap.to('.scroll-indicator', {
          duration: 1.5,
          y: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

      } catch (error) {
        console.log('GSAP not available, using CSS animations fallback');
      }
    };

    loadGSAP();
  }, [statsAnimated]);

  // Counter animation function
  const animateCounters = () => {
    const counters = [
      { element: '.counter-beans', target: 50000, suffix: '+' },
      { element: '.counter-cups', target: 25000, suffix: '+' },
      { element: '.counter-customers', target: 5000, suffix: '+' },
      { element: '.counter-years', target: 15, suffix: '' }
    ];

    counters.forEach(({ element, target, suffix }) => {
      const el = document.querySelector(element);
      if (el) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 20);
      }
    });
  };

  // Function to add a product to the cart or update its quantity.
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      product: {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        images: [product.imageUrl],
      },
      customizations: {},
      quantity: 1,
      totalPrice: product.price,
    };
    addToCart(cartItem);
    setIsCartOpen(true); // Open cart when an item is added
  };

  // Function to update the quantity of a cart item.
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  // Calculate the subtotal price of all items in the cart.
  const subtotal = totalAmount;

  return (
    <div className="bg-cream-100 min-h-screen font-roboto text-gray-700" 
     style={{ '--font-playfair': "'Playfair Display', serif", '--font-roboto': "'Roboto', sans-serif" } as React.CSSProperties}>
      <style>{`
        .font-playfair { font-family: var(--font-playfair); }
        .font-roboto { font-family: var(--font-roboto); }
        .bg-cream-100 { background-color: #fdfbfb; }
        .bg-brown-600 { background-color: #6c584c; }
        .bg-brown-700 { background-color: #4a2c2a; }
        .text-brown-700 { color: #4a2c2a; }
        .border-brown-200 { border-color: #e2e2e2; }
        .ring-brown-600 { --tw-ring-color: #6c584c; }
        
        /* Coffee-themed colors */
        .bg-coffee-primary { background-color: #8B4513; }
        .bg-coffee-secondary { background-color: #D2691E; }
        .bg-coffee-light { background-color: #F4A460; }
        .text-coffee-primary { color: #8B4513; }
        .text-coffee-secondary { color: #D2691E; }
        .text-coffee-light { color: #F4A460; }
        
        /* Glass morphism */
        .glass-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(139, 69, 19, 0.1);
        }
        
        .glass-nav.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 0 12px 40px rgba(139, 69, 19, 0.15);
        }
        
        /* Coffee bean animation */
        .coffee-bean {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .coffee-bean::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #8B4513;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
          opacity: 0;
        }
        
        .coffee-bean:hover::before {
          opacity: 1;
          animation: steam 2s infinite;
        }
        
        @keyframes steam {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -70%) scale(1.2); opacity: 0.4; }
          100% { transform: translate(-50%, -90%) scale(1.5); opacity: 0; }
        }
        
        /* Hamburger to coffee bean transformation */
        .hamburger-line {
          width: 25px;
          height: 3px;
          background: #8B4513;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        
        .hamburger-open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }
        
        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger-open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }
        
        /* Cart counter animation */
        .cart-counter {
          animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        /* Coffee glow effect */
        .coffee-glow {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .coffee-glow:hover {
          filter: drop-shadow(0 0 10px rgba(139, 69, 19, 0.5));
        }
        
        .coffee-glow::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #8B4513, #D2691E, #F4A460);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .coffee-glow:hover::after {
          opacity: 0.3;
        }
        
        /* Search bar animation */
        .search-expand {
          transition: all 0.3s ease;
        }
        
        .search-expand:focus {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(139, 69, 19, 0.2);
        }
        
        /* Logo shrink animation */
        .logo-shrink {
          transition: all 0.3s ease;
        }
        
        .logo-shrink.scrolled {
          transform: scale(0.8);
        }
        
        /* Mobile menu slide */
        .mobile-menu {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .mobile-menu.open {
          transform: translateX(0);
        }
        
        /* Navigation link hover effects */
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::before {
          width: 100%;
        }
        
        .nav-link:hover {
          color: #8B4513;
          transform: translateY(-2px);
        }
        
        /* Hero Section Styles */
        .hero-section {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fdfbfb 0%, #f4f1eb 50%, #ede7d9 100%);
        }
        
        .parallax-bg {
          position: absolute;
          top: -20%;
          left: 0;
          width: 120%;
          height: 120%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="coffee-plantation" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="%23D2691E" opacity="0.3"/><circle cx="60" cy="40" r="1.5" fill="%238B4513" opacity="0.2"/><circle cx="80" cy="70" r="2.5" fill="%23F4A460" opacity="0.25"/></pattern></defs><rect width="100%" height="100%" fill="url(%23coffee-plantation)"/></svg>') repeat;
          opacity: 0.1;
          z-index: 1;
        }
        
        .floating-coffee-beans {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        
        .coffee-bean-float {
          position: absolute;
          width: 12px;
          height: 16px;
          background: #8B4513;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
        }
        
        .coffee-bean-float::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 8px;
          background: #654321;
          transform: translate(-50%, -50%);
          border-radius: 1px;
        }
        
        .coffee-bean-float:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .coffee-bean-float:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
        .coffee-bean-float:nth-child(3) { top: 60%; left: 15%; animation-delay: 2s; }
        .coffee-bean-float:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; }
        .coffee-bean-float:nth-child(5) { top: 30%; left: 90%; animation-delay: 4s; }
        .coffee-bean-float:nth-child(6) { top: 70%; left: 5%; animation-delay: 5s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          min-height: 100vh;
          padding: 2rem 0;
        }
        
        .hero-title {
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 700;
          line-height: 0.9;
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          color: #8B4513;
          margin: 2rem 0;
          opacity: 0.9;
        }
        
        .coffee-cup-illustration {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }
        
        .coffee-cup-main {
          width: 200px;
          height: 240px;
          background: linear-gradient(145deg, #8B4513 0%, #A0522D  50%, #D2691E 100%);
          border-radius: 0 0 100px 100px;
          position: relative;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.3);
        }
        
        .coffee-cup-main::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 10px;
          right: 10px;
          height: 40px;
          background: linear-gradient(90deg, #654321 0%, #8B4513 100%);
          border-radius: 20px 20px 0 0;
        }
        
        .coffee-cup-handle {
          position: absolute;
          right: -40px;
          top: 50px;
          width: 60px;
          height: 80px;
          border: 8px solid #8B4513;
          border-left: none;
          border-radius: 0 40px 40px 0;
        }
        
        .coffee-surface {
          position: absolute;
          top: 10px;
          left: 20px;
          right: 20px;
          height: 30px;
          background: radial-gradient(ellipse at center, #3E2723 0%, #5D4037 100%);
          border-radius: 50%;
          overflow: hidden;
        }
        
        .steam-container {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 80px;
        }
        
        .steam-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: steam-rise 2s ease-out infinite;
        }
        
        .steam-particle:nth-child(1) { left: 30%; animation-delay: 0s; }
        .steam-particle:nth-child(2) { left: 50%; animation-delay: 0.3s; }
        .steam-particle:nth-child(3) { left: 70%; animation-delay: 0.6s; }
        .steam-particle:nth-child(4) { left: 40%; animation-delay: 0.9s; }
        .steam-particle:nth-child(5) { left: 60%; animation-delay: 1.2s; }
        
        @keyframes steam-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-60px) scale(1.5);
            opacity: 0;
          }
        }
        
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .cta-button::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(139,69,19,0.1) 0%, transparent 70%);
          transform: scale(0);
          transition: transform 0.6s ease;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover::after {
          transform: scale(1);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
        }
        
        .cta-button.primary {
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
          position: relative;
        }
        
        .cta-button.primary:hover {
          background: linear-gradient(135deg, #A0522D 0%, #F4A460 100%);
        }
        
        .cta-button.secondary {
          background: transparent;
          border: 2px solid #8B4513;
          color: #8B4513;
          position: relative;
        }
        
        .cta-button.secondary::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
          transition: width 0.3s ease;
          z-index: -1;
        }
        
        .cta-button.secondary:hover::after {
          width: 100%;
        }
        
        .cta-button.secondary:hover {
          color: white;
          border-color: #D2691E;
        }
        
        .stats-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 3rem 2rem;
          margin: 4rem 0;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }
        
        .stat-item {
          text-align: center;
          padding: 1rem;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #8B4513;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: #8B4513;
          animation: bounce-scroll 2s infinite;
        }
        
        @keyframes bounce-scroll {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        
        /* CSS Fallback Animations */
        .hero-title span {
          display: inline-block;
          animation: slideInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(50px);
        }
        
        .hero-title span:nth-child(1) { animation-delay: 0.2s; }
        .hero-title span:nth-child(2) { animation-delay: 0.4s; }
        .hero-title span:nth-child(3) { animation-delay: 0.6s; }
        
        .hero-subtitle {
          animation: fadeInUp 1s ease-out 0.8s forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .hero-buttons {
          animation: fadeInUp 1s ease-out 1s forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Coffee cup pulse animation */
        .coffee-cup-main {
          animation: coffeePulse 3s ease-in-out infinite;
        }
        
        @keyframes coffeePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        /* Enhanced floating animation for coffee beans */
        .coffee-bean-float {
          animation: enhancedFloat 8s ease-in-out infinite;
        }
        
        @keyframes enhancedFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateY(-15px) rotate(90deg) scale(1.1); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1); 
            opacity: 0.4; 
          }
          75% { 
            transform: translateY(-15px) rotate(270deg) scale(1.1); 
            opacity: 0.8; 
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2rem, 10vw, 4rem);
          }
          
          .coffee-cup-illustration {
            width: 200px;
            height: 200px;
          }
          
          .coffee-cup-main {
            width: 150px;
            height: 180px;
          }
          
          .stats-container {
            padding: 2rem 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .hero-content {
            padding: 1rem 0;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .cta-button {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
      
      {/* Professional Glass Morphism Navigation */}
      <header className={`glass-nav ${isScrolled ? 'scrolled' : ''} sticky top-0 z-50 transition-all duration-300`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo with shrinking animation */}
            <div className={`logo-shrink ${isScrolled ? 'scrolled' : ''} flex items-center space-x-3`}>
              <div className="coffee-glow">
                <Coffee size={isScrolled ? 28 : 36} className="text-coffee-primary" />
              </div>
              <h1 className={`font-bold text-coffee-primary font-playfair transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                Brew & Bliss
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="nav-link text-gray-700 font-roboto font-medium coffee-bean">Home</a>
              <a href="#" className="nav-link text-gray-700 font-roboto font-medium coffee-bean">Menu</a>
              <a href="#" className="nav-link text-coffee-primary font-roboto font-medium coffee-bean">Merchandise</a>
              <a href="#" className="nav-link text-gray-700 font-roboto font-medium coffee-bean">About</a>
              <a href="#" className="nav-link text-gray-700 font-roboto font-medium coffee-bean">Contact</a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-secondary" />
                <input
                  type="text"
                  placeholder="Search coffee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-expand pl-10 pr-4 py-2 w-64 rounded-full border border-coffee-light/30 focus:outline-none focus:border-coffee-primary bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              <button className="hidden md:block coffee-glow p-2 rounded-full hover:bg-coffee-light/20 transition-all duration-300">
                <User size={24} className="text-coffee-primary" />
              </button>

              {/* Shopping Cart with Coffee Bean Counter */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="coffee-glow relative p-2 rounded-full hover:bg-coffee-light/20 transition-all duration-300"
              >
                <ShoppingCart size={24} className="text-coffee-primary" />
                {totalItems > 0 && (
                  <span className="cart-counter absolute -top-1 -right-1 bg-gradient-to-r from-coffee-primary to-coffee-secondary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button with Coffee Bean Transformation */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden coffee-glow p-2 rounded-full hover:bg-coffee-light/20 transition-all duration-300 ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="hamburger-line"></div>
                  <div className="hamburger-line"></div>
                  <div className="hamburger-line"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''} lg:hidden absolute top-full left-0 w-full glass-nav border-t border-coffee-light/20`}>
          <div className="container mx-auto px-6 py-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-secondary" />
                <input
                  type="text"
                  placeholder="Search coffee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-expand pl-10 pr-4 py-3 w-full rounded-full border border-coffee-light/30 focus:outline-none focus:border-coffee-primary bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              <a href="#" className="block nav-link text-gray-700 font-roboto font-medium py-3 coffee-bean">
                <Home size={20} className="inline mr-3" />
                Home
              </a>
              <a href="#" className="block nav-link text-gray-700 font-roboto font-medium py-3 coffee-bean">
                <Coffee size={20} className="inline mr-3" />
                Menu
              </a>
              <a href="#" className="block nav-link text-coffee-primary font-roboto font-medium py-3 coffee-bean">
                <Star size={20} className="inline mr-3" />
                Merchandise
              </a>
              <a href="#" className="block nav-link text-gray-700 font-roboto font-medium py-3 coffee-bean">
                <User size={20} className="inline mr-3" />
                About
              </a>
              <a href="#" className="block nav-link text-gray-700 font-roboto font-medium py-3 coffee-bean">
                <Coffee size={20} className="inline mr-3" />
                Contact
              </a>
            </nav>

            {/* Mobile User Actions */}
            <div className="mt-6 pt-6 border-t border-coffee-light/20">
              <button className="w-full coffee-glow bg-gradient-to-r from-coffee-primary to-coffee-secondary text-white py-3 rounded-full font-roboto font-medium hover:shadow-lg transition-all duration-300">
                Sign In / Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        {/* Parallax Background */}
        <div ref={parallaxRef} className="parallax-bg"></div>
        
        {/* Floating Coffee Beans */}
        <div ref={coffeeBeansRef} className="floating-coffee-beans">
          <div className="coffee-bean-float"></div>
          <div className="coffee-bean-float"></div>
          <div className="coffee-bean-float"></div>
          <div className="coffee-bean-float"></div>
          <div className="coffee-bean-float"></div>
          <div className="coffee-bean-float"></div>
        </div>

        <div className="hero-content">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div ref={heroTextRef} className="text-center lg:text-left">
                <h1 className="hero-title font-playfair">
                  <span className="block">Brew</span>
                  <span className="block">&</span>
                  <span className="block">Bliss</span>
                </h1>
                
                <p className="hero-subtitle font-roboto">
                  Experience the perfect blend of premium coffee and exceptional merchandise. 
                  Every sip tells a story, every product carries our passion.
                </p>
                
                <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="cta-button primary text-white px-8 py-4 rounded-full font-roboto font-semibold text-lg flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-300">
                    <Coffee size={24} />
                    <span>Explore Menu</span>
                  </button>
                  
                  <button className="cta-button secondary px-8 py-4 rounded-full font-roboto font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300">
                    <Play size={20} />
                    <span>Watch Story</span>
                  </button>
                </div>
              </div>

              {/* Coffee Cup Illustration */}
              <div ref={coffeeCupRef} className="flex justify-center lg:justify-end">
                <div className="coffee-cup-illustration">
                  {/* Steam Particles */}
                  <div className="steam-container">
                    <div className="steam-particle"></div>
                    <div className="steam-particle"></div>
                    <div className="steam-particle"></div>
                    <div className="steam-particle"></div>
                    <div className="steam-particle"></div>
                  </div>
                  
                  {/* Coffee Cup */}
                  <div className="coffee-cup-main">
                    <div className="coffee-surface"></div>
                    <div className="coffee-cup-handle"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Statistics */}
            <div ref={statsRef} className="stats-container">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat-item">
                  <span className="stat-number counter-beans font-playfair">0</span>
                  <span className="stat-label font-roboto">Beans Roasted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number counter-cups font-playfair">0</span>
                  <span className="stat-label font-roboto">Cups Served</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number counter-customers font-playfair">0</span>
                  <span className="stat-label font-roboto">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number counter-years font-playfair">0</span>
                  <span className="stat-label font-roboto">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-roboto">Scroll to explore</span>
            <ArrowDown size={24} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Coffee size={32} className="text-coffee-primary" />
            <h2 className="text-5xl font-bold text-coffee-primary font-playfair">Take a Piece of Brew & Bliss Home</h2>
            <Coffee size={32} className="text-coffee-primary" />
          </div>
          <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-600 font-roboto leading-relaxed">
            Our exclusive collection features high-quality items designed to enhance your coffee experience and show off your love for our brand. 
            Each piece is crafted with the same attention to detail we put into every cup.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {merchandiseItems.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 glass-nav shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-6 border-b border-coffee-light/20">
            <div className="flex items-center space-x-3">
              <Coffee size={24} className="text-coffee-primary" />
              <h2 className="text-2xl font-bold text-coffee-primary font-playfair">Your Cart</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="coffee-glow p-2 rounded-full hover:bg-coffee-light/20 transition-all duration-300">
              <X size={24} className="text-coffee-primary" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow p-6 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingCart size={48} className="mx-auto" />
                <p className="mt-4">Your cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map(item => (
                  <li key={item.product.id} className="flex items-center space-x-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">₹{item.product.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100">
                          <Minus size={16} />
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleUpdateQuantity(item.product.id, 0)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-coffee-light/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-coffee-primary">Subtotal</span>
                <span className="text-xl font-bold text-coffee-primary font-playfair">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full coffee-glow bg-gradient-to-r from-coffee-primary to-coffee-secondary text-white py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 font-roboto"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for when cart or mobile menu is open */}
      {(isCartOpen || isMobileMenuOpen) && (
        <div 
          onClick={() => {
            setIsCartOpen(false);
            setIsMobileMenuOpen(false);
          }} 
          className="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300"
        ></div>
      )}
    </div>
  );
};

export default MerchandisePage;
